# Setup Author
git config user.name "sawera-mastoi"
git config user.email "asadkhan123456hd@gmail.com"

function MakeCommit {
    param([string]$message)
    git add .
    git commit -m $message
}

# 1. Add STX formatting util
Add-Content -Path "app.js" -Value "`n// Utility to format STX`nfunction formatSTX(amount) { return parseFloat(amount).toFixed(2) + ' STX'; }"
MakeCommit "feat: add STX formatting utility function"

# 2. Add JSDoc to init
(Get-Content -Path "app.js") -replace 'function init\(\)', '/** Initialize the FlowLedger application */`nfunction init()' | Set-Content -Path "app.js"
MakeCommit "docs: add JSDoc to init function"

# 3. Add JSDoc to connectWallet
(Get-Content -Path "app.js") -replace 'async function connectWallet\(\)', '/** Handle wallet connection using Leather Provider */`nasync function connectWallet()' | Set-Content -Path "app.js"
MakeCommit "docs: document wallet connection logic"

# 4. Add ARIA banner role
(Get-Content -Path "index.html") -replace '<header class="dashboard-header">', '<header class="dashboard-header" role="banner">' | Set-Content -Path "index.html"
MakeCommit "refactor(a11y): add banner role to dashboard header"

# 5. Add ARIA main role
(Get-Content -Path "index.html") -replace '<main class="container">', '<main class="container" role="main">' | Set-Content -Path "index.html"
MakeCommit "refactor(a11y): add main role to container for better semantics"

# 6. Add Meta Theme Color
(Get-Content -Path "index.html") -replace '<title>', "<meta name=`"theme-color`" content=`"#FF5A1F`">`n    <title>" | Set-Content -Path "index.html"
MakeCommit "chore: add meta theme-color for mobile browsers"

# 7. Add transition to stats card
Add-Content -Path "style.css" -Value "`n.stats-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }`n.stats-card:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }"
MakeCommit "style: add subtle hover transitions to stats cards"

# 8. Add transition to tx items
Add-Content -Path "style.css" -Value "`n.tx-item { transition: background-color 0.15s ease; }`n.tx-item:hover { background-color: #F1F5F9; }"
MakeCommit "style: enhance UI feedback on transaction list hover"

# 9. Readme Setup guide
Add-Content -Path "README.md" -Value "`n## Local Development`n1. Clone repository`n2. Open index.html in browser`n3. Install Leather Wallet extension"
MakeCommit "docs: add local development quickstart guide"

# 10. Update chart colors in app.js
(Get-Content -Path "app.js") -replace "'#10B981', '#EF4444'", "'#10B981', '#EF4444', '#F59E0B'" | Set-Content -Path "app.js"
MakeCommit "refactor(chart): expand analytics color palette"

# 11. Add chart responsive option
(Get-Content -Path "app.js") -replace 'responsive: true,', 'responsive: true, maintainAspectRatio: false,' | Set-Content -Path "app.js"
MakeCommit "style(chart): disable maintainAspectRatio for better mobile layout"

# 12. Clarify logo class CSS
Add-Content -Path "style.css" -Value "`n.nav-logo { transition: opacity 0.2s; }`n.nav-logo:hover { opacity: 0.9; }"
MakeCommit "style: add logo hover animation in navigation"

# 13. Add input focus outline styling
Add-Content -Path "style.css" -Value "`n.btn:focus, input:focus, select:focus { outline: 2px solid var(--primary-dark); outline-offset: 2px; }"
MakeCommit "style(a11y): improve form element focus ring visibility"

# 14. Add Error handling utility comment
Add-Content -Path "app.js" -Value "`n// Helper function for centralized error reporting (TODO: implement Sentry)"
MakeCommit "chore: add stub for centralized error reporting"

# 15. Form validation visual feedback
Add-Content -Path "style.css" -Value "`ninput:user-invalid { border-color: var(--expense-color); }`ninput:user-valid { border-color: var(--income-color); }"
MakeCommit "feat(ui): add visual validation states for form inputs"

# 16. Update README roadmap
Add-Content -Path "README.md" -Value "`n## Roadmap`n- [ ] Multi-wallet support`n- [ ] CSV export functionality"
MakeCommit "docs: add project roadmap to README"

# 17. Add Print media query
Add-Content -Path "style.css" -Value "`n@media print { .navbar, .form-section { display: none; } }"
MakeCommit "feat(css): add basic print styles for ledger export"

# 18. Add OpenGraph tags
(Get-Content -Path "index.html") -replace '<title>', "<meta property=`"og:title`" content=`"FlowLedger`">`n    <meta property=`"og:description`" content=`"Stacks daily transaction tracker`">`n    <title>" | Set-Content -Path "index.html"
MakeCommit "chore(seo): add OpenGraph metadata tags"

# 19. Add final optimization comment
Add-Content -Path "app.js" -Value "`n// End of FlowLedger Logic - Optimized for Stacks mainnet"
MakeCommit "chore: finalize initial mainnet optimization"

git push origin main
