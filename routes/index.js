const express = require('express');
const router = express.Router();

/* GET home page. */
router.use('/user', require('./users'))
router.use('/auth',require('./auth.js'))
router.use('/tasks',require('./task'))
router.use('/projects',require('./project.js'))
router.use('/categories',require('./category'))

module.exports = router;
