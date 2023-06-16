const express = require('express');
const path = require('path');
const dbName = 'MovieBooking'
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.join(__dirname, '../.env') });
}

// require('./db/mongoose');
const mongoose = require('mongoose')

// mongoose.connect('mongodb+srv://thakurkrish50:7HyOOOMWuaWDwR2I@cluster0.ax3u32k.mongodb.net/?retryWrites=true&w=majority/movie')
// .then(() => console.log('Database connected successfully.'))
// .catch(err => console.log(err.message))

// connect database
mongoose.connect('mongodb://127.0.0.1:27017/' + dbName)
  .then(() => console.log('Connected successfully to the monogodb database server'))
  .catch((err) => console.log(err));

// Routes
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const cinemaRouter = require('./routes/cinema');
const showtimeRouter = require('./routes/showtime');
const reservationRouter = require('./routes/reservation');
const invitationsRouter = require('./routes/invitations');

const app = express();
app.disable('x-powered-by');
const port = 8080;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../client/build')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization'
  );

  //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Pass to next layer of middleware
  next();
});
app.use(express.json());
app.use(userRouter);
app.use(movieRouter);
app.use(cinemaRouter);
app.use(showtimeRouter);
app.use(reservationRouter);
app.use(invitationsRouter);

// app.get('/api/test', (req, res) => res.send('Hello World'))

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '../../client/build/index.html'));
});
app.listen(port, () => console.log(`app is running in PORT: ${port}`));
