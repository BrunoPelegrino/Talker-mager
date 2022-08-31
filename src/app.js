const fs = require('fs').promises;
const express = require('express');
const bodyParser = require('body-parser');
// const talkers = require('./routes/talkerRoutes');
// const addNewTalker = require('./routes/talkerRoutes');
const loginValidation = require('./middlewares/loginValidation');
const generateToken = require('./utils/generateToken');
const tokenValidation = require('./middlewares/tokenValidation');
const nameValidation = require('./middlewares/nameValidation');
const ageValidation = require('./middlewares/ageValidation');
const talkValidation = require('./middlewares/talkValidation');
const watchedAtValidation = require('./middlewares/watchedAtValidation');
const rateValidation = require('./middlewares/rateValidation');
const getRegistered = require('./routes/talkerRoutes');

const app = express();
app.use(bodyParser.json());

// const fs = require('fs').promises;

app.get('/talker', async (_req, res) => {
  const response = await getRegistered();
  console.log(response);
  res.status(200).json(response);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const data = await fs.readFile('./talker.json');
  const allTalkers = JSON.parse(data);
  const getTalker = allTalkers.find((person) => person.id === Number(id));
  if (getTalker) {
  return res.status(200).json(getTalker);
}
  res.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  });
});

app.post('/login', loginValidation, (_req, res) => {
res.status(200).json({ token: generateToken() });
});

app.post('/talker',
tokenValidation,
nameValidation,
ageValidation,
talkValidation,
rateValidation,
watchedAtValidation,
 async (req, res) => {
  const response = JSON.parse(await fs.readFile('src/talker.json'));
  console.log(response);
  const addNewTalker = ({ ...req.body, id: Number(response.length + 1) });
  response.push(addNewTalker);
  console.log(response);
  await fs.writeFile('src/talker.json', JSON.stringify(response));
  return res.status(201).json(addNewTalker);
  });

module.exports = app; 