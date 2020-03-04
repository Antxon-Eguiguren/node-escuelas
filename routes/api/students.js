const express = require('express');
const router = express.Router();

const Student = require('../../models/student');

// GET http://localhost:3000/api/students
router.get('/', async (req, res) => {
    const rows = await Student.getAll();
    res.json(rows);
});

module.exports = router;