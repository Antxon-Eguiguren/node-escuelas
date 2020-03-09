const express = require('express');
const router = express.Router();
const moment = require('moment');

const Student = require('../../models/student');
const middlewares = require('../middlewares');

router.use(middlewares.checkToken);
router.use(middlewares.registerAction);

// GET http://localhost:3000/api/students
// Devolvemos un JSON con todos los estudiantes de la BD
router.get('/', async (req, res) => {
    // Tenemos disponible la variable payload porque la hemos guardado en la petición del middleware
    console.log(req.payload);
    const rows = await Student.getAll();
    for (row of rows) {
        row = formatearDatos(row);
    }
    res.json(rows);
});

// GET http://localhost:3000/api/students/:studentId
// Devolvemos un JSON con un estudiante de la BD, filtrado por Id
router.get('/:studentId', async (req, res) => {
    let row = await Student.getById(req.params.studentId);
    row = formatearDatos(row);
    res.json(row);
});

// POST http://localhost:3000/api/students/
// Insertamos un registro en la BD y devolvemos un JSON con el objeto (estudiante) entero como respuesta
router.post('/', async (req, res) => {
    const result = await Student.create(req.body);
    if (result.affectedRows === 1) {
        const row = await Student.getById(result.insertId);
        res.json(row);
    } else {
        res.json({ error: 'El alumno no se ha insertado en la BD 💩' });
    }
});

// DELETE http://localhost:3000/api/students/
// Borramos un alumno que pasamos su Id por el body (se podría pasar su Id por la URL, pero mejor por el body y así no modificamos la URL)
router.delete('/', async (req, res) => {
    const result = await Student.deleteById(req.body.id);
    if (result.affectedRows === 1) {
        res.json({ success: 'El alumno se ha borrado de la BD 😎' });
    } else {
        res.json({ error: 'El alumno no se ha borrado de la BD ' });
    }
});

// Funciones de apoyo
function formatearDatos(pStudent) {
    pStudent.fecha_matricula = moment(pStudent.fecha_matricula).format('DD/MM/YYYY');
    if (pStudent.sexo === 'M') {
        pStudent.sexo = 'Masculino'
    } else pStudent.sexo = 'Femenino'
    return pStudent;
}

module.exports = router;