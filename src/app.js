const express = require('express');
const bodyParser = require('body-parser');
const talkers = require('./middlewares/talkerMiddlewares');

const app = express();
app.use(bodyParser.json());

// const fs = require('fs').promises;

app.get('/talker', async (_req, res) => {
  const response = await talkers();
  console.log(response);
  res.status(200).json(response);
});

module.exports = app;