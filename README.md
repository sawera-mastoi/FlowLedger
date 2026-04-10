# 🌟 Stacks Echo: Unified Ecosystem Dashboard

**Stacks Echo** is a premium, high-performance dashboard designed to provide a unified view of the Stacks ecosystem. It monitors real-time market trends, tracks portfolio allocations, and explores the future of Bitcoin's smart contract layers.

---

## ✨ Features

- **🚀 Real-time Analytics**: Monitor STX price movements and ecosystem TVL with interactive area charts.
- **📊 Portfolio Visualization**: High-fidelity donut charts powered by **Chart.js** for clear asset distribution tracking.
- **💎 Glassmorphism UI**: A cutting-edge, responsive design with smooth animations and a premium look.
- **🌗 Theme Toggle**: Fully functional Dark and Light modes with persistent state via localStorage and optimized color palettes.
- **📜 Transaction History**: Elegant transaction log for tracking recent activities across the Stacks blockchain.
- **🔗 Wallet Integration**: Connect your Stacks wallet via `@stacks/connect` for on-chain interactions.
- **📈 StacksRank SDK**: Integrated with `@earnwithalee/stacksrank-sdk` for smart contract interaction utilities.
- **🔧 Stacks Echo Kit**: Powered by [`stacks-echo-kit`](https://www.npmjs.com/package/stacks-echo-kit) — our own npm utility toolkit.

---

## 📦 Our npm Package: `stacks-echo-kit`

[![npm version](https://img.shields.io/npm/v/stacks-echo-kit.svg)](https://www.npmjs.com/package/stacks-echo-kit)
[![npm downloads](https://img.shields.io/npm/dt/stacks-echo-kit.svg)](https://www.npmjs.com/package/stacks-echo-kit)
[![license](https://img.shields.io/npm/l/stacks-echo-kit.svg)](https://github.com/sawera-mastoi/stacks-tue/blob/main/LICENSE)

A **lightweight, zero-dependency** utility toolkit for the Stacks blockchain ecosystem. Built for dashboard developers, DeFi tools, and Stacks dApp builders.

### Install

```bash
npm install stacks-echo-kit
```

### What's Inside

| Category | Functions |
|----------|-----------|
| 💰 **STX Amounts** | `microToStx`, `stxToMicro`, `formatStx`, `formatCompact` |
| 📍 **Address** | `isValidAddress`, `getAddressNetwork`, `truncateAddress`, `getExplorerAddressUrl` |
| 🔄 **Transactions** | `isTxSuccess`, `isTxFailed`, `isTxPending`, `getExplorerTxUrl`, `formatTxAmount` |
| 📊 **Price & Portfolio** | `calcUsdValue`, `calcPriceChange`, `calcPortfolioAllocation` |
| 🌐 **Network** | `getNetwork`, `buildApiUrl` |
| ⏱️ **Block & Epoch** | `estimateBlockTime`, `calcEpochProgress` |
| 🕐 **Time** | `timeAgo` |

### Quick Example

```javascript
const kit = require("stacks-echo-kit");

kit.microToStx(2500000);           // → 2.5
kit.formatStx(2.5);                // → "2.50 STX"
kit.formatCompact(1200000000);     // → "1.2B"
kit.truncateAddress("SP2X...VF78"); // → "SP2X...VF78"
kit.calcPriceChange(2.0, 2.45);    // → { percent: 22.5, display: "+22.50%", direction: "up" }
kit.buildApiUrl("/extended/v1/tx"); // → "https://stacks-node-api.mainnet.stacks.co/extended/v1/tx"
```

> 👉 **Full docs:** [stacks-echo-kit on npm](https://www.npmjs.com/package/stacks-echo-kit)

---

## 📦 Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) (v9 or later)

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sawera-mastoi/stacks-tue.git
   cd stacks-tue
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```
   This will open the dashboard at `http://localhost:3000`.

---

## 📚 npm Dependencies

| Package | Version | Description |
|---------|---------|-------------|
| [`@earnwithalee/stacksrank-sdk`](https://www.npmjs.com/package/@earnwithalee/stacksrank-sdk) | ^1.0.0 | SDK for interacting with StacksRank smart contracts — includes Clarity value encoding, contract addresses, and Hiro API utilities. |
| [`stacks-echo-kit`](https://www.npmjs.com/package/stacks-echo-kit) | ^1.0.0 | Lightweight utility toolkit — STX formatting, address validation, transaction helpers, portfolio math, and network config. |
| [`@stacks/transactions`](https://www.npmjs.com/package/@stacks/transactions) | ^7.4.0 | Core library for constructing and serializing Stacks transactions. |
| [`@stacks/network`](https://www.npmjs.com/package/@stacks/network) | ^7.3.1 | Network configuration for mainnet, testnet, and devnet environments. |
| [`@stacks/connect`](https://www.npmjs.com/package/@stacks/connect) | ^8.2.6 | Wallet authentication and transaction signing via Leather / Xverse wallets. |
| [`chart.js`](https://www.npmjs.com/package/chart.js) | ^4.5.1 | Flexible, high-performance charting library for data visualization. |

---

## 🛠️ Built With

- **HTML5**: For semantic structure and SEO optimization.
- **Vanilla CSS**: Premium styling with glassmorphism, gradients, and custom micro-animations.
- **JavaScript (ES6+)**: Core application logic, Local Storage handling, and Interactions.
- **Chart.js**: High-performance charting and data visualization.
- **Google Fonts**: Outfit & Plus Jakarta Sans for clean typography.
- **Stacks.js**: Full suite of Stacks blockchain libraries for wallet connection and transaction building.
- **@earnwithalee/stacksrank-sdk**: Custom SDK for StacksRank smart contract interactions.

---

## 🚀 Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Start** | `npm start` | Launch live development server on port 3000 |
| **Generate** | `npm run generate` | Run the commit generation script |
| **Test** | `npm test` | Run test suite |

---

## 👨‍💻 Development

This project was developed with a focus on a comprehensive git history (25+ commits) simulating a professional feature-by-feature development lifecycle.

### Project Structure

```
stacks-tue/
├── index.html          # Main dashboard page
├── index.css           # Premium styles & animations
├── script.js           # Dashboard logic & Chart.js integration
├── generate_commits.js # Automated commit generation utility
├── package.json        # npm configuration & dependencies
├── node_modules/       # Installed packages
└── README.md           # Project documentation
```

---

## 📄 License

This project is licensed under the **MIT License**.

---

*Built with ❤️ for the Stacks Community.*
