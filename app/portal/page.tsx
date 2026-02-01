"use client";

import Link from "next/link";
import { DownloadSimple, ArrowUpRight, ArrowDownLeft, Eye, EyeSlash, ShieldCheck, Info, Circle } from "@phosphor-icons/react";
import { useState } from "react";

const activities = [
    {
        id: 1,
        type: "received",
        title: "Payroll Received",
        date: "Today, 9:41 AM",
        amount: "hidden",
        status: "Completed",
    },
    {
        id: 2,
        type: "withdrawn",
        title: "Withdrawal",
        date: "Jan 15, 2:30 PM",
        amount: "- 15.0 SOL",
        status: "Processing",
    },
    {
        id: 3,
        type: "received",
        title: "Payroll Received",
        date: "Jan 01, 9:00 AM",
        amount: "hidden",
        status: "Completed",
    },
    {
        id: 4,
        type: "withdrawn",
        title: "Withdrawal",
        date: "Dec 28, 4:15 PM",
        amount: "- 50.0 SOL",
        status: "Completed",
    }
];

export default function EmployeePortalPage() {
    const [balanceVisible, setBalanceVisible] = useState(true);

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard</h1>
                    <p className="text-[#6B7280] dark:text-[#A1A1AA] text-sm mt-1">Welcome back, Jane!</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">System Operational</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Balance & Actions */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Balance Card */}
                    <div className="bg-gradient-to-br from-[#E8E4F3] to-[#D5CEE8] dark:from-[#2e2a44] dark:to-[#1f1d2c] rounded-2xl p-8 shadow-sm border border-[#D5CEE8] dark:border-[#3f3b52] relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-sm font-semibold tracking-wide text-gray-600 dark:text-gray-400 uppercase">Available to withdraw</p>
                                <button
                                    onClick={() => setBalanceVisible(!balanceVisible)}
                                    className="p-1.5 rounded-full bg-white/50 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-black/40 transition-colors text-gray-600 dark:text-gray-300"
                                >
                                    {balanceVisible ? <Eye size={16} /> : <EyeSlash size={16} />}
                                </button>
                            </div>
                            <div className="mb-8">
                                <h2 className="text-5xl font-bold text-gray-900 dark:text-white tracking-tight flex items-baseline gap-2">
                                    {balanceVisible ? "245.50" : "••••••"}
                                    <span className="text-2xl font-normal text-gray-600 dark:text-gray-400">SOL</span>
                                </h2>
                                <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
                                    {balanceVisible ? "≈ $35,482.12 USD" : "$••••••• USD"}
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <Link
                                    href="/portal/withdraw"
                                    className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-violet-500/20 transition-all flex items-center justify-center gap-2"
                                >
                                    <DownloadSimple size={20} weight="bold" />
                                    Withdraw Funds
                                </Link>
                                <button className="px-6 py-3 bg-white/60 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20 text-gray-900 dark:text-white font-medium rounded-xl transition-colors backdrop-blur-sm">
                                    View Details
                                </button>
                            </div>
                        </div>

                        {/* Decorative Background Elements */}
                        <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/20 dark:bg-violet-500/10 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    </div>

                    {/* Privacy Info Banner */}
                    <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 rounded-xl p-5 flex items-start gap-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-800/30 rounded-lg text-blue-600 dark:text-blue-400">
                            <ShieldCheck size={24} weight="fill" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-blue-900 dark:text-blue-100 text-sm">Privacy Protected</h3>
                            <p className="text-sm text-blue-700 dark:text-blue-300/80 mt-1 leading-relaxed">
                                Your exact salary is hidden from on-chain observers using zero-knowledge proofs. Only you can view the unmasked amount. <a href="#" className="underline hover:text-blue-800 dark:hover:text-blue-200">Learn more</a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Recent Activity */}
                <div className="bg-white dark:bg-[#18181b] border border-[#E8E8ED] dark:border-[#27272a] rounded-2xl shadow-sm h-fit">
                    <div className="p-5 border-b border-[#E8E8ED] dark:border-[#27272a] flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
                        <button className="text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300">View All</button>
                    </div>
                    <div className="p-2">
                        {activities.map((activity) => (
                            <div key={activity.id} className="group flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activity.type === 'received'
                                        ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                                        }`}>
                                        {activity.type === 'received'
                                            ? <ArrowDownLeft size={20} weight="bold" />
                                            : <ArrowUpRight size={20} weight="bold" />
                                        }
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{activity.title}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{activity.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center justify-end gap-1 mb-1">
                                        {activity.amount === 'hidden' ? (
                                            <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">
                                                <div className="w-8 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                                                <EyeSlash size={12} className="text-gray-400" />
                                            </div>
                                        ) : (
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">{activity.amount}</span>
                                        )}
                                    </div>
                                    <p className={`text-[10px] font-medium uppercase tracking-wider ${activity.status === 'Completed' ? 'text-green-600 dark:text-green-400' : 'text-orange-500 dark:text-orange-400'
                                        }`}>
                                        {activity.status}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-12 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 border-t border-[#E8E8ED] dark:border-[#27272a] pt-8">
                <div className="flex gap-6">
                    <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Support</a>
                    <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Security Guide</a>
                    <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </div>
    );
}
