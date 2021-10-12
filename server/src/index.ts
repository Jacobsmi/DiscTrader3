import express from "express";
import dotenv from "dotenv";
import { Pool } from "pg";
import bcrypt, { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
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

/*
  Takes in a post request and get arguments from the body then, attempts to 
  hash password and store user.
  If successful simple success message is sent and JWT is generated with encrypted id
  If not successful an error code is sent representing the failure

  response:
  @param success boolean
  @param code int
    value 1 --> duplicate error (email is duplicate)
    value 2 --> Unhandled server error
*/
app.post("/createuser", async (req: express.Request, res: express.Response) => {
  // Attempt to insert the user into the database
  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    const con = await pool.connect();
    const result = await con.query(
      `INSERT INTO users(first_name,last_name, email,password) VALUES ($1,$2,$3,$4) RETURNING id`,
      [req.body.first_name, req.body.last_name, req.body.email, hash]
    );
    const token = jwt.sign({ id: result.rows[0].id }, process.env.JWTSECRET!, {
      expiresIn: "1h",
    });
    res.setHeader("Set-Cookie", `token=${token}; HttpOnly; Secure;`);
    return res.send(JSON.stringify({ success: true }));
  } catch (e) {
    if (e.code === "23505") {
      return res.send(
        JSON.stringify({
          success: false,
          code: 1,
        })
      );
    }
    console.log(e);
    return res.send(
      JSON.stringify({
        success: false,
        code: 2,
      })
    );
  }
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
