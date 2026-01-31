# WealthBridge East Flatbush - Auto-Generation Script
# This script sets up everything you need to run the project

Write-Host "🏙️  WealthBridge East Flatbush - Auto Setup" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "⚠️  Warning: Not running as Administrator" -ForegroundColor Yellow
    Write-Host "Some installations may require admin rights." -ForegroundColor Yellow
    Write-Host ""
}

# Step 1: Check Node.js
Write-Host "📦 Step 1: Checking Node.js..." -ForegroundColor Green
$nodeVersion = node --version 2>$null
if ($nodeVersion) {
    Write-Host "✅ Node.js $nodeVersion installed" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js not found!" -ForegroundColor Red
    Write-Host "Please install from: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "Download the LTS version, then run this script again." -ForegroundColor Yellow
    exit 1
}

# Step 2: Check Rojo (for Roblox development)
Write-Host ""
Write-Host "🎮 Step 2: Checking Rojo (Roblox tool)..." -ForegroundColor Green
$rojoVersion = rojo --version 2>$null
if ($rojoVersion) {
    Write-Host "✅ Rojo installed" -ForegroundColor Green
} else {
    Write-Host "⚠️  Rojo not found - installing via aftman..." -ForegroundColor Yellow
    
    # Check for aftman
    $aftmanVersion = aftman --version 2>$null
    if (-not $aftmanVersion) {
        Write-Host "📥 Installing aftman (Roblox toolchain manager)..." -ForegroundColor Cyan
        Invoke-WebRequest -Uri "https://github.com/LPGhatguy/aftman/releases/latest/download/aftman-windows.exe" -OutFile "$env:TEMP\aftman.exe"
        Move-Item "$env:TEMP\aftman.exe" "$env:USERPROFILE\.aftman\bin\aftman.exe" -Force
        $env:PATH += ";$env:USERPROFILE\.aftman\bin"
    }
    
    Write-Host "📥 Installing Rojo..." -ForegroundColor Cyan
    aftman install
    Write-Host "✅ Rojo installed" -ForegroundColor Green
}

# Step 3: Check Wally (Roblox package manager)
Write-Host ""
Write-Host "📚 Step 3: Checking Wally (package manager)..." -ForegroundColor Green
$wallyVersion = wally --version 2>$null
if ($wallyVersion) {
    Write-Host "✅ Wally installed" -ForegroundColor Green
} else {
    Write-Host "📥 Installing Wally..." -ForegroundColor Cyan
    aftman install
    Write-Host "✅ Wally installed" -ForegroundColor Green
}

# Step 4: Install Gateway dependencies
Write-Host ""
Write-Host "🌐 Step 4: Installing Gateway dependencies..." -ForegroundColor Green
Push-Location gateway
if (Test-Path "package.json") {
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Gateway dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to install Gateway dependencies" -ForegroundColor Red
        Pop-Location
        exit 1
    }
} else {
    Write-Host "❌ gateway/package.json not found!" -ForegroundColor Red
    Pop-Location
    exit 1
}
Pop-Location

# Step 5: Install MCP UI dependencies
Write-Host ""
Write-Host "🖥️  Step 5: Installing MCP UI dependencies..." -ForegroundColor Green
Push-Location mcp-ui
if (Test-Path "package.json") {
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ MCP UI dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to install MCP UI dependencies" -ForegroundColor Red
        Pop-Location
        exit 1
    }
} else {
    Write-Host "❌ mcp-ui/package.json not found!" -ForegroundColor Red
    Pop-Location
    exit 1
}
Pop-Location

# Step 6: Install Roblox dependencies (Wally packages)
Write-Host ""
Write-Host "🎮 Step 6: Installing Roblox dependencies..." -ForegroundColor Green
Push-Location roblox
if (Test-Path "../wally.toml") {
    wally install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Roblox dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Wally install had issues (this is sometimes OK)" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠️  wally.toml not found - skipping" -ForegroundColor Yellow
}
Pop-Location

# Step 7: Create .env file if it doesn't exist
Write-Host ""
Write-Host "🔑 Step 7: Setting up environment variables..." -ForegroundColor Green
if (-not (Test-Path "gateway/.env")) {
    Copy-Item "gateway/.env.example" "gateway/.env"
    Write-Host "✅ Created gateway/.env from template" -ForegroundColor Green
    Write-Host "⚠️  IMPORTANT: Edit gateway/.env with your settings!" -ForegroundColor Yellow
} else {
    Write-Host "✅ gateway/.env already exists" -ForegroundColor Green
}

# Step 8: Build Roblox project
Write-Host ""
Write-Host "🏗️  Step 8: Building Roblox project..." -ForegroundColor Green
Push-Location roblox
rojo build default.project.json -o roblox-wealthbridge.rbxl
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Roblox project built successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to build Roblox project" -ForegroundColor Red
    Pop-Location
    exit 1
}
Pop-Location

# Final Summary
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "🎉 Setup Complete!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Edit gateway/.env with your configuration" -ForegroundColor White
Write-Host "2. Run: .\scripts\start-dev.ps1" -ForegroundColor White
Write-Host "3. Open Roblox Studio: roblox/roblox-wealthbridge.rbxl" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Cyan
Write-Host "- YOUTH-SETUP.md - Step-by-step guide" -ForegroundColor White
Write-Host "- docs/youth-onboarding/ - Tutorials" -ForegroundColor White
Write-Host ""
Write-Host "🌐 URLs (after running start-dev.ps1):" -ForegroundColor Cyan
Write-Host "- Gateway: http://localhost:8080/health" -ForegroundColor White
Write-Host "- MCP UI: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "✨ Happy building! ✨" -ForegroundColor Green
