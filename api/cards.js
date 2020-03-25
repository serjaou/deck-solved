const express = require('express');
const router = express.Router();

// Card model
const Card = require('../models/cards');
const parseCardQuery = require('../models/parseCardQuery');

/**
 * @route GET api/cards
 * @desc  Perform a get request straight to the database. The query params
 *        should follow conventions determined on "parseCardQuery".
 */
router.get('/', (req, res) => {
  if (Object.keys(req.query).length > 0) {
    try {
      // parse request's query into a valid mongoDB selector
      const query = parseCardQuery(req.query);

      // perform the request to the database
      console.log(`[/cards] handling GET request for ${JSON.stringify(req.query)}`);
      Card.find(query).then(
        cards => res.status(200).send(cards),
        error => console.log(error)
      );
    } catch (error) {
      console.log(error);
      res.status(400).send('bad request');
    }
  } else {
    console.log('[/cards] bad request - empty query');
    res.status(400).send('bad request');
  }
});

module.exports = router;
