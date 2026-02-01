"use client";

import { ReactNode } from 'react';
import { RoleGuard } from '@/app/components/wallet/role-guard';
import { WalletButton } from '@/app/components/wallet/wallet-button';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <RoleGuard allowedRole="company">
            <div className="flex h-screen bg-muted/40">
                {/* Sidebar Placeholder */}
                <aside className="hidden w-64 bg-card p-4 lg:block shadow-r border-r">
                    <div className="mb-8 text-xl font-bold flex items-center gap-2 px-2">
                        Arion
                    </div>
                    <nav className="space-y-2">
                        <div className="p-2 bg-accent/50 text-accent-foreground rounded cursor-pointer font-medium">Overview</div>
                        <div className="p-2 hover:bg-accent/50 rounded cursor-pointer transition-colors">Employees</div>
                        <div className="p-2 hover:bg-accent/50 rounded cursor-pointer transition-colors">Payroll</div>
                        <div className="p-2 hover:bg-accent/50 rounded cursor-pointer transition-colors">Settings</div>
                    </nav>
                </aside>

                <div className="flex flex-1 flex-col overflow-hidden">
                    {/* Header */}
                    <header className="flex h-16 items-center justify-between bg-card px-6 shadow-sm border-b">
                        <div className="font-medium">Company Dashboard</div>
                        <WalletButton />
                    </header>

                    <main className="flex-1 overflow-y-auto p-6">
                        {children}
                    </main>
                </div>
            </div>
        </RoleGuard>
    );
}
