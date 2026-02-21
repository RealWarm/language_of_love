import { quizResults, type InsertQuizResult, type QuizResult } from "@shared/schema";
import { db } from "./db";
import { sql } from "drizzle-orm";

export interface IStorage {
  createQuizResult(result: InsertQuizResult): Promise<QuizResult>;
  getQuizStats(): Promise<{ type: string; count: number }[]>;
}

export class DatabaseStorage implements IStorage {
  async createQuizResult(insertResult: InsertQuizResult): Promise<QuizResult> {
    const [result] = await db
      .insert(quizResults)
      .values(insertResult)
      .returning();
    return result;
  }

  async getQuizStats(): Promise<{ type: string; count: number }[]> {
    // Group by resultType and count
    const stats = await db
      .select({
        type: quizResults.resultType,
        count: sql<number>`cast(count(*) as int)`,
      })
      .from(quizResults)
      .groupBy(quizResults.resultType);
    
    return stats;
  }
}

export const storage = new DatabaseStorage();
