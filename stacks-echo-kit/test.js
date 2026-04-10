/**
 * @earnwithalee/stacks-echo-kit — Test Suite
 */

const kit = require("./index");

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ ${name}`);
    passed++;
  } catch (e) {
    console.log(`  ❌ ${name} — ${e.message}`);
    failed++;
  }
}

function assert(condition, msg) {
  if (!condition) throw new Error(msg || "Assertion failed");
}

console.log("\n🧪 @earnwithalee/stacks-echo-kit Tests\n");

// ── STX Amounts ──
console.log("STX Amounts:");
test("microToStx converts correctly", () => {
  assert(kit.microToStx(1000000) === 1, "Expected 1");
  assert(kit.microToStx(2500000) === 2.5, "Expected 2.5");
  assert(kit.microToStx("500000") === 0.5, "Expected 0.5 from string");
});

test("stxToMicro converts correctly", () => {
  assert(kit.stxToMicro(1) === 1000000, "Expected 1000000");
  assert(kit.stxToMicro(0.5) === 500000, "Expected 500000");
  assert(kit.stxToMicro("2.5") === 2500000, "Expected 2500000 from string");
});

test("formatStx formats display string", () => {
  const result = kit.formatStx(1234.5);
  assert(result.includes("STX"), "Should contain STX");
  assert(result.includes("1,234.50"), "Should be formatted");
});

test("formatCompact shortens numbers", () => {
  assert(kit.formatCompact(1500000000) === "1.5B", "Expected 1.5B");
  assert(kit.formatCompact(2500000) === "2.5M", "Expected 2.5M");
  assert(kit.formatCompact(142500) === "142.5K", "Expected 142.5K");
  assert(kit.formatCompact(500) === "500", "Expected 500");
});

// ── Address ──
console.log("\nAddress:");
test("isValidAddress validates correctly", () => {
  assert(kit.isValidAddress("SP000000000000000000002Q6VF78") === true, "Valid mainnet");
  assert(kit.isValidAddress("ST000000000000000000002AMW42H") === true, "Valid testnet");
  assert(kit.isValidAddress("0x1234") === false, "Ethereum address invalid");
  assert(kit.isValidAddress("") === false, "Empty string invalid");
  assert(kit.isValidAddress(123) === false, "Number invalid");
});

test("getAddressNetwork detects network", () => {
  assert(kit.getAddressNetwork("SP000000000000000000002Q6VF78") === "mainnet");
  assert(kit.getAddressNetwork("ST000000000000000000002AMW42H") === "testnet");
  assert(kit.getAddressNetwork("invalid") === null);
});

test("truncateAddress truncates correctly", () => {
  const result = kit.truncateAddress("SP000000000000000000002Q6VF78");
  assert(result.includes("..."), "Should contain ellipsis");
  assert(result.startsWith("SP00"), "Should start with SP00");
  assert(result.endsWith("VF78"), "Should end with VF78");
});

test("getExplorerAddressUrl builds URL", () => {
  const url = kit.getExplorerAddressUrl("SP000000000000000000002Q6VF78");
  assert(url.includes("explorer.hiro.so"), "Should use Hiro explorer");
  assert(url.includes("SP000000000000000000002Q6VF78"), "Should contain address");
});

// ── Transactions ──
console.log("\nTransactions:");
test("isTxSuccess checks status", () => {
  assert(kit.isTxSuccess("success") === true);
  assert(kit.isTxSuccess("pending") === false);
});

test("isTxFailed checks abort statuses", () => {
  assert(kit.isTxFailed("abort_by_response") === true);
  assert(kit.isTxFailed("abort_by_post_condition") === true);
  assert(kit.isTxFailed("success") === false);
});

test("isTxPending checks pending", () => {
  assert(kit.isTxPending("pending") === true);
  assert(kit.isTxPending("success") === false);
});

test("getExplorerTxUrl builds tx URL", () => {
  const url = kit.getExplorerTxUrl("abc123");
  assert(url.includes("0xabc123"), "Should add 0x prefix");
});

test("formatTxAmount formats sent/received", () => {
  const sent = kit.formatTxAmount(-150);
  assert(sent.type === "sent", "Should be sent");
  assert(sent.display.startsWith("-"), "Should start with minus");

  const received = kit.formatTxAmount(1200);
  assert(received.type === "received", "Should be received");
  assert(received.display.startsWith("+"), "Should start with plus");
});

// ── Price & Portfolio ──
console.log("\nPrice & Portfolio:");
test("calcUsdValue calculates correctly", () => {
  const result = kit.calcUsdValue(100, 2.45);
  assert(result.startsWith("$"), "Should start with $");
  assert(result.includes("245"), "Should be ~$245");
});

test("calcPriceChange computes percentage", () => {
  const result = kit.calcPriceChange(2.0, 2.5);
  assert(result.direction === "up", "Should be up");
  assert(result.percent === 25, "Should be 25%");
  assert(result.display === "+25.00%", "Should show +25.00%");

  const down = kit.calcPriceChange(2.5, 2.0);
  assert(down.direction === "down", "Should be down");
});

test("calcPortfolioAllocation computes %", () => {
  const result = kit.calcPortfolioAllocation([
    { name: "STX", amount: 45 },
    { name: "BTC", amount: 30 },
    { name: "ALEX", amount: 25 },
  ]);
  assert(result[0].percent === 45, "STX should be 45%");
  assert(result[1].percent === 30, "BTC should be 30%");
  assert(result[2].percent === 25, "ALEX should be 25%");
});

// ── Network ──
console.log("\nNetwork:");
test("getNetwork returns config", () => {
  const net = kit.getNetwork("mainnet");
  assert(net.name === "mainnet");
  assert(net.url.includes("stacks.co"));
});

test("buildApiUrl creates full URL", () => {
  const url = kit.buildApiUrl("/extended/v1/tx");
  assert(url.includes("stacks.co/extended/v1/tx"));
});

// ── Block & Epoch ──
console.log("\nBlock & Epoch:");
test("estimateBlockTime calculates time", () => {
  const result = kit.estimateBlockTime(100000, 100100);
  assert(result.blocks === 100, "Should be 100 blocks");
  assert(result.minutes === 1000, "Should be 1000 minutes");
  assert(result.display.includes("h"), "Should show hours");
});

test("calcEpochProgress computes percentage", () => {
  const result = kit.calcEpochProgress(1050, 1000, 2100);
  assert(result.progress > 0, "Should be > 0");
  assert(result.display.includes("%"), "Should show %");
});

// ── Time ──
console.log("\nTime:");
test("timeAgo returns relative time", () => {
  const now = Math.floor(Date.now() / 1000);
  assert(kit.timeAgo(now) === "just now");
  assert(kit.timeAgo(now - 300).includes("minutes ago"));
  assert(kit.timeAgo(now - 7200).includes("hours ago"));
  assert(kit.timeAgo(now - 172800).includes("days ago"));
});

// ── Summary ──
console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`  Results: ${passed} passed, ${failed} failed`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

process.exit(failed > 0 ? 1 : 0);
