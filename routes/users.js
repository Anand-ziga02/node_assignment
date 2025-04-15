const express = require('express');
const router = express.Router();

/* GET users listing. */
router.post('/', function (req, res, next) {
  try {
    let message = "Hello Rio"
    console.log('respond with a resource', message)
    return res.status(200).json({ message: "Login Successfull" })
  } catch (error) {
    return res.status(400).json({ message: "Error While Login", error: error.message })
  }
});

module.exports = router;
