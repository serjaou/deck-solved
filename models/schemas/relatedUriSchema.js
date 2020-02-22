const mongoose = require('mongoose');

const relatedUriSchema = new mongoose.Schema({
  edhrec: String,
  gatherer: String,
  mtgtop8: String,
  tcgplayer_decks: String
});

module.exports = relatedUriSchema;
