const express = require('express');
const cors = require('cors');

const User = require('./models/User');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);


//? smoke test
// app.get('/test-user', async (req, res) => {
//   const user = await User.create({
//     name: 'Test User',
//     email: 'test@codecrew.dev'
//   });
//   res.json(user);
// });


// app.get('/test-auth', async (req, res) => {
//   const user = await User.create({
//     name: 'Auth User',
//     email: 'auth@codecrew.dev',
//     password: 'password123'
//   });

//   const found = await User.findOne({ email: 'auth@codecrew.dev' }).select('+password');
//   const match = await found.comparePassword('password123');

//   res.json({
//     hashedPasswordStored: found.password !== 'password123',
//     passwordMatches: match
//   });
// });

module.exports = app;
