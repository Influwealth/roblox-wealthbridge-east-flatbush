import { Router } from "express";
export const registryRouter = Router();

registryRouter.get("/list", async (_req, res) => {
  // TODO: call MCP registry.list
  res.json({
    items: [
      { id: "FOOD_COOP_BUNDLE_001", title: "Food Co-op Bundle", costCredits: 250 },
      { id: "MAKER_KIT_001", title: "Maker Kit", costCredits: 400 }
    ]
  });
});
