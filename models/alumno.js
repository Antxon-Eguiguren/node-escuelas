const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM alumnos`, (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

const addStudent = (pNombre, pApellidos, pEdad, pEmail, pNotaMedia, pFechaMat, pMatricula, pDiscapacidad, pSexo) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO alumnos (nombre, apellidos, edad, email, notamedia, fecha_matricula, matricula, discapacidad, sexo) VALUES (${pNombre}, ${pApellidos}, ${pEdad}, ${pEmail}, ${pNotaMedia}, ${pFechaMat}, ${pMatricula}, ${pDiscapacidad}, ${pSexo})`, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

module.exports = {
    getAll: getAll,
    addStudent: addStudent
}