// ingest.ts
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

import { pool } from "../src/db/connection.js";

dotenv.config();

const DATA_DIR =
  process.env.DATA_DIR ||
  "./data/sample_a";

async function ingest() {
  try {
    console.log(
      "Reading data from:",
      DATA_DIR
    );

    const transactions = JSON.parse(
      fs.readFileSync(
        path.join(
          DATA_DIR,
          "transactions.json"
        ),
        "utf-8"
      )
    );

    const funds = JSON.parse(
      fs.readFileSync(
        path.join(
          DATA_DIR,
          "funds.json"
        ),
        "utf-8"
      )
    );

    const holdings = JSON.parse(
      fs.readFileSync(
        path.join(
          DATA_DIR,
          "holdings.json"
        ),
        "utf-8"
      )
    );

    // =========================
    // TRANSACTIONS
    // =========================

    for (const txn of transactions) {
      await pool.query(
        `
        INSERT INTO transactions
        (
          id,
          transaction_date,
          merchant,
          category,
          amount,
          currency,
          memo
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        ON CONFLICT (id)
        DO NOTHING
        `,
        [
          txn.id,
          txn.date,
          txn.merchant,
          txn.category,
          txn.amount,
          txn.currency,
          txn.memo,
        ]
      );
    }

    console.log(
      `Transactions Inserted: ${transactions.length}`
    );

    // =========================
    // FUNDS
    // =========================

    for (const fund of funds) {
      await pool.query(
        `
        INSERT INTO funds
        (
          id,
          name,
          category
        )
        VALUES ($1,$2,$3)
        ON CONFLICT (id)
        DO NOTHING
        `,
        [
          fund.id,
          fund.name,
          fund.category,
        ]
      );
    }

    console.log(
      `Funds Inserted: ${funds.length}`
    );

    // =========================
    // NAV HISTORY
    // =========================

    let navCount = 0;

    for (const fund of funds) {
      for (const nav of fund.nav) {
        await pool.query(
          `
          INSERT INTO fund_navs
          (
            fund_id,
            nav_date,
            nav
          )
          VALUES ($1,$2,$3)
          ON CONFLICT
          (fund_id, nav_date)
          DO NOTHING
          `,
          [
            fund.id,
            nav.date,
            nav.value,
          ]
        );

        navCount++;
      }
    }

    console.log(
      `NAV Records Inserted: ${navCount}`
    );

    // =========================
    // HOLDINGS
    // =========================

    for (const holding of holdings) {
      await pool.query(
        `
        INSERT INTO holdings
        (
          fund_id,
          fund_name,
          units,
          purchase_date,
          purchase_nav
        )
        VALUES ($1,$2,$3,$4,$5)
        ON CONFLICT
        (fund_id, purchase_date)
        DO NOTHING
        `,
        [
          holding.fund_id,
          holding.fund_name,
          holding.units,
          holding.purchase_date,
          holding.purchase_nav,
        ]
      );
    }

    console.log(
      `Holdings Inserted: ${holdings.length}`
    );

    console.log(
      "\nData Ingestion Completed Successfully"
    );

    process.exit(0);
  } catch (error) {
    console.error(
      "Ingestion Failed:",
      error
    );

    process.exit(1);
  }
}

ingest();