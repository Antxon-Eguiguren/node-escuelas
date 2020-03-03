var express = require('express');
var router = express.Router();
const moment = require('moment');


const Alumno = require('../models/alumno');

// GET http://localhost:3000/students
router.get('/', async (req, res) => {
    const rows = await Alumno.getAll();
    res.render('../views/escuela/index', { rows });
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