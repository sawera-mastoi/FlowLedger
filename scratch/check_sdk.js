const sdk = require('../packages/flowledger-sdk');

console.log("Checking FlowLedger SDK Exports:");
console.log("- FlowLedgerSDK:", typeof sdk.FlowLedgerSDK);
console.log("- withPaymentInterceptor:", typeof sdk.withPaymentInterceptor);
console.log("- mainnetConfig:", typeof sdk.mainnetConfig);
console.log("- DEFAULT_SBTC_CONTRACT:", sdk.DEFAULT_SBTC_CONTRACT.mainnet);
console.log("- PAYMENT_SIGNATURE_HEADER:", sdk.PAYMENT_SIGNATURE_HEADER);

if (sdk.withPaymentInterceptor && sdk.FlowLedgerSDK && sdk.PAYMENT_SIGNATURE_HEADER === 'payment-signature') {
    console.log("\n✅ ALL EXPORTS VERIFIED SUCCESSFULLY!");
} else {
    console.log("\n❌ EXPORT VERIFICATION FAILED!");
    process.exit(1);
}
