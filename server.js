import express from "express";

const app = express();

app.get("/teas", (req, res) => {
  res.status(200).send(`Request hit!`);
});

const port = 3000;
const host = "127.0.0.1";
app.listen(port, host, () => {
  console.log(`Server listening on port : ${port}...`);
});
