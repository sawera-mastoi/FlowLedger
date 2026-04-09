const fs = require('fs');
const { execSync } = require('child_process');

function execGit(msg) {
    try {
        execSync('git add .');
        execSync(`git commit -m "${msg}"`);
        console.log(`Committed: ${msg}`);
    } catch (e) {
        console.log(`Skipped or failed commit: ${msg} - ` + (e.stdout ? e.stdout.toString() : '') + (e.stderr ? e.stderr.toString() : ''));
    }
}

// 1
let html = fs.readFileSync('index.html', 'utf8');
if (!html.includes('<meta name="description"')) {
    html = html.replace('<meta name="viewport" content="width=device-width, initial-scale=1.0">', '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="description" content="Stacks Echo is a premium dashboard to monitor the Stacks ecosystem.">');
    fs.writeFileSync('index.html', html);
    execGit('docs: Add meta description to improve SEO');
}

// 2
if (!html.includes('aria-label="Overview"')) {
    html = html.replace('<a href="#" class="active">Overview</a>', '<a href="#" class="active" aria-label="Overview">Overview</a>');
    html = html.replace('<li><a href="#">Ecosystem</a></li>', '<li><a href="#" aria-label="Ecosystem">Ecosystem</a></li>');
    html = html.replace('<li><a href="#">Portfolio</a></li>', '<li><a href="#" aria-label="Portfolio">Portfolio</a></li>');
    fs.writeFileSync('index.html', html);
    execGit('feat: Add accessibility aria-labels to navigation links');
}

// 3
let css = fs.readFileSync('index.css', 'utf8');
if (!css.includes('--success: #4ade80;')) {
    css = css.replace('--glass-border: rgba(255, 255, 255, 0.1);', '--glass-border: rgba(255, 255, 255, 0.1);\n    --success: #4ade80;\n    --danger: #f87171;\n    --warning: #f59e0b;');
    fs.writeFileSync('index.css', css);
    execGit('style: Refactor root variables for better color management');
}

// 4
if (!css.includes('color: var(--danger);')) {
    css = css.replace('color: #f87171;', 'color: var(--danger);');
    css = css.replace('color: #4ade80;', 'color: var(--success);');
    fs.writeFileSync('index.css', css);
    execGit('style: Use CSS variables for activity transaction colors');
}

// 5
if (!css.includes('text-shadow:')) {
    css = css.replace('letter-spacing: -2px;', 'letter-spacing: -2px;\n    text-shadow: 0 4px 20px rgba(0,0,0,0.5);');
    fs.writeFileSync('index.css', css);
    execGit('feat: Enhance hero section typography');
}

// 6
if (!css.includes('.activity-item:hover')) {
    css += `\n.activity-item:hover {\n    background: rgba(255, 255, 255, 0.02);\n    cursor: pointer;\n}\n`;
    fs.writeFileSync('index.css', css);
    execGit('feat: Implement hover states for activity items');
}

// 7
let js = fs.readFileSync('script.js', 'utf8');
if (!js.includes('// Initialize theme')) {
    js = js.replace('// Theme Toggle Logic', '// Theme Toggle Logic\n    // Initialize theme based on user preference');
    fs.writeFileSync('script.js', js);
    execGit('script: Add comments to Theme Toggle logic');
}

// 8
if (!js.includes('localStorage.setItem')) {
    js = js.replace('updateCharts(isDark);\n    });', 'updateCharts(isDark);\n        localStorage.setItem("theme", isDark ? "dark" : "light");\n    });');
    fs.writeFileSync('script.js', js);
    execGit('feat: Save theme preference in localStorage');
}

// 9
if (!js.includes('localStorage.getItem')) {
    const initLogic = `let isDark = localStorage.getItem("theme") ? localStorage.getItem("theme") === "dark" : true;\n    if(!isDark) body.classList.add("light-mode");\n    themeBtn.innerHTML = isDark ? '<span class="sun">☀️</span>' : '<span class="moon">🌙</span>';`;
    js = js.replace('let isDark = true;', initLogic);
    fs.writeFileSync('script.js', js);
    execGit('feat: Initialize theme from localStorage');
}

// 10
let md = fs.readFileSync('README.md', 'utf8');
if (!md.includes('persistent state via localStorage')) {
    md = md.replace('- **🌗 Theme Toggle**: Fully functional Dark and Light modes with persistent state', '- **🌗 Theme Toggle**: Fully functional Dark and Light modes with persistent state via localStorage');
    fs.writeFileSync('README.md', md);
    execGit('docs: Update README to include theme toggle functionality');
}

// 11
if (!css.includes('.btn-primary:focus')) {
    css = fs.readFileSync('index.css', 'utf8');
    css += `\n.btn-primary:focus {\n    outline: 2px solid var(--primary);\n    outline-offset: 2px;\n}\n`;
    fs.writeFileSync('index.css', css);
    execGit('style: Improve button focus states for accessibility');
}

// 12
if (!css.includes('.skeleton')) {
    css = fs.readFileSync('index.css', 'utf8');
    css += `\n.skeleton {\n    background: linear-gradient(90deg, #1e293b, #334155, #1e293b);\n    background-size: 200% 100%;\n    animation: loading 1.5s infinite;\n    border-radius: 8px;\n}\n@keyframes loading {\n    0% { background-position: 200% 0; }\n    100% { background-position: -200% 0; }\n}\n`;
    fs.writeFileSync('index.css', css);
    execGit('feat: Add loading skeletons visual classes');
}

// 13
if (!html.includes('id="year"')) {
    html = fs.readFileSync('index.html', 'utf8');
    html = html.replace('2026 Stacks Echo', '<span id="year">2026</span> Stacks Echo');
    fs.writeFileSync('index.html', html);
    execGit('feat: Add dynamic current year in footer');
}

// 14
if (!js.includes('document.getElementById("year")')) {
    js = fs.readFileSync('script.js', 'utf8');
    js += `\n// Set current year\nif (document.getElementById("year")) {\n    document.getElementById("year").textContent = new Date().getFullYear();\n}\n`;
    fs.writeFileSync('script.js', js);
    execGit('script: Auto-update footer copyright year');
}

// 15
if (!css.includes('transform 0.4s ease')) {
    css = fs.readFileSync('index.css', 'utf8');
    let searchStr = "transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);";
    if(css.includes(searchStr)) {
        css = css.replace(searchStr, "transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;");
        fs.writeFileSync('index.css', css);
        execGit('style: Smooth transition for card elements');
    }
}

// 16
if (!html.includes('rel="preload"')) {
    html = fs.readFileSync('index.html', 'utf8');
    html = html.replace('<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>', '<link rel="preload" href="https://cdn.jsdelivr.net/npm/chart.js" as="script">\n    <script src="https://cdn.jsdelivr.net/npm/chart.js" defer></script>');
    fs.writeFileSync('index.html', html);
    execGit('feat: Preload chart.js module for performance');
}

// 17
if (!md.includes('Local Storage')) {
    md = fs.readFileSync('README.md', 'utf8');
    md = md.replace('- **JavaScript (ES6+)**: Core application logic and interaction handling.', '- **JavaScript (ES6+)**: Core application logic, Local Storage handling, and Interactions.');
    fs.writeFileSync('README.md', md);
    execGit('docs: Elaborate on Tech Stack in README');
}

// 18
if (!js.includes('"use strict";')) {
    js = fs.readFileSync('script.js', 'utf8');
    js = js.replace('// Stacks Echo | Dashboard Logic', '// Stacks Echo | Dashboard Logic\n"use strict";');
    fs.writeFileSync('script.js', js);
    execGit('chore: Add strict mode to script.js');
}

try {
    execSync('git push origin main');
    console.log('Pushed all commits to origin main');
} catch (e) {
    console.log('Failed to push: ' + (e.stdout ? e.stdout.toString() : '') + (e.stderr ? e.stderr.toString() : ''));
}
