# @earnwithalee/flowledger-sdk

The official SDK for interacting with FlowLedger smart contracts on the Stacks blockchain.

## Features
- 🔐 **Wallet Integration** - Simplified connection to Stacks wallets (Leather/Hiro).
- 📜 **Contract Wrapper** - Easy-to-use methods for the FlowLedger `transactions-v2` contract.
- ⚡ **Auto-Encoding** - Automatic Clarity Value encoding via `@earnwithalee/stacksrank-sdk`.
- 📊 **Read-Only API** - Quick access to transaction status and ledger history.

## Installation
```bash
npm install @earnwithalee/flowledger-sdk --save stacks-echo-kit
```

## Quick Start
```javascript
const { FlowLedgerSDK } = require('@earnwithalee/flowledger-sdk');

const sdk = new FlowLedgerSDK({
  network: 'mainnet' // or 'testnet'
});

// 1. Connect Wallet
const address = await sdk.connect();
console.log(`Connected: ${sdk.formatAddress(address)}`);

// 2. Add Transaction
const response = await sdk.addTransaction({
  amountSTX: 10,
  memo: "Talent Protocol reward",
  type: "income"
});
console.log('Transaction Broadcasted:', response.txId);

// 3. Get User Balance (via Hiro API)
const balance = await sdk.getUserBalance(address);
console.log(`Balance: ${sdk.formatSTX(balance)}`);
```

## API Reference

### `new FlowLedgerSDK(config)`
- `config.network`: 'mainnet' or 'testnet' (default: 'mainnet')
- `config.contractAddress`: The Stacks address where the contract is deployed.
- `config.contractName`: The name of the contract (default: 'transactions-v2').

### `sdk.connect()`
Prompts the user to connect their Stacks wallet. Returns the connected address.

### `sdk.addTransaction({ amountSTX, memo, type })`
Calls the `add-transaction` public function on the smart contract.

### `sdk.getTransaction(userAddress, txId)`
Retrieves a specific transaction from the ledger.

### `sdk.getLastId()`
Returns the latest transaction ID stored in the contract.

## License
MIT
