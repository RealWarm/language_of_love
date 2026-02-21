import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const quizResults = pgTable("quiz_results", {
  id: serial("id").primaryKey(),
  resultType: text("result_type").notNull(), // A, B, C, D, E
  answers: jsonb("answers").notNull(), // Store the sequence of answers for analysis
});

export const insertQuizResultSchema = createInsertSchema(quizResults).pick({
  resultType: true,
  answers: true,
});

export type InsertQuizResult = z.infer<typeof insertQuizResultSchema>;
export type QuizResult = typeof quizResults.$inferSelect;
