import { pool } from "../db/connection.js";

export const getTotalSpendingByCategory =
  async (category: string) => {
    const result = await pool.query(
      `
      SELECT
        COALESCE(SUM(amount),0) as total
      FROM transactions
      WHERE LOWER(category) = LOWER($1)
      `,
      [category]
    );

    return Number(
      result.rows[0].total
    );
  };

export const getBiggestExpense = async () => {
  const result = await pool.query(`
      SELECT
        merchant,
        amount,
        transaction_date
      FROM transactions
      ORDER BY amount DESC
      LIMIT 1
  `);

  return result.rows[0];
};

export const getMerchantSpending =
  async (merchant: string) => {

    const result = await pool.query(
      `
      SELECT
        COALESCE(SUM(amount),0) as total
      FROM transactions
      WHERE LOWER(merchant)
      LIKE LOWER($1)
      `,
      [`%${merchant}%`]
    );

    return Number(
      result.rows[0].total
    );
  };

export const getMonthlySpending =
  async (
    month: number,
    year: number
  ) => {
    const result = await pool.query(
      `
    SELECT
      COALESCE(SUM(amount),0) as total

    FROM transactions

    WHERE
      EXTRACT(MONTH FROM transaction_date) = $1
      AND
      EXTRACT(YEAR FROM transaction_date) = $2
    `,
      [month, year]
    );

    return Number(
      result.rows[0].total
    );
  };


export const getCategoryBreakdown =
  async () => {

    const result = await pool.query(
      `
      SELECT
        category,

        ROUND(
          SUM(amount)::numeric,
          2
        ) as total

      FROM transactions

      GROUP BY category

      ORDER BY total DESC
      `
    );

    return result.rows;
  };

  export const hasRentDataInApril2025 =
  async () => {

    const result = await pool.query(`
      SELECT COUNT(*) as total
      FROM transactions

      WHERE LOWER(category)='rent'

      AND EXTRACT(MONTH FROM transaction_date)=4

      AND EXTRACT(YEAR FROM transaction_date)=2025
    `);

    return Number(
      result.rows[0].total
    );
  };

export const getRecurringSubscriptions =
  async () => {

    const result = await pool.query(`
      SELECT
        merchant,
        COUNT(*) as frequency

      FROM transactions

      GROUP BY merchant

      HAVING COUNT(*) >= 3

      ORDER BY frequency DESC

      LIMIT 5
    `);

    return result.rows;
  };