const express = require('express');
const router = express.Router();

/* GET home page. */
router.use('/user', require('./users'))

module.exports = router;
