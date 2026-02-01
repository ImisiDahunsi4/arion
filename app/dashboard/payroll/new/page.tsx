"use client";

import { useState } from "react";
import { ArrowLeft, ShieldCheck, FunnelSimple, Export, Lock, CheckCircle, Warning, ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock data based on the mockup
const mockEmployees = [
    { id: 1, name: "Jane Doe", role: "Product Lead", address: "8xzt...9Lq2", dept: "Engineering", amount: 4.5, active: true },
    { id: 2, name: "Alex Smith", role: "Senior Dev", address: "4k2m...8Up1", dept: "Engineering", amount: 3.2, active: true },
    { id: 3, name: "Michael Ross", role: "Marketing", address: "9bQX...2Wz7", dept: "Marketing", amount: 2.8, active: true },
    { id: 4, name: "Emma Lee", role: "Contractor", address: "1xPz...9Lm0", dept: "Design", amount: 1.5, active: false },
    { id: 5, name: "Sarah Connor", role: "QA Lead", address: "2k3m...1Op9", dept: "Engineering", amount: 3.0, active: true },
    { id: 6, name: "John Wick", role: "Security", address: "5l4n...2Kq8", dept: "Operations", amount: 5.0, active: true },
];

export default function NewPayrollPage() {
    const router = useRouter();
    const [selectedEmployees, setSelectedEmployees] = useState<number[]>([1, 2, 3, 5, 6]);
    const [privacyActive, setPrivacyActive] = useState(true);

    const toggleEmployee = (id: number) => {
        setSelectedEmployees(prev =>
            prev.includes(id) ? prev.filter(eid => eid !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selectedEmployees.length === mockEmployees.length) {
            setSelectedEmployees([]);
        } else {
            setSelectedEmployees(mockEmployees.map(e => e.id));
        }
    };

    const totalSOL = selectedEmployees.reduce((sum, id) => {
        const emp = mockEmployees.find(e => e.id === id);
        return sum + (emp?.amount || 0);
    }, 0);

    const handleExecute = () => {
        router.push("/dashboard/payroll/run");
    };

    return (
        <div className="max-w-6xl mx-auto pb-32">
            {/* Header */}
            <div className="mb-8">
                <Link href="/dashboard/payroll" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors">
                    <ArrowLeft size={16} />
                    Back to Payroll
                </Link>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Execute Payroll Run</h1>
                        <p className="text-gray-500 dark:text-gray-400">Review and execute your batch payments. Employee salary data is encrypted locally using ZK proofs to ensure privacy on-chain.</p>
                    </div>
                </div>
            </div>

            {/* Privacy Warning Banner */}
            <div className={`mb-8 p-5 rounded-xl border flex items-start gap-4 ${privacyActive
                    ? "bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-800/30"
                    : "bg-gray-50 dark:bg-gray-900/10 border-gray-200 dark:border-gray-800"
                }`}>
                <div className={`mt-1 ${privacyActive ? "text-orange-500" : "text-gray-400"}`}>
                    <ShieldCheck size={24} weight="fill" />
                </div>
                <div>
                    <h3 className={`font-bold mb-1 ${privacyActive ? "text-orange-800 dark:text-orange-200" : "text-gray-700 dark:text-gray-300"}`}>
                        {privacyActive ? "Zero-Knowledge Privacy Active" : "Privacy Mode Disabled"}
                    </h3>
                    <p className={`text-sm ${privacyActive ? "text-orange-700 dark:text-orange-300/80" : "text-gray-500"}`}>
                        {privacyActive
                            ? "Individual salary amounts are hidden from public view via Zero-Knowledge proofs. Only the total batch amount and validity proof will be visible on the blockchain."
                            : "Amounts will be visible on-chain. Enable privacy to protect sensitive salary data."}
                    </p>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white dark:bg-[#18181b] p-4 rounded-xl border border-[#E8E8ED] dark:border-[#27272a] shadow-sm mb-6 flex justify-between items-center">
                <div className="relative w-72">
                    <input
                        type="text"
                        placeholder="Search employees..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-[#27272a] rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors">
                        <FunnelSimple size={16} />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors">
                        <Export size={16} />
                        Export
                    </button>
                </div>
            </div>

            {/* Employee Table */}
            <div className="bg-white dark:bg-[#18181b] rounded-xl border border-[#E8E8ED] dark:border-[#27272a] shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-[#202022] border-b border-[#E8E8ED] dark:border-[#27272a]">
                        <tr>
                            <th className="px-6 py-4 w-16">
                                <button
                                    onClick={toggleAll}
                                    className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedEmployees.length === mockEmployees.length
                                            ? "bg-violet-600 border-violet-600 text-white"
                                            : "border-gray-300 dark:border-gray-600"
                                        }`}
                                >
                                    {selectedEmployees.length === mockEmployees.length && <CheckCircle weight="fill" size={14} />}
                                </button>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Employee</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Wallet Address</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Department</th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Amount (SOL)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8E8ED] dark:divide-[#27272a]">
                        {mockEmployees.map((employee) => {
                            const isSelected = selectedEmployees.includes(employee.id);
                            return (
                                <tr key={employee.id} className={`transition-colors ${isSelected ? "bg-violet-50/30 dark:bg-violet-900/5" : "hover:bg-gray-50 dark:hover:bg-white/[0.02]"}`}>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => toggleEmployee(employee.id)}
                                            className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected
                                                    ? "bg-violet-600 border-violet-600 text-white"
                                                    : "border-gray-300 dark:border-gray-600 hover:border-violet-500"
                                                }`}
                                        >
                                            {isSelected && <CheckCircle weight="fill" size={14} />}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300">
                                                {employee.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white">{employee.name}</p>
                                                <p className="text-xs text-gray-500">{employee.role}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 group">
                                            <code className="text-xs font-mono bg-gray-100 dark:bg-white/10 px-2 py-1 rounded text-gray-600 dark:text-gray-300 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/20 transition-colors">
                                                {employee.address}
                                            </code>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                                            {employee.dept}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {privacyActive ? (
                                            <div className="flex items-center justify-end gap-2 text-gray-400">
                                                <div className="h-2 w-16 bg-gray-200 dark:bg-gray-700 rounded-full blur-[2px]"></div>
                                                <Lock size={14} />
                                            </div>
                                        ) : (
                                            <span className="font-mono font-medium text-gray-900 dark:text-white">{employee.amount.toFixed(4)}</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot className="bg-gray-50 dark:bg-[#202022] border-t border-[#E8E8ED] dark:border-[#27272a]">
                        <tr>
                            <td colSpan={5} className="px-6 py-3 text-xs text-gray-500 flex justify-between items-center">
                                <span>Showing {mockEmployees.length} employees</span>
                                <div className="flex gap-2">
                                    <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white">Previous</button>
                                    <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white">Next</button>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            {/* Sticky Actions Footer */}
            <div className="fixed bottom-0 left-0 lg:left-64 right-0 bg-white dark:bg-[#18181b] border-t border-[#E8E8ED] dark:border-[#27272a] p-4 lg:px-8 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-20">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-8 w-full sm:w-auto">
                        <div className="border-r border-gray-200 dark:border-gray-700 pr-8">
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Selected</p>
                            <p className="text-xl font-bold text-gray-900 dark:text-white flex items-baseline gap-1">
                                {selectedEmployees.length} <span className="text-sm font-normal text-gray-500">employees</span>
                            </p>
                        </div>
                        <div className="border-r border-gray-200 dark:border-gray-700 pr-8">
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Total Payroll</p>
                            <p className="text-xl font-bold text-gray-900 dark:text-white flex items-baseline gap-1">
                                {totalSOL.toFixed(2)} <span className="text-sm font-normal text-gray-500">SOL</span>
                            </p>
                        </div>
                        <div className="hidden md:block">
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Network Fee</p>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">~0.0005 SOL</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button className="px-6 py-3 bg-white dark:bg-[#27272a] hover:bg-gray-50 dark:hover:bg-[#3f3f46] text-gray-900 dark:text-white font-bold rounded-full border border-gray-200 dark:border-gray-700 transition-colors">
                            Schedule
                        </button>
                        <button
                            onClick={handleExecute}
                            disabled={selectedEmployees.length === 0}
                            className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold rounded-full shadow-lg shadow-pink-500/20 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Execute Payroll
                            <ArrowRight size={18} weight="bold" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
