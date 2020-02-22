const mongoose = require('mongoose');
const cardFaceSchema = require('./cardFaceSchema');
const imageUriSchema = require('./imageUriSchema');
const legalitiesSchema = require('./legalitiesSchema');
const relatedUriSchema = require('./relatedUriSchema');

const cardSchema = new mongoose.Schema({
  artist: String,
  cmc: Number,
  card_faces: [cardFaceSchema],
  colors: [String],
  flavor_text: String,
  id: String,
  image_uris: imageUriSchema,
  layout: String,
  legalities: legalitiesSchema,
  loyalty: String,
  mana_cost: String,
  name: String,
  oracle_id: String,
  oracle_text: String,
  power: String,
  rarity: String,
  related_uris: relatedUriSchema,
  rulings_uri: String,
  scryfall_uri: String,
  set: String,
  toughness: String,
  type_line: String
});

module.exports = cardSchema;
