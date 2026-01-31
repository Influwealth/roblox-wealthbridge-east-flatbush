# WealthBridge East Flatbush - Development Launcher
# This script starts all services for local development

Write-Host "🚀 Starting WealthBridge East Flatbush..." -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Check if setup was run
if (-not (Test-Path "gateway/node_modules")) {
    Write-Host "❌ Gateway dependencies not installed!" -ForegroundColor Red
    Write-Host "Run: .\scripts\auto-generate.ps1 first" -ForegroundColor Yellow
    exit 1
}

if (-not (Test-Path "mcp-ui/node_modules")) {
    Write-Host "❌ MCP UI dependencies not installed!" -ForegroundColor Red
    Write-Host "Run: .\scripts\auto-generate.ps1 first" -ForegroundColor Yellow
    exit 1
}

# Function to start a service in a new window
function Start-Service {
    param(
        [string]$Name,
        [string]$Path,
        [string]$Command,
        [string]$Color
    )
    
    Write-Host "🔄 Starting $Name..." -ForegroundColor $Color
    
    Start-Process powershell -ArgumentList @(
        "-NoExit",
        "-Command",
        "Write-Host '🏙️  $Name Running' -ForegroundColor $Color; Write-Host ''; cd '$Path'; $Command"
    )
}

# Start Gateway (API Server)
Start-Service -Name "Gateway API" -Path "$PWD/gateway" -Command "npm run dev" -Color "Green"
Start-Sleep -Seconds 2

# Start MCP UI (Dashboard)
Start-Service -Name "MCP Dashboard" -Path "$PWD/mcp-ui" -Command "npm run dev" -Color "Cyan"
Start-Sleep -Seconds 2

# Start Rojo (Roblox sync)
Start-Service -Name "Rojo Sync" -Path "$PWD/roblox" -Command "rojo serve default.project.json" -Color "Magenta"

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "✅ All services started!" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "🌐 Service URLs:" -ForegroundColor Cyan
Write-Host "- Gateway API:     http://localhost:8080/health" -ForegroundColor White
Write-Host "- MCP Dashboard:   http://localhost:3000" -ForegroundColor White
Write-Host "- Rojo Sync:       http://localhost:34872" -ForegroundColor White
Write-Host ""
Write-Host "🎮 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Open Roblox Studio" -ForegroundColor White
Write-Host "2. Install the Rojo plugin: https://rojo.space/docs/installation/" -ForegroundColor White
Write-Host "3. Click 'Connect' in Rojo plugin" -ForegroundColor White
Write-Host "4. Start building!" -ForegroundColor White
Write-Host ""
Write-Host "🛑 To stop services: Close all PowerShell windows" -ForegroundColor Yellow
Write-Host ""
