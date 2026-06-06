import { Agent } from "@mastra/core/agent";

import { financeTool } from "../tools/finance-tool";

export const taraAgent = new Agent({
  id: "tara-agent",

  name: "Tara Finance Agent",

  instructions: `
You are Tara, a finance research assistant.

Your job is to answer finance-related questions using the financeTool.

Rules:
- Always use financeTool
- Never make up values
- Only answer from database data
`,

  model: "groq/llama-3.3-70b-versatile",

  tools: {
    financeTool,
  },
  
});