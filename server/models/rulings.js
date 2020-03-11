const mongoose = require('mongoose');
const rulingSchema = require('./schemas/rulingSchema');

module.exports = Ruling = mongoose.model('ruling', rulingSchema);
