"use client";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { clusterApiUrl } from "@solana/web3.js";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { PropsWithChildren, useMemo } from "react";
import { AuthProvider } from "@/lib/auth-context";

// Ensure styles are imported in layout.tsx
// require('@solana/wallet-adapter-react-ui/styles.css');

export function Providers({ children }: PropsWithChildren) {
  // Default to devnet
  const network = WalletAdapterNetwork.Devnet;

  // Use environment variable for RPC, fallback to clusterApiUrl
  // Note: Helius URLs often support websocket, so ConnectionProvider handles it.
  const endpoint = useMemo(() => process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    [network]
  );

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </NextThemesProvider>
  );
}
