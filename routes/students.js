var express = require('express');
var router = express.Router();

const Student = require('../models/student');

// GET http://localhost:3000/students
router.get('/', async (req, res) => {
    try {
        const rows = await Student.getAll();
        res.render('../views/escuela/index', { students: rows });
    }
    catch (err) {
        console.log(err);
    }
});

// GET http://localhost:3000/students/new
router.get('/new', (req, res) => {
    res.render('../views/escuela/createStudent');
});

// GET http://localhost:3000/students/delete/:studentId
router.get('/delete/:studentId', (req, res) => {
    Student.deleteById(req.params.studentId)
        .then(result => {
            res.redirect('/students');
        })
        .catch(err => console.log(err));
});

// GET http://localhost:3000/students/:studentId
router.get('/:studentId', (req, res) => {
    Student.getById(req.params.studentId)
        .then(row => {
            res.render('../views/escuela/details', { student: row, id: req.params.studentId });
        })
        .catch(err => {
            console.log(err);
        });
});

// POST http://localhost:3000/students/create
router.post('/create', async (req, res) => {
    try {
        await Student.create({
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            edad: req.body.edad,
            email: req.body.email,
            notamedia: req.body.notamedia,
            fecha_matricula: req.body.fecha_matricula,
            matricula: req.body.matricula,
            discapacidad: req.body.discapacidad,
            sexo: req.body.sexo
        });
        res.redirect('/students');
    }
    catch (err) {
        console.log(err);
    }
});

module.exports = router;