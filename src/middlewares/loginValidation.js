const loginValidation = (req, res, next) => {
const { email } = req.body;
const { password } = req.body;
const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
if (!email) {
res.status(400).json({ message: 'O campo "email" é obrigatório' });
}
if (!emailRegex.test(email)) {
res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
}
if (!password) {
res.status(400).json({ message: 'O campo "password" é obrigatório' });
}
if (password.length < 6) {
res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
}
next();
};

module.exports = loginValidation;