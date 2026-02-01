"use client";

import { useState } from "react";
import { User, Bell, LockSimple, Wallet, PaintBucket, Globe, ShieldCheck, CaretRight, CheckCircle, Warning } from "@phosphor-icons/react";

const settingsSections = [
    { id: "account", name: "Account", icon: User, description: "Manage your personal info and company details" },
    { id: "notifications", name: "Notifications", icon: Bell, description: "Configure email and push notifications" },
    { id: "security", name: "Security", icon: LockSimple, description: "Two-factor auth and session management" },
    { id: "wallet", name: "Wallet", icon: Wallet, description: "Connected wallets and default payment methods" },
    { id: "privacy", name: "Privacy", icon: ShieldCheck, description: "Privacy pool and ZK proof settings" },
    { id: "appearance", name: "Appearance", icon: PaintBucket, description: "Theme, language, and display preferences" },
];

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState("account");

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Settings</h1>
                <p className="text-[#6B7280] dark:text-[#A1A1AA] text-sm mt-1">Manage your account, security, and preferences.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <nav className="space-y-1">
                        {settingsSections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeSection === section.id
                                        ? "bg-gray-100 dark:bg-white/10 text-[#1A1A1A] dark:text-white"
                                        : "text-[#6B7280] dark:text-[#A1A1AA] hover:bg-gray-50 dark:hover:bg-white/5"
                                    }`}
                            >
                                <section.icon size={20} weight={activeSection === section.id ? "fill" : "regular"} />
                                <span className="font-medium text-sm">{section.name}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Content */}
                <div className="lg:col-span-3">
                    <div className="bg-white dark:bg-[#18181b] border border-[#E8E8ED] dark:border-[#27272a] rounded-xl overflow-hidden">
                        {activeSection === "account" && (
                            <>
                                <div className="px-6 py-5 border-b border-[#E8E8ED] dark:border-[#27272a]">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Account Settings</h3>
                                    <p className="text-sm text-[#6B7280] dark:text-[#A1A1AA]">Update your company and personal information.</p>
                                </div>
                                <div className="p-6 space-y-6">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-200 to-indigo-200 dark:from-violet-900 dark:to-indigo-900 flex items-center justify-center text-3xl font-bold text-violet-700 dark:text-violet-300">
                                            TS
                                        </div>
                                        <div>
                                            <button className="px-4 py-2 bg-[#1A1A1A] dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:opacity-90">
                                                Change Avatar
                                            </button>
                                            <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA] mt-2">JPG, PNG or GIF. Max 2MB.</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Company Name</label>
                                            <input
                                                type="text"
                                                defaultValue="Stark Industries"
                                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-black/20 border border-[#E8E8ED] dark:border-[#27272a] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] dark:focus:ring-gray-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Contact Email</label>
                                            <input
                                                type="email"
                                                defaultValue="tony@stark.industries"
                                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-black/20 border border-[#E8E8ED] dark:border-[#27272a] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] dark:focus:ring-gray-500"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Timezone</label>
                                        <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-black/20 border border-[#E8E8ED] dark:border-[#27272a] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] dark:focus:ring-gray-500">
                                            <option>America/New_York (UTC-05:00)</option>
                                            <option>America/Los_Angeles (UTC-08:00)</option>
                                            <option>Europe/London (UTC+00:00)</option>
                                            <option>Asia/Tokyo (UTC+09:00)</option>
                                        </select>
                                    </div>
                                    <div className="flex justify-end pt-4 border-t border-[#E8E8ED] dark:border-[#27272a]">
                                        <button className="px-6 py-2.5 bg-[#1A1A1A] dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium hover:opacity-90">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeSection === "security" && (
                            <>
                                <div className="px-6 py-5 border-b border-[#E8E8ED] dark:border-[#27272a]">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Security Settings</h3>
                                    <p className="text-sm text-[#6B7280] dark:text-[#A1A1AA]">Protect your account with additional security.</p>
                                </div>
                                <div className="divide-y divide-[#E8E8ED] dark:divide-[#27272a]">
                                    <div className="px-6 py-4 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                                <CheckCircle size={20} className="text-green-600 dark:text-green-400" weight="fill" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">Two-Factor Authentication</p>
                                                <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA]">Enabled via authenticator app</p>
                                            </div>
                                        </div>
                                        <button className="text-sm text-violet-600 dark:text-violet-400 font-medium hover:underline">Configure</button>
                                    </div>
                                    <div className="px-6 py-4 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                                <Warning size={20} className="text-yellow-600 dark:text-yellow-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">Backup Recovery Phrase</p>
                                                <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA]">Not verified</p>
                                            </div>
                                        </div>
                                        <button className="text-sm text-violet-600 dark:text-violet-400 font-medium hover:underline">Verify</button>
                                    </div>
                                    <div className="px-6 py-4 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-gray-50 dark:bg-white/10 rounded-lg">
                                                <Globe size={20} className="text-gray-600 dark:text-gray-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">Active Sessions</p>
                                                <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA]">2 devices logged in</p>
                                            </div>
                                        </div>
                                        <button className="text-sm text-violet-600 dark:text-violet-400 font-medium hover:underline">Manage</button>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeSection !== "account" && activeSection !== "security" && (
                            <div className="p-12 text-center">
                                <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center mb-4">
                                    {settingsSections.find(s => s.id === activeSection)?.icon &&
                                        (() => {
                                            const Icon = settingsSections.find(s => s.id === activeSection)!.icon;
                                            return <Icon size={28} className="text-gray-400" />;
                                        })()
                                    }
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{settingsSections.find(s => s.id === activeSection)?.name} Settings</h3>
                                <p className="text-sm text-[#6B7280] dark:text-[#A1A1AA]">
                                    {settingsSections.find(s => s.id === activeSection)?.description}
                                </p>
                                <p className="text-sm text-violet-600 dark:text-violet-400 mt-4">Coming soon...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
