import { PrivacyTest } from "@/app/components/privacy/privacy-test";

export default function PrivacyTestPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Privacy Cash SDK Verification</h1>
            <p className="text-muted-foreground">
                This page tests the end-to-end flow of the Privacy Cash integration on Devnet.
            </p>
            <PrivacyTest />
        </div>
    )
}
