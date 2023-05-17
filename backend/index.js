const express = require('express');
const app = express();
const port = process.env.PORT || 4005; 
require('./db')();
const userRouter = require('./routes/userRoutes');
const workRouter = require('./routes/workOrderRouter');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Greet on root route
app.get('/', (req, res) => res.send('The ducks are coming!'));

// General middlewares
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: [
      'https://wind-turbine-app-backend.onrender.com/',
      /https:\/\/profound-dasik-d1357e\.netlify\.app/
      
    ],
  })
);
app.use(cookieParser());

// Routes
app.use('/users', userRouter);
app.use('/work', workRouter);

// Error handling
app.use(errorHandler);

app.listen(port, () => console.log(`Server up on port http://localhost/${port}`));