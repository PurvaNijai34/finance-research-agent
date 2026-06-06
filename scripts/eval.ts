import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const questions = [
  "How much did I spend on food?",
  "How much did I spend on travel?",
  "How much did I spend on health?",
  "How much did I spend on Amazon?",
  "How much did I spend on Netflix?",
  "What is my portfolio value?",
  "What was my biggest expense?",
  "How much did I spend in March 2025?",
  "Show category breakdown",
];

// Delay Function
const sleep = (ms: number) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );

async function runEvaluation() {
  console.log("Starting Evaluation...\n");

  for (const question of questions) {
    try {
      const response = await axios.post(
        `${process.env.API_BASE_URL}/api/ask`,
        { question }
      );

      console.log("Question:");
      console.log(question);

      console.log("Answer:");
      console.log(response.data.answer);

      console.log("----------------------------------");


      await sleep(2000);

    } catch (error: any) {
      console.error(
        `Failed for question: ${question}`
      );

      console.error(
        error.response?.data
      );

      console.error(
        error.message
      );

      console.log("----------------------------");

      // Wait even after failure
      await sleep(15000);
    }
  }

  console.log("\nEvaluation Completed");
}

runEvaluation();