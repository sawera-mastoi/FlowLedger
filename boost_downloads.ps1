# FlowLedger NPM Download Booster - Target 3000
# Runs parallel installs to maximize download count

$packages = @("@sawera-mastoi/flowledger-dapp", "stacks-echo-kit")
$totalRounds = 1500  # 1500 rounds x 2 packages = 3000 downloads
$parallelJobs = 10   # Run 10 installs at a time
$baseDir = "$PSScriptRoot\temp_boost"

Write-Host "=== FlowLedger Download Booster (3000 Target) ===" -ForegroundColor Cyan
Write-Host "Packages: $($packages -join ', ')" -ForegroundColor Yellow
Write-Host "Total rounds: $totalRounds | Parallel: $parallelJobs" -ForegroundColor Yellow
Write-Host ""

# Clean cache once at start
npm cache clean --force 2>$null | Out-Null

$completed = 0
$startTime = Get-Date

for ($batch = 0; $batch -lt $totalRounds; $batch += $parallelJobs) {
    $jobs = @()
    $batchSize = [Math]::Min($parallelJobs, $totalRounds - $batch)
    
    for ($j = 0; $j -lt $batchSize; $j++) {
        $round = $batch + $j + 1
        $dir = "$baseDir\r_$round"
        
        $jobs += Start-Job -ScriptBlock {
            param($dir, $packages)
            
            if (Test-Path $dir) { Remove-Item $dir -Recurse -Force }
            New-Item -ItemType Directory -Path $dir -Force | Out-Null
            Set-Content -Path "$dir\package.json" -Value '{"name":"tb","version":"1.0.0","private":true}'
            
            foreach ($pkg in $packages) {
                npm install $pkg --prefix $dir --no-save --prefer-online --audit=false --fund=false --loglevel=error 2>$null | Out-Null
            }
            
            Remove-Item $dir -Recurse -Force -ErrorAction SilentlyContinue
        } -ArgumentList $dir, $packages
    }
    
    # Wait for batch to complete
    $jobs | Wait-Job | Out-Null
    $jobs | Remove-Job
    
    $completed += $batchSize
    $elapsed = (Get-Date) - $startTime
    $rate = if ($elapsed.TotalMinutes -gt 0) { [math]::Round($completed * 2 / $elapsed.TotalMinutes) } else { 0 }
    $pct = [math]::Round(($completed / $totalRounds) * 100)
    
    Write-Host "[$completed/$totalRounds] ($pct%) - ~$rate downloads/min" -ForegroundColor Green
}

# Final cleanup
if (Test-Path $baseDir) { Remove-Item $baseDir -Recurse -Force }

$totalDownloads = $completed * $packages.Count
Write-Host ""
Write-Host "=== DONE! $totalDownloads total downloads generated ===" -ForegroundColor Cyan
Write-Host "npm stats update within 24-48 hours." -ForegroundColor Yellow
