/**
 * FlowLedger SDK (Browser-Ready Version)
 * A lightweight wrapper for the FlowLedger smart contract.
 * Uses stacksrank-sdk encoding logic internally.
 */

const FlowLedgerSDK = (() => {
  // --- Private Utility for Clarity Encoding (from stacksrank-sdk) ---
  const encoding = {
    serializeInt: (val) => {
      const hex = BigInt(val).toString(16).padStart(32, '0');
      return '0x00' + hex;
    },
    serializeStringAscii: (str) => {
      const hexStr = Array.from(new TextEncoder().encode(str))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      const lenHex = str.length.toString(16).padStart(8, '0');
      return '0x0d' + lenHex + hexStr;
    },
    formatAddress: (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`
  };

  class SDK {
    constructor(config = {}) {
      this.contractAddress = config.contractAddress || 'SP3AMZ74TRAWC92ZB110E38SZB7F1T06EHZ38QMH4';
      this.contractName = config.contractName || 'transactions-v2';
      this.network = config.network || 'mainnet';
      this.userAddress = null;
    }

    /** Detect and connect Leather wallet */
    async connect() {
      const provider = window.LeatherProvider || window.StacksProvider;
      if (!provider) {
        throw new Error('No Stacks wallet detected. Please install Leather wallet.');
      }

      const response = await provider.request('getAddresses');
      const stxAddress = response.result.addresses.find(
        (a) => a.symbol === 'STX' || a.type === 'stacks'
      );

      if (!stxAddress) throw new Error('No STX address found in wallet.');
      
      this.userAddress = stxAddress.address;
      return this.userAddress;
    }

    /** Add transaction on-chain */
    async addTransaction({ amountSTX, memo, type }) {
      const provider = window.LeatherProvider || window.StacksProvider;
      if (!this.userAddress) throw new Error('Wallet not connected');

      const amountMicro = Math.round(parseFloat(amountSTX) * 1000000);

      const response = await provider.request('stx_callContract', {
        contract: `${this.contractAddress}.${this.contractName}`,
        functionName: 'add-transaction',
        functionArgs: [
          encoding.serializeInt(amountMicro),
          encoding.serializeStringAscii(memo),
          encoding.serializeStringAscii(type),
        ],
        network: this.network,
      });

      return response.result;
    }

    /** Get a specific transaction from the contract */
    async getTransaction(address, txId) {
      const url = `https://stacks-node-api.mainnet.stacks.co/v2/contracts/call-read/${this.contractAddress}/${this.contractName}/get-transaction`;
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sender: address,
            arguments: [
              encoding.serializeStringAscii(address),
              encoding.serializeInt(parseInt(txId)),
            ],
          }),
        });
        const data = await res.json();
        if (data.okay && data.result) {
          return { memo: `Transaction #${txId}`, raw: data.result };
        }
        return null;
      } catch (err) {
        console.error('getTransaction error:', err);
        return null;
      }
    }

    /** Get user balance */
    async getBalance(address) {
      const url = `https://stacks-node-api.mainnet.stacks.co/v2/accounts/${address}/balances`;
      const res = await fetch(url);
      const data = await res.json();
      return (parseInt(data.stx.balance) / 1000000).toFixed(2);
    }

    formatAddress(addr) { return encoding.formatAddress(addr); }
    formatSTX(amt) { return `${parseFloat(amt).toFixed(2)} STX`; }
  }

  return SDK;
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FlowLedgerSDK };
}
