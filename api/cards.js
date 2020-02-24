const express = require('express');
const router = express.Router();

// Card model
const Card = require('../models/cards');

/**
 * @route GET api/cards
 * @desc  Get specific card(s)
 */
router.get('/', (req, res) => {
  console.log(`handling GET request for query[name=${req.query.name}]`);
  if (!req.query.name) {
    res.send([]);
  }
  Card.find({ name: new RegExp(req.query.name, 'i') }).then(cards => {
    res.send(
      cards.filter(
        card =>
          card.multiverse_ids.length > 0 &&
          (card.set_type === 'expansion' || card.set_type === 'core')
      )
    );
  });
});

module.exports = router;
