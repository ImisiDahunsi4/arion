# Arion: Ghost Payroll

**Twitter**: [@ArionPrivacy](https://x.com/ArionPrivacy)
**Website**: [https://arion.money](https://arion.money)

![Arion Banner](https://github.com/user-attachments/assets/placeholder-arion-banner)

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Integrations](#integrations)
  - [Privacy Cash SDK](#privacy-cash-sdk)
  - [ShadowWire (Bulletproofs)](#shadowwire)
  - [Range Protocol](#range-protocol)
  - [Helius RPC](#helius-rpc)
- [Features](#features)
- [Run](#run)

---

## Overview

**Arion** is the first non-custodial, privacy-preserving payroll solution on Solana. Powered by Zero-Knowledge (ZK) proofs, Arion allows companies to pay their entire team in a single transaction without revealing individual salaries to the public blockchain.

Unlike traditional crypto payroll tools that expose sensitive financial data, Arion uses **client-side ZK proof generation** to ensure that salary data never leaves the user's browser in plaintext. The blockchain sees only the total distributed amount, while individual payout details remain cryptographically shielded.

**Arion is designed for the future of work:**
- **Zero Salary Leaks**: Competitors cannot see your payroll data.
- **Trustless**: We never hold your funds; the Privacy Pool smart contract does.
- **Compliant**: Integrated sanctions screening via Range Protocol.

---

## Architecture

Arion's security model relies on processing sensitive data **client-side** before it ever touches the network. We utilize a combination of WASM-based ZK circuits and on-chain privacy primitives.

```mermaid
graph TD
    %% Nodes
    Admin[Company Admin]
    Dash[Arion Dashboard (Next.js)]
    WASM[Privacy Cash SDK (WASM)]
    Shadow[ShadowWire Circuit]
    Range[Range Protocol API]
    Helius[Helius RPC]
    Pool[Privacy Pool Program]
    Jane[Employee (Jane)]

    %% Flow
    Admin -->|1. Configures Payroll| Dash
    Dash -->|2. Screen Addresses| Range
    Dash -->|3. Encrypt Amounts| Shadow
    Shadow -->|4. Generate Bulletproof| WASM
    WASM -->|5. Generate ZK Proof| WASM
    WASM -->|6. Submit Shielded TX| Helius
    Helius -->|7. Verify & Deposit| Pool
    
    Pool -->|8. Private Withdraw| Jane
    
    %% Styling
    subgraph "Client-Side (Browser)"
        Dash
        WASM
        Shadow
    end
    
    subgraph "Solana Mainnet"
        Pool
    end
    
    subgraph "External Services"
        Range
        Helius
    end
```

---

## Integrations

Arion is not just a UI; it is a complex orchestration of multiple privacy and infrastructure protocols.

### Privacy Cash SDK
The core of our privacy engine. We utilize the **Privacy Cash SDK** to manage the "Privacy Pool"—a shared anonymity set on Solana. Arion acts as a relayer, generating the necessary cryptographic commitments to deposit funds into the pool without linking the deposit to specific recipient addresses.

**Implementation Details:**
- **Client-Side Proofs**: We use the SDK's WASM bindings to generate ZK proofs directly in the browser.
- **Deposit Flow**: `deposit(amount, recipient)` calls are batched into a single transaction.

```typescript
// src/lib/privacy-cash/utils.ts
import { PrivacyCash } from '@privacy-cash/sdk';

export const shieldFunds = async (amount: number, recipients: string[]) => {
    // 1. Initialize SDK
    const pc = await PrivacyCash.init();
    
    // 2. Generate ZK Proof (Client-Side)
    const proof = await pc.generateProof({
        amount,
        recipients,
        circuit: 'split-v2'
    });
    
    return proof;
};
```

### ShadowWire
To ensure the *amounts* themselves are hidden (not just the recipients), we integrate **ShadowWire's Bulletproofs**. This allows us to prove that "The sum of outputs equals the input" without revealing the individual values (e.g., proving 10 SOL = 4.5 + 5.5, without revealing 4.5 or 5.5).

**Key Feature**: Allows for "Confidential Transfers" where the transaction volume is visible, but the breakdown is opaque.

### Range Protocol
Privacy does not mean anarchy. To ensure Arion is viable for enterprise use, we integrate **Range Protocol** for real-time wallet screening.

before any payroll run, Arion checks recipient addresses against global sanctions lists (OFAC, etc.) using Range's API. This ensures that privacy checks are strictly for legitimate payroll confidentiality, not for illicit concealment.

- **Check Location**: `src/app/dashboard/payroll/new/page.tsx`
- **Method**: `Range.screenAddress(wallet)`

### Helius RPC
Speed is privacy. A slow privacy tool is a suspicious privacy tool. We utilize **Helius High-Performance RPCs** and **Webhooks** to listen for privacy pool events.

When a user executes a payroll, Arion subscribes to Helius websockets to detect the specific slot when the ZK proof is verified on-chain, providing instant UI feedback.

---

## Features

### 👻 Ghost Payroll
The flagship feature. Run payroll for 100+ employees in a single transaction.
- **Batch Processing**: One signature, many payments. Saves gas.
- **Anonymity Set**: Your transaction mixes with thousands of others in the Privacy Pool.

### 🛡️ Employee Portal
A dedicated, simplified view for employees to manage their private funds.
- **Private Balance**: Employees see their "shielded" balance, which is not visible on Solscan.
- **Self-Custody Withdraw**: Employees can withdraw to their exchange or cold wallet at any time.

### 🏢 Compliance Dashboard
- **Audit Trails**: Generate READ-ONLY reports for auditors that reveal the total amounts and recipient identities *off-chain* without de-anonymizing the on-chain history.

---

## Run

To run Arion locally and interact with the Privacy Cash Devnet program:

### 1. Environment Setup
Create a `.env.local` file with the following keys:

```bash
# Sol-Priv / Arion Config
NEXT_PUBLIC_HELIUS_RPC_URL=https://devnet.helius-rpc.com/?api-key=...
NEXT_PUBLIC_PRIVACY_CASH_PROGRAM_ID=PriV...
NEXT_PUBLIC_SHADOW_WIRE_KEY=...
NEXT_PUBLIC_RANGE_API_KEY=...
```

### 2. Install Dependencies
```bash
npm install
# Note: This will also compile the local WASM bindings for ZK generation
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to launch the Ghost Payroll dashboard.
