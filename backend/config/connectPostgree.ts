import pkg from "pg";
import dotenv from "dotenv";
import { readFileSync } from "fs";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const connectionTable = async () => {
  const sqlMigration = readFileSync(
    "backend/db/migrations/001_table_times_brasileirao.sql",
    "utf-8"
  );
  await pool.query(sqlMigration);
  console.log("Migration executed successfully");
};
const getCurrentDate = async () => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query("SELECT NOW() as date_at");
    console.log(`Criado em ${rows[0].date_at}`);
    return rows[0].date_at
  } catch (error: any) {
    throw new Error("Erro do servidor!");
  } finally {
    client.release();
  }
};

const init = async()=>{
  await getCurrentDate()
  await connectionTable();
}

export  {init,getCurrentDate,pool}