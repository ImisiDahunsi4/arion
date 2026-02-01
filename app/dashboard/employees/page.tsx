"use client";

import { useState } from "react";
import { UserPlus, MagnifyingGlass, Download, Upload, DotsThreeVertical, EnvelopeSimple, PencilSimple, Trash, Eye, EyeSlash, CaretDown, Copy } from "@phosphor-icons/react";

const employees = [
    { id: 1, name: "Jane Doe", role: "Product Lead", address: "8xzt...9Lq2", department: "Engineering", salary: "4.5 SOL", status: "Active" },
    { id: 2, name: "Alex Smith", role: "Senior Dev", address: "4k2m...8Up1", department: "Engineering", salary: "3.2 SOL", status: "Active" },
    { id: 3, name: "Michael Ross", role: "Marketing", address: "9bQX...2Wz7", department: "Marketing", salary: "2.8 SOL", status: "Active" },
    { id: 4, name: "Emma Lee", role: "Contractor", address: "1xPz...9Lm0", department: "Design", salary: "1.5 SOL", status: "Contract" },
    { id: 5, name: "Sarah Connor", role: "QA Lead", address: "2k3m...1Op9", department: "Engineering", salary: "3.0 SOL", status: "Active" },
    { id: 6, name: "John Wick", role: "Security", address: "5l4n...2Kq8", department: "Operations", salary: "5.0 SOL", status: "Active" },
];

export default function EmployeesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [visibleSalaries, setVisibleSalaries] = useState<Record<number, boolean>>({});

    const toggleSalary = (id: number) => {
        setVisibleSalaries(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const filteredEmployees = employees.filter(
        (emp) =>
            emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.department.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Employees</h1>
                    <p className="text-[#6B7280] dark:text-[#A1A1AA] text-sm mt-1">Manage your team members and their payroll details.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-white dark:bg-transparent border border-[#E8E8ED] dark:border-[#27272a] text-gray-700 dark:text-white rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors shadow-sm flex items-center gap-2">
                        <Download size={18} />
                        Export
                    </button>
                    <button className="px-4 py-2 bg-[#1A1A1A] dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:opacity-90 transition-opacity shadow-sm flex items-center gap-2">
                        <UserPlus size={18} weight="fill" />
                        Add Employee
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-[#18181b] border border-[#E8E8ED] dark:border-[#27272a] rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-[#E8E8ED] dark:border-[#27272a] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search employees..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-black/20 border border-[#E8E8ED] dark:border-[#27272a] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] dark:focus:ring-gray-500 placeholder-gray-400"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 text-sm text-[#6B7280] dark:text-[#A1A1AA] border border-[#E8E8ED] dark:border-[#27272a] rounded-lg bg-gray-50 dark:bg-transparent hover:bg-gray-100 dark:hover:bg-white/5 flex items-center gap-1">
                            Department
                            <CaretDown size={14} />
                        </button>
                        <button className="px-3 py-1.5 text-sm text-[#6B7280] dark:text-[#A1A1AA] border border-[#E8E8ED] dark:border-[#27272a] rounded-lg bg-gray-50 dark:bg-transparent hover:bg-gray-100 dark:hover:bg-white/5 flex items-center gap-1">
                            Status
                            <CaretDown size={14} />
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-white/5 border-b border-[#E8E8ED] dark:border-[#27272a]">
                                <th className="px-6 py-3 text-xs font-semibold text-[#6B7280] dark:text-[#A1A1AA] uppercase tracking-wider">
                                    <input type="checkbox" className="rounded border-gray-300" />
                                </th>
                                <th className="px-6 py-3 text-xs font-semibold text-[#6B7280] dark:text-[#A1A1AA] uppercase tracking-wider">Employee</th>
                                <th className="px-6 py-3 text-xs font-semibold text-[#6B7280] dark:text-[#A1A1AA] uppercase tracking-wider">Wallet</th>
                                <th className="px-6 py-3 text-xs font-semibold text-[#6B7280] dark:text-[#A1A1AA] uppercase tracking-wider">Department</th>
                                <th className="px-6 py-3 text-xs font-semibold text-[#6B7280] dark:text-[#A1A1AA] uppercase tracking-wider">Salary</th>
                                <th className="px-6 py-3 text-xs font-semibold text-[#6B7280] dark:text-[#A1A1AA] uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-xs font-semibold text-[#6B7280] dark:text-[#A1A1AA] uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E8E8ED] dark:divide-[#27272a]">
                            {filteredEmployees.map((employee) => (
                                <tr key={employee.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input type="checkbox" className="rounded border-gray-300" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center font-medium text-violet-600 dark:text-violet-400">
                                                {employee.name.split(" ").map(n => n[0]).join("")}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">{employee.name}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{employee.role}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <code className="text-xs font-mono bg-gray-100 dark:bg-white/10 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
                                                {employee.address}
                                            </code>
                                            <button className="text-gray-400 hover:text-gray-600">
                                                <Copy size={14} />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{employee.department}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                        {visibleSalaries[employee.id] ? employee.salary : "••••••"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${employee.status === "Active"
                                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                            }`}>
                                            {employee.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => toggleSalary(employee.id)}
                                                className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-white/10"
                                            >
                                                {visibleSalaries[employee.id] ? <Eye size={16} /> : <EyeSlash size={16} />}
                                            </button>
                                            <button className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-white/10">
                                                <PencilSimple size={16} />
                                            </button>
                                            <button className="p-1.5 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30">
                                                <Trash size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-[#E8E8ED] dark:border-[#27272a] flex items-center justify-between">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Showing {filteredEmployees.length} of {employees.length} employees</p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 text-sm border border-[#E8E8ED] dark:border-[#27272a] rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50" disabled>Previous</button>
                        <button className="px-3 py-1.5 text-sm border border-[#E8E8ED] dark:border-[#27272a] rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50" disabled>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
