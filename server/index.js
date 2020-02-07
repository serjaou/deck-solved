const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const start = () => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));

  mongoose
    .connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected.'))
    .catch(error => console.log(error));

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server started on port ${port}.`));
};

module.exports.start = start;
