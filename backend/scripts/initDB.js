// backend/scripts/initDB.js
import fs from "fs";
import path from "path";
import { pool } from "../config/db.js";

const runMigrations = async () => {
  try {
    const schemaPath = path.resolve("./database/schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");
    await pool.query(schema);
    console.log("✅ Database initialized successfully");
  } catch (err) {
    console.error("❌ Failed to initialize database:", err);
  } finally {
    await pool.end();
    process.exit();
  }
};

runMigrations();
