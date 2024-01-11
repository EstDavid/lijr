const express = require('express');
const cors = require('cors');
const router = require('./router');
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