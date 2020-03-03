const mysql = require('mysql');

// Configuramos la conexión con la BBDD pero nos conectamos a ella donde lo necesitemos
exports.connect = () => {
    const pool = mysql.createPool({
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        port: 8889,
        database: 'escuela_Node'
    });
    global.db = pool;
}