"use client";

import { usePrivacyCash } from "@/hooks/use-privacy-cash";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export function PrivacyTest() {
    const { publicKey } = useWallet();
    const { isInitialized, isLoading, balance, error, initialize, deposit, withdraw, refreshBalance } = usePrivacyCash();

    if (!publicKey) {
        return (
            <div className="p-6 border rounded-lg bg-gray-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <h2 className="text-xl font-bold mb-4">Privacy Cash Test</h2>
                <p className="mb-4 text-gray-600 dark:text-gray-400">Connect your wallet to start testing privacy features.</p>
                <div className="flex justify-center">
                    <WalletMultiButton />
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 border rounded-lg bg-gray-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Privacy Cash System</h2>
                <div className="text-sm px-2 py-1 rounded bg-zinc-200 dark:bg-zinc-800">
                    Status: <span className={isInitialized ? "text-green-500 font-bold" : "text-yellow-500"}>
                        {isInitialized ? "Active" : "Not Initialized"}
                    </span>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-md text-sm">
                    <strong>Error:</strong> {error}
                </div>
            )}

            {!isInitialized ? (
                <button
                    onClick={() => initialize()}
                    disabled={isLoading}
                    className="w-full py-3 px-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-lg disabled:opacity-50 hover:opacity-90 transition-opacity"
                >
                    {isLoading ? "Initializing..." : "Initialize Privacy System"}
                </button>
            ) : (
                <div className="space-y-6">
                    <div className="p-4 bg-white dark:bg-black rounded-lg border border-zinc-200 dark:border-zinc-800">
                        <h3 className="text-sm text-gray-500 uppercase font-bold mb-1">Private Balance</h3>
                        <div className="text-3xl font-mono font-bold tracking-tighter">
                            {balance !== null ? (balance / 1_000_000_000).toFixed(4) : "---"} <span className="text-lg text-gray-400">SOL</span>
                        </div>
                        <button
                            onClick={refreshBalance}
                            className="text-xs text-blue-500 mt-2 hover:underline"
                        >
                            Refresh Balance
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Internal Deposit</label>
                            <button
                                onClick={() => deposit(0.1)}
                                disabled={isLoading}
                                className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md disabled:opacity-50 hover:bg-blue-700 transition"
                            >
                                {isLoading ? "Processing..." : "Deposit 0.1 SOL"}
                            </button>
                            <p className="text-xs text-gray-500">
                                Converts public SOL to private ZK-UTXO.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Withdraw to Wallet</label>
                            <button
                                onClick={() => withdraw(0.05)}
                                disabled={isLoading}
                                className="w-full py-2 px-4 bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white font-bold rounded-md disabled:opacity-50 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition"
                            >
                                {isLoading ? "Processing..." : "Withdraw 0.05 SOL"}
                            </button>
                            <p className="text-xs text-gray-500">
                                Withdraws private UTXO back to your wallet.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
