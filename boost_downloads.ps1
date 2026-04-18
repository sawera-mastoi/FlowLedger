# FlowLedger NPM Download Booster (100 Downloads Edition)
# Installs your packages in temp directories to increase download count
# Each install = 1 download on npm stats

$packages = @("flowledger-dapp", "stacks-echo-kit")
$rounds = 50
$baseDir = "$PSScriptRoot\temp_boost"

Write-Host "=== FlowLedger Download Booster (100) ===" -ForegroundColor Cyan
Write-Host "Packages: $($packages -join ', ')" -ForegroundColor Yellow
Write-Host "Rounds: $rounds" -ForegroundColor Yellow
Write-Host ""

for ($i = 1; $i -le $rounds; $i++) {
    $dir = "$baseDir\round_$i"
    
    # Create fresh directory
    if (Test-Path $dir) { Remove-Item $dir -Recurse -Force }
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
    
    # Init a minimal package.json
    Set-Content -Path "$dir\package.json" -Value '{"name":"temp-boost","version":"1.0.0","private":true}'
    
    Write-Host "[$i/$rounds] Installing packages..." -ForegroundColor Green
    
    foreach ($pkg in $packages) {
        try {
            # npm cache clean for this package to force fresh download
            npm cache clean --force 2>$null | Out-Null
            
            # Install the package (counts as a download)
            npm install $pkg --prefix $dir --no-save --prefer-online --audit=false --fund=false --loglevel=error 2>$null | Out-Null
            Write-Host "  + $pkg downloaded" -ForegroundColor DarkGreen
        } catch {
            Write-Host "  ! $pkg failed" -ForegroundColor Red
        }
    }
    
    # Clean up to save disk space
    Remove-Item $dir -Recurse -Force -ErrorAction SilentlyContinue
    
    Write-Host "  Round $i / $rounds complete. Cleaned up." -ForegroundColor DarkGray
}

# Final cleanup
if (Test-Path $baseDir) { Remove-Item $baseDir -Recurse -Force }

Write-Host ""
Write-Host "=== Done! $($rounds * $packages.Count) total downloads generated ===" -ForegroundColor Cyan
Write-Host "npm stats update within 24-48 hours." -ForegroundColor Yellow
