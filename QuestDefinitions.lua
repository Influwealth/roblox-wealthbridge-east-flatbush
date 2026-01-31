local Constants = require(script.Parent.Parent.Constants)

return {
  {
    id = "FIN_BLOCK_PARTY_BUDGET_001",
    district = Constants.DISTRICTS.FINANCE_LAB,
    title = "Budget the Block Party",
    description = "Allocate funds, avoid overspend, pass compliance checks.",
    rewards = { credits = 50, badge = "Flatbush Treasurer" },
    rubric = { mustBalance = true, maxWastePct = 0.05 }
  },
  {
    id = "MAKER_SOLAR_LAMP_001",
    district = Constants.DISTRICTS.MAKER_YARD,
    title = "Build a Solar Lamp",
    description = "Assemble a lamp, test durability, earn Maker badge.",
    rewards = { credits = 50, badge = "Maker Yard OG" },
    rubric = { minDurability = 0.7 }
  }
}
