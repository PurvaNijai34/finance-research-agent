import {
  getTotalSpendingByCategory,
  getBiggestExpense,
  getMerchantSpending,
  getMonthlySpending,
  getCategoryBreakdown, hasRentDataInApril2025,
  getRecurringSubscriptions,

} from "../tools/transactionTool.js";

import {
  getTotalPortfolioValue,
} from "../tools/fundTool.js";

export const answerQuestion = async (
  question: string
): Promise<string> => {
  try {
    const q = question.toLowerCase();

    // Food Spending
    if (
      q.includes("food") &&
      q.includes("spend")
    ) {
      const total =
        await getTotalSpendingByCategory(
          "food"
        );

      return `You spent ₹${total.toFixed(
        2
      )} on food.`;
    }

    // Travel Spending
    if (
      q.includes("travel") &&
      q.includes("spend")
    ) {
      const total =
        await getTotalSpendingByCategory(
          "travel"
        );

      return `You spent ₹${total.toFixed(
        2
      )} on travel.`;
    }

    // Health Spending
    if (
      q.includes("health") &&
      q.includes("spend")
    ) {
      const total =
        await getTotalSpendingByCategory(
          "health"
        );

      return `You spent ₹${total.toFixed(
        2
      )} on health.`;
    }

    // Biggest Expense
    if (
      q.includes("biggest expense") ||
      q.includes("largest expense") ||
      q.includes("highest expense")
    ) {
      const expense =
        await getBiggestExpense();

      return `Your biggest expense was ₹${expense.amount} at ${expense.merchant} on ${new Date(
        expense.transaction_date
      ).toLocaleDateString()}.`;
    }

    // Amazon Spending
    if (
      q.includes("amazon") ||
      q.includes("amzn")
    ) {
      const total =
        await getMerchantSpending(
          "amazon"
        );

      return `You spent ₹${total.toFixed(
        2
      )} on Amazon.`;
    }

    // Apollo Spending
    if (
      q.includes("apollo") ||
      q.includes("apollo pharmacy")
    ) {
      const total =
        await getMerchantSpending(
          "apollo"
        );

      return `You spent ₹${total.toFixed(
        2
      )} at Apollo Pharmacy.`;
    }
    // Netflix Spending
    if (q.includes("netflix")) {
      const total =
        await getMerchantSpending(
          "netflix"
        );

      return `You spent ₹${total.toFixed(
        2
      )} on Netflix.`;
    }



    // Transfers
    if (
      q.includes("transfer") ||
      q.includes("transferred")
    ) {
      const total =
        await getTotalSpendingByCategory(
          "transfer"
        );

      return `You transferred ₹${total.toFixed(
        2
      )}.`;
    }
    // Portfolio Value
    if (
      q.includes("portfolio") ||
      q.includes("portfolio value")
    ) {
      const portfolio =
        await getTotalPortfolioValue();

      return `Your portfolio value is ₹${portfolio.total_portfolio_value}.`;
    }


    if (
      q.includes("march") &&
      q.includes("2025")
    ) {

      const total =
        await getMonthlySpending(
          3,
          2025
        );

      return `Your spending in March 2025 was ₹${total.toFixed(
        2
      )}.`;
    }

    if (
      q.includes("rent") &&
      q.includes("april") &&
      q.includes("2025")
    ) {

      const count =
        await hasRentDataInApril2025();

      if (count === 0) {
        return "No rent data found for April 2025.";
      }

      return `Found ${count} rent transactions in April 2025.`;
    }

    if (
      q.includes("transport") &&
      q.includes("spend")
    ) {
      const total =
        await getTotalSpendingByCategory(
          "transport"
        );

      return `You spent ₹${total.toFixed(
        2
      )} on transport.`;
    }
    if (
      q.includes("subscription") ||
      q.includes("recurring")
    ) {

      const subscriptions =
        await getRecurringSubscriptions();

      if (
        subscriptions.length === 0
      ) {
        return "No recurring subscriptions found.";
      }

      return `Potential recurring subscriptions: ${subscriptions
        .map((s) => s.merchant)
        .join(", ")}`;
    }

    if (
      q.includes("category breakdown")
    ) {

      const breakdown =
        await getCategoryBreakdown();

      return JSON.stringify(
        breakdown,
        null,
        2
      );
    }

    if (
      q.includes("groceries") &&
      q.includes("spend")
    ) {
      const total =
        await getTotalSpendingByCategory(
          "groceries"
        );

      return `You spent ₹${total.toFixed(
        2
      )} on groceries.`;
    }
    return "Sorry, I could not understand the question.";
  } catch (error) {
    console.error(error);

    return "Something went wrong while processing your request.";
  }
};