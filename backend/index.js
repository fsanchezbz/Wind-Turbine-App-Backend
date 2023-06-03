const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const emailPassword = process.env.EMAIL_PASSWORD;
const emailAddress = process.env.EMAIL_ADDRESS;
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

// app.use(
//   cors({
//     origin: [
//       'http://localhost:5173',
//       'https://profound-dasik-d1357e.netlify.app'
      
//     ],
//     credentials: true,
//     optionSuccessStatus:200

//   })
// ); 

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173','https://profound-dasik-d1357e.netlify.app'); // Replace with your frontend origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Routes
app.use('/users', userRouter);
app.use('/work', workRouter);

// Error handling
app.use(errorHandler);

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: cors
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

// Parse JSON bodies for this route
app.use('/send-notification', bodyParser.json());

// Endpoint for sending notification
app.post('/send-notification', (req, res) => {
  const { name, email, message } = req.body;

  // Create a transporter with your email service provider credentials
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailAddress,
      pass: emailPassword,
    },
  });

  // Setup email data
  const mailOptions = {
    from: email, // Sender's email address is dynamically set based on user input
    to: emailAddress,
    subject: 'New Notification',
    text: `
      You have received a new notification from your website:
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending notification');
    } else {
      console.log('Notification sent successfully');
      res.sendStatus(200);
    }
  });
});

// Start the server
server.listen(port, () => console.log(`Server up on port http://localhost/${port}`));
