"use client";

import { useState } from "react";
import { ShieldCheck, Wallet, ArrowDown, ArrowUp, Lightning, Eye, EyeSlash, Copy, Question, CheckCircle, ArrowSquareOut, Info, LockSimple, Swap } from "@phosphor-icons/react";

export default function PrivacyPage() {
    const [privacyEnabled, setPrivacyEnabled] = useState(true);
    const [depositAmount, setDepositAmount] = useState("");
    const [showBalance, setShowBalance] = useState(true);

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Privacy Pool</h1>
                    <p className="text-[#6B7280] dark:text-[#A1A1AA] text-sm mt-1">Manage your shielded funds and configure privacy settings.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setPrivacyEnabled(!privacyEnabled)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm flex items-center gap-2 ${privacyEnabled
                                ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white border border-[#E8E8ED] dark:border-[#27272a]"
                            }`}
                    >
                        <ShieldCheck size={18} weight="fill" />
                        {privacyEnabled ? "Privacy Enabled" : "Privacy Disabled"}
                    </button>
                </div>
            </div>

            {/* Balance Card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-zinc-900 dark:to-zinc-800 rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <LockSimple size={20} weight="fill" />
                            <span className="text-sm text-gray-400">Shielded Balance</span>
                        </div>
                        <button onClick={() => setShowBalance(!showBalance)} className="text-gray-400 hover:text-white">
                            {showBalance ? <Eye size={20} /> : <EyeSlash size={20} />}
                        </button>
                    </div>
                    <h2 className="text-5xl font-bold mb-2 tracking-tight">
                        {showBalance ? "1,240.50" : "••••••"}
                        <span className="text-2xl ml-2 font-normal text-gray-400">SOL</span>
                    </h2>
                    <p className="text-gray-400 text-sm mb-8">{showBalance ? "≈ $164,231.02 USD" : "Balance hidden"}</p>
                    <div className="flex flex-wrap gap-3">
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                            <ArrowDown size={18} weight="bold" />
                            Deposit
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 border border-white/30 text-white rounded-full text-sm font-medium hover:bg-white/10 transition-colors">
                            <ArrowUp size={18} weight="bold" />
                            Withdraw
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 border border-white/30 text-white rounded-full text-sm font-medium hover:bg-white/10 transition-colors">
                            <Swap size={18} weight="bold" />
                            Transfer
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Deposit Panel */}
                <div className="bg-white dark:bg-[#18181b] border border-[#E8E8ED] dark:border-[#27272a] rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <ArrowDown size={20} className="text-green-500" />
                        Deposit to Pool
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm text-[#6B7280] dark:text-[#A1A1AA] block mb-2">Amount (SOL)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={depositAmount}
                                    onChange={(e) => setDepositAmount(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-[#E8E8ED] dark:border-[#27272a] rounded-lg text-lg font-mono focus:outline-none focus:ring-2 focus:ring-violet-500"
                                />
                                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-violet-600 dark:text-violet-400 hover:underline">
                                    MAX
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-[#6B7280] dark:text-[#A1A1AA]">Wallet Balance</span>
                            <span className="font-medium">520.00 SOL</span>
                        </div>
                        <button className="w-full py-3 bg-[#1A1A1A] dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                            <Lightning size={18} weight="fill" />
                            Shield Funds
                        </button>
                    </div>
                </div>

                {/* Privacy Info */}
                <div className="bg-white dark:bg-[#18181b] border border-[#E8E8ED] dark:border-[#27272a] rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Question size={20} />
                        How Privacy Works
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                            <div className="p-1.5 bg-violet-100 dark:bg-violet-900/30 rounded-md">
                                <ShieldCheck size={16} className="text-violet-600 dark:text-violet-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium mb-0.5">Zero-Knowledge Proofs</p>
                                <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA]">Mathematical verification without revealing transaction data.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                            <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-md">
                                <CheckCircle size={16} className="text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium mb-0.5">Privacy-Preserving Mixer</p>
                                <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA]">Transactions are batched to break on-chain traceability.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                            <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-md">
                                <LockSimple size={16} className="text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium mb-0.5">Amount Hiding</p>
                                <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA]">Salary amounts are encrypted on-chain but verifiable.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-[#18181b] border border-[#E8E8ED] dark:border-[#27272a] rounded-xl overflow-hidden">
                <div className="px-6 py-5 border-b border-[#E8E8ED] dark:border-[#27272a] flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Recent Pool Activity</h3>
                    <button className="text-sm text-[#6B7280] dark:text-[#A1A1AA] hover:text-[#1A1A1A] dark:hover:text-white">View All</button>
                </div>
                <div className="divide-y divide-[#E8E8ED] dark:divide-[#27272a]">
                    <div className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <ArrowDown size={18} className="text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Deposit</p>
                                <p className="text-xs text-gray-500">2 hours ago</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-green-600 dark:text-green-400">+ 100.00 SOL</p>
                            <p className="text-xs text-gray-500 flex items-center justify-end gap-1">
                                <span className="font-mono">8xH2...9Lp</span>
                                <ArrowSquareOut size={12} />
                            </p>
                        </div>
                    </div>
                    <div className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-violet-50 dark:bg-violet-900/20 rounded-lg">
                                <ShieldCheck size={18} className="text-violet-600 dark:text-violet-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Payroll (Private)</p>
                                <p className="text-xs text-gray-500">Yesterday</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-red-600 dark:text-red-400">- 448.20 SOL</p>
                            <p className="text-xs text-gray-500">45 recipients</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
