var express = require('express');
var router = express.Router();

const apiStudentsRouter = require('./api/students');

router.use('/students', apiStudentsRouter);

module.exports = router;