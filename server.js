const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  req.io = io; 
  next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

// Socket.IO setup
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.on('joinRoom', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
