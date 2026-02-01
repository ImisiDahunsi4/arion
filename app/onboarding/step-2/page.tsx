"use client";

import { Buildings, CaretDown, UsersThree, ArrowRight } from "@phosphor-icons/react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OnboardingStep2() {
    const router = useRouter();
    const [companyName, setCompanyName] = useState("");
    const [size, setSize] = useState("");

    const handleContinue = () => {
        if (!companyName) return;
        router.push("/onboarding/step-3");
    };

    return (
        <div className="bg-white dark:bg-[#18181b] rounded-3xl shadow-xl p-8 md:p-12 border border-white dark:border-[#27272a] relative overflow-hidden">
            {/* Step Indicator */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 dark:bg-gray-800">
                <div className="h-full bg-violet-600 w-1/3"></div>
            </div>

            <div className="w-12 h-12 bg-violet-50 dark:bg-violet-900/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Buildings size={24} weight="fill" className="text-violet-600 dark:text-violet-400" />
            </div>

            <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">Set up your company profile</h1>
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-8">Let's get the basics down so we can customize your payroll experience.</p>

            <div className="space-y-6">
                {/* Company Name */}
                <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Company Name</label>
                    <div className="relative">
                        <Buildings size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="e.g. Acme Corp"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-[#27272a] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                {/* Industry */}
                <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Industry</label>
                    <div className="relative">
                        <select className="w-full pl-4 pr-10 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-[#27272a] rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent appearance-none transition-all">
                            <option value="" disabled selected>Select an industry</option>
                            <option value="tech">Technology</option>
                            <option value="finance">Finance</option>
                            <option value="retail">Retail</option>
                            <option value="healthcare">Healthcare</option>
                        </select>
                        <CaretDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Size */}
                <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">Approximate Size</label>
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { label: "1-10", sub: "Employees" },
                            { label: "11-50", sub: "Employees" },
                            { label: "51+", sub: "Employees" }
                        ].map((option) => (
                            <button
                                key={option.label}
                                onClick={() => setSize(option.label)}
                                className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center gap-1 ${size === option.label
                                        ? "border-violet-600 bg-violet-50 dark:bg-violet-900/10 text-violet-700 dark:text-violet-300"
                                        : "border-gray-100 dark:border-[#27272a] hover:border-violet-200 dark:hover:border-violet-800"
                                    }`}
                            >
                                <UsersThree size={24} weight={size === option.label ? "fill" : "regular"} />
                                <span className="font-bold text-sm">{option.label}</span>
                                <span className="text-[10px] text-gray-500 uppercase tracking-wide">{option.sub}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleContinue}
                    className="w-full py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-violet-500/20 transition-all flex items-center justify-center gap-2 mt-8"
                >
                    Continue
                    <ArrowRight size={20} weight="bold" />
                </button>

                <div className="flex justify-center gap-2 mt-6">
                    <div className="w-8 h-1 bg-violet-600 rounded-full"></div>
                    <div className="w-8 h-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="w-8 h-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
                <p className="text-center text-xs text-gray-400 mt-2">Step 1 of 3</p>
            </div>
        </div>
    );
}
