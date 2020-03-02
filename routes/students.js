var express = require('express');
var router = express.Router();

// GET http://localhost:3000/students
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
            },
            {
                nombre: 'Aitziber',
                apellido: 'Redondo',
                edad: 31,
                email: 'aitziber@gmail.com',
                numMat: '2244C  '
            }
        ]
    });
});

// GET http://localhost:3000/students/new
router.get('/new', (req, res) => {
    res.render('newStudent');
});

// POST http://localhost:3000/students/create
router.post('/create', (req, res) => {
    console.log(req.body);
    res.send('Hola');
});

module.exports = router;