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
const PNG = require('./models/pngSchema');

// Greet on root route
app.get('/', (req, res) => res.send('2023 PJ TurbinePro GmbH. All rights reserved.'));

// General middlewares
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://profound-dasik-d1357e.netlify.app',
    '*'
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
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173','https://profound-dasik-d1357e.netlify.app', '*'); // Replace with your frontend origin
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
  cors: corsOptions
});

// Socket.IO event handling
io.on('connection', (socket) => {

  socket.on('join_room', (data) => {
    socket.join(data);
  
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
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

app.post('/png/file', async (req, res) => {
  try {
    const { imageUrl } = req.body;

    // Create a new PNG document in the database
    const png = new PNG({ image: imageUrl });
    const savedPNG = await png.save();

    res.json({ png: savedPNG });
  } catch (error) {
    // console.error('Error uploading PNG file:', error);
    res.status(500).json({ message: 'Error uploading PNG file', error: error.message });
  }
});

app.get('/png/file/:id', async (req, res) => {
  try {
    const pngId = req.params.id;
    const png = await PNG.findById(pngId);

    if (!png) {
      return res.status(404).json({ message: 'PNG not found' });
    }

    res.json(png.image);
  } catch (error) {
    // console.error('Error fetching PNG:', error);
    res.status(500).json({ message: 'Error fetching PNG', error: error.message });
  }
});


// Start the server
server.listen(port, () => console.log(`Server up on port http://localhost/${port}`));
