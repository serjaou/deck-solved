require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cards = require('./api/cards');
const rulings = require('./api/rulings');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// connect to the database.
mongoose
  .connect(process.env.DB_URI, {
    dbName: 'deck-solved',
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected.'))
  .catch(error => console.log(error));

// use the API.
app.use('/api/cards', cards);
app.use('/api/rulings', rulings);

// serve static assets on production.
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}.`));
