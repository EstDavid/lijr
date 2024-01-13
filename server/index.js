const express = require('express');
const cors = require('cors');
require('dotenv').config();
const usersRouter = require('./routers/users');
const entriesRouter = require('./routers/entries');
const aspectsRouter = require('./routers/aspects');

const corsConfig = {
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,
};

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const MONGODB_URI = process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development'
  ? process.env.MONGODB_URI_TEST
  : process.env.MONGODB_URI;

console.log(`Connecting to MongoDB at ${MONGODB_URI}`);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log(`Error in connection to MongoDB: ${error.message}`);
  });

const app = express();

const PORT = process.env.NODE_ENV === 'test'
  ? 3002
  : 3001;

app
  .use(cors(corsConfig))
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

app.use('/api/users', usersRouter);
app.use('/api/entries', entriesRouter);
app.use('/api/aspects', aspectsRouter);

const server = app.listen(PORT, () => {
  console.log(`LIJR Server ready at ${PORT}`);
});

module.exports = server;