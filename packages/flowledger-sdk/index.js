/**
 * FlowLedger SDK
 * Official SDK for interacting with FlowLedger smart contracts.
 * Relies on @earnwithalee/stacksrank-sdk for underlying Clarity operations.
 */

const { encoding, wallet, api } = require('@earnwithalee/stacksrank-sdk');

class FlowLedgerSDK {
  constructor(config = {}) {
    this.contractAddress = config.contractAddress || 'SP3AMZ74TRAWC92ZB110E38SZB7F1T06EHZ38QMH4';
    this.contractName = config.contractName || 'transactions-v2';
    this.network = config.network || 'mainnet';
  }

  /**
   * Connect to the user's Stacks wallet (Leather/Hiro).
   * @returns {Promise<string>} The connected STX address.
   */
  async connect() {
    const { available } = wallet.detectWallet();
    if (!available) {
      throw new Error('Stacks wallet not detected. Please install Leather wallet.');
    }
    return await wallet.connectWallet();
  }

  /**
   * Add a new transaction to the ledger.
   * @param {Object} tx - The transaction data.
   * @param {number} tx.amountSTX - Amount in STX.
   * @param {string} tx.memo - A short memo (max 50 chars).
   * @param {string} tx.type - "income" or "expense" (max 10 chars).
   * @returns {Promise<Object>} The transaction broadcast response.
   */
  async addTransaction({ amountSTX, memo, type }) {
    // Convert STX to micro-STX (uint)
    const amountMicro = Math.round(parseFloat(amountSTX) * 1000000);

    // Encode arguments using stacksrank-sdk
    const args = [
      encoding.encodeInt(amountMicro),
      encoding.encodeStringAscii(memo),
      encoding.encodeStringAscii(type)
    ];

    return await wallet.callContract({
      contract: `${this.contractAddress}.${this.contractName}`,
      functionName: 'add-transaction',
      functionArgs: args,
      network: this.network
    });
  }

  /**
   * Get a specific transaction by user address and ID.
   * @param {string} userAddress - The Stacks address.
   * @param {number} txId - The transaction ID.
   * @returns {Promise<Object|null>} The transaction data or null.
   */
  async getTransaction(userAddress, txId) {
    const result = await api.readContract({
      contractAddress: this.contractAddress,
      contractName: this.contractName,
      functionName: 'get-transaction',
      functionArgs: [
        encoding.encodePrincipal(userAddress),
        encoding.encodeUint(txId)
      ],
      network: this.network
    });

    return result;
  }

  /**
   * Get the last transaction ID from the contract.
   * @returns {Promise<number>} The last ID.
   */
  async getLastId() {
    const result = await api.readContract({
      contractAddress: this.contractAddress,
      contractName: this.contractName,
      functionName: 'get-last-id',
      functionArgs: [],
      network: this.network
    });
    
    // Result handling depends on api.readContract's return format (assuming it extracts the value)
    return result;
  }

  /**
   * Format an address for short display.
   * @param {string} address 
   * @returns {string} Shortened address.
   */
  formatAddress(address) {
    return wallet.formatAddress(address);
  }

  /**
   * Format STX amount.
   * @param {number|string} amount 
   * @returns {string} Formatted STX string.
   */
  formatSTX(amount) {
    return `${parseFloat(amount).toFixed(2)} STX`;
  }
}

module.exports = { FlowLedgerSDK };
