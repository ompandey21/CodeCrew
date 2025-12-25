require('dotenv').config();
const app = require('./app');

const connectDB = require('./config/db');

connectDB();

const PORT = process.env.PORT;
const http = require('http');
const { initSocket } = require('./config/socket');

const server = http.createServer(app);
initSocket(server);

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

