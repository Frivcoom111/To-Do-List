import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export const connectDatabase = async () => {
  try {
    await db.query("SELECT NOW()");
    console.log("Conectado no Banco de Dados.");
  } catch (error) {
    console.error(error);
  }
};

export default db;
