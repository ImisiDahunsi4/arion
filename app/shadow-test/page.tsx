import { Usd1Test } from "@/app/components/shadowwire/usd1-test";

export default function ShadowTestPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">ShadowWire Verification (Devnet)</h1>
            <p className="text-muted-foreground">
                Testing the integration with ShadowWire Relayer on Devnet.
                Ensure you have Devnet SOL in your wallet.
            </p>
            <Usd1Test />
        </div>
    )
}
