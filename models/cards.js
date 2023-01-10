const mongoose = require('mongoose');
const cardSchema = require('./schemas/cardSchema');

module.exports = Card = mongoose.model('card', cardSchema, 'cards');
