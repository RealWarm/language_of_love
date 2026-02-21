import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post(api.quiz.submit.path, async (req, res) => {
    try {
      const input = api.quiz.submit.input.parse(req.body);
      const result = await storage.createQuizResult(input);
      res.status(201).json(result);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  });

  app.get(api.quiz.stats.path, async (req, res) => {
    try {
      const stats = await storage.getQuizStats();
      res.json(stats);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  return httpServer;
}
