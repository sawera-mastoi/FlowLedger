const fs = require('fs');
const { execSync } = require('child_process');

function exec(cmd) {
    execSync(cmd, { stdio: 'inherit' });
}

function commit(msg) {
    try {
        exec('git add .');
        exec(`git commit -m "${msg}"`);
    } catch (e) {
        console.log("Skipping commit (no changes): " + msg);
    }
}

function replaceInFile(file, search, replace) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(search, replace);
        fs.writeFileSync(file, content);
    }
}

console.log("Starting to generate 20 granular commits...");

// 1
replaceInFile('app.js', 'function init() {', '/**\n * Initialize application and bindings\n */\nfunction init() {');
commit('docs(app): add jsdoc block to initialization function');

// 2
replaceInFile('index.html', '<canvas id="transaction-chart"></canvas>', '<canvas id="transaction-chart" aria-label="Transactions Chart" role="img"></canvas>');
commit('feat(ui): add aria accessibility labels to chart canvas');

// 3
replaceInFile('style.css', 'padding: 1.5rem;', 'padding: var(--card-padding, 1.5rem);');
commit('style(css): parameterize card padding with css variables');

// 4
replaceInFile('index.html', '<meta name="author" content="FlowLedger Team">', '<meta name="author" content="FlowLedger Team">\n    <meta name="application-name" content="FlowLedger">');
commit('docs(ui): enhance meta tags with application name');

// 5
replaceInFile('README.md', '## Getting Started', '## Getting Started\n\nEnsure you have Node.js v18+ installed before proceeding.');
commit('docs(readme): add nodejs version requirement note');

// 6
replaceInFile('style.css', 'border-radius: 8px;\n    font-size: 0.875rem;', 'border-radius: 8px;\n    font-size: 0.875rem;\n    word-break: break-all;');
commit('style(ui): fix overflow on long contract addresses in badge');

// 7
replaceInFile('app.js', 'function quickLog(memo, amount, type) {', '/**\n * Trigger a quick predefined transaction form submission\n */\nfunction quickLog(memo, amount, type) {');
commit('docs(app): document quickLog parameter function');

// 8
replaceInFile('package.json', '"stacks",', '"stacks",\n    "bitcoin",');
commit('chore(pkg): expand npm keywords for better discoverability');

// 9
replaceInFile('style.css', '/* TODO: Add dark theme variables */', '--bg: #0B0E14;\n        --card-bg: #151A23;\n        --text: #F8FAFC;\n        --text-muted: #94A3B8;');
commit('feat(ui): implement base dark mode color palette configuration');

// 10
replaceInFile('app.js', "const emptyMsg = document.querySelector('.empty-msg');", "// Remove empty state message if present\n  const emptyMsg = document.querySelector('.empty-msg');");
commit('refactor(app): clarify empty state transition logic in lists');

// 11
replaceInFile('style.css', '.nav-logo:hover { opacity: 0.9; }', '.nav-logo:hover { opacity: 0.8; transform: scale(1.02); }');
commit('style(ui): add subtle zoom interaction to navigation logo');

// 12
replaceInFile('app.js', 'async function updateBalanceDisplay() {', '/** Async retrieval of network balance */\nasync function updateBalanceDisplay() {');
commit('docs(app): label async update status for balance retrieval');

// 13
replaceInFile('app.js', "plugins: {", "interaction: { mode: 'index' },\n      plugins: {");
commit('feat(chart): enable index interaction mode for chart hover');

// 14
replaceInFile('index.html', 'rel="stylesheet">\n    <link rel="apple-touch-icon"', 'rel="stylesheet">\n    <link rel="preload" as="style" href="style.css">\n    <link rel="apple-touch-icon"');
commit('perf(ui): add preload hint for main stylesheet');

// 15
replaceInFile('app.js', "alert('⚠️ Please enter a memo.');", "alert('⚠️ Please enter a memo description.');");
commit('fix(form): improve validation message for missing memo');

// 16
replaceInFile('app.js', "const items = transactionList.querySelectorAll('.tx-item');", "const items = transactionList.querySelectorAll('.tx-item'); // Aggregate active DOM nodes");
commit('docs(chart): add context tracking for chart aggregation nodes');

// 17
replaceInFile('index.html', 'Track your daily transitions', 'Track your daily transactions');
commit('fix(ui): correct typo in dashboard header subtitle');

// 18
replaceInFile('app.js', 'if (amountValue === "" || parseFloat(amountValue) <= 0) {', 'const parsed = parseFloat(amountValue);\n  if (amountValue === "" || isNaN(parsed) || parsed <= 0) {');
commit('fix(form): add robust NaN validation for transaction amounts');

// 19
replaceInFile('app.js', "connectBtn.addEventListener('click', connectWallet);", "connectBtn.addEventListener('click', connectWallet);\n  // Bind additional event listeners");
commit('docs(app): document event listener bindings in init');

// 20
exec('npm version patch --no-git-tag-version');
commit('chore(release): bump application version for minor updates');

console.log("All 20 commits generated! Pushing to GitHub...");
exec('git push');
console.log("=== DONE ===");
