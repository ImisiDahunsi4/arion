import { PublicKey, Connection, Transaction, SystemProgram, Keypair, VersionedTransaction } from '@solana/web3.js';
import * as anchor from "@coral-xyz/anchor";
import { WalletContextState } from '@solana/wallet-adapter-react';
import { LightWasm, WasmFactory } from "@lightprotocol/hasher.rs";
import { BN } from 'bn.js';
import { Buffer } from 'buffer';

// Internal Libs
import { MerkleTree } from './privacy-cash/merkle_tree';
import { Utxo } from './privacy-cash/utxo';
import { prove, parseProofToBytesArray, parseToBytesArray } from './privacy-cash/prover';
import { getExtDataHash, getMintAddressField, bnToBytes } from './privacy-cash/utils';
import { DEFAULT_HEIGHT, FIELD_SIZE, ROOT_HISTORY_SIZE, ZERO_BYTES, DEPOSIT_FEE_RATE, WITHDRAW_FEE_RATE, FEE_RECIPIENT_ACCOUNT } from "./privacy-cash/constants";
import idlJson from './idl/zkcash.json';
import { Zkcash } from './types/zkcash';
const IDL = idlJson as Zkcash;

// Constants
const ZKCASH_PROGRAM_ID = new PublicKey("ATZj4jZ4FFzkvAcvk27DW9GRkgSbFnHo49fKKPQXU7VS");
const SOL_MINT = new PublicKey("11111111111111111111111111111112"); // Native SOL Mint (System Program representation)

export class ArionPrivacyService {
    private connection: Connection;
    private program: anchor.Program<any> | null = null;
    private lightWasm: LightWasm | null = null;
    private merkleTree: MerkleTree | null = null;
    private wallet: WalletContextState | null = null;

    // PDAs
    private treeAccountPDA: PublicKey | null = null;
    private treeTokenAccountPDA: PublicKey | null = null;
    private globalConfigPDA: PublicKey | null = null;

    constructor() {
        this.connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com', 'confirmed');
    }

    isInitialized(): boolean {
        return !!this.program && !!this.lightWasm && !!this.merkleTree;
    }

    async initialize(wallet: WalletContextState) {
        if (!wallet.publicKey) throw new Error("Wallet not connected");
        this.wallet = wallet;

        // Initialize LightWasm
        if (!this.lightWasm) {
            this.lightWasm = await WasmFactory.getInstance('circuits/light_wasm_hasher_bg.wasm');
        }

        // Initialize Anchor Program
        const provider = new anchor.AnchorProvider(
            this.connection,
            // @ts-ignore
            wallet,
            { commitment: 'confirmed' }
        );
        this.program = new anchor.Program(IDL, ZKCASH_PROGRAM_ID, provider);

        // Derive PDAs
        [this.treeAccountPDA] = PublicKey.findProgramAddressSync(
            [Buffer.from("merkle_tree")],
            this.program.programId
        );
        [this.treeTokenAccountPDA] = PublicKey.findProgramAddressSync(
            [Buffer.from("tree_token")],
            this.program.programId
        );
        [this.globalConfigPDA] = PublicKey.findProgramAddressSync(
            [Buffer.from("global_config")],
            this.program.programId
        );

        // Initialize Merkle Tree
        this.merkleTree = new MerkleTree(DEFAULT_HEIGHT, this.lightWasm);
        await this.syncMerkleTree();

        console.log("ArionPrivacyService Initialized");
    }

    private async syncMerkleTree() {
        // Placeholder for syncing logic
    }

    async getBalance(): Promise<{ lamports: number, utxos: any[] }> {
        const stored = localStorage.getItem('arion_utxos');
        const utxos = stored ? JSON.parse(stored) : [];

        // Filter confirmed/spent UTXOs here (need on-chain check in real app)
        const total = utxos.reduce((acc: number, u: any) => acc + parseInt(u.amount), 0);

        return {
            lamports: total,
            utxos: utxos
        };
    }

    async deposit(amount: number) {
        if (!this.program || !this.lightWasm || !this.merkleTree || !this.wallet?.publicKey) {
            throw new Error("Service not initialized");
        }

        const depositFee = Math.floor((amount * DEPOSIT_FEE_RATE) / 10000);
        const extAmount = new BN(amount);
        const fee = new BN(depositFee);

        const extData = {
            recipient: this.wallet.publicKey,
            extAmount: extAmount,
            encryptedOutput1: Buffer.from(""),
            encryptedOutput2: Buffer.from(""),
            fee: fee,
            feeRecipient: FEE_RECIPIENT_ACCOUNT,
            mintAddress: SOL_MINT
        };

        const inputs = [new Utxo({ lightWasm: this.lightWasm }), new Utxo({ lightWasm: this.lightWasm })];

        const outputAmount = new BN(amount).sub(fee);
        // Ensure index matches tree
        const nextIndex = this.merkleTree.elements().length;

        const outputs = [
            new Utxo({
                lightWasm: this.lightWasm,
                amount: outputAmount,
                // keypair: ... // Random default is fine
                index: nextIndex
            }),
            new Utxo({ lightWasm: this.lightWasm, amount: '0' })
        ];

        const publicAmount = extAmount.sub(fee).add(FIELD_SIZE).mod(FIELD_SIZE);

        const inputNullifiers = await Promise.all(inputs.map(x => x.getNullifier()));
        const outputCommitments = await Promise.all(outputs.map(x => x.getCommitment()));
        const root = this.merkleTree.root();

        const proofs = await prove({
            root,
            publicAmount: publicAmount.toString(),
            extDataHash: getExtDataHash(extData),
            inputNullifier: inputNullifiers,
            outputCommitment: outputCommitments,
            inAmount: inputs.map(x => x.amount.toString(10)),
            inPrivateKey: inputs.map(x => x.keypair.privkey),
            inBlinding: inputs.map(x => x.blinding.toString(10)),
            inPathIndices: inputs.map(() => 0),
            inPathElements: inputs.map(() => new Array(DEFAULT_HEIGHT).fill(0)),
            outAmount: outputs.map(x => x.amount.toString(10)),
            outBlinding: outputs.map(x => x.blinding.toString(10)),
            outPubkey: outputs.map(x => x.keypair.pubkey),
            mintAddress: getMintAddressField(SOL_MINT)
        }, '/circuits/transaction2');

        const proofBytes = parseProofToBytesArray(proofs.proof);
        const inputsBytes = parseToBytesArray(proofs.publicSignals);

        const proofToSubmit = {
            proofA: proofBytes.proofA,
            proofB: proofBytes.proofB.flat(),
            proofC: proofBytes.proofC,
            root: inputsBytes[0],
            publicAmount: inputsBytes[1],
            extDataHash: inputsBytes[2],
            inputNullifiers: [inputsBytes[3], inputsBytes[4]],
            outputCommitments: [inputsBytes[5], inputsBytes[6]],
        };

        const modifyComputeUnits = anchor.web3.ComputeBudgetProgram.setComputeUnitLimit({ units: 1_000_000 });

        const [nullifier0] = PublicKey.findProgramAddressSync([Buffer.from("nullifier0"), Buffer.from(proofToSubmit.inputNullifiers[0])], this.program.programId);
        const [nullifier1] = PublicKey.findProgramAddressSync([Buffer.from("nullifier1"), Buffer.from(proofToSubmit.inputNullifiers[1])], this.program.programId);
        const [nullifier2] = PublicKey.findProgramAddressSync([Buffer.from("nullifier0"), Buffer.from(proofToSubmit.inputNullifiers[1])], this.program.programId);
        const [nullifier3] = PublicKey.findProgramAddressSync([Buffer.from("nullifier1"), Buffer.from(proofToSubmit.inputNullifiers[0])], this.program.programId);

        const tx = await this.program.methods
            .transact(
                proofToSubmit,
                { extAmount: extAmount, fee: fee },
                extData.encryptedOutput1,
                extData.encryptedOutput2
            )
            .accounts({
                treeAccount: this.treeAccountPDA!,
                nullifier0, nullifier1, nullifier2, nullifier3,
                recipient: this.wallet.publicKey,
                feeRecipientAccount: FEE_RECIPIENT_ACCOUNT,
                treeTokenAccount: this.treeTokenAccountPDA!,
                globalConfig: this.globalConfigPDA!,
                signer: this.wallet.publicKey,
                systemProgram: SystemProgram.programId
            })
            .preInstructions([modifyComputeUnits])
            .rpc();

        console.log("Deposit TX:", tx);

        this.merkleTree.insert(outputCommitments[0]);
        this.saveUtxo(outputs[0]);

        return tx;
    }

    async withdraw(amount: number, recipient: string) {
        // Placeholder just to satisfy interface
        console.log("Withdraw not fully implemented yet");
        // Logic will mirror deposit but with real inputs (UTXOs) and negative extAmount
        return "not-implemented";
    }

    private saveUtxo(utxo: Utxo) {
        const currentCheck = localStorage.getItem('arion_utxos');
        const utxos = currentCheck ? JSON.parse(currentCheck) : [];
        utxos.push({
            amount: utxo.amount.toString(),
            blinding: utxo.blinding.toString(),
            privkey: utxo.keypair.privkey.toString(),
            index: utxo.index,
            mint: utxo.mintAddress
        });
        localStorage.setItem('arion_utxos', JSON.stringify(utxos));
    }
}

export const privacyService = new ArionPrivacyService();
