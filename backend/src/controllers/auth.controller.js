const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

exports.self = async(req, res) => {
  return res.json({
    name : req.user.name
  });
}

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({ name, email, password });

  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id)
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id)
  });
};

exports.googleAuth = async (req, res) => {
  const { token } = req.body;

  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID
  });

  const { email, name, sub: googleId } = ticket.getPayload();

  let user = await User.findOne({ email });

  if (user) {
    if (!user.googleId) {
      user.googleId = googleId;
      user.provider = 'google';
      await user.save();
    }
  } else {
    user = await User.create({
      name,
      email,
      googleId,
      provider: 'google'
    });
  }

  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id)
  });
};

const TokenBlacklist = require('../models/TokenBlacklist');

exports.logout = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.decode(token);

  await TokenBlacklist.create({
    token,
    expiresAt: new Date(decoded.exp * 1000)
  });

  res.json({ message: 'Logged out successfully' });
};



