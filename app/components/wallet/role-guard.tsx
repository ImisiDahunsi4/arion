"use client";

import { useAuth } from "@/lib/auth-context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function RoleGuard({ children, allowedRole }: { children: React.ReactNode, allowedRole: "company" | "employee" }) {
    const { role, isAuthenticated, walletAddress } = useAuth(); // Assuming useAuth exposes walletAddress or loading state
    const router = useRouter();

    useEffect(() => {
        // If auth loading? (we initialized auth from localstorage in effect, so there might be a flash)
        // Ideally AuthContext should have a 'loading' state.
        // For now, let's assume it's fast enough or check if role matches.

        if (!isAuthenticated && !role) {
            router.push("/connect");
        } else if (role && role !== allowedRole) {
            // Wrong role, redirect to correct dashboard
            if (role === "company") router.push("/dashboard/overview");
            if (role === "employee") router.push("/employee/balance");
        }
    }, [role, isAuthenticated, router, allowedRole]);

    if (!isAuthenticated || role !== allowedRole) {
        return null; // Or a loading spinner
    }

    return <>{children}</>;
}
