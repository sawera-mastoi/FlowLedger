# FlowLedger ðŸš€

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

![FlowLedger Logo](public/logo.png)

A lightweight dApp to track daily expenses/income and store transaction summaries on-chain via Stacks.

## Table of Contents
- [Requirements](#stacks-april-event-requirements)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)

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
â”‚
â”œâ”€â”€ index.html              # Main application UI
â”œâ”€â”€ style.css               # Global and component styles
â”œâ”€â”€ app.js                  # Frontend logic & Wallet integration
â”‚
â”œâ”€â”€ contracts/              # Stacks Smart Contracts (Clarity)
â”‚   â””â”€â”€ transactions.clar   # Core logic for ledger entries
â”‚
â”œâ”€â”€ public/                 # Static assets (Logo, Favicons)
â”‚   â””â”€â”€ logo.png
â”‚
â”œâ”€â”€ package.json            # Project dependencies
â””â”€â”€ README.md               # Documentation
```

## Recommended NPM Package Name
`flowledger-dapp`

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

---
*Built for the Stacks April Builder Challenge on Talent Protocol.*

## Local Development
1. Clone repository
2. Open index.html in browser
3. Install Leather Wallet extension

## Roadmap
- [ ] Multi-wallet support
- [ ] CSV export functionality


