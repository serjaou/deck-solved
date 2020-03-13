const qs = require('qs');
const express = require('express');
const router = express.Router();

// Card model
const Card = require('../models/cards');

/**
 * @route GET api/cards
 * @desc  Get specific card(s). It can be used with a "name" query to employ
 * a simple name-search or with a "q" query object (stringified) which should
 * contains a MongoDB selector to query straight forward to the database.
 */
router.get('/', (req, res) => {
  const nameQuery = req.query.name;
  if (typeof nameQuery === 'string') {
    console.log(`[/cards] handling GET request for "name=${nameQuery}"`);
    Card.find({
      name: new RegExp(nameQuery, 'i')
    }).then(
      cards => res.send(cards),
      error => console.log(error)
    );
  } else {
    const mongoQuery = req.query.q && qs.parse(req.query.q);
    if (typeof mongoQuery === 'object' && Object.keys(mongoQuery).length > 0) {
      console.log(`[/cards] handling GET request for "selector: ${qs.stringify(mongoQuery)}"`);
      Card.find(mongoQuery).then(
        cards => res.send(cards),
        error => console.log(error)
      );
    } else {
      console.log('[/cards] bad request - returning an empty array');
      res.send([]);
    }
  }
});

module.exports = router;
