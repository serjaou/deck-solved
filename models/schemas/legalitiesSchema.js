const mongoose = require('mongoose');

const legalitiesSchema = new mongoose.Schema({
  brawl: String,
  commander: String,
  legacy: String,
  modern: String,
  pauper: String,
  pioneer: String,
  standard: String,
  vintage: String
});

module.exports = legalitiesSchema;
