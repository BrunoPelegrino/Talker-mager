const watchedAtValidation = (req, res, next) => {
    const { watchedAt } = req.body.talk;
    // https://www.w3schools.com/jsref/jsref_regexp_test.asp
    const watchedAtFormat = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
    if (!watchedAt) {
      return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
    if (!watchedAtFormat.test(watchedAt)) {
      return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
  };
  
  module.exports = watchedAtValidation;