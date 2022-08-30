const loginValidation = (req, res, next) => {
const { email } = req.body;
const { password } = req.body;
const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
if (!email || !emailRegex.test(email)) {
res.status(400).json({ message: 'informe um email real' });
}
if (!password || password <= 6) {
res.status(400).json({ message: 'a senha deve ter 6 ou mais caracteres' });
}
next();
};

module.exports = loginValidation;