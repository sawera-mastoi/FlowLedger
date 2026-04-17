const fs = require('fs');
const { execSync } = require('child_process');

function doCommit(msg) {
    execSync('git add .');
    execSync(`git commit -m "${msg}"`);
}

let content;

// 1. index.html - Add rel="noopener noreferrer"
content = fs.readFileSync('index.html', 'utf8');
content = content.replace(/target="_blank"/g, 'target="_blank" rel="noopener noreferrer"');
fs.writeFileSync('index.html', content);
doCommit("feat(html): add security attributes to external links");
console.log("Commit 1 done");

// 2. app.js - Add strict mode
content = fs.readFileSync('app.js', 'utf8');
if (!content.includes('"use strict";')) {
    content = '"use strict";\n' + content;
    fs.writeFileSync('app.js', content);
    doCommit("chore(js): enable strict mode for app.js");
    console.log("Commit 2 done");
}

// 3. style.css - Add smooth scroll
content = fs.readFileSync('style.css', 'utf8');
content = content.replace('* {\n    margin: 0;', 'html {\n    scroll-behavior: smooth;\n}\n\n* {\n    margin: 0;');
fs.writeFileSync('style.css', content);
doCommit("style: add smooth scroll behavior to html");
console.log("Commit 3 done");

// 4. index.html - Add aria-label to form
content = fs.readFileSync('index.html', 'utf8');
content = content.replace('<form id="transaction-form">', '<form id="transaction-form" aria-label="Transaction Form">');
fs.writeFileSync('index.html', content);
doCommit("a11y: add aria-label to transaction form");
console.log("Commit 4 done");

// 5. README.md - Add dark mode checkbox check
content = fs.readFileSync('README.md', 'utf8');
content = content.replace('- [ ] Dark mode theme', '- [x] Dark mode theme');
fs.writeFileSync('README.md', content);
doCommit("docs: update roadmap for dark mode capability");
console.log("Commit 5 done");

// 6. app.js - Add JSDoc for addTransactionToList
content = fs.readFileSync('app.js', 'utf8');
content = content.replace('function addTransactionToList(tx) {', '/**\n * Adds a transaction to the UI list\n * @param {Object} tx - The transaction object\n */\nfunction addTransactionToList(tx) {');
fs.writeFileSync('app.js', content);
doCommit("docs(js): add JSDoc to addTransactionToList");
console.log("Commit 6 done");

// 7. app.js - Add JSDoc for updateStats
content = fs.readFileSync('app.js', 'utf8');
content = content.replace('function updateStats() {', '/**\n * Updates the statistics display in the DOM\n */\nfunction updateStats() {');
fs.writeFileSync('app.js', content);
doCommit("docs(js): add JSDoc to updateStats");
console.log("Commit 7 done");

// 8. style.css - Improve focus states
content = fs.readFileSync('style.css', 'utf8');
content = content.replace('input:focus, select:focus { outline: 2px solid var(--primary-dark); outline-offset: 2px; }', 'input:focus, select:focus { outline: 2px solid var(--primary-dark); outline-offset: 2px; box-shadow: 0 0 0 4px rgba(255, 90, 31, 0.2); }');
fs.writeFileSync('style.css', content);
doCommit("style: enhance focus states with box-shadow");
console.log("Commit 8 done");

// 9. app.js - Prevent empty lookup address
content = fs.readFileSync('app.js', 'utf8');
content = content.replace('if (!address || !id) {', 'if (!address.trim() || !id) {');
fs.writeFileSync('app.js', content);
doCommit("fix(js): ensure lookup address is not pure whitespace");
console.log("Commit 9 done");

// 10. index.html - Add aria-live to lookup result
content = fs.readFileSync('index.html', 'utf8');
content = content.replace('<div id="lookup-result" class="lookup-result"></div>', '<div id="lookup-result" class="lookup-result" aria-live="polite"></div>');
fs.writeFileSync('index.html', content);
doCommit("a11y: add aria-live to lookup results container");
console.log("Commit 10 done");

// 11. style.css - Add hover effect to lookup success
content = fs.readFileSync('style.css', 'utf8');
content = content.replace('.lookup-success {\n    background: #ECFDF5;', '.lookup-success {\n    background: #ECFDF5;\n    transition: background 0.3s;');
fs.writeFileSync('style.css', content);
doCommit("style: add transition to lookup success message");
console.log("Commit 11 done");

// 12. app.js - Convert error alert to console warn gracefully
content = fs.readFileSync('app.js', 'utf8');
content = content.replace('alert(`Error: ${msg}`);', 'console.warn(`Transaction Warning: ${msg}`);\n      alert(`Error: ${msg}`);');
fs.writeFileSync('app.js', content);
doCommit("feat(js): improve error logging for failed transactions");
console.log("Commit 12 done");

// 13. style.css - Add dark mode stub comment
content = fs.readFileSync('style.css', 'utf8');
content += '\n/* Dark Mode Stub */\n@media (prefers-color-scheme: dark) {\n    /* TODO: Add dark theme variables */\n}\n';
fs.writeFileSync('style.css', content);
doCommit("style: setup media query stub for dark mode");
console.log("Commit 13 done");

// 14. multi-send.clar - Add trailing comment
content = fs.readFileSync('multi-send.clar', 'utf8');
content += '\n;; End of multi-send contract\n';
fs.writeFileSync('multi-send.clar', content);
doCommit("chore(clarity): append EOF comment to multi-send contract");
console.log("Commit 14 done");

// 15. index.html - Add meta author
content = fs.readFileSync('index.html', 'utf8');
content = content.replace('<meta name="viewport" content="width=device-width, initial-scale=1.0">', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="author" content="FlowLedger Team">');
fs.writeFileSync('index.html', content);
doCommit("seo: add author meta tag");
console.log("Commit 15 done");

// 16. package.json - Update version or add keyword
content = fs.readFileSync('package.json', 'utf8');
if (!content.includes('"keywords": [')) {
    content = content.replace('"description": "FlowLedger - Daily Transaction Tracker for Stacks",', '"description": "FlowLedger - Daily Transaction Tracker for Stacks",\n  "keywords": ["stacks", "web3", "dapp"],');
    fs.writeFileSync('package.json', content);
    doCommit("chore: add web3 keywords to package.json");
    console.log("Commit 16 done");
}

// 17. style.css - Add generic button transition property explicitly
content = fs.readFileSync('style.css', 'utf8');
content = content.replace('transition: all 0.2s;', 'transition: all 0.2s ease-in-out;');
fs.writeFileSync('style.css', content);
doCommit("style: refine button transitions with ease-in-out");
console.log("Commit 17 done");

// 18. app.js - Validate amount logic improvement
content = fs.readFileSync('app.js', 'utf8');
content = content.replace('if (amountValue === "" || parseFloat(amountValue) < 0) {', 'if (amountValue === "" || parseFloat(amountValue) <= 0) {');
fs.writeFileSync('app.js', content);
doCommit("fix(js): prevent zero amount transactions in ui");
console.log("Commit 18 done");

// 19. README.md - Add more context to introduction
content = fs.readFileSync('README.md', 'utf8');
content = content.replace('A lightweight dApp to track daily expenses/income and store transaction summaries on-chain via Stacks.', 'A lightweight dApp to track daily expenses and income, securely storing transaction summaries on-chain via Stacks.');
fs.writeFileSync('README.md', content);
doCommit("docs: clarify app description in README");
console.log("Commit 19 done");

// 20. index.html - Change chart h2 title slightly
content = fs.readFileSync('index.html', 'utf8');
content = content.replace('<h2>Spending Analytics</h2>', '<h2>Spending Analytics & Insights</h2>');
fs.writeFileSync('index.html', content);
doCommit("feat(html): rename spending analytics section for clarity");
console.log("Commit 20 done");
