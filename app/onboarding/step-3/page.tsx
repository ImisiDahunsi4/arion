"use client";

import { Wallet, CoinVertical, CheckCircle, ArrowRight, ToggleLeft, ToggleRight, ArrowLeft } from "@phosphor-icons/react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OnboardingStep3() {
    const router = useRouter();
    const [token, setToken] = useState("SOL");
    const [frequency, setFrequency] = useState("Weekly");
    const [compliance, setCompliance] = useState(true);

    const handleComplete = () => {
        // Redirect to dashboard
        router.push("/dashboard");
    };

    return (
        <div className="bg-white dark:bg-[#18181b] rounded-3xl shadow-xl p-8 md:p-12 border border-white dark:border-[#27272a] relative overflow-hidden">
            {/* Step Indicator */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 dark:bg-gray-800">
                <div className="h-full bg-violet-600 w-2/3"></div>
            </div>

            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">A</div>
                    <span className="font-bold text-lg text-gray-900 dark:text-white">Arion</span>
                </div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Step 2 of 3</span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Configure your payroll settings</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">Select how you want to fund and distribute payments.</p>

            <div className="space-y-8">
                {/* Payment Token */}
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Payment Token</label>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => setToken("SOL")}
                            className={`p-4 rounded-xl border-2 text-left bg-gray-50 dark:bg-[#202023] transition-all relative ${token === "SOL"
                                    ? "border-violet-600 ring-1 ring-violet-600"
                                    : "border-transparent"
                                }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <Wallet size={24} weight="fill" className="text-gray-900 dark:text-white" />
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${token === "SOL" ? "border-violet-600" : "border-gray-300"
                                    }`}>
                                    {token === "SOL" && <div className="w-2.5 h-2.5 bg-violet-600 rounded-full"></div>}
                                </div>
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white">SOL</h3>
                            <p className="text-xs text-gray-500">Native Solana</p>
                        </button>

                        <button
                            onClick={() => setToken("USD1")}
                            className={`p-4 rounded-xl border-2 text-left bg-gray-50 dark:bg-[#202023] transition-all relative ${token === "USD1"
                                    ? "border-violet-600 ring-1 ring-violet-600"
                                    : "border-transparent"
                                }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <CoinVertical size={24} weight="fill" className="text-gray-900 dark:text-white" />
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${token === "USD1" ? "border-violet-600" : "border-gray-300"
                                    }`}>
                                    {token === "USD1" && <div className="w-2.5 h-2.5 bg-violet-600 rounded-full"></div>}
                                </div>
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white">USD1</h3>
                            <p className="text-xs text-gray-500">Hidden via ShadowWire</p>
                        </button>
                    </div>
                </div>

                {/* Payroll Frequency */}
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Payroll Frequency</label>
                    <div className="bg-gray-100 dark:bg-[#27272a] p-1 rounded-xl flex">
                        {["Weekly", "Monthly", "Custom"].map((freq) => (
                            <button
                                key={freq}
                                onClick={() => setFrequency(freq)}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${frequency === freq
                                        ? "bg-white dark:bg-[#18181b] text-violet-600 shadow-sm"
                                        : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                    }`}
                            >
                                {freq}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Compliance Screening */}
                <div className={`p-4 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer ${compliance ? "border-gray-200 dark:border-[#27272a]" : "border-gray-100"
                    }`} onClick={() => setCompliance(!compliance)}>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400">
                            <CheckCircle size={20} weight="fill" />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-gray-900 dark:text-white">Enable Compliance Screening</h4>
                            <p className="text-xs text-gray-500">Pre-screen wallets using Range API for AML checks.</p>
                        </div>
                    </div>
                    {compliance
                        ? <ToggleRight size={32} weight="fill" className="text-violet-600" />
                        : <ToggleLeft size={32} className="text-gray-400" />
                    }
                </div>

                <div className="flex items-center justify-between pt-4">
                    <button onClick={() => router.back()} className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                        Back
                    </button>
                    <button
                        onClick={handleComplete}
                        className="px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-full font-bold text-sm shadow-lg shadow-violet-500/20 transition-all flex items-center gap-2"
                    >
                        Continue
                        <ArrowRight size={16} weight="bold" />
                    </button>
                </div>
            </div>
        </div>
    );
}
