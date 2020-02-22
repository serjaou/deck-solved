const mongoose = require('mongoose');
const imageUriSchema = require('./imageUriSchema');

const cardFaceSchema = new mongoose.Schema({
  name: String,
  mana_cost: String,
  type_line: String,
  oracle_text: String,
  colors: [String],
  power: String,
  toughness: String,
  artist: String,
  image_uris: imageUriSchema
});

module.exports = cardFaceSchema;
