param(
    [int]$TimeoutSeconds = 120,
    [string]$FrontendUrl = 'http://localhost:3001'
)

function Wait-For-Url {
    param(
        [string]$Url,
        [int]$Timeout = 120
    )
    Write-Host "Waiting for $Url (timeout $Timeout seconds)..."
    $start = Get-Date
    while (((Get-Date) - $start).TotalSeconds -lt $Timeout) {
        try {
            $resp = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
            if ($resp.StatusCode -ge 200 -and $resp.StatusCode -lt 400) {
                return $true
            }
        } catch {
            # ignore and keep waiting
        }
        Start-Sleep -Seconds 2
    }
    return $false
}

$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition

Write-Host "Checking for Docker..."
$dockerCmd = Get-Command docker -ErrorAction SilentlyContinue
if ($dockerCmd) {
    try {
        & docker info > $null 2>&1
        $dockerAvailable = $true
    } catch {
        $dockerAvailable = $false
    }
} else {
    $dockerAvailable = $false
}

if ($dockerAvailable) {
    Write-Host "Docker detected — starting services with docker-compose (this may build images)..."
    & docker-compose up --build -d
    if (-not $?) {
        Write-Error "docker-compose failed to start. Ensure Docker is installed and running, and that you have permissions to use it."
        exit 1
    }

    if (Wait-For-Url -Url $FrontendUrl -Timeout $TimeoutSeconds) {
        Write-Host "Frontend is up. Opening browser..."
        Start-Process $FrontendUrl
        exit 0
    } else {
        Write-Warning "Timed out waiting for frontend at $FrontendUrl after $TimeoutSeconds seconds. Check container logs with 'docker-compose logs -f'"
        exit 2
    }
} else {
    Write-Warning "Docker not detected or not usable on this machine. Falling back to local (non-Docker) startup."
    Write-Host "Starting backend and frontend locally in new PowerShell windows..."

    # Start backend in a new PowerShell window using helper script
    $backendScript = Join-Path $scriptRoot 'backend\start-backend.ps1'
    if (Test-Path $backendScript) {
        Start-Process -FilePath powershell -ArgumentList '-NoExit','-NoProfile','-File',$backendScript
    } else {
        Write-Warning "Backend helper script not found at $backendScript. You can run backend manually."
    }

    # Start frontend in a new PowerShell window using helper script
    $frontendScript = Join-Path $scriptRoot 'frontend\start-frontend.ps1'
    if (Test-Path $frontendScript) {
        Start-Process -FilePath powershell -ArgumentList '-NoExit','-NoProfile','-File',$frontendScript
    } else {
        Write-Warning "Frontend helper script not found at $frontendScript. You can run frontend manually."
    }

    Write-Host "Waiting for the frontend to respond at $FrontendUrl..."
    if (Wait-For-Url -Url $FrontendUrl -Timeout $TimeoutSeconds) {
        Write-Host "Frontend is up. Opening browser..."
        Start-Process $FrontendUrl
        exit 0
    } else {
        Write-Warning "Timed out waiting for frontend at $FrontendUrl after $TimeoutSeconds seconds. Check the two PowerShell windows for errors."
        exit 3
    }
}
