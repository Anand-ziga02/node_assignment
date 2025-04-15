const express = require('express');
const router = express.Router();

/* GET home page. */
router.use('/user', require('./users'))
router.use('/auth',require('./auth.js'))

module.exports = router;
