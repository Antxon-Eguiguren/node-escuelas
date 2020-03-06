var express = require('express');
var router = express.Router();

// GET http://localhost:3000/users/register
router.get('/register', (req, res) => {
  res.render('../views/escuela/register.pug');
});

module.exports = router;
