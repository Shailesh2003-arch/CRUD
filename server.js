// importing required packages...
import "dotenv/config";
import express from "express";
import logger from "./utility/logger.js";
import morgan from "morgan";

// creating an express server...
const app = express();
// parsing incoming request bodies...
app.use(express.json());

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// An array to store data and perform CRUD...
const teaData = [];
let id = 1;

// creating new teas... (POST Request)
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

// getting all teas... (GET Request)
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// get tea by Id... (GET Request)
app.get("/teas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const tea = teaData.find((t) => t.id == req.params.id);
  if (!tea) {
    return res.status(404).send(`No tea with Id ${id} found!...`);
  }
  res.status(200).send(tea);
});

// update the existing tea with name and price...
app.put("/teas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const tea = teaData.find((t) => t.id == req.params.id);
  if (!tea) {
    return res.status(404).send(`No tea with Id ${id} found!...`);
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

// creating delete request...

app.delete("/teas/:id", (req, res) => {
  logger.warn(
    `A delete request is being made to delete the tea with id:${req.params.id}`
  );
  const index = teaData.find((t) => t.id === parseInt(req.params.id));
  if (index == -1) {
    return res.status(404).send("tea not found");
  }
  teaData.splice(index, 1);
  return res.status(200).send("deleted");
});

const port = process.env.PORT || 3000;
const host = "127.0.0.1";
app.listen(port, host, () => {
  console.log(`Server listening on port : ${port}...`);
});
