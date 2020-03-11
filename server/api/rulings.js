const express = require('express');
const router = express.Router();

// Ruling model
const Ruling = require('../models/rulings');

/**
 * @route GET api/rulings
 * @desc  Get the rulings for a specific card
 */
router.get('/', (req, res) => {
  console.log(`handling "/rulings" GET request for [oracle_id=${req.query.oracle_id}]`);
  if (!req.query.oracle_id) {
    res.send([]);
  }
  Ruling.find({ oracle_id: req.query.oracle_id }).then(rulings => res.send(rulings));
});

module.exports = router;
