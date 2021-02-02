const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const {startDatabase} = require('./db/mongo');
const {addData, getData, deleteData} = require('./db/healthdata');

const app = express();

app.use(helmet());
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(cors());
app.use(morgan('combined'));

startDatabase();

// to webpage
app.get('/:table', async (req, res) => {
  res.send(await getData(req.params.table));
});

// from export
app.post("/import", async (req, res) => {
  const data = req.body.data;
  data.forEach((datum, ind) => {
    addData(datum);
  });
  res.send({message: `Data added to DB.`})
});

app.delete('/:table/:id', async (req, res) => {
  await deleteData(req.params.table, req.params.id);
  res.send({ message: `ID ${req.params.id} removed from DB.` });
});

app.listen(5000, () => {
  console.log(`Server is listening on port 5000.`);
});
