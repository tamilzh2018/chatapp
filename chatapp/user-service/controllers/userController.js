const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');

const register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.send({ message: 'User registered successfully' });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });
    res.send({ token });
  } else {
    res.status(401).send({ message: 'Invalid credentials' });
  }
};
const getUserProfile = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send({ username: user.username });
  } catch (err) {
    res.status(401).send({ message: 'Invalid token' });
  }
};

module.exports = { register, login, getUserProfile };
