import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import { healthRouter } from "./routes/health.js";
import { registryRouter } from "./routes/registry.js";
import { ledgerRouter } from "./routes/ledger.js";
import { traceRouter } from "./routes/trace.js";

dotenv.config();

export function createServer() {
  const app = express();
  app.use(helmet());
  app.use(express.json({ limit: "256kb" }));
  app.use(morgan("combined"));

  app.use("/health", healthRouter);
  app.use("/registry", registryRouter);
  app.use("/ledger", ledgerRouter);
  app.use("/trace", traceRouter);

  return app;
}
