local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Knit = require(ReplicatedStorage.Packages.Knit)
local QuestDefinitions = require(ReplicatedStorage.Shared.Quests.QuestDefinitions)

local QuestService = Knit.CreateService {
  Name = "QuestService",
  Client = {}
}

function QuestService.Client:GetQuestDefinitions(player)
  return QuestDefinitions
end

function QuestService:CompleteQuest(player, questId, payload)
  -- TODO: rubric checks + anti-cheat server validation
  -- TODO: AuditService:EmitTrace(...)
  -- TODO: EconomyService:AddCredits(...)
  return true
end

function QuestService.Client:CompleteQuest(player, questId, payload)
  return self.Server:CompleteQuest(player, questId, payload)
end

return QuestService
