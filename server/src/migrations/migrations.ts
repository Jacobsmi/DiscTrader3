import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: parseInt(process.env.PGPORT!),
});

(async () =>{
  try{
    const connection = await pool.connect();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users(
        id SERIAL,
        first_name VARCHAR NOT NULL,
        last_name VARCHAR NOT NULL,
        email VARCHAR UNIQUE NOT NULL,
        password VARCHAR NOT NULL
      )
    `)
    await connection.release()
    pool.end()
  }catch(e){
    console.log(e);
  }
})();