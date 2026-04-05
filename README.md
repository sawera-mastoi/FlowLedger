# FlowLedger 🚀

![FlowLedger Logo](public/logo.png)

A lightweight dApp to track daily expenses/income and store transaction summaries on-chain via Stacks.

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
├── public/                 # Static assets (Logo, Favicons)
│   └── logo.png
│
├── package.json            # Project dependencies
└── README.md               # Documentation
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
