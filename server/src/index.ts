import express from "express";

const app = express();

const PORT = 5000;

app.get("/", (req: express.Request, res: express.Response) => {
  res.send(
    JSON.stringify({
      success: true,
    })
  );
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
