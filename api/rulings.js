const express = require('express');
const router = express.Router();

// Ruling model
const Ruling = require('../models/rulings');

/**
 * @route GET api/rulings
 * @desc  get the rulings for a specific card.
 */
router.get('/', (req, res) => {
  if (req.query.oracle_id) {
    console.log(`[/rulings] handling GET request for "oracle_id: ${req.query.oracle_id}"`);
    Ruling.find({ oracle_id: req.query.oracle_id }).then(
      rulings => res.status(200).send(rulings),
      error => console.log(error)
    );
  } else {
    console.log('[/rulings] bad request - empty query');
    res.status(400).send('bad request');
  }
});

module.exports = router;
