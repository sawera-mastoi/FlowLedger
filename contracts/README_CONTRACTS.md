# Clarity Smart Contracts for FlowLedger

This directory contains several easy-to-use Clarity smart contracts that you can deploy to the Stacks blockchain.

## 1. Simple Counter (`simple-counter.clar`)
A basic "Hello World" style contract for state management.
- **Functions:** `increment`, `decrement`, `get-counter`
- **Use Case:** Learning basic Clarity or building a simple voting/tally system.

## 2. Simple SIP-010 Token (`simple-token.clar`)
A standard fungible token boilerplate compatible with the SIP-010 standard.
- **Functions:** `transfer`, `mint`, `get-balance`, `get-total-supply`
- **Use Case:** Creating your own currency or loyalty points for your app.

## 3. Simple Profile (`simple-profile.clar`)
A contract to store user-specific metadata (a status message).
- **Functions:** `set-message`, `get-profile`
- **Use Case:** Adding user profiles or "status updates" to your DApp.

## 4. Transactions Ledger (`transactions.clar`)
The core contract for FlowLedger.
- **Functions:** `add-transaction`, `get-transaction`, `get-last-id`
- **Use Case:** Logging financial data or activity history.

---

## How to Deploy

### Using Clarinet (Recommended)
1. Install [Clarinet](https://github.com/hirosystems/clarinet).
2. Initialize a project: `clarinet new my-project`.
3. Copy these `.clar` files into the `contracts/` folder.
4. Run `clarinet check` to verify the code.
5. Deploy to testnet/mainnet using `clarinet deploy`.

### Using Stacks Explorer (Web-based)
1. Go to the [Stacks Explorer Sandbox](https://explorer.hiro.so/sandbox/deploy?chain=mainnet).
2. Connect your wallet (Leather or Xverse).
3. Copy-paste the contract code from these files.
4. Click **Deploy**.
