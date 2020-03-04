const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM alumnos', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

const getById = (pStudentId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM alumnos WHERE id = ?', [pStudentId], (err, rows) => {
            if (err) reject(err);
            if (rows.length === 0) {
                resolve(null);
            } else {
                resolve(rows[0]);
            }
        });
    });
};

const create = ({ nombre, apellidos, edad, email, notamedia, fecha_matricula, matricula, discapacidad, sexo }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO alumnos (nombre, apellidos, edad, email, notamedia, fecha_matricula, matricula, discapacidad, sexo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre, apellidos, edad, email, notamedia, fecha_matricula, matricula, discapacidad, sexo], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

const deleteById = (pStudentId) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM alumnos WHERE id = ?', [pStudentId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

module.exports = {
    getAll: getAll,
    getById: getById,
    create: create,
    deleteById: deleteById
}