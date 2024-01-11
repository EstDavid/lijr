const express = require('express');
const cors = require('cors');
const router = require('./router');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

require('dotenv').config();

const MONGODB_URI = process.env.NODE_ENV === 'TEST'
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

const PORT = 4001;

app.use(express.static('build'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(router);

app.listen(PORT, () => {
  console.log(`LIJR Server ready at ${PORT}`);
});

module.exports = app;