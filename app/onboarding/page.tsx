"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Buildings, User, Wallet, ArrowRight, Cube } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OnboardingStep1() {
    const { connected, select, wallets, publicKey } = useWallet();
    const [role, setRole] = useState<"company" | "employee" | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (connected && role === "company") {
            // In a real app, we would check if profile exists, etc.
            // For now, auto-redirect to next step if connected and company
            // Using a small delay for UX
            const timer = setTimeout(() => {
                router.push("/onboarding/step-2");
            }, 1000);
            return () => clearTimeout(timer);
        } else if (connected && role === "employee") {
            const timer = setTimeout(() => {
                router.push("/portal");
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [connected, role, router]);

    return (
        <div className="bg-white dark:bg-[#18181b] rounded-3xl shadow-xl p-8 md:p-12 border border-white dark:border-[#27272a]">
            {/* Header */}
            <div className="text-center mb-10">
                <div className="w-16 h-16 bg-violet-50 dark:bg-violet-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <Cube size={32} weight="fill" className="text-violet-600 dark:text-violet-400" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">Welcome to Arion</h1>
                <p className="text-gray-500 dark:text-gray-400">Get started by selecting your role and connecting your wallet.</p>
            </div>

            {/* Step 1: Role Selection */}
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center text-xs font-bold">1</div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Choose Your Role</span>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <button
                        onClick={() => setRole("company")}
                        className={`p-6 rounded-2xl border-2 text-left transition-all duration-200 group ${role === "company"
                                ? "border-violet-600 bg-violet-50 dark:bg-violet-900/10 dark:border-violet-500 shadow-md ring-2 ring-violet-100 dark:ring-violet-900/30"
                                : "border-gray-100 dark:border-[#27272a] hover:border-violet-200 dark:hover:border-violet-800 hover:bg-gray-50 dark:hover:bg-white/5"
                            }`}
                    >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors ${role === "company" ? "bg-violet-600 text-white" : "bg-gray-100 dark:bg-[#27272a] text-gray-500 dark:text-gray-400 group-hover:bg-violet-100 dark:group-hover:bg-violet-900/20 group-hover:text-violet-600"
                            }`}>
                            <Buildings size={24} weight={role === "company" ? "fill" : "regular"} />
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">I am a Company</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Manage payroll & treasury for your organization.</p>
                    </button>

                    <button
                        onClick={() => setRole("employee")}
                        className={`p-6 rounded-2xl border-2 text-left transition-all duration-200 group ${role === "employee"
                                ? "border-violet-600 bg-violet-50 dark:bg-violet-900/10 dark:border-violet-500 shadow-md ring-2 ring-violet-100 dark:ring-violet-900/30"
                                : "border-gray-100 dark:border-[#27272a] hover:border-violet-200 dark:hover:border-violet-800 hover:bg-gray-50 dark:hover:bg-white/5"
                            }`}
                    >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors ${role === "employee" ? "bg-violet-600 text-white" : "bg-gray-100 dark:bg-[#27272a] text-gray-500 dark:text-gray-400 group-hover:bg-violet-100 dark:group-hover:bg-violet-900/20 group-hover:text-violet-600"
                            }`}>
                            <User size={24} weight={role === "employee" ? "fill" : "regular"} />
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">I am an Employee</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">View payments & withdraw your earnings.</p>
                    </button>
                </div>
            </div>

            {/* Step 2: Wallet Connection */}
            <div className={`transition-all duration-500 ${role ? "opacity-100 translate-y-0" : "opacity-30 translate-y-4 pointer-events-none blur-[1px]"}`}>
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center text-xs font-bold">2</div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Connect Your Wallet</span>
                </div>

                <div className="space-y-3">
                    {/* Custom Wallet Buttons mimicking the mockup style but triggering the adapter */}
                    {connected ? (
                        <div className="p-4 border border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800 rounded-xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                                    <Wallet size={20} weight="fill" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white text-sm">Wallet Connected</p>
                                    <p className="text-xs text-gray-500">{publicKey?.toBase58().slice(0, 6)}...{publicKey?.toBase58().slice(-4)}</p>
                                </div>
                            </div>
                            <ArrowRight size={20} className="text-green-600" />
                        </div>
                    ) : (
                        <div className="grid gap-3">
                            <WalletMultiButton className="!w-full !justify-center !bg-gray-50 hover:!bg-gray-100 dark:!bg-[#27272a] dark:hover:!bg-[#3f3f46] !text-gray-900 dark:!text-white !font-bold !border !border-gray-200 dark:!border-gray-700 !rounded-xl !h-14 !transition-all" />
                            <p className="text-center text-xs text-gray-400 mt-2">
                                By connecting, you agree to Arion's <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
