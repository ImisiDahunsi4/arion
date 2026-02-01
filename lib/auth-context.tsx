"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { PublicKey } from "@solana/web3.js";

// Types
type UserRole = "company" | "employee" | null;

interface AuthContextType {
    role: UserRole;
    setRole: (role: UserRole) => void;
    isAuthenticated: boolean;
    walletAddress: string | null;
    login: (role: UserRole) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const { publicKey, disconnect } = useWallet();
    const router = useRouter();
    const [role, setRoleState] = useState<UserRole>(null);

    // Initialize from localStorage on mount
    useEffect(() => {
        const storedRole = localStorage.getItem("arion_role") as UserRole;
        if (storedRole) {
            setRoleState(storedRole);
        }
    }, []);

    // Update when wallet changes
    useEffect(() => {
        if (!publicKey) {
            setRoleState(null);
            localStorage.removeItem("arion_role");
        }
    }, [publicKey]);

    const login = (newRole: UserRole) => {
        if (!newRole) return;
        setRoleState(newRole);
        localStorage.setItem("arion_role", newRole);

        // Redirect based on role
        if (newRole === "company") {
            router.push("/dashboard/overview"); // Redirect to dashboard
        } else if (newRole === "employee") {
            router.push("/employee/balance"); // Redirect to employee portal
        }
    };

    const logout = () => {
        setRoleState(null);
        localStorage.removeItem("arion_role");
        disconnect();
        router.push("/");
    };

    const value = {
        role,
        setRole: setRoleState,
        isAuthenticated: !!publicKey && !!role,
        walletAddress: publicKey ? publicKey.toBase58() : null,
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
