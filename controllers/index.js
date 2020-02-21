const express = require('express');
const router = express.Router();

router.use('/items',require('./items'));
router.use('/categories', require('./categories'));
router.use('/locations', require('./locations'));

module.exports = router;