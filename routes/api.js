const express = require('express');
const router = express.Router();

const apiStudentsRouter = require('./api/students');
const apiUsersRouter = require('./api/users');

router.use('/students', apiStudentsRouter);
router.use('/users', apiUsersRouter);

module.exports = router;