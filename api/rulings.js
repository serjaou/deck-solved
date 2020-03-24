const express = require('express');
const router = express.Router();

// Ruling model
const Ruling = require('../models/rulings');

/**
 * @route GET api/rulings
 * @desc  Get the rulings for a specific card.
 */
router.get('/', (req, res) => {
  if (typeof req.query.oracle_id === 'string') {
    console.log(`[/rulings] handling GET request for "oracle_id=${req.query.oracle_id}"`);
    Ruling.find({ oracle_id: req.query.oracle_id }).then(
      rulings => res.send(rulings),
      error => console.log(error)
    );
  } else {
    console.log('[/rulings] bad request - returning an empty array');
    res.send([]);
  }
});

module.exports = router;
