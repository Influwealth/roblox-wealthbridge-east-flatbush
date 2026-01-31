local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Knit = require(ReplicatedStorage.Packages.Knit)

local EconomyService = Knit.CreateService {
  Name = "EconomyService",
  Client = {}
}

local balances = {}

function EconomyService:GetBalance(player)
  return balances[player.UserId] or 0
end

function EconomyService:AddCredits(player, amount, reason)
  local current = self:GetBalance(player)
  balances[player.UserId] = current + amount
  return balances[player.UserId]
end

function EconomyService.Client:GetBalance(player)
  return self.Server:GetBalance(player)
end

return EconomyService
