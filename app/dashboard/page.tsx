"use client";

import Link from "next/link";
import { Wallet, UsersThree, CalendarBlank, TrendUp, ArrowRight, DotsThreeVertical, ArrowSquareOut, PlayCircle, UserPlus } from "@phosphor-icons/react";

const recentPayrolls = [
    { id: 1, date: "Jan 15, 2026", txId: "8xH2...9Lp", amount: "448.2 SOL", recipients: 45, status: "Completed" },
    { id: 2, date: "Jan 01, 2026", txId: "3fK9...m2Q", amount: "452.1 SOL", recipients: 46, status: "Completed" },
    { id: 3, date: "Dec 15, 2025", txId: "9lP2...x7Y", amount: "430.5 SOL", recipients: 42, status: "Completed" },
    { id: 4, date: "Dec 01, 2025", txId: "7kM4...j8N", amount: "410.0 SOL", recipients: 40, status: "Archived" },
];

export default function DashboardOverview() {
    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard Overview</h1>
                    <p className="text-[#6B7280] dark:text-[#A1A1AA] text-sm mt-1">Welcome back, here's what's happening with your payroll today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/dashboard/employees/add" className="px-4 py-2 bg-white dark:bg-transparent border border-[#E8E8ED] dark:border-[#27272a] text-gray-700 dark:text-white rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors shadow-sm flex items-center gap-2">
                        <UserPlus size={18} />
                        Add Employee
                    </Link>
                    <Link href="/dashboard/payroll/run" className="px-4 py-2 bg-[#1A1A1A] dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:opacity-90 transition-opacity shadow-sm flex items-center gap-2">
                        <PlayCircle size={18} weight="fill" />
                        Run Payroll
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Privacy Pool Balance */}
                <div className="bg-white dark:bg-[#18181b] border border-[#E8E8ED] dark:border-[#27272a] rounded-xl p-6 shadow-sm transition-colors duration-200 relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm font-medium text-[#6B7280] dark:text-[#A1A1AA]">Privacy Pool Balance</p>
                            <h3 className="text-3xl font-bold mt-2 tracking-tight">1,240.50 <span className="text-lg text-gray-500 font-normal">SOL</span></h3>
                        </div>
                        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                            <Wallet size={24} className="text-indigo-600 dark:text-indigo-400" weight="fill" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA]">≈ $164,231.02 USD</p>
                        <Link href="/dashboard/privacy" className="text-sm font-medium text-[#1A1A1A] dark:text-white hover:underline flex items-center gap-1">
                            Deposit
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-colors"></div>
                </div>

                {/* Total Employees */}
                <div className="bg-white dark:bg-[#18181b] border border-[#E8E8ED] dark:border-[#27272a] rounded-xl p-6 shadow-sm transition-colors duration-200">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm font-medium text-[#6B7280] dark:text-[#A1A1AA]">Total Employees</p>
                            <h3 className="text-3xl font-bold mt-2 tracking-tight">48</h3>
                        </div>
                        <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
                            <UsersThree size={24} className="text-green-600 dark:text-green-400" weight="fill" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs font-medium">
                            <TrendUp size={14} />
                            +12%
                        </span>
                        <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA]">vs last month</p>
                    </div>
                </div>

                {/* Upcoming Payroll */}
                <div className="bg-white dark:bg-[#18181b] border border-[#E8E8ED] dark:border-[#27272a] rounded-xl p-6 shadow-sm transition-colors duration-200">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm font-medium text-[#6B7280] dark:text-[#A1A1AA]">Upcoming Payroll</p>
                            <h3 className="text-3xl font-bold mt-2 tracking-tight">Jan 31</h3>
                        </div>
                        <div className="p-2 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                            <CalendarBlank size={24} className="text-orange-600 dark:text-orange-400" weight="fill" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-sm text-[#6B7280] dark:text-[#A1A1AA]">Est. 450 SOL</p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300 text-xs font-medium">
                            5 Days Left
                        </span>
                    </div>
                </div>
            </div>

            {/* Recent Payroll History */}
            <div className="bg-white dark:bg-[#18181b] border border-[#E8E8ED] dark:border-[#27272a] rounded-xl shadow-sm overflow-hidden transition-colors duration-200">
                <div className="px-6 py-5 border-b border-[#E8E8ED] dark:border-[#27272a] flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Recent Payroll History</h3>
                    <Link href="/dashboard/payroll/history" className="text-sm text-[#6B7280] dark:text-[#A1A1AA] hover:text-[#1A1A1A] dark:hover:text-white transition-colors">View All</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-white/5 border-b border-[#E8E8ED] dark:border-[#27272a]">
                                <th className="px-6 py-3 text-xs font-semibold text-[#6B7280] dark:text-[#A1A1AA] uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-xs font-semibold text-[#6B7280] dark:text-[#A1A1AA] uppercase tracking-wider">Transaction ID</th>
                                <th className="px-6 py-3 text-xs font-semibold text-[#6B7280] dark:text-[#A1A1AA] uppercase tracking-wider">Total Amount</th>
                                <th className="px-6 py-3 text-xs font-semibold text-[#6B7280] dark:text-[#A1A1AA] uppercase tracking-wider">Recipients</th>
                                <th className="px-6 py-3 text-xs font-semibold text-[#6B7280] dark:text-[#A1A1AA] uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-xs font-semibold text-[#6B7280] dark:text-[#A1A1AA] uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E8E8ED] dark:divide-[#27272a]">
                            {recentPayrolls.map((payroll) => (
                                <tr key={payroll.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{payroll.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-mono text-gray-500 dark:text-gray-400">{payroll.txId}</span>
                                            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                                <ArrowSquareOut size={14} />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{payroll.amount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex -space-x-2 overflow-hidden">
                                            <div className="h-6 w-6 rounded-full ring-2 ring-white dark:ring-[#18181b] bg-violet-200 dark:bg-violet-800"></div>
                                            <div className="h-6 w-6 rounded-full ring-2 ring-white dark:ring-[#18181b] bg-indigo-200 dark:bg-indigo-800"></div>
                                            <div className="h-6 w-6 rounded-full ring-2 ring-white dark:ring-[#18181b] bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-[10px] font-medium text-gray-600 dark:text-gray-300">+{payroll.recipients}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${payroll.status === "Completed"
                                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                            : "bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300"
                                            }`}>
                                            {payroll.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-gray-400 hover:text-[#1A1A1A] dark:hover:text-white">
                                            <DotsThreeVertical size={20} weight="bold" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
