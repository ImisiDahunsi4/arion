"use client";

import { ReactNode } from 'react';
import { RoleGuard } from '@/app/components/wallet/role-guard';
import { WalletButton } from '@/app/components/wallet/wallet-button';

export default function EmployeeLayout({ children }: { children: ReactNode }) {
    return (
        <RoleGuard allowedRole="employee">
            <div className="min-h-screen bg-muted/40 p-4 md:p-8">
                <div className="mx-auto max-w-4xl space-y-6">
                    <header className="rounded-xl bg-card p-4 shadow-sm flex items-center justify-between border">
                        <div className="text-xl font-bold">Arion Portal</div>
                        <WalletButton />
                    </header>
                    <main>
                        {children}
                    </main>
                </div>
            </div>
        </RoleGuard>
    );
}
