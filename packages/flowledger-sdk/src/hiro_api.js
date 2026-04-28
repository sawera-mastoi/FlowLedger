/**
 * Hiro API Integration for Stacks
 * Provides access to Stacks Blockchain API for real-time data
 */

class HiroAPI {
  constructor(network = 'mainnet') {
    this.baseUrl = network === 'mainnet' 
      ? 'https://api.mainnet.hiro.so' 
      : 'https://api.testnet.hiro.so';
  }

  /**
   * Get current network status
   */
  async getStatus() {
    try {
      const response = await fetch(`${this.baseUrl}/extended/v1/status`);
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch Stacks status from Hiro:', error);
      return null;
    }
  }

  /**
   * Get account balance for a specific address
   */
  async getBalance(address) {
    try {
      const response = await fetch(`${this.baseUrl}/extended/v1/address/${address}/balances`);
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch balance for ${address}:`, error);
      return null;
    }
  }

  /**
   * Get recent transactions for the network
   */
  async getRecentTransactions(limit = 10) {
    try {
      const response = await fetch(`${this.baseUrl}/extended/v1/tx?limit=${limit}`);
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch recent transactions:', error);
      return null;
    }
  }

  /**
   * Get mempool stats
   */
  async getMempoolStats() {
    try {
      const response = await fetch(`${this.baseUrl}/extended/v1/tx/mempool/stats`);
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch mempool stats:', error);
      return null;
    }
  }
}

module.exports = HiroAPI;
