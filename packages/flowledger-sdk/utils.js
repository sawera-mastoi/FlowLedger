/**
 * FlowLedger SDK Utilities
 * Re-exports useful functions from stacks-echo-kit for convenience.
 */

const kit = require('stacks-echo-kit');

/**
 * Truncates a Stacks wallet address for UI display.
 * @param {string} address - The full wallet address.
 * @param {number} [start=5] - Characters at start.
 * @param {number} [end=5] - Characters at end.
 * @returns {string} The truncated address (e.g. SP...9XYZ).
 */
function truncateAddress(address, start = 5, end = 5) {
    return kit.truncateAddress(address, start, end);
}

/**
 * Format microSTX to human-readable STX.
 * @param {number} microStx - Amount in microSTX.
 * @returns {string} Formatted STX string.
 */
function formatMicroToStx(microStx) {
    const stx = kit.microToStx(microStx);
    return kit.formatStx(stx);
}

/**
 * Validate a Stacks address.
 * @param {string} address
 * @returns {boolean}
 */
function isValidAddress(address) {
    return kit.isValidAddress(address);
}

module.exports = { truncateAddress, formatMicroToStx, isValidAddress };
