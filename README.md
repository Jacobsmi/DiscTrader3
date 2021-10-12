# DiscTrader3

- Third attempt at making the disc trader website (each time I use knowledge gained to make it a little better)
- Using the PERN stack (PostgreSQL, Express, React, Node)
- Allows users to register, login, and then list their disc golf items for sale

## Setting Up the Server

- Create a `.env` file in the `/server` directory with the following contents
  ```
  PGHOST=localhost
  PGUSER=USER
  PGDATABASE=DATABASE
  PGPASSWORD=PASSWORD
  PGPORT=5432
  ```
- While in the server directory run `node ./build/migrations/migrations.js` to create the necessary tables in the database
- 