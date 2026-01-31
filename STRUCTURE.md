# Repository Structure

```
roblox-wealthbridge-east-flatbush/
├── .gitignore
├── README.md
├── YOUTH-SETUP.md          # Kid-friendly setup guide
├── wally.toml
│
├── gateway/                # Node.js API Gateway
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts
│       ├── server.ts
│       └── routes/
│           ├── health.ts
│           ├── registry.ts
│           ├── ledger.ts
│           └── trace.ts
│
├── roblox/                 # Roblox Game (Lua/Knit)
│   ├── default.project.json
│   └── src/
│       ├── client/
│       │   └── StarterPlayer/
│       ├── server/
│       │   └── ServerScriptService/
│       └── shared/
│           └── ReplicatedStorage/
│
├── mcp-ui/                 # NEW: Web Dashboard
│   ├── package.json
│   ├── vite.config.ts
│   └── src/
│       ├── App.tsx
│       ├── components/
│       │   ├── QuestTracker.tsx
│       │   ├── GuardianPanel.tsx
│       │   └── AuditLog.tsx
│       └── lib/
│           └── api.ts
│
├── scripts/                # Auto-Generation Scripts
│   ├── auto-generate.ps1   # Windows one-click setup
│   ├── auto-generate.sh    # Linux/Mac one-click setup
│   ├── start-dev.ps1       # Launch all services
│   └── create-district.ps1 # Generate new district
│
├── templates/              # District Templates
│   └── district-template/
│       ├── quest-template.lua
│       ├── reward-config.json
│       └── README.md
│
└── docs/                   # Documentation
    ├── api-contracts.md
    ├── compliance.md
    ├── districts.md
    ├── rollout.md
    ├── vision.md
    └── youth-onboarding/
        ├── 01-getting-started.md
        ├── 02-your-first-quest.md
        ├── 03-creating-districts.md
        └── 04-guardian-setup.md
```
