import fs from "fs";
import path from "path";

import { pool } from "./connection.js";

export const createTables = async () => {
  try {
    const schemaPath = path.join(
      process.cwd(),
      "src/db/schema.sql"
    );

    const schema = fs.readFileSync(
      schemaPath,
      "utf-8"
    );

    await pool.query(schema);

    console.log("Tables Created");
  } catch (error) {
    console.error(error);
  }
};