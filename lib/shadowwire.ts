import { ShadowWireDevnetClient } from './shadowwire-client';
import { TokenSymbol, TransferRequest } from '@radr/shadowwire';
import { WalletContextState } from '@solana/wallet-adapter-react';

class ShadowWireService {
    private client: ShadowWireDevnetClient | null = null;
    private isInit = false;

    constructor() {
        // Lazy init
    }

    isInitialized() {
        return this.isInit;
    }

    initialize(apiKey?: string) {
        if (this.client) return;

        this.client = new ShadowWireDevnetClient({
            apiKey, // Optional, can be undefined for public endpoints
            network: 'solana-devnet',
            debug: process.env.NODE_ENV === 'development'
        });
        this.isInit = true;
    }

    getClient() {
        if (!this.client) {
            this.initialize();
        }
        return this.client!;
    }

    async getBalance(wallet: string, token: TokenSymbol = 'USD1') {
        return this.getClient().getBalance(wallet, token);
    }

    async deposit(wallet: string, amount: number) {
        // Note: Deposit requires signing. The SDK creates unsigned tx.
        // The wrapper should probably return the response so the UI/Hook can sign it?
        // Or should we pass the wallet adapter here?
        // ShadowWire SDK deposit() returns unsigned tx.
        return this.getClient().deposit({
            wallet,
            amount
        });
    }

    async transfer(
        sender: string,
        recipient: string,
        amount: number,
        token: TokenSymbol = 'USD1',
        wallet?: any, // Wallet adapter
        isInternal: boolean = true
    ) {
        // IMPORTANT: wallet adapter must have signMessage
        return this.getClient().transfer({
            sender,
            recipient,
            amount,
            token,
            type: isInternal ? 'internal' : 'external',
            wallet
        });
    }
}

export const shadowWireService = new ShadowWireService();
