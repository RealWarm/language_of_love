import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { InsertQuizResult } from "@shared/schema";

export function useSubmitQuiz() {
  return useMutation({
    mutationFn: async (data: InsertQuizResult) => {
      const res = await fetch(api.quiz.submit.path, {
        method: api.quiz.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to submit quiz results");
      }

      return await res.json();
    },
  });
}

export function useQuizStats() {
  return useQuery({
    queryKey: [api.quiz.stats.path],
    queryFn: async () => {
      const res = await fetch(api.quiz.stats.path);
      if (!res.ok) {
        throw new Error("Failed to fetch quiz stats");
      }
      return api.quiz.stats.responses[200].parse(await res.json());
    },
  });
}
