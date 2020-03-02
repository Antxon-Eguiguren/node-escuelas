var express = require('express');
var router = express.Router();

// GET https://localhost:3000/students
router.get('/', (req, res) => {
    res.render('students', {
        students: [
            {
                nombre: 'Antxon',
                apellido: 'Eguiguren',
                edad: 34,
                email: 'antxon@gmail.com',
                numMat: '1234A'
            },
            {
                nombre: 'Julia',
                apellido: 'Besada',
                edad: 30,
                email: 'julia@gmail.com',
                numMat: '4321B'
            }
        ]
    });
});

// GET https://localhost:3000/students/new
router.get('/new', (req, res) => {
    res.render('newStudent');
});

module.exports = router;