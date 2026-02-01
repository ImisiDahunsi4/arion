"use client";

import { useCallback, useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { shadowService } from '@/lib/shadow-wire';

export function useShadowWire() {
    const { publicKey } = useWallet();
    const [isInitialized, setIsInitialized] = useState(false);
    const [balance, setBalance] = useState<number | null>(null);

    useEffect(() => {
        shadowService.initialize().then(() => setIsInitialized(true));
    }, []);

    const refreshBalance = useCallback(async () => {
        if (!publicKey) return;
        const bal = await shadowService.getBalance(publicKey.toBase58(), 'USD1'); // Default to USD1
        setBalance(bal);
    }, [publicKey]);

    useEffect(() => {
        if (isInitialized && publicKey) {
            refreshBalance();
        }
    }, [isInitialized, publicKey, refreshBalance]);

    return {
        isInitialized,
        balance,
        refreshBalance,
        client: shadowService.client
    };
}
