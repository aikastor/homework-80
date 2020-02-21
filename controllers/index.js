const express = require('express');
const router = express.Router();

router.use('/items',require('./items'));
router.use('/categories', require('./categories'));

module.exports = router;