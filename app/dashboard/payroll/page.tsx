"use client";

import { useState } from "react";
import { Wallet, Lightning, PlayCircle, Calendar, Clock, Receipt, ArrowsDownUp, ShieldCheck, ArrowSquareOut, CaretDown, Info } from "@phosphor-icons/react";
import Link from "next/link";

export default function PayrollPage() {
    const [privacyMode, setPrivacyMode] = useState(true);

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Payroll</h1>
                    <p className="text-[#6B7280] dark:text-[#A1A1AA] text-sm mt-1">Configure and run payroll with private or public transactions.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setPrivacyMode(!privacyMode)}
                        className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2 ${privacyMode
                            ? "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800"
                            : "bg-white dark:bg-transparent text-gray-700 dark:text-white border-[#E8E8ED] dark:border-[#27272a]"
                            }`}
                    >
                        <ShieldCheck size={18} weight={privacyMode ? "fill" : "regular"} />
                        {privacyMode ? "Privacy On" : "Privacy Off"}
                    </button>
                    <Link href="/dashboard/payroll/new" className="px-4 py-2 bg-[#1A1A1A] dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:opacity-90 transition-opacity shadow-sm flex items-center gap-2">
                        <PlayCircle size={18} weight="fill" />
                        Run Payroll
                    </Link>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white dark:bg-[#18181b] border border-[#E8E8ED] dark:border-[#27272a] rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <Wallet size={20} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-sm text-[#6B7280] dark:text-[#A1A1AA]">Available Balance</span>
                    </div>
                    <p className="text-2xl font-bold">1,240.50 SOL</p>
                </div>
                <div className="bg-white dark:bg-[#18181b] border border-[#E8E8ED] dark:border-[#27272a] rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <Lightning size={20} className="text-green-600 dark:text-green-400" weight="fill" />
                        </div>
                        <span className="text-sm text-[#6B7280] dark:text-[#A1A1AA]">Monthly Outflow</span>
                    </div>
                    <p className="text-2xl font-bold">890 SOL</p>
                </div>
                <div className="bg-white dark:bg-[#18181b] border border-[#E8E8ED] dark:border-[#27272a] rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                            <Calendar size={20} className="text-orange-600 dark:text-orange-400" />
                        </div>
                        <span className="text-sm text-[#6B7280] dark:text-[#A1A1AA]">Next Payroll</span>
                    </div>
                    <p className="text-2xl font-bold">Jan 31</p>
                </div>
                <div className="bg-white dark:bg-[#18181b] border border-[#E8E8ED] dark:border-[#27272a] rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                            <Receipt size={20} className="text-purple-600 dark:text-purple-400" />
                        </div>
                        <span className="text-sm text-[#6B7280] dark:text-[#A1A1AA]">Total Paid YTD</span>
                    </div>
                    <p className="text-2xl font-bold">5,320 SOL</p>
                </div>
            </div>

            {/* Payroll Configuration */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white dark:bg-[#18181b] border border-[#E8E8ED] dark:border-[#27272a] rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Clock size={20} />
                        Payroll Schedule
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-[#6B7280] dark:text-[#A1A1AA]">Frequency</span>
                            <button className="flex items-center gap-1 text-sm font-medium">
                                Bi-weekly
                                <CaretDown size={14} />
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-[#6B7280] dark:text-[#A1A1AA]">Pay Day</span>
                            <button className="flex items-center gap-1 text-sm font-medium">
                                15th & Last day
                                <CaretDown size={14} />
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-[#6B7280] dark:text-[#A1A1AA]">Auto-run</span>
                            <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none bg-green-500">
                                <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#18181b] border border-[#E8E8ED] dark:border-[#27272a] rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <ArrowsDownUp size={20} />
                        Payment Distribution
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-[#6B7280] dark:text-[#A1A1AA]">Default Currency</span>
                            <button className="flex items-center gap-1 text-sm font-medium">
                                SOL
                                <CaretDown size={14} />
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-[#6B7280] dark:text-[#A1A1AA]">Fee Payer</span>
                            <button className="flex items-center gap-1 text-sm font-medium">
                                Company
                                <CaretDown size={14} />
                            </button>
                        </div>
                        <div className="p-3 bg-violet-50 dark:bg-violet-900/10 rounded-lg flex items-start gap-2">
                            <Info size={16} className="text-violet-600 dark:text-violet-400 mt-0.5 shrink-0" />
                            <p className="text-xs text-violet-700 dark:text-violet-300">
                                With Privacy Mode enabled, payroll transactions are processed through our ZK mixer for complete anonymity.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pending Payroll */}
            <div className="bg-white dark:bg-[#18181b] border border-[#E8E8ED] dark:border-[#27272a] rounded-xl overflow-hidden">
                <div className="px-6 py-5 border-b border-[#E8E8ED] dark:border-[#27272a] flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Upcoming Payroll - Jan 31, 2026</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 text-xs font-medium">Pending Approval</span>
                </div>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <p className="text-3xl font-bold">450.00 SOL</p>
                            <p className="text-sm text-[#6B7280] dark:text-[#A1A1AA]">48 recipients</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-4 py-2 border border-[#E8E8ED] dark:border-[#27272a] rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/5">
                                Edit Amounts
                            </button>
                            <button className="px-4 py-2 bg-[#1A1A1A] dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:opacity-90">
                                Approve & Schedule
                            </button>
                        </div>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"></div>
                    </div>
                    <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA] mt-2">75% of available balance</p>
                </div>
            </div>
        </div>
    );
}
