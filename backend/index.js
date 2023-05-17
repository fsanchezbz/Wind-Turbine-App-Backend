const express = require('express');
const app = express();
const port = process.env.PORT || 4005;
require('./db')();
const userRouter = require('./routes/userRoutes');
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
      'http://localhost:5173',
    ],
  })
);
app.use(cookieParser());

// Routes
app.use('/users', userRouter);

// Error handling
app.use(errorHandler);

app.listen(port, () => console.log(`Server up on port http://localhost/${port}`));