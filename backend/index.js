const express = require('express');
const app = express();
const port = process.env.PORT;
require('./db')();
const userRouter = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Greet on root route
app.get('/', (req, res) => res.send('The ducks are coming!'));

// General middlewares
app.use(express.json());
const corsOptions = {
  origin: 'https://localhost:3001'
};
app.use(cors(corsOptions));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// app.use(cors({
//     credentials: true,
//     origin: [
//       'https://localhost:3001',
      
//     ],
//   })
// );
app.use(cookieParser());

// Routes
app.use('/users', userRouter);

// Error handling
app.use(errorHandler);

app.listen(port, () => console.log(`Server up on port ${port}`));
