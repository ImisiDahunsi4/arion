"use client";

import { useState } from "react";
import { ArrowLeft, Wallet, Info, CheckCircle, Warning, CircleNotch } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function WithdrawPage() {
    const router = useRouter();
    const [amount, setAmount] = useState("");
    const [address, setAddress] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [step, setStep] = useState<"input" | "confirm" | "success">("input");

    const maxBalance = 245.50; // Mock balance
    const feePercentage = 0.0035; // 0.35%

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    };

    const handleMaxClick = () => {
        setAmount(maxBalance.toString());
    };

    const handleWithdraw = () => {
        setStep("confirm");
    };

    const confirmWithdrawal = () => {
        setIsProcessing(true);
        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            setStep("success");
        }, 2000);
    };

    const estimatedFee = amount ? (parseFloat(amount) * feePercentage).toFixed(4) : "0.0000";
    const totalDeduction = amount ? (parseFloat(amount) + parseFloat(estimatedFee)).toFixed(4) : "0.0000";

    return (
        <div className="max-w-2xl mx-auto">
            {step !== "success" && (
                <div className="mb-6">
                    <Link href="/portal" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center gap-2 transition-colors">
                        <ArrowLeft size={16} />
                        Back to Dashboard
                    </Link>
                </div>
            )}

            <div className="bg-white dark:bg-[#18181b] rounded-3xl shadow-sm border border-[#E8E8ED] dark:border-[#27272a] overflow-hidden">
                {step === "input" && (
                    <div className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/20 rounded-xl flex items-center justify-center text-violet-600 dark:text-violet-400">
                                <Wallet size={24} weight="fill" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Withdraw Funds</h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Transfer funds privately to your wallet.</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Amount Input */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Amount to withdraw</label>
                                    <span className="text-xs text-gray-500">Available: <span className="font-medium text-gray-900 dark:text-white">{maxBalance} SOL</span></span>
                                </div>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="0.00"
                                        className="w-full text-3xl font-bold bg-transparent border-b-2 border-gray-200 dark:border-gray-700 py-2 pr-16 focus:outline-none focus:border-violet-600 transition-colors placeholder-gray-300 dark:placeholder-gray-700 text-gray-900 dark:text-white"
                                    />
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-500">SOL</span>
                                        <button
                                            onClick={handleMaxClick}
                                            className="text-xs font-bold text-violet-600 hover:text-violet-700 bg-violet-50 dark:bg-violet-900/20 px-2 py-1 rounded-md transition-colors"
                                        >
                                            MAX
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Recipient Address */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Recipient Wallet Address</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Enter Solana address"
                                    className="w-full p-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all font-mono"
                                />
                                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                    <Info size={14} />
                                    Ensure this is a Solana (SPL) wallet address.
                                </p>
                            </div>

                            {/* Fee & Summary */}
                            <div className="bg-gray-50 dark:bg-black/20 rounded-xl p-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Network Fee estimate</span>
                                    <span className="font-medium text-gray-900 dark:text-white">~0.00005 SOL</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Privacy Protocol Fee (0.35%)</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{estimatedFee} SOL</span>
                                </div>
                                <div className="border-t border-gray-200 dark:border-gray-700 my-2 pt-2 flex justify-between text-base font-bold">
                                    <span className="text-gray-900 dark:text-white">Total Deduction</span>
                                    <span className="text-gray-900 dark:text-white">{totalDeduction} SOL</span>
                                </div>
                            </div>

                            <button
                                onClick={handleWithdraw}
                                disabled={!amount || !address || parseFloat(amount) <= 0 || parseFloat(amount) > maxBalance}
                                className="w-full py-3.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-lg shadow-violet-500/20 transition-all"
                            >
                                Review Withdrawal
                            </button>
                        </div>
                    </div>
                )}

                {step === "confirm" && (
                    <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-yellow-50 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-600 dark:text-yellow-400">
                            <Warning size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Confirm Withdrawal</h2>
                        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                            You are about to withdraw <span className="font-bold text-gray-900 dark:text-white">{amount} SOL</span> to the following address:
                        </p>

                        <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-[#27272a] mb-8 break-all font-mono text-sm text-gray-600 dark:text-gray-300">
                            {address}
                        </div>

                        <div className="bg-violet-50 dark:bg-violet-900/10 border border-violet-100 dark:border-violet-800/30 rounded-lg p-3 text-left mb-8 flex gap-3">
                            <div className="shrink-0 mt-0.5">
                                <Info size={18} className="text-violet-600 dark:text-violet-400" />
                            </div>
                            <p className="text-xs text-violet-700 dark:text-violet-300">
                                This transaction uses Zero-Knowledge proofs to break the on-chain link between your payroll source and this destination wallet.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setStep("input")}
                                className="flex-1 py-3 bg-white dark:bg-[#27272a] hover:bg-gray-50 dark:hover:bg-[#3f3f46] text-gray-700 dark:text-gray-200 font-bold rounded-xl border border-gray-200 dark:border-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmWithdrawal}
                                disabled={isProcessing}
                                className="flex-1 py-3 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl shadow-lg shadow-violet-500/20 transition-all flex items-center justify-center gap-2"
                            >
                                {isProcessing ? (
                                    <>
                                        <CircleNotch size={20} className="animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    "Confirm & Send"
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {step === "success" && (
                    <div className="p-12 text-center">
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
                            <CheckCircle size={40} weight="fill" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Withdrawal Initiated</h2>
                        <p className="text-gray-500 mb-8">
                            Your funds are on the way. The zero-knowledge proof generation and verification may take a few moments.
                        </p>

                        <div className="flex flex-col gap-3">
                            <Link
                                href="/portal"
                                className="w-full py-3.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold shadow-lg shadow-violet-500/20 transition-all"
                            >
                                Return to Dashboard
                            </Link>
                            <a
                                href="#"
                                className="w-full py-3.5 text-violet-600 dark:text-violet-400 font-semibold hover:bg-violet-50 dark:hover:bg-violet-900/10 rounded-xl transition-colors"
                            >
                                View Transaction on Solana FM
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
