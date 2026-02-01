"use client";

import { useCallback, useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { privacyService } from '@/lib/privacy-cash';

interface PrivacyCashState {
    isInitialized: boolean;
    isLoading: boolean;
    balance: number | null;
    error: string | null;
}

export function usePrivacyCash() {
    const wallet = useWallet();
    const [state, setState] = useState<PrivacyCashState>({
        isInitialized: false,
        isLoading: false,
        balance: null,
        error: null
    });

    const refreshBalance = useCallback(async () => {
        if (!privacyService.isInitialized()) return;

        try {
            const balanceData = await privacyService.getBalance();
            setState(prev => ({ ...prev, balance: balanceData.lamports }));
        } catch (err: any) {
            console.error('Failed to fetch balance', err);
        }
    }, []);

    // Effect to check if already initialized
    useEffect(() => {
        if (privacyService.isInitialized()) {
            setState(prev => ({ ...prev, isInitialized: true }));
            refreshBalance();
        }
    }, [refreshBalance]);

    const initialize = useCallback(async () => {
        if (!wallet.connected || !wallet.publicKey) {
            setState(prev => ({ ...prev, error: 'Wallet not connected' }));
            return;
        }

        setState(prev => ({ ...prev, isLoading: true, error: null }));

        try {
            await privacyService.initialize(wallet);
            setState(prev => ({ ...prev, isInitialized: true, isLoading: false }));
            refreshBalance();
        } catch (err: any) {
            console.error(err);
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: err.message || 'Failed to initialize'
            }));
        }
    }, [wallet, refreshBalance]);

    const deposit = useCallback(async (amountSol: number) => {
        if (!privacyService.isInitialized()) {
            throw new Error("Service not initialized");
        }

        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const lamports = Math.floor(amountSol * 1_000_000_000);
            const result = await privacyService.deposit(lamports);

            // Wait a bit for local state updates?
            await refreshBalance();
            setState(prev => ({ ...prev, isLoading: false }));
            return result;
        } catch (err: any) {
            setState(prev => ({ ...prev, isLoading: false, error: err.message }));
            throw err;
        }
    }, [refreshBalance]);

    const withdraw = useCallback(async (amountSol: number, recipient?: string) => {
        if (!privacyService.isInitialized()) {
            throw new Error("Service not initialized");
        }

        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const lamports = Math.floor(amountSol * 1_000_000_000);
            const result = await privacyService.withdraw(lamports, recipient || wallet.publicKey?.toBase58() || "");
            await refreshBalance();
            setState(prev => ({ ...prev, isLoading: false }));
            return result;
        } catch (err: any) {
            setState(prev => ({ ...prev, isLoading: false, error: err.message }));
            throw err;
        }
    }, [wallet.publicKey, refreshBalance]);

    return {
        ...state,
        initialize,
        refreshBalance,
        deposit,
        withdraw
    };
}
