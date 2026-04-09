/**
 * Truncates a Stacks wallet address for UI display
 * @param {string} address - The full wallet address
 * @returns {string} The truncated address (e.g. SP...9XYZ)
 */
function truncateAddress(address) {
    if (!address) return '';
    return address.substring(0, 5) + '...' + address.substring(address.length - 5);
}

module.exports = { truncateAddress };
