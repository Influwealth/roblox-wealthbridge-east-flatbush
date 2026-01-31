# 🚀 DEPLOYMENT GUIDE — Push to GitHub

## Quick Deploy (Copy-Paste These Commands)

### Step 1: Navigate to the repo folder
```bash
cd /path/to/roblox-wealthbridge-east-flatbush
```

### Step 2: Initialize Git
```bash
git init
git add .
git commit -m "Initial commit: East Flatbush Capsule with MCP UI"
```

### Step 3: Connect to GitHub
```bash
git branch -M main
git remote add origin https://github.com/Influwealth/roblox-wealthbridge-east-flatbush.git
```

### Step 4: Push to GitHub
```bash
git push -u origin main
```

---

## If Repo Already Exists

If you get an error about the repo existing, use:

```bash
git push -u origin main --force
```

**⚠️ WARNING:** This will overwrite everything in the GitHub repo!

---

## Post-Deployment Checklist

After pushing to GitHub:

1. ✅ **Verify files on GitHub** — Check that all folders are there
2. ✅ **Update Gateway .env** — Add your API keys
3. ✅ **Run auto-generate script** — `.\scripts\auto-generate.ps1` (Windows) or `bash scripts/auto-generate.sh` (Mac/Linux)
4. ✅ **Test all services** — Run `.\scripts\start-dev.ps1`
5. ✅ **Open Roblox Studio** — Load `roblox/roblox-wealthbridge.rbxl`

---

## Environment Variables Required

Edit `gateway/.env` with these values:

```env
PORT=8080
MCP_SERVER_URL=https://your-mcp-server.example.com/sse
MCP_AUTH_MODE=oauth
OAUTH_CLIENT_ID=your_client_id
OAUTH_CLIENT_SECRET=your_client_secret
ROBLOX_SHARED_SECRET=generate_a_long_random_string_here
```

---

## Testing the Deployment

### Test Gateway API
```bash
curl http://localhost:8080/health
```

Expected response:
```json
{"ok": true, "service": "wealthbridge-gateway"}
```

### Test MCP UI
Open browser: `http://localhost:3000`

### Test Rojo
```bash
cd roblox
rojo serve default.project.json
```

Then connect from Roblox Studio plugin.

---

## Youth Onboarding URLs

After deployment, share these guides:

1. **Main README:** https://github.com/Influwealth/roblox-wealthbridge-east-flatbush
2. **Setup Guide:** https://github.com/Influwealth/roblox-wealthbridge-east-flatbush/blob/main/YOUTH-SETUP.md
3. **First Quest:** https://github.com/Influwealth/roblox-wealthbridge-east-flatbush/blob/main/docs/youth-onboarding/02-your-first-quest.md

---

## Troubleshooting

### "Permission denied" error
```bash
# Run this on Mac/Linux:
chmod +x scripts/*.sh

# On Windows:
# Right-click → Properties → Unblock
```

### "Remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/Influwealth/roblox-wealthbridge-east-flatbush.git
```

### Need to update after first push?
```bash
git add .
git commit -m "Update: [describe what you changed]"
git push
```

---

## Next Steps

1. **Clone on student machines:**
   ```bash
   git clone https://github.com/Influwealth/roblox-wealthbridge-east-flatbush.git
   cd roblox-wealthbridge-east-flatbush
   ```

2. **Run auto-setup:**
   - Windows: `.\scripts\auto-generate.ps1`
   - Mac/Linux: `bash scripts/auto-generate.sh`

3. **Start building:**
   - Windows: `.\scripts\start-dev.ps1`
   - Mac/Linux: `bash scripts/start-dev.sh`

---

**Repository is now live and ready for youth creators! 🎉**
