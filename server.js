// importing required packages...
import express from "express";

// creating an express server...
const app = express();
// parsing incoming request bodies...
app.use(express.json());

// An array to store data and perform CRUD...
const teaData = [];
let id = 1;

app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = {
    id: id++,
    name,
    price,
  };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

const port = 3000;
const host = "127.0.0.1";
app.listen(port, host, () => {
  console.log(`Server listening on port : ${port}...`);
});
