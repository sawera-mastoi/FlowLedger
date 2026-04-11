# FlowLedger 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![npm](https://img.shields.io/npm/v/stacks-echo-kit)](https://www.npmjs.com/package/stacks-echo-kit)

![FlowLedger Logo](public/logo.png)

A lightweight dApp to track daily expenses/income and store transaction summaries on-chain via Stacks.

## Table of Contents
- [Features](#features)
- [Dependencies](#dependencies)
- [Requirements](#stacks-april-event-requirements)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Roadmap](#roadmap)

## Features

- 🔗 **Leather Wallet Integration** — Connect your Stacks wallet and submit transactions on-chain
- 📊 **Spending Analytics** — Doughnut chart showing income vs expenses breakdown
- ⚡ **Quick Log** — One-click buttons for common transactions (Coffee, Lunch, Salary, etc.)
- 🔍 **On-Chain Lookup** — Read any transaction stored in the smart contract
- 📜 **Live Contract** — Powered by a Clarity smart contract deployed on Stacks mainnet

## Dependencies

This project uses the following ecosystem packages:

| Package | Description |
|---------|-------------|
| [`stacks-echo-kit`](https://www.npmjs.com/package/stacks-echo-kit) | Lightweight utility toolkit for Stacks — STX formatting, address validation, tx helpers, API URL building |
| `@earnwithalee/flowledger-sdk` | Internal SDK wrapping the FlowLedger smart contract interactions |

### stacks-echo-kit Integration

FlowLedger uses `stacks-echo-kit` for:
- **STX ↔ microSTX conversion** (`stxToMicro`, `microToStx`)
- **Address validation & formatting** (`isValidAddress`, `truncateAddress`)
- **API URL building** (`buildApiUrl` for Hiro node API)
- **Display formatting** (`formatStx`, `formatCompact`)

```js
const kit = require('stacks-echo-kit');

kit.microToStx(2500000);   // → 2.5
kit.formatStx(2.5);        // → "2.50 STX"
kit.isValidAddress("SP3AMZ74TRAWC92ZB110E38SZB7F1T06EHZ38QMH4"); // → true
kit.buildApiUrl("/extended/v1/tx", "mainnet");
// → "https://stacks-node-api.mainnet.stacks.co/extended/v1/tx"
```

## Stacks April Event Requirements

To participate in the Stacks April event on Talent Protocol, ensure you meet the following:

*   **Wallet Connection:** Connect a Bitcoin L2 (Stacks-compatible) wallet to [talent.app](https://talent.app).
*   **On-Chain Activity:** Rewards are often based on verified on-chain contributions (smart contract deployments, transaction volume, etc.).
*   **Open-Source Contribution:** Maintain active GitHub contributions to your project repository.
*   **Compliance:** Ensure your wallet address is compliant with international regulations (non-OFAC SDN).
*   **Submission:** Monitor the Talent Protocol dashboard for specific "Builder Challenge" submission buttons or leaderboard entry requirements.

## Project Structure

```text
flowledger/
│
├── index.html              # Main application UI
├── style.css               # Global and component styles
├── app.js                  # Frontend logic & Wallet integration
│
├── contracts/              # Stacks Smart Contracts (Clarity)
│   └── transactions.clar   # Core logic for ledger entries
│
├── packages/
│   └── flowledger-sdk/     # Internal SDK (uses stacks-echo-kit)
│       ├── index.js
│       ├── utils.js
│       └── package.json
│
├── public/                 # Static assets (Logo, SDK bundle)
│   ├── logo.png
│   └── flowledger-sdk.js   # Browser-ready SDK bundle
│
├── package.json            # Project dependencies
└── README.md               # Documentation
```

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
# Open index.html in your browser (or use a local server)
npx serve .
```

### Local Development
1. Clone repository
2. Run `npm install`
3. Install [Leather Wallet](https://leather.io) browser extension
4. Open `index.html` in your browser
5. Connect your wallet and start tracking transactions

## Roadmap
- [x] Leather wallet integration
- [x] On-chain transaction submission
- [x] Spending analytics chart
- [x] Quick log buttons
- [x] On-chain transaction lookup
- [x] stacks-echo-kit integration
- [ ] Multi-wallet support
- [ ] CSV export functionality
- [ ] Dark mode theme
- [ ] Transaction history pagination

---
*Built for the Stacks April Builder Challenge on Talent Protocol.*
