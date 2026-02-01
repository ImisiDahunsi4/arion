"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useShadowWire } from "@/hooks/use-shadowwire";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";
import { cn } from "@/lib/utils";

export function Usd1Test() {
    const { balance, deposit, withdraw, transfer, isLoading, error, refreshBalance } = useShadowWire();
    const [amount, setAmount] = useState<string>("0.1");
    const [recipient, setRecipient] = useState<string>("");
    const [lastSig, setLastSig] = useState<string | null>(null);
    const [token, setToken] = useState<string>("SOL");

    const handleDeposit = async () => {
        try {
            const sig = await deposit(parseFloat(amount));
            setLastSig(sig || "Success (no sig returned?)");
        } catch (e) {
            console.error(e);
        }
    };

    const handleWithdraw = async () => {
        try {
            const sig = await withdraw(parseFloat(amount));
            setLastSig(sig || "Success");
        } catch (e) {
            console.error(e);
        }
    };

    const handleTransfer = async () => {
        if (!recipient) return;
        try {
            const sig = await transfer(recipient, parseFloat(amount));
            setLastSig(sig || "Success");
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>ShadowWire Test (Relayer)</CardTitle>
                <CardDescription>Test anonymous transfers via ShadowWire Relayer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <div className="space-y-1">
                        <p className="text-sm font-medium">Escrow Balance ({token})</p>
                        <p className="text-2xl font-bold">
                            {balance !== null ? balance.toLocaleString() : "---"}
                            <span className="text-sm font-normal text-muted-foreground ml-1">lamports</span>
                        </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => refreshBalance()} disabled={isLoading}>
                        Refresh
                    </Button>
                </div>

                <div className="space-y-2">
                    <Label>Token</Label>
                    <div className="flex gap-2">
                        <Button
                            variant={token === 'SOL' ? 'default' : 'outline'}
                            onClick={() => setToken('SOL')}
                            size="sm"
                        >
                            SOL
                        </Button>
                        <Button
                            variant={token === 'USD1' ? 'default' : 'outline'}
                            onClick={() => setToken('USD1')}
                            size="sm"
                            className="opacity-50 cursor-not-allowed"
                            title="Unavailable on Devnet"
                        >
                            USD1 (Mainnet Only)
                        </Button>
                    </div>
                </div>

                {error && (
                    <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {lastSig && (
                    <Alert>
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription className="break-all font-mono text-xs">
                            {lastSig}
                        </AlertDescription>
                    </Alert>
                )}

                <div className="space-y-2">
                    <Label>Amount</Label>
                    <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <Label>Recipient (for Transfer)</Label>
                    <Input
                        placeholder="Wallet Address"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-3 gap-2">
                    <Button onClick={handleDeposit} disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Deposit
                    </Button>
                    <Button onClick={handleTransfer} disabled={isLoading || !recipient} variant="secondary">
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Transfer
                    </Button>
                    <Button onClick={handleWithdraw} disabled={isLoading} variant="secondary">
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Withdraw
                    </Button>
                </div>
            </CardContent>
            <CardFooter>
                <p className="text-xs text-muted-foreground text-center w-full">
                    Uses 'solana-devnet' network. Check console for logs.
                </p>
            </CardFooter>
        </Card>
    );
}
