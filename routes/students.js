var express = require('express');
var router = express.Router();

const Alumno = require('../models/alumno');

// GET http://localhost:3000/students
router.get('/', async (req, res) => {
    try {
        const rows = await Alumno.getAll();
        res.render('../views/escuela/index', { rows });
    }
    catch (err) {
        console.log(err);
    }
});

// ¿CÓMO SE HACE CON THEN Y CATCH?
// router.get('/', (req, res) => {
//     Alumno.getAll()
//         .then(res.render('../views/escuela/index', { rows }))
//         .catch(console.log(err));
// });

// GET http://localhost:3000/students/new
router.get('/new', (req, res) => {
    res.render('../views/escuela/createStudent');
});

// POST http://localhost:3000/students/create
router.post('/create', async (req, res) => {
    try {
        await Alumno.addStudent(req.body.nombre, req.body.apellidos, req.body.edad, req.body.email, req.body.notamedia, req.body.fecha_matricula, req.body.matricula, req.body.discapacidad, req.body.sexo);
        console.log('Alumno creado correctamente');
        res.redirect('/');
    }
    catch (err) {
        console.log(err);
    }
});

// GET http://localhost:3000/students/edit
router.get('/edit', (req, res) => {
    res.render('../views/escuela/editStudent', { students });
});

module.exports = router;