"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function OnboardingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen w-full bg-[#f3f0ff] dark:bg-[#09090b] flex items-center justify-center p-4">
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#e0d9ff] to-transparent pointer-events-none opacity-50 dark:opacity-20"></div>

            <div className="w-full max-w-2xl z-10">
                {children}
            </div>
        </div>
    );
}
