const mysql = require('mysql');

// Configuramos la conexión con la BBDD pero nos conectamos a ella donde lo necesitemos
exports.connect = () => {
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE
    });
    global.db = pool;
}