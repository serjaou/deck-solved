const mongoose = require('mongoose');

const rulingSchema = new mongoose.Schema({
  object: String,
  oracle_id: String,
  source: String,
  published_at: String,
  comment: String
});

module.exports = rulingSchema;
