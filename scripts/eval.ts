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
"How much did I spend at Apollo Pharmacy?",
"How much did I spend on groceries?",
"How much did I spend on transport?",
"Do I have any rent data in April 2025?",
"Show recurring subscriptions",
"How much did I spend using AMZN?",
];

const sleep = (ms: number) =>
new Promise((resolve) =>
setTimeout(resolve, ms)
);

async function runEvaluation() {
console.log("\n==============================");
console.log(" Finance Agent Evaluation");
console.log("==============================\n");

let passed = 0;
let failed = 0;

const failedCases: string[] = [];

for (const question of questions) {
try {
const response = await axios.post(
`${process.env.API_BASE_URL}/ask`,
{ question }
);


  console.log("Question:");
  console.log(question);

  console.log("Answer:");
  console.log(response.data.answer);

  console.log("----------------------------------");

  passed++;

  await sleep(2000);

} catch (error: any) {

  failed++;

  failedCases.push(question);

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

  await sleep(5000);
}


}

console.log("\n==============================");
console.log(" Evaluation Summary");
console.log("==============================");

console.log(`Total Questions : ${questions.length}`);
console.log(`Passed          : ${passed}`);
console.log(`Failed          : ${failed}`);

if (failedCases.length > 0) {
console.log("\nFailed Cases:");


failedCases.forEach(
  (question, index) => {
    console.log(
      `${index + 1}. ${question}`
    );
  }
);


}

console.log("\n==============================");
console.log(" Evaluation Completed");
console.log("==============================\n");
}

runEvaluation();
