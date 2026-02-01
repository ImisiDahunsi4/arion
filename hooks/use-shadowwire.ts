"use client";

import { useState, useCallback, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { shadowWireService } from '@/lib/shadowwire';
import { TokenSymbol } from '@radr/shadowwire';
import { Transaction, VersionedTransaction } from '@solana/web3.js';
import { Buffer } from 'buffer';

export function useShadowWire() {
    const { connection } = useConnection();
    const { publicKey, signMessage, signTransaction, sendTransaction } = useWallet();
    const [balance, setBalance] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const refreshBalance = useCallback(async () => {
        if (!publicKey) return;
        try {
            const res = await shadowWireService.getBalance(publicKey.toBase58(), 'USD1');
            // res.available is the escrow balance
            // res.deposited is total deposited?
            setBalance(res.available);
        } catch (e: any) {
            console.error("Failed to fetch balance:", e);
            // Don't set error on balance fetch to avoid annoying UI, just log
        }
    }, [publicKey]);

    useEffect(() => {
        if (publicKey) {
            refreshBalance();
        }
    }, [publicKey, refreshBalance]);

    const deposit = async (amount: number) => {
        if (!publicKey || !signTransaction) throw new Error("Wallet not connected");
        setIsLoading(true);
        setError(null);
        try {
            const res = await shadowWireService.deposit(publicKey.toBase58(), amount);

            if (!res.unsigned_tx_base64) {
                throw new Error("No transaction returned from deposit request");
            }

            // buffer decode
            const txBuffer = Buffer.from(res.unsigned_tx_base64, 'base64');

            // Fetch latest blockhash for confirmation strategy
            const latestBlockhash = await connection.getLatestBlockhash();

            // Try parsing as VersionedTransaction first (likely for newer Solana programs)
            let signature: string;
            try {
                const tx = VersionedTransaction.deserialize(txBuffer);
                signature = await sendTransaction(tx, connection);
            } catch (e) {
                // Fallback to legacy
                const tx = Transaction.from(txBuffer);
                signature = await sendTransaction(tx, connection);
            }

            await connection.confirmTransaction({
                signature,
                blockhash: latestBlockhash.blockhash,
                lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
            }, 'confirmed');

            await refreshBalance();
            return signature;

        } catch (e: any) {
            console.error("Deposit failed:", e);
            setError(e.message || "Deposit failed");
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    const withdraw = async (amount: number) => {
        if (!publicKey) throw new Error("Wallet not connected");
        setIsLoading(true);
        setError(null);
        try {
            const res = await shadowWireService.getClient().withdraw({
                wallet: publicKey.toBase58(),
                amount
            });

            if (!res.unsigned_tx_base64) {
                throw new Error("No transaction returned from withdraw request");
            }

            const txBuffer = Buffer.from(res.unsigned_tx_base64, 'base64');
            const latestBlockhash = await connection.getLatestBlockhash();

            let signature: string;
            try {
                const tx = VersionedTransaction.deserialize(txBuffer);
                signature = await sendTransaction(tx, connection);
            } catch (e) {
                const tx = Transaction.from(txBuffer);
                signature = await sendTransaction(tx, connection);
            }

            await connection.confirmTransaction({
                signature,
                blockhash: latestBlockhash.blockhash,
                lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
            }, 'confirmed');

            await refreshBalance();
            return signature;
        } catch (e: any) {
            console.error("Withdraw failed:", e);
            setError(e.message || "Withdraw failed");
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    const transfer = async (recipient: string, amount: number) => {
        if (!publicKey || !signMessage) throw new Error("Wallet not connected or does not support signMessage");
        setIsLoading(true);
        setError(null);
        try {
            // We pass the wallet adapter object which has signMessage
            // But shadowWireService.transfer expects 'wallet' which matches WalletAdapter interface { signMessage }
            // useWallet() returns a context which includes signMessage

            const result = await shadowWireService.transfer(
                publicKey.toBase58(),
                recipient,
                amount,
                'USD1',
                { signMessage } // Pass wrapper matching interface
            );

            if (!result.success) {
                throw new Error("Transfer failed (check console logs)");
            }

            await refreshBalance();
            return result.tx_signature;
        } catch (e: any) {
            console.error("Transfer failed:", e);
            setError(e.message || "Transfer failed");
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        balance,
        deposit,
        withdraw,
        transfer,
        refreshBalance,
        isLoading,
        error
    };
}
