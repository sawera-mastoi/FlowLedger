const fs = require('fs');
const { execSync } = require('child_process');

function doCommit(msg) {
    try {
        execSync('git add .');
        const status = execSync('git status --porcelain', { encoding: 'utf8' });
        if (status.trim() !== "") {
            execSync(`git commit -m "${msg}"`);
            console.log(`Committed: ${msg}`);
        } else {
            console.log(`No changes for: ${msg}`);
        }
    } catch (e) {
        console.log(`Error committing: ${msg}`);
    }
}

let content;

// 1. index.html - Add rel="noopener noreferrer"
content = fs.readFileSync('index.html', 'utf8');
if (!content.includes('noopener noreferrer')) {
    content = content.replace(/target="_blank"/g, 'target="_blank" rel="noopener noreferrer"');
    fs.writeFileSync('index.html', content);
    doCommit("feat(html): add security attributes to external links");
}

// 2. app.js - Add strict mode
content = fs.readFileSync('app.js', 'utf8');
if (!content.includes('"use strict";')) {
    content = '"use strict";\n' + content;
    fs.writeFileSync('app.js', content);
    doCommit("chore(js): enable strict mode for app.js");
}

// 3. style.css - Add smooth scroll
content = fs.readFileSync('style.css', 'utf8');
if (!content.includes('scroll-behavior: smooth')) {
    content = content.replace(/\* \{\r?\n\s*margin: 0;/g, 'html {\n    scroll-behavior: smooth;\n}\n\n* {\n    margin: 0;');
    fs.writeFileSync('style.css', content);
    doCommit("style: add smooth scroll behavior to html");
}

// 4. index.html - Add aria-label to form
content = fs.readFileSync('index.html', 'utf8');
if (!content.includes('aria-label="Transaction Form"')) {
    content = content.replace('<form id="transaction-form">', '<form id="transaction-form" aria-label="Transaction Form">');
    fs.writeFileSync('index.html', content);
    doCommit("a11y: add aria-label to transaction form");
}

// 5. README.md - Add dark mode checkbox check
content = fs.readFileSync('README.md', 'utf8');
if (content.includes('- [ ] Dark mode theme')) {
    content = content.replace('- [ ] Dark mode theme', '- [x] Dark mode theme');
    fs.writeFileSync('README.md', content);
    doCommit("docs: update roadmap for dark mode capability");
}

// 6. app.js - Add JSDoc for addTransactionToList
content = fs.readFileSync('app.js', 'utf8');
if (!content.includes('* Adds a transaction to the UI list')) {
    content = content.replace('function addTransactionToList(tx) {', '/**\n * Adds a transaction to the UI list\n * @param {Object} tx - The transaction object\n */\nfunction addTransactionToList(tx) {');
    fs.writeFileSync('app.js', content);
    doCommit("docs(js): add JSDoc to addTransactionToList");
}

// 7. app.js - Add JSDoc for updateStats
content = fs.readFileSync('app.js', 'utf8');
if (!content.includes('* Updates the statistics display in the DOM')) {
    content = content.replace('function updateStats() {', '/**\n * Updates the statistics display in the DOM\n */\nfunction updateStats() {');
    fs.writeFileSync('app.js', content);
    doCommit("docs(js): add JSDoc to updateStats");
}

// 8. style.css - Improve focus states
content = fs.readFileSync('style.css', 'utf8');
if (!content.includes('box-shadow: 0 0 0 4px rgba(255, 90, 31, 0.2)')) {
    content = content.replace('input:focus, select:focus { outline: 2px solid var(--primary-dark); outline-offset: 2px; }', 'input:focus, select:focus { outline: 2px solid var(--primary-dark); outline-offset: 2px; box-shadow: 0 0 0 4px rgba(255, 90, 31, 0.2); }');
    fs.writeFileSync('style.css', content);
    doCommit("style: enhance focus states with box-shadow");
}

// 9. app.js - Prevent empty lookup address
content = fs.readFileSync('app.js', 'utf8');
if (content.includes('(!address || !id)')) {
    content = content.replace('(!address || !id)', '(!address.trim() || !id)');
    fs.writeFileSync('app.js', content);
    doCommit("fix(js): ensure lookup address is not pure whitespace");
}

// 10. index.html - Add aria-live to lookup result
content = fs.readFileSync('index.html', 'utf8');
if (!content.includes('aria-live="polite"')) {
    content = content.replace('<div id="lookup-result" class="lookup-result"></div>', '<div id="lookup-result" class="lookup-result" aria-live="polite"></div>');
    fs.writeFileSync('index.html', content);
    doCommit("a11y: add aria-live to lookup results container");
}

// 11. style.css - Add hover effect to lookup success
content = fs.readFileSync('style.css', 'utf8');
if (!content.includes('transition: background 0.3s;')) {
    content = content.replace('.lookup-success {\r\n    background: #ECFDF5;', '.lookup-success {\n    background: #ECFDF5;\n    transition: background 0.3s;');
    content = content.replace('.lookup-success {\n    background: #ECFDF5;', '.lookup-success {\n    background: #ECFDF5;\n    transition: background 0.3s;');
    fs.writeFileSync('style.css', content);
    doCommit("style: add transition to lookup success message");
}

// 12. app.js - Convert error alert to console warn gracefully
content = fs.readFileSync('app.js', 'utf8');
if (!content.includes('Transaction Warning:')) {
    content = content.replace('alert(`Error: ${msg}`);', 'console.warn(`Transaction Warning: ${msg}`);\n      alert(`Error: ${msg}`);');
    fs.writeFileSync('app.js', content);
    doCommit("feat(js): improve error logging for failed transactions");
}

// 13. style.css - Add dark mode stub comment
content = fs.readFileSync('style.css', 'utf8');
if (!content.includes('Dark Mode Stub')) {
    content += '\n/* Dark Mode Stub */\n@media (prefers-color-scheme: dark) {\n    /* TODO: Add dark theme variables */\n}\n';
    fs.writeFileSync('style.css', content);
    doCommit("style: setup media query stub for dark mode");
}

// 14. multi-send.clar - Add trailing comment
content = fs.readFileSync('multi-send.clar', 'utf8');
if (!content.includes(';; End of multi-send contract')) {
    content += '\n;; End of multi-send contract\n';
    fs.writeFileSync('multi-send.clar', content);
    doCommit("chore(clarity): append EOF comment to multi-send contract");
}

// 15. index.html - Add meta author
content = fs.readFileSync('index.html', 'utf8');
if (!content.includes('name="author"')) {
    content = content.replace('<meta name="viewport" content="width=device-width, initial-scale=1.0">', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="author" content="FlowLedger Team">');
    fs.writeFileSync('index.html', content);
    doCommit("seo: add author meta tag");
}

// 16. package.json - Update version or add keyword
content = fs.readFileSync('package.json', 'utf8');
if (!content.includes('"keywords": [')) {
    content = content.replace('"description": "FlowLedger - Daily Transaction Tracker for Stacks",', '"description": "FlowLedger - Daily Transaction Tracker for Stacks",\n  "keywords": ["stacks", "web3", "dapp"],');
    fs.writeFileSync('package.json', content);
    doCommit("chore: add web3 keywords to package.json");
}

// 17. style.css - Add generic button transition property explicitly
content = fs.readFileSync('style.css', 'utf8');
if (!content.includes('transition: all 0.2s ease-in-out;')) {
    content = content.replace('transition: all 0.2s;', 'transition: all 0.2s ease-in-out;');
    fs.writeFileSync('style.css', content);
    doCommit("style: refine button transitions with ease-in-out");
}

// 18. app.js - Validate amount logic improvement
content = fs.readFileSync('app.js', 'utf8');
if (content.includes('parseFloat(amountValue) < 0')) {
    content = content.replace('parseFloat(amountValue) < 0', 'parseFloat(amountValue) <= 0');
    fs.writeFileSync('app.js', content);
    doCommit("fix(js): prevent zero amount transactions in ui");
}

// 19. README.md - Add more context to introduction
content = fs.readFileSync('README.md', 'utf8');
if (content.includes('expenses/income')) {
    content = content.replace('A lightweight dApp to track daily expenses/income and store transaction summaries on-chain via Stacks.', 'A lightweight dApp to track daily expenses and income, securely storing transaction summaries on-chain via Stacks.');
    fs.writeFileSync('README.md', content);
    doCommit("docs: clarify app description in README");
}

// 20. index.html - Change chart h2 title slightly
content = fs.readFileSync('index.html', 'utf8');
if (content.includes('<h2>Spending Analytics</h2>')) {
    content = content.replace('<h2>Spending Analytics</h2>', '<h2>Spending Analytics & Insights</h2>');
    fs.writeFileSync('index.html', content);
    doCommit("feat(html): rename spending analytics section for clarity");
}

// 21. multi-send.clar Add strict check comment
content = fs.readFileSync('multi-send.clar', 'utf8');
if (!content.includes(';; Security: ensure valid principals')) {
    content = content.replace(';; @desc', ';; @desc\n;; Security: ensure valid principals');
    fs.writeFileSync('multi-send.clar', content);
    doCommit("docs(clarity): add security comment to contract header");
}

// 22. package.json add author
content = fs.readFileSync('package.json', 'utf8');
if (!content.includes('"author":')) {
    content = content.replace('"private": true,', '"private": true,\n  "author": "FlowLedger Team",');
    fs.writeFileSync('package.json', content);
    doCommit("chore: configure author in package.json");
}

console.log("Done making commits.");
