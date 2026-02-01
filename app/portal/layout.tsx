"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wallet, ClockCounterClockwise, GearSix, Bell, SignOut } from "@phosphor-icons/react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

const navigation = [
    { name: "My Balance", href: "/portal", icon: Wallet },
    { name: "Activity", href: "/portal/activity", icon: ClockCounterClockwise },
    { name: "Settings", href: "/portal/settings", icon: GearSix },
];

export default function EmployeePortalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { publicKey } = useWallet();

    const shortenedAddress = publicKey
        ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
        : "Connect";

    return (
        <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#0F0F0F] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-200">
            {/* Top Navigation Bar */}
            <nav className="fixed top-0 w-full z-30 bg-white dark:bg-[#18181b] border-b border-[#E8E8ED] dark:border-[#27272a] h-16 transition-colors duration-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/portal" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">A</div>
                            <span className="font-bold text-xl tracking-tight">Arion</span>
                        </Link>

                        <div className="hidden md:flex items-center gap-1">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${isActive
                                                ? "text-[#1A1A1A] dark:text-white bg-gray-50 dark:bg-white/10"
                                                : "text-[#6B7280] dark:text-[#A1A1AA] hover:text-[#1A1A1A] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5"
                                            }`}
                                    >
                                        <item.icon size={18} weight={isActive ? "fill" : "regular"} />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-[#6B7280] dark:text-[#A1A1AA] hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#18181b]"></span>
                        </button>

                        <div className="hidden sm:block h-6 w-px bg-[#E8E8ED] dark:bg-[#27272a]"></div>

                        <div className="flex items-center gap-3">
                            <div className="hidden md:block text-right">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Alex Morgan</p>
                                <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA]">Employee</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-violet-100 dark:from-blue-900 dark:to-violet-900 border border-white dark:border-gray-800 shadow-sm"></div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {children}
            </main>
        </div>
    );
}
