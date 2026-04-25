const kit = require('./index');

function assert(condition, message) {
    if (!condition) {
        console.error('❌ FAIL:', message);
        process.exit(1);
    }
    console.log('✅ PASS:', message);
}

console.log('Running stacks-echo-kit tests...');

// STX Conversion
assert(kit.stxToMicro(1) === 1000000, 'stxToMicro(1) should be 1000000');
assert(kit.microToStx(1000000) === 1, 'microToStx(1000000) should be 1');
assert(kit.formatStx(2.5) === '2.50 STX', 'formatStx(2.5) should be "2.50 STX"');

// Address Validation
assert(kit.isValidAddress('SP3AMZ74TRAWC92ZB110E38SZB7F1T06EHZ38QMH4'), 'SP... address should be valid');
assert(kit.isValidAddress('ST3AMZ74TRAWC92ZB110E38SZB7F1T06EHZ38QMH4'), 'ST... address should be valid');
assert(!kit.isValidAddress('invalid'), 'Invalid address should be rejected');

// Address Truncation
assert(kit.truncateAddress('SP3AMZ74TRAWC92ZB110E38SZB7F1T06EHZ38QMH4', 4, 4) === 'SP3A...QMH4', 'truncateAddress works');

// Network Utilities
assert(kit.getNetwork('mainnet').chainId === 1, 'mainnet chainId is 1');
assert(kit.buildApiUrl('/v2/info', 'mainnet') === 'https://stacks-node-api.mainnet.stacks.co/v2/info', 'buildApiUrl works');

// Price Utilities
const change = kit.calcPriceChange(1.0, 1.1);
assert(change.percent === 10, 'Price change percentage is correct');
assert(change.direction === 'up', 'Price change direction is correct');

console.log('All tests passed for stacks-echo-kit!');
