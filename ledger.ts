import { Router } from "express";
import { z } from "zod";

export const ledgerRouter = Router();

const RedemptionSchema = z.object({
  playerUserId: z.number(),
  benefitId: z.string(),
  credits: z.number().int().positive(),
  guardianToken: z.string().min(10),
  nonce: z.string().min(8)
});

ledgerRouter.post("/tx/create", async (req, res) => {
  const parsed = RedemptionSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  // TODO: verify guardian token
  // TODO: call MCP ledger.tx.create
  // TODO: emit trace event
  res.json({ ok: true, txId: `tx_${Date.now()}` });
});
