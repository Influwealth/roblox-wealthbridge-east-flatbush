local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Knit = require(ReplicatedStorage.Packages.Knit)

Knit.AddServices(script.Parent.Services)

Knit.Start():andThen(function()
  print("[WealthBridge] Knit Server started")
end):catch(warn)
