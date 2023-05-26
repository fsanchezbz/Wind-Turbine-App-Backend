const express = require('express');
const app = express();
const port = process.env.PORT || 5005;
require('./db')();
const userRouter = require('./routes/userRoutes');
const workRouter = require('./routes/workOrderRouter');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const { Server } = require('socket.io');

// Greet on root route
app.get('/', (req, res) => res.send('2023 PJ TurbinePro GmbH. All rights reserved.'));

// General middlewares
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://profound-dasik-d1357e.netlify.app'
  ],
  credentials: true,
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));

// Routes
app.use('/users', userRouter);
app.use('/work', workRouter);

// Error handling
app.use(errorHandler);

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: corsOptions
});

// Socket.IO event handling
io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

// Start the server
server.listen(port, () => console.log(`Server up on port http://localhost/${port}`));
