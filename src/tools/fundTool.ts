 //fundTool.js
import { pool } from "../db/connection.js";

export const getFundCount = async () => {
  const result = await pool.query(`
      SELECT COUNT(*) as total
      FROM funds
  `);

  return Number(
    result.rows[0].total
  );
};

export const getPortfolioValue = async () => {
  const result = await pool.query(`
    SELECT
      h.fund_name,
      h.units,
      fn.nav,
      ROUND(
        (h.units * fn.nav)::numeric,
        2
      ) as current_value

    FROM holdings h

    JOIN (
      SELECT DISTINCT ON (fund_id)
      fund_id,
      nav
      FROM fund_navs
      ORDER BY fund_id, nav_date DESC
    ) fn

    ON h.fund_id = fn.fund_id
  `);

  return result.rows;
};

export const getTotalPortfolioValue =
  async () => {

    const result = await pool.query(`
      SELECT
      ROUND(
        SUM(h.units * fn.nav)::numeric,
        2
      ) as total_portfolio_value

      FROM holdings h

      JOIN (
        SELECT DISTINCT ON (fund_id)
        fund_id,
        nav

        FROM fund_navs

        ORDER BY
        fund_id,
        nav_date DESC
      ) fn

      ON h.fund_id = fn.fund_id
    `);

    return result.rows[0];
};