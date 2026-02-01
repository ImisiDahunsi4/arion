/**
 * Solana Utility Functions
 * Helpers for connection, PDA derivation, and transaction handling
 */

import { Connection, PublicKey } from '@solana/web3.js';

export const SOLANA_NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet';
export const RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com';

export const getConnection = () => new Connection(RPC_URL, 'confirmed');

export const shortenAddress = (address: string, chars = 4) => {
    return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};
