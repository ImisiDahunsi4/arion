"use client";

import { useWalletConnection } from "@solana/react-hooks"; // Using the hooks from kit or standard adapter?
// The kit uses custom hooks. Let's stick to standard adapter for the button if possible, 
// OR use the kit's hook if we want custom UI.
// The template uses @solana/react-hooks.
// But for "WalletButton", usually we just wrap WalletMultiButton or build a custom one.
// I'll stick to WalletMultiButton for now as it's reliable.

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export function WalletButton() {
    return <WalletMultiButton />;
}
