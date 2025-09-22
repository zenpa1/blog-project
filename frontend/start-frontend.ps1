<#
Simple helper to start frontend locally.
Runs npm install (if package.json present) then npm start (CRA dev server).
#>
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptDir

Write-Host "[frontend] Working directory: $scriptDir"
if (Test-Path package.json) {
    Write-Host "[frontend] Installing dependencies (npm install)..."
    npm install
}

Write-Host "[frontend] Starting frontend (npm start)..."
npm start
