const mongoose = require('mongoose');

const imageUriSchema = new mongoose.Schema({
  small: String,
  normal: String,
  large: String,
  png: String
});

module.exports = imageUriSchema;
