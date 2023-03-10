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

app.get('/talker/search/', tokenValidation, async (req, res) => {
  const { q } = req.query;
  const allTalkers = await getRegistered();
  // console.log(allTalkers);
  if (q) {
  const searchTalker = allTalkers.filter((person) => person.name.includes(q));
  console.log(searchTalker);
  return res.status(200).json(searchTalker);
  } return res.status(200).json(allTalkers);
  });

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
  // console.log(response);
  const addNewTalker = ({ ...req.body, id: Number(response.length + 1) });
  response.push(addNewTalker);
  // console.log(response);
  await fs.writeFile('src/talker.json', JSON.stringify(response));
  return res.status(201).json(addNewTalker);
});

app.put('/talker/:id',
tokenValidation,
nameValidation,
ageValidation,
talkValidation,
rateValidation,
watchedAtValidation,
async (req, res) => {
  const { id } = req.params;
  const allTalkers = await getRegistered();
  const getTalker = allTalkers.find((person) => person.id === Number(id));
  const index = allTalkers.indexOf(getTalker);
  const newTalker = { id: Number(id), ...req.body };
  allTalkers[index] = newTalker;
  await fs.writeFile('src/talker.json', JSON.stringify(allTalkers));
  return res.status(200).json(newTalker);
});

app.delete('/talker/:id', tokenValidation,
async (req, res) => {
  const { id } = req.params;
  const allTalkers = await getRegistered();
  const getTalker = allTalkers.filter((person) => person.id !== Number(id));
  await fs.writeFile('src/talker.json', JSON.stringify(getTalker));
  res.status(204).json(getTalker);
});

module.exports = app; 