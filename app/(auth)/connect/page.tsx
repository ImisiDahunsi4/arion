"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Briefcase, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ConnectPage() {
    const { connected } = useWallet();
    const { login, role, isAuthenticated } = useAuth();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated && role) {
            if (role === "company") router.push("/dashboard/overview");
            if (role === "employee") router.push("/employee/balance");
        }
    }, [isAuthenticated, role, router]);

    if (!mounted) return null;

    return (
        <div className="w-full max-w-md space-y-8 animate-in fade-in duration-500">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight">Welcome to Arion</h1>
                <p className="mt-2 text-muted-foreground">
                    Private, compliant crypto payroll.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Connect Wallet</CardTitle>
                    <CardDescription>
                        Connect your Solana wallet to get started.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    <div className="p-2 border rounded-lg bg-muted/50">
                        <WalletMultiButton className="!bg-primary hover:!bg-primary/90" />
                    </div>

                    {!connected && (
                        <p className="text-sm text-muted-foreground text-center animate-pulse">
                            Waiting for connection...
                        </p>
                    )}

                    {connected && !role && (
                        <div className="w-full space-y-4 pt-4 border-t animate-in slide-in-from-bottom-2 duration-300">
                            <p className="text-center font-medium">Select your role:</p>
                            <div className="grid grid-cols-2 gap-4">
                                <Button
                                    variant="outline"
                                    className="h-24 flex flex-col gap-2 hover:border-primary hover:bg-primary/5 transition-all"
                                    onClick={() => login("company")}
                                >
                                    <Briefcase className="h-6 w-6 text-primary" />
                                    <span>Company</span>
                                </Button>

                                <Button
                                    variant="outline"
                                    className="h-24 flex flex-col gap-2 hover:border-primary hover:bg-primary/5 transition-all"
                                    onClick={() => login("employee")}
                                >
                                    <User className="h-6 w-6 text-primary" />
                                    <span>Employee</span>
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <p className="px-8 text-center text-sm text-muted-foreground">
                By connecting, you agree to our Terms of Service.
            </p>
        </div>
    );
}
