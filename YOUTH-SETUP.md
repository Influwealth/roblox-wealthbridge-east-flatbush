# 🎮 Youth Setup Guide — Get Playing in 15 Minutes!

**Hey! This guide will help you set up your own WealthBridge Roblox world.**

---

## 📋 What You'll Need

- ✅ A computer (Windows, Mac, or Linux)
- ✅ Internet connection
- ✅ About 15 minutes
- ✅ A guardian/mentor to help (if you're under 13)

---

## 🪟 Windows Setup (Easiest!)

### Step 1: Download the Code

1. Click the green **"Code"** button at the top of this page
2. Click **"Download ZIP"**
3. Unzip the folder to your Desktop
4. Open the folder

### Step 2: Run the Auto-Setup

1. Right-click on `scripts/auto-generate.ps1`
2. Click **"Run with PowerShell"**
3. Wait for it to install everything (takes about 5 minutes)
4. Done! 🎉

### Step 3: Start Playing

1. Double-click `scripts/start-dev.ps1`
2. Three windows will open:
   - **Gateway** (API server)
   - **Roblox Studio** (the game)
   - **MCP Dashboard** (web browser)
3. Start building!

---

## 🍎 Mac/Linux Setup

### Step 1: Download the Code

```bash
# Open Terminal and run:
git clone https://github.com/Influwealth/roblox-wealthbridge-east-flatbush.git
cd roblox-wealthbridge-east-flatbush
```

### Step 2: Run the Auto-Setup

```bash
bash scripts/auto-generate.sh
```

Wait about 5 minutes for everything to install.

### Step 3: Start Playing

```bash
bash scripts/start-dev.sh
```

---

## 🎯 What Happens During Setup?

The auto-generate script will:

1. ✅ Install Node.js tools (for the Gateway)
2. ✅ Install Roblox tools (Rojo, Wally)
3. ✅ Set up the MCP Dashboard
4. ✅ Create your local dev environment
5. ✅ Test that everything works

---

## 🧪 Testing Your Setup

### Test 1: Gateway API

1. Open your web browser
2. Go to: `http://localhost:8080/health`
3. You should see: `{"ok": true, "service": "wealthbridge-gateway"}`

✅ **Success!** Your API is running.

### Test 2: MCP Dashboard

1. Go to: `http://localhost:3000`
2. You should see the WealthBridge dashboard
3. Try clicking around!

✅ **Success!** Your dashboard is working.

### Test 3: Roblox Game

1. Open Roblox Studio
2. File → Open → `roblox/roblox-wealthbridge.rbxl`
3. Click **Play**
4. Walk around East Flatbush!

✅ **Success!** Your game is ready.

---

## 🎨 Customizing Your World

### Change District Names

Edit: `roblox/src/shared/ReplicatedStorage/Shared/Constants.lua`

```lua
Constants.DISTRICTS = {
  FINANCE_LAB = "MyFinanceLab",  -- Change this!
  MAKER_YARD = "MyMakerSpace",   -- And this!
  -- etc.
}
```

### Create New Quests

1. Go to: `templates/district-template/`
2. Copy `quest-template.lua`
3. Edit the quest details
4. Save it to: `roblox/src/shared/ReplicatedStorage/Shared/Quests/`

**See:** [Creating Your First Quest](./docs/youth-onboarding/02-your-first-quest.md)

---

## 🆘 Troubleshooting

### "PowerShell won't run the script"

**Windows Security Fix:**
1. Open PowerShell as Administrator
2. Run: `Set-ExecutionPolicy RemoteSigned`
3. Type `Y` and press Enter
4. Try again!

### "Node.js not found"

**Install Node.js:**
1. Go to: https://nodejs.org/
2. Download the "LTS" version
3. Install it
4. Restart your computer
5. Try again!

### "Rojo not found"

**Install Rojo:**
```bash
# Run this in PowerShell or Terminal:
aftman install
```

Or download from: https://rojo.space/

### "Nothing works!"

**Ask for help:**
1. Take a screenshot of the error
2. Show your guardian/mentor
3. Check the [GitHub Issues](https://github.com/Influwealth/roblox-wealthbridge-east-flatbush/issues)

---

## 🎓 Next Steps

Now that you're set up, try these tutorials:

1. [Your First Quest](./docs/youth-onboarding/02-your-first-quest.md) — Make a quest and earn credits
2. [Creating Districts](./docs/youth-onboarding/03-creating-districts.md) — Build your own neighborhood
3. [Guardian Setup](./docs/youth-onboarding/04-guardian-setup.md) — Set up safe credit redemption

---

## 🌟 Tips for Success

- 💾 **Save often!** Roblox Studio can crash
- 🧪 **Test everything** before publishing
- 📖 **Read the docs** when you get stuck
- 🤝 **Ask questions** — mentors are here to help
- 🎉 **Have fun!** This is YOUR world to create

---

**Ready? Let's build something amazing! 🚀**
