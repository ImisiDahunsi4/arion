"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SquaresFour, Users, Wallet, ShieldCheck, GearSix, Bell, MagnifyingGlass, Copy } from "@phosphor-icons/react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

const navigation = [
    { name: "Overview", href: "/dashboard", icon: SquaresFour },
    { name: "Employees", href: "/dashboard/employees", icon: Users },
    { name: "Payroll", href: "/dashboard/payroll", icon: Wallet },
    { name: "Privacy", href: "/dashboard/privacy", icon: ShieldCheck },
    { name: "Settings", href: "/dashboard/settings", icon: GearSix },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { publicKey, connected } = useWallet();

    const shortenedAddress = publicKey
        ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
        : "Connect";

    return (
        <div className="bg-[#F9FAFB] dark:bg-[#0F0F0F] text-gray-900 dark:text-gray-100 h-screen overflow-hidden flex transition-colors duration-200">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-[#18181b] border-r border-[#E8E8ED] dark:border-[#27272a] flex-col hidden md:flex transition-colors duration-200">
                <div className="h-16 flex items-center px-6 border-b border-[#E8E8ED] dark:border-[#27272a]">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#1A1A1A] rounded-lg flex items-center justify-center text-white font-bold text-lg">A</div>
                        <span className="font-bold text-xl tracking-tight">Arion</span>
                    </Link>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${isActive
                                        ? "bg-gray-100 dark:bg-white/10 text-[#1A1A1A] dark:text-white"
                                        : "text-[#6B7280] dark:text-[#A1A1AA] hover:bg-gray-50 dark:hover:bg-white/5"
                                    }`}
                            >
                                <item.icon size={20} weight={isActive ? "fill" : "regular"} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-[#E8E8ED] dark:border-[#27272a]">
                    <div className="flex items-center gap-3 p-2 rounded-lg border border-[#E8E8ED] dark:border-[#27272a] bg-gray-50 dark:bg-black/20">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300 font-bold text-xs">
                            TS
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">Tony Stark</p>
                            <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA] truncate">Admin</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white dark:bg-[#18181b] border-b border-[#E8E8ED] dark:border-[#27272a] flex items-center justify-between px-6 lg:px-8 shrink-0 transition-colors duration-200">
                    <div className="flex-1 max-w-lg">
                        <div className="relative">
                            <MagnifyingGlass size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search employees, transactions..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-black/20 border border-[#E8E8ED] dark:border-[#27272a] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] dark:focus:ring-gray-500 placeholder-gray-400 dark:placeholder-gray-600 transition-colors"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4 ml-4">
                        <button className="relative p-2 text-[#6B7280] dark:text-[#A1A1AA] hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
                            <Bell size={22} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#18181b]"></span>
                        </button>
                        <div className="h-6 w-px bg-[#E8E8ED] dark:bg-[#27272a] mx-1"></div>
                        {connected ? (
                            <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-black/20 border border-[#E8E8ED] dark:border-[#27272a] rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-sm font-mono text-gray-600 dark:text-gray-300">{shortenedAddress}</span>
                                <Copy size={14} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                            </button>
                        ) : (
                            <WalletMultiButton className="!bg-[#1A1A1A] !text-white !rounded-lg !text-sm !px-4 !py-2" />
                        )}
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
