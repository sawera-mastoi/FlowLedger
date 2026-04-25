const { FlowLedgerSDK } = require('./index');

function assert(condition, message) {
    if (!condition) {
        console.error('❌ FAIL:', message);
        process.exit(1);
    }
    console.log('✅ PASS:', message);
}

console.log('Running @earnwithalee/flowledger-sdk tests...');

const sdk = new FlowLedgerSDK({
    contractAddress: 'SP3AMZ74TRAWC92ZB110E38SZB7F1T06EHZ38QMH4',
    contractName: 'transactions-v2',
    network: 'mainnet'
});

// Initialization
assert(sdk.contractAddress === 'SP3AMZ74TRAWC92ZB110E38SZB7F1T06EHZ38QMH4', 'SDK initialized with correct contract address');
assert(sdk.network === 'mainnet', 'SDK initialized with correct network');

// Formatting Helpers (proxied to kit)
assert(sdk.formatSTX(5) === '5.00 STX', 'sdk.formatSTX works');
assert(sdk.formatAddress('SP3AMZ74TRAWC92ZB110E38SZB7F1T06EHZ38QMH4') === 'SP3AMZ...QMH4', 'sdk.formatAddress works');
assert(sdk.isValidAddress('SP3AMZ74TRAWC92ZB110E38SZB7F1T06EHZ38QMH4') === true, 'sdk.isValidAddress works');

// Serialization helpers (private but testable)
const intHex = sdk._serializeInt(100);
assert(intHex.startsWith('0x00'), 'Integer serialization format is correct');

const strHex = sdk._serializeStringAscii('test');
assert(strHex.startsWith('0x0d'), 'String serialization format is correct');

console.log('All tests passed for @earnwithalee/flowledger-sdk!');
