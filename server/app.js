require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cards = require('./api/cards');
const rulings = require('./api/rulings');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Connect to the database
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected.'))
  .catch(error => console.log(error));

// Use cards API
app.use('/api/cards', cards);
app.use('/api/rulings', rulings);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}.`));
