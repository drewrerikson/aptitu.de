const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const {startDatabase} = require('./db/mongo');
const {addData, getData, deleteData} = require('./db/healthdata');
// const jwt = require('express-jwt');
// const jwksRsa = require('jwks-rsa');
//
// const checkJwt = jwt({
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://glacier.us.auth0.com/.well-known/jwks.json`
//   }),
//
//   audience: 'https://glacier.us.auth0.com/api/v2/',
//   issuer: `https://glacier.us.auth0.com/`,
//   algorithms: ['RS256']
// });

const app = express();

app.use(helmet());
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(cors());
app.use(morgan('combined'));

startDatabase();

// to webpage
app.get('/table/:table', async (req, res) => {
  res.send(await getData(req.params.table));
});

app.get('/test', async (req, res) => {
  res.send("Hello!");
});

// from export
app.post("/import", async (req, res) => {
  if (req.body.data !== undefined) {
    const data = req.body.data;
    data.forEach((datum, ind) => {
      addData(datum);
    });
    res.send({message: `Data added to DB.`});
    console.log("Successful import:");
  } else {
    console.log("Empty request.");
  }
});

app.delete('/:table/:id', async (req, res) => {
  await deleteData(req.params.table, req.params.id);
  res.send({ message: `ID ${req.params.id} removed from DB.` });
});

app.listen(5000, () => {
  console.log(`Server is listening on port 5000.`);
});
