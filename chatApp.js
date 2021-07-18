const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const createChatServer = require('socket.io');
const io = createChatServer(server, {
  cors: { origin: 'http://localhost:3000', credentials: true },
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

module.exports = server;
