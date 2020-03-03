var express = require('express');
var router = express.Router();

const students = [
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
];

// GET http://localhost:3000/students
router.get('/', (req, res) => {
    res.render('../views/escuela/index', { students });
});

// GET http://localhost:3000/students/new
router.get('/new', (req, res) => {
    res.render('../views/escuela/createStudent');
});

// POST http://localhost:3000/students/create
router.post('/create', (req, res) => {
    const student = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        edad: req.body.edad,
        email: req.body.email,
        numMat: req.body.numMat
    }
    students.push(student);
    res.render('../views/escuela/newStudent', { student });
});

// GET http://localhost:3000/students/edit
router.get('/edit', (req, res) => {
    res.render('../views/escuela/editStudent', { students });
});

module.exports = router;