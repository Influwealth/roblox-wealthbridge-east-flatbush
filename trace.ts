import { Router } from "express";
import { z } from "zod";

export const traceRouter = Router();

const TraceSchema = z.object({
  event: z.string(),
  props: z.record(z.any()).optional()
});

traceRouter.post("/emit", async (req, res) => {
  const parsed = TraceSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  // TODO: call MCP observability.trace.emit
  res.json({ ok: true });
});
