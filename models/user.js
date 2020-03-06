const create = ({ username, email, password }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)', [username, email, password], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

const emailExists = (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows[0]);
        });
    });
}

module.exports = {
    create: create,
    emailExists: emailExists
}