const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  artist: String,
  cmc: Number,
  card_faces: [
    {
      artist: String,
      colors: [String],
      image_uris: {
        small: String,
        normal: String,
        large: String,
        png: String
      },
      loyalty: String,
      name: String,
      mana_cost: String,
      oracle_text: String,
      power: String,
      toughness: String,
      type_line: String
    }
  ],
  colors: [String],
  flavor_text: String,
  id: String,
  image_uris: {
    small: String,
    normal: String,
    large: String,
    png: String
  },
  layout: String,
  legalities: {
    brawl: String,
    commander: String,
    legacy: String,
    modern: String,
    pauper: String,
    pioneer: String,
    standard: String,
    vintage: String
  },
  loyalty: String,
  mana_cost: String,
  multiverse_ids: [String],
  name: String,
  oracle_id: String,
  oracle_text: String,
  power: String,
  rarity: String,
  released_at: String,
  related_uris: {
    edhrec: String,
    gatherer: String,
    mtgtop8: String,
    tcgplayer_decks: String
  },
  rulings_uri: String,
  scryfall_uri: String,
  set: String,
  set_name: String,
  set_type: String,
  toughness: String,
  type_line: String
});

module.exports = cardSchema;
