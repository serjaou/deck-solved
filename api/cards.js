const express = require('express');
const router = express.Router();

// Card model
const Card = require('../models/cards');

/**
 * @route GET api/cards
 * @desc  Get specific card(s)
 */
router.get('/', (req, res) => {
  console.log(`handling GET request for [name=${req.query.name}]`);
  if (!req.query.name) {
    res.send([]);
  }
  Card.find({ name: new RegExp(req.query.name, 'i') }).then(cards => res.send(cards));
});

/**
 * @route GET api/cards/:id
 * @desc  Get a specific card
 */
router.get('/:card', (req, res) => {
  console.log(`handling GET request for [name=${req.params.card}]`);
  Card.findOne({ name: req.params.card }).then(card => res.send(card));
});

module.exports = router;
