<#
Simple helper to start backend locally.
Runs npm install (if package.json present), builds TypeScript, then runs node dist/app.js.
#>
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptDir

Write-Host "[backend] Working directory: $scriptDir"
if (Test-Path package.json) {
    Write-Host "[backend] Installing dependencies (npm install)..."
    npm install
}

Write-Host "[backend] Building (npm run build)..."
npm run build

if (Test-Path dist/app.js) {
    Write-Host "[backend] Starting backend: node dist/app.js"
    node dist/app.js
} else {
    Write-Host "[backend] Build did not produce dist/app.js. Check for errors above."
    Pause
}
