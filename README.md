# FlowLedger 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![npm version - flowledger-dapp](https://img.shields.io/npm/v/flowledger-dapp?label=flowledger-dapp&color=cb3837)](https://www.npmjs.com/package/flowledger-dapp)
[![npm downloads - flowledger-dapp](https://img.shields.io/npm/dw/flowledger-dapp?label=flowledger-dapp%20downloads&color=blue)](https://www.npmjs.com/package/flowledger-dapp)
[![npm version - stacks-echo-kit](https://img.shields.io/npm/v/stacks-echo-kit?label=stacks-echo-kit&color=cb3837)](https://www.npmjs.com/package/stacks-echo-kit)
[![npm downloads - stacks-echo-kit](https://img.shields.io/npm/dw/stacks-echo-kit?label=stacks-echo-kit%20downloads&color=blue)](https://www.npmjs.com/package/stacks-echo-kit)

![FlowLedger Logo](packages/flowledger-dapp/public/logo.png)

A lightweight dApp to track daily expenses and income, securely storing transaction summaries on-chain via Stacks. Built with two custom npm packages purpose-built for the Stacks ecosystem.

---

## Table of Contents
- [Features](#features)
- [NPM Packages](#npm-packages)
  - [📦 flowledger-dapp](#-flowledger-dapp)
  - [📦 stacks-echo-kit](#-stacks-echo-kit)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Smart Contracts](#smart-contracts)
- [Stacks April Event Requirements](#stacks-april-event-requirements)
- [Roadmap](#roadmap)

---

## Features ✨

- 🔗 **Leather Wallet Integration** — Connect your Stacks wallet and submit transactions on-chain
- 📊 **Spending Analytics** — Doughnut chart showing income vs expenses breakdown
- ⚡ **Quick Log** — One-click buttons for common transactions (Coffee, Lunch, Salary, etc.)
- 🔍 **On-Chain Lookup** — Read any transaction stored in the smart contract
- 📜 **Live Contract** — Powered by a Clarity smart contract deployed on Stacks mainnet
- 📦 **Custom NPM Packages** — Two ecosystem packages published on npm for Stacks developers

---

## NPM Packages 📦

FlowLedger is powered by **two published npm packages** built specifically for the Stacks blockchain ecosystem. Both packages are published on the public npm registry under the `gojo89427` npm account.

---

### 📦 flowledger-dapp

> **The complete FlowLedger DApp package — a daily transaction tracker for Stacks.**

| | |
|---|---|
| **npm** | [`@sawera-mastoi/flowledger-dapp`](https://www.npmjs.com/package/@sawera-mastoi/flowledger-dapp) |
| **Version** | `1.0.3` |
| **License** | MIT |
| **Author** | FlowLedger Team |
| **Registry** | [npmjs.com/package/flowledger-dapp](https://www.npmjs.com/package/flowledger-dapp) |

#### Install

```bash
npm install @sawera-mastoi/flowledger-dapp
```

#### What's Included

The `flowledger-dapp` package contains the full FlowLedger application:

- **Frontend** — HTML/CSS/JS interface for tracking daily expenses & income
- **Clarity Smart Contracts** — On-chain transaction storage (`transactions.clar`, `simple-counter.clar`, `simple-token.clar`, `simple-profile.clar`)
- **FlowLedger SDK** (`@earnwithalee/flowledger-sdk`) — Official SDK for interacting with FlowLedger smart contracts
- **stacks-echo-kit dependency** — Utility toolkit for STX formatting, address validation, and API helpers

#### Dependencies

```json
{
  "dependencies": {
    "@earnwithalee/flowledger-sdk": "file:./packages/flowledger-sdk",
    "stacks-echo-kit": "^1.0.0"
  }
}
```

#### Usage

```js
// Import the full DApp project
const flowledger = require('flowledger-dapp');

// The package integrates directly with the Stacks blockchain
// It bundles the FlowLedger SDK and stacks-echo-kit
```

---

### 📦 stacks-echo-kit

> **A lightweight utility toolkit for the Stacks blockchain ecosystem.** Includes STX formatting, address validation, transaction helpers, price utilities, and network configuration tools.

| | |
|---|---|
| **npm** | [`stacks-echo-kit`](https://www.npmjs.com/package/stacks-echo-kit) |
| **Version** | `1.0.0` |
| **License** | MIT |
| **Author** | earnwithalee |
| **Registry** | [npmjs.com/package/stacks-echo-kit](https://www.npmjs.com/package/stacks-echo-kit) |
| **Repository** | [github.com/sawera-mastoi/stacks-tue](https://github.com/sawera-mastoi/stacks-tue) |

#### Install

```bash
npm install stacks-echo-kit
```

#### API Reference

##### STX Conversion

```js
const kit = require('stacks-echo-kit');

// Convert STX to microSTX
kit.stxToMicro(2.5);        // → 2500000

// Convert microSTX to STX
kit.microToStx(2500000);    // → 2.5
```

##### Address Utilities

```js
// Validate a Stacks address
kit.isValidAddress("SP3AMZ74TRAWC92ZB110E38SZB7F1T06EHZ38QMH4");
// → true

kit.isValidAddress("invalid-address");
// → false

// Truncate address for UI display
kit.truncateAddress("SP3AMZ74TRAWC92ZB110E38SZB7F1T06EHZ38QMH4", 6, 4);
// → "SP3AMZ...QMH4"
```

##### STX Formatting

```js
// Format STX for display
kit.formatStx(2.5);         // → "2.50 STX"
kit.formatStx(1000000);     // → "1,000,000.00 STX"

// Compact formatting for large values
kit.formatCompact(1500000); // → "1.5M STX"
```

##### API URL Builder

```js
// Build Hiro API URLs for mainnet
kit.buildApiUrl("/extended/v1/tx", "mainnet");
// → "https://stacks-node-api.mainnet.stacks.co/extended/v1/tx"

// Build Hiro API URLs for testnet
kit.buildApiUrl("/v2/accounts/SP123.../balances", "testnet");
// → "https://stacks-node-api.testnet.stacks.co/v2/accounts/SP123.../balances"
```

##### Explorer URLs

```js
// Get Stacks Explorer transaction URL
kit.getExplorerTxUrl("0xabc123...", "mainnet");
// → "https://explorer.stacks.co/txid/0xabc123...?chain=mainnet"
```

#### Full List of Exported Functions

| Function | Description |
|---|---|
| `stxToMicro(amount)` | Convert STX to microSTX |
| `microToStx(amount)` | Convert microSTX to STX |
| `isValidAddress(address)` | Validate a Stacks address format |
| `truncateAddress(address, start, end)` | Shorten address for display |
| `formatStx(amount)` | Format STX with 2 decimal places |
| `formatCompact(amount)` | Compact number format (K, M, B) |
| `buildApiUrl(path, network)` | Build Hiro node API URLs |
| `getExplorerTxUrl(txId, network)` | Get Stacks Explorer URL for a tx |

#### Keywords

`stacks` · `stx` · `blockchain` · `bitcoin` · `clarity` · `web3` · `defi` · `wallet` · `hiro` · `leather` · `xverse` · `talent-protocol` · `builder-rewards` · `ecosystem`

---

## Installation

### Install the full project 🚀

```bash
# Clone the repo
git clone https://github.com/sawera-mastoi/FlowLedger.git
cd FlowLedger

# Install dependencies (including stacks-echo-kit from npm)
npm install
```

### Install packages individually

```bash
# Install the full DApp package
npm install @sawera-mastoi/flowledger-dapp

# Install the Stacks utility toolkit
npm install stacks-echo-kit
```

---

## Quick Start

### 1. Using FlowLedger SDK with stacks-echo-kit

```js
const { FlowLedgerSDK } = require('@earnwithalee/flowledger-sdk');
const kit = require('stacks-echo-kit');

// Initialize the SDK
const sdk = new FlowLedgerSDK({
  contractAddress: 'SP3AMZ74TRAWC92ZB110E38SZB7F1T06EHZ38QMH4',
  contractName: 'transactions-v2',
  network: 'mainnet'
});

// Connect wallet
const address = await sdk.connect();
console.log('Connected:', sdk.formatAddress(address));

// Add a transaction
await sdk.addTransaction({
  amountSTX: 5.0,
  memo: 'Coffee purchase',
  type: 'expense'
});

// Get balance using stacks-echo-kit under the hood
const balance = await sdk.getBalance(address);
console.log('Balance:', sdk.formatSTX(balance));

// Validate addresses
console.log(sdk.isValidAddress(address)); // true
```

### 2. Using stacks-echo-kit standalone

```js
const kit = require('stacks-echo-kit');

// Quick STX calculations
const microAmount = kit.stxToMicro(10);      // 10000000
const stxAmount = kit.microToStx(5000000);   // 5.0

// Build API requests
const url = kit.buildApiUrl('/extended/v1/tx/0xabc123', 'mainnet');
const response = await fetch(url);
const txData = await response.json();

// Format for UI
console.log(kit.formatStx(stxAmount));       // "5.00 STX"
console.log(kit.truncateAddress(address));   // "SP3AMZ...QMH4"
```

### 3. Run the DApp locally

```bash
# Install dependencies
npm install

# Serve locally
npx serve .

# Open http://localhost:3000 in your browser
# Install Leather Wallet extension and connect
```

---

## Project Structure 📂

```text
FlowLedger/
│
├── package.json                # Monorepo manager (npm workspaces)
├── README.md                   # This file
├── serve.ps1                   # Local development server script
│
├── packages/
│   ├── flowledger-dapp/        # Main App (npm: flowledger-dapp)
│   │   ├── index.html          # Main application UI
│   │   ├── app.js              # Frontend logic
│   │   ├── style.css           # Styling
│   │   ├── contracts/          # Clarity Smart Contracts
│   │   ├── public/             # Static assets (logo, sdk-bundle)
│   │   └── package.json        
│   │
│   ├── stacks-echo-kit/        # Utility Kit (npm: stacks-echo-kit)
│   │   ├── index.js            # Toolkit logic
│   │   ├── README.md           # Documentation
│   │   └── package.json        
│   │
│   └── flowledger-sdk/         # Official SDK (npm: @earnwithalee/flowledger-sdk)
│       ├── index.js            
│       ├── utils.js            
│       └── package.json        
│
├── .github/                    # GitHub workflows
└── vercel.json                 # Vercel deployment config
```

---

## Smart Contracts 📜

Our contracts are written in Clarity and deployed on Stacks.

FlowLedger deploys several Clarity smart contracts on the Stacks blockchain:

| Contract | Description |
|---|---|
| `transactions.clar` | Core contract — stores daily income/expense entries on-chain |
| `simple-counter.clar` | A basic counter contract for tracking transaction counts |
| `simple-token.clar` | Token contract for FlowLedger ecosystem |
| `simple-profile.clar` | User profile storage on Stacks |

All contracts are written in **Clarity**, the decidable smart contract language for the Stacks blockchain (Bitcoin Layer 2).

---

## Stacks April Event Requirements

To participate in the Stacks April event on Talent Protocol, ensure you meet the following:

*   **Wallet Connection:** Connect a Bitcoin L2 (Stacks-compatible) wallet to [talent.app](https://talent.app).
*   **On-Chain Activity:** Rewards are often based on verified on-chain contributions (smart contract deployments, transaction volume, etc.).
*   **Open-Source Contribution:** Maintain active GitHub contributions to your project repository.
*   **NPM Packages:** Publish and maintain ecosystem packages on the npm registry.
*   **Compliance:** Ensure your wallet address is compliant with international regulations (non-OFAC SDN).
*   **Submission:** Monitor the Talent Protocol dashboard for specific "Builder Challenge" submission buttons or leaderboard entry requirements.

---

## Roadmap 🗺️

Future features and improvements planned for FlowLedger.

- [x] Leather wallet integration
- [x] On-chain transaction submission
- [x] Spending analytics chart
- [x] Quick log buttons
- [x] On-chain transaction lookup
- [x] Published `flowledger-dapp` on npm (`v1.0.1`)
- [x] Published `stacks-echo-kit` on npm (`v1.0.0`)
- [x] FlowLedger SDK (`@earnwithalee/flowledger-sdk`)
- [x] stacks-echo-kit integration across project
- [x] Dark mode theme
- [ ] Multi-wallet support
- [ ] CSV export functionality
- [ ] Transaction history pagination
- [ ] Mobile-responsive redesign

---

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Security

For security-related issues, please see [SECURITY.md](SECURITY.md).

## License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.

---

*Built for the Stacks April Builder Challenge on Talent Protocol. 🚀*

**Published NPM Packages:**
- 📦 [flowledger-dapp](https://www.npmjs.com/package/flowledger-dapp) — Full DApp package
- 📦 [stacks-echo-kit](https://www.npmjs.com/package/stacks-echo-kit) — Stacks utility toolkit

<!-- Documentation update #1 -->

<!-- Documentation update #3 -->

<!-- Documentation update #8 -->

<!-- Documentation update #17 -->

<!-- Documentation update #19 -->

<!-- Documentation update #25 -->

<!-- Documentation update #28 -->

<!-- Documentation update #32 -->

<!-- Documentation update #35 -->

<!-- Documentation update #38 -->

<!-- Documentation update #40 -->

<!-- Documentation update #44 -->

<!-- Documentation update #49 -->

<!-- Documentation update #50 -->

<!-- Documentation update #52 -->

<!-- Documentation update #56 -->

<!-- Documentation update #67 -->

<!-- Documentation update #69 -->

<!-- Documentation update #78 -->

<!-- Documentation update #81 -->

<!-- Documentation update #83 -->

<!-- Documentation update #103 -->

<!-- Documentation update #120 -->

<!-- Documentation update #121 -->

<!-- Documentation update #124 -->

<!-- Documentation update #132 -->

<!-- Documentation update #143 -->

<!-- Documentation update #144 -->

<!-- Documentation update #145 -->

<!-- Documentation update #147 -->

<!-- Documentation update #151 -->

<!-- Documentation update #154 -->

<!-- Documentation update #158 -->

<!-- Documentation update #169 -->

<!-- Documentation update #175 -->

<!-- Documentation update #177 -->

<!-- Documentation update #195 -->

<!-- Documentation update #214 -->

<!-- Documentation update #224 -->

<!-- Documentation update #227 -->

<!-- Documentation update #256 -->

<!-- Documentation update #259 -->

<!-- Documentation update #263 -->

<!-- Documentation update #266 -->

<!-- Documentation update #272 -->

<!-- Documentation update #274 -->

<!-- Documentation update #285 -->

<!-- Documentation update #299 -->
