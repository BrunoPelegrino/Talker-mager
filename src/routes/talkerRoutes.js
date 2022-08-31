const fs = require('fs').promises;
const { join } = require('path');

const getRegistered = async () => {
  const file = '../talker.json';
  try {
    const allTalkers = await fs.readFile(join(__dirname, file), 'utf-8');
    return JSON.parse(allTalkers);
  } catch (error) {
    return [];
  }
};

module.exports = getRegistered;