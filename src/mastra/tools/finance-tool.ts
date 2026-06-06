import { createTool } from "@mastra/core/tools";
import { z } from "zod";

import { answerQuestion } from "../../services/financeService";

export const financeTool = createTool({
  id: "finance-query",

  description:
    "Answer finance questions using transactions, holdings and funds data",

  inputSchema: z.object({
    question: z.string(),
  }),

  outputSchema: z.object({
    answer: z.string(),
  }),

  execute: async ({ question }) => {
    const answer = await answerQuestion(question);

    return {
      answer,
    };
  },
});