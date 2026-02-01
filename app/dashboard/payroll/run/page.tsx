"use client";

import { useState, useEffect } from "react";
import { CheckCircle, CircleNotch, Lock, ArrowLeft, ArrowUpRight, Copy } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Steps definition
const STEPS = [
    { id: 1, label: "Checking Privacy Pool Balance" },
    { id: 2, label: "Generating ZK Proofs" },
    { id: 3, label: "Submitting to Solana" },
    { id: 4, label: "Confirming Transactions" }
];

export default function ExecutePayrollPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [eta, setEta] = useState(15);
    const router = useRouter();

    // Simulation Effect
    useEffect(() => {
        let stepTimer: NodeJS.Timeout;
        let progressTimer: NodeJS.Timeout;

        // Step 1: Check Balance (Fast)
        if (currentStep === 1) {
            stepTimer = setTimeout(() => {
                setCurrentStep(2);
                setProgress(0);
            }, 1500);
        }

        // Step 2: Generate Proofs (Simulate heavy lifting)
        if (currentStep === 2) {
            progressTimer = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(progressTimer);
                        setCurrentStep(3);
                        return 0;
                    }
                    return prev + 2; // Increment 2% every 50ms = ~2.5s total
                });
            }, 50);
        }

        // Step 3: Submit (Medium delay)
        if (currentStep === 3) {
            stepTimer = setTimeout(() => {
                setCurrentStep(4);
            }, 2000);
        }

        // Step 4: Confirm (Fast)
        if (currentStep === 4) {
            stepTimer = setTimeout(() => {
                setIsComplete(true);
            }, 1500);
        }

        return () => {
            clearTimeout(stepTimer);
            clearInterval(progressTimer);
        };
    }, [currentStep]);

    // Countdown timer for ETA
    useEffect(() => {
        if (eta > 0 && !isComplete) {
            const timer = setInterval(() => setEta(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [eta, isComplete]);

    if (isComplete) {
        return <SuccessView />;
    }

    return (
        <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[600px]">
            <div className="bg-white dark:bg-[#18181b] rounded-3xl shadow-xl p-12 border border-white dark:border-[#27272a] w-full max-w-2xl relative overflow-hidden">
                {/* Progress Header */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100 dark:bg-gray-800">
                    <div
                        className="h-full bg-violet-600 transition-all duration-500 ease-out"
                        style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
                    ></div>
                </div>

                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Executing Payroll</h1>
                        <p className="text-gray-500">Step {currentStep} of 4 • Arion Privacy Protocol</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-violet-50 dark:bg-violet-900/10 flex items-center justify-center text-violet-600 dark:text-violet-400">
                        <Lock size={24} weight="fill" />
                    </div>
                </div>

                {/* Steps Visualizer */}
                <div className="space-y-6 relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-gray-100 dark:bg-[#27272a] -z-10"></div>

                    {STEPS.map((step) => {
                        const isDone = currentStep > step.id;
                        const isCurrent = currentStep === step.id;
                        const isPending = currentStep < step.id;

                        return (
                            <div key={step.id} className={`flex items-start gap-4 transition-all duration-500 ${isPending ? "opacity-40 blur-[0.5px]" : "opacity-100"}`}>
                                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 bg-white dark:bg-[#18181b] transition-colors ${isDone
                                    ? "border-green-500 text-green-500"
                                    : isCurrent
                                        ? "border-violet-600 text-violet-600"
                                        : "border-gray-200 dark:border-gray-700 text-gray-300"
                                    }`}>
                                    {isDone ? (
                                        <CheckCircle size={20} weight="fill" />
                                    ) : isCurrent ? (
                                        <CircleNotch size={20} className="animate-spin" />
                                    ) : (
                                        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                                    )}
                                </div>
                                <div className="flex-1 pt-2">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className={`font-bold ${isCurrent ? "text-violet-600 dark:text-violet-400" : "text-gray-900 dark:text-white"}`}>
                                            {step.label}
                                        </h3>
                                        {isCurrent && step.id === 2 && (
                                            <span className="text-xs font-bold text-violet-600">{Math.round(progress)}%</span>
                                        )}
                                        {isDone && <span className="text-xs text-green-500 font-medium">Completed</span>}
                                    </div>

                                    {/* Sub-text based on state */}
                                    {isCurrent && (
                                        <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">Running process...</p>
                                    )}

                                    {/* Progress Bar for ZK Step */}
                                    {isCurrent && step.id === 2 && (
                                        <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full mt-3 overflow-hidden">
                                            <div
                                                className="h-full bg-violet-600 transition-all duration-75 ease-out rounded-full"
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                    )}

                                    {isCurrent && step.id === 2 && (
                                        <p className="text-xs text-gray-400 mt-2">Processing 6 recipients via Zero-Knowledge circuit...</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer ETA */}
                <div className="mt-12 pt-6 border-t border-gray-100 dark:border-[#27272a] flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900/30 px-3 py-1.5 rounded-lg text-gray-600 dark:text-gray-400 font-mono">
                        <CircleNotch size={14} className="animate-spin" />
                        Estimated time remaining: ~{eta}s
                    </div>
                    <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-medium text-xs uppercase tracking-wide">
                        <Lock size={14} weight="fill" />
                        Privacy Secured
                    </div>
                </div>
            </div>
        </div>
    );
}

function SuccessView() {
    return (
        <div className="max-w-3xl mx-auto flex items-center justify-center min-h-[600px]">
            <div className="bg-white dark:bg-[#18181b] rounded-3xl shadow-xl p-12 text-center w-full relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>

                <div className="w-24 h-24 bg-violet-100 dark:bg-violet-900/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner animate-[bounce_1s_ease-out_1]">
                    <div className="w-16 h-16 bg-violet-600 rounded-full flex items-center justify-center shadow-lg shadow-violet-500/30 text-white">
                        <CheckCircle size={40} weight="bold" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">Payroll Successfully Executed</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-10">Your transaction has been processed and funds have been distributed.</p>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-10 text-left">
                    <div className="bg-gray-50 dark:bg-[#202022] p-5 rounded-2xl border border-gray-100 dark:border-[#27272a]">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Recipients</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            6 <span className="text-sm font-normal text-gray-500">Employees</span>
                        </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-[#202022] p-5 rounded-2xl border border-gray-100 dark:border-[#27272a]">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Distributed</p>
                        <div className="flex items-center gap-2">
                            <ArrowUpRight className="text-gray-400" size={20} />
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">20.00 <span className="text-sm font-normal text-gray-500">SOL</span></p>
                        </div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/10 p-5 rounded-2xl border border-green-100 dark:border-green-900/30">
                        <p className="text-xs font-bold text-green-600/70 dark:text-green-400/70 uppercase tracking-wider mb-1">Status</p>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <p className="text-lg font-bold text-green-700 dark:text-green-400">Verified On-chain</p>
                        </div>
                    </div>
                </div>

                {/* Transaction Hash */}
                <div className="bg-gray-50 dark:bg-[#202022] rounded-xl p-4 border border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-between mb-8 group cursor-pointer hover:border-violet-300 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white dark:bg-white/5 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400">
                            <Copy size={20} />
                        </div>
                        <div className="text-left">
                            <p className="text-xs text-gray-500">Transaction Hash</p>
                            <code className="text-sm font-bold text-gray-900 dark:text-white font-mono">5Hk9...x2Lm</code>
                        </div>
                    </div>
                    <button className="text-sm font-bold text-violet-600 hover:text-violet-700 dark:text-violet-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                        View on Solana Explorer
                        <ArrowUpRight size={16} weight="bold" />
                    </button>
                </div>

                {/* Privacy Info */}
                <div className="bg-violet-50 dark:bg-violet-900/10 border border-violet-100 dark:border-violet-800/30 rounded-xl p-4 flex gap-4 text-left mb-10">
                    <div className="shrink-0 pt-1">
                        <Lock size={20} className="text-violet-600 dark:text-violet-400" weight="fill" />
                    </div>
                    <p className="text-sm text-violet-800 dark:text-violet-200 leading-relaxed">
                        Funds have been distributed to the privacy pool. Employees can now withdraw their salaries anonymously.
                    </p>
                </div>

                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#1A1A1A] hover:bg-black dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black font-bold rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                    <ArrowLeft size={20} weight="bold" />
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
}

