const fs = require('fs').promises;
const express = require('express');
const bodyParser = require('body-parser');
const talkers = require('./middlewares/talkerMiddlewares');
const loginValidation = require('./middlewares/loginValidation');
const generateToken = require('./utils/generateToken');

const app = express();
app.use(bodyParser.json());

// const fs = require('fs').promises;

app.get('/talker', async (_req, res) => {
  const response = await talkers();
  console.log(response);
  res.status(200).json(response);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
    const data = await fs.readFile('src/talker.json');
    const allTalkers = JSON.parse(data);
    const getTalker = allTalkers.find((person) => person.id === Number(id));
    console.log(getTalker);
    if (getTalker) {
    return res.status(200).json(getTalker);
  }
    res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
});

app.post('/login', loginValidation, (req, res) => {
res.status(200).json({ token: generateToken() });
});

module.exports = app; 