// import { Router } from "express";

// const router = Router();

// router.post("/ask", async (req, res) => {
//   try {
//     const { question } = req.body;

//     // call agent

//     const answer = await agent.generate(question);

//     res.json({
//       answer,
//     });
//   } catch (error) {
//     res.status(500).json({
//       answer: "Something went wrong",
//     });
//   }
// });

// export default router;



// askRoutes.ts
import { Router } from "express";
import { taraAgent } from "../mastra/agents/tara-agent";

const router = Router();

router.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    const result = await taraAgent.generate(question);

    res.json({
      answer: result.text,
    });
  } catch (error: any) {
  console.error("FULL ERROR =>", error);

  res.status(500).json({
    answer: error.message,
  });
}
});

export default router;