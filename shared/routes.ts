import { z } from "zod";
import { insertQuizResultSchema, quizResults } from "./schema";

export const api = {
  quiz: {
    submit: {
      method: "POST",
      path: "/api/quiz/submit",
      input: insertQuizResultSchema,
      responses: {
        201: z.custom<typeof quizResults.$inferSelect>(),
        400: z.object({ message: z.string() }),
      },
    },
    stats: {
      method: "GET",
      path: "/api/quiz/stats",
      responses: {
        200: z.array(z.object({ type: z.string(), count: z.number() })),
      },
    },
  },
};
