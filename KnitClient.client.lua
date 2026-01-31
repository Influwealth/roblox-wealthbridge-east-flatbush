local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Knit = require(ReplicatedStorage.Packages.Knit)

Knit.AddControllers(script.Parent.Controllers)

Knit.Start():andThen(function()
  print("[WealthBridge] Knit Client started")
end):catch(warn)
