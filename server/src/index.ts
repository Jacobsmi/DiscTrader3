import express from "express";
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = 5000;

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: parseInt(process.env.PGPORT!),
});

app.get("/", (req: express.Request, res: express.Response) => {
  res.send(
    JSON.stringify({
      success: true,
    })
  );
});

app.post("/createuser", async (req: express.Request, res: express.Response) => {
  // Attempt to insert the user into the database
  try {
    const con = await pool.connect();
    const result = await con.query(
      `INSERT INTO users(first_name,last_name, email,password) VALUES ($1,$2,$3,$4)`,
      [
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.password,
      ]
    );
    res.send(JSON.stringify({ success: true }));
  } catch (e) {
    console.log(e);
    return res.send(
      JSON.stringify({
        success: false,
        err: "server_error",
      })
    );
  }
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
