const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const {startDatabase} = require('./db/mongo');
const {addData, getData, deleteData} = require('./db/healthdata');

const app = express();
const PORT = process.argv[2] || 5000;

app.use(helmet());
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(cors());
app.use(morgan('combined'));

startDatabase();

app.get('/table/:table', async (req, res) => {
  res.send(await getData(req.params.table));
});

app.post("/import", async (req, res) => {
  if (req.body.data !== undefined) {
    const data = req.body.data;
    data.forEach((datum, ind) => {
      addData(datum);
    });
    res.send({message: `200 OK: Data added to DB.`});
  } else {
    console.log("Empty data; not imported.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});
