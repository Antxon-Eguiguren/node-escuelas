const jwt = require('jwt-simple');
const moment = require('moment');
const fs = require('fs');

// Middleware para comprobar el token de un usuario
const checkToken = (req, res, next) => {
    // 1. Comprobar si existe el token en la cabecera
    if (!req.headers.user_token) {
        return res.json({ error: 'Debes incluir la cabecera user_token' });
    }

    // 2. Comprobar si el token es correcto (se puede decodificar)
    const token = req.headers.user_token;
    let payload = null;
    try {
        // Si la función decode lanza un error porque no puede decodificar el token, salta al catch y lanza el error. Si no da error, significa que ha decodificado correctamente el token
        payload = jwt.decode(token, process.env.SECRET_KEY);
    }
    catch (err) {
        return res.json({ error: 'El token es incorrecto' });
    }

    // 3. Comprobar si el token ha expirado
    const fechaActual = moment().unix();
    if (fechaActual > payload.fechaExpiracion) {
        return res.json({ error: 'El token está caducado' });
    }

    // Para poder usar la variable payload en todas las peticiones donde usemos el middleware, metemos el payload en la request del middleware
    req.payload = payload;

    // 4. Si ha pasado todas las comprobaciones, dejamos pasar la petición
    next();
}

// Middleware para escribir en un fichero el ID del usuario y la petición que ha hecho, método y hora
const registerAction = (req, res, next) => {
    console.log('empieza req');
    console.log(req);
    console.log('termina req');
    fs.appendFileSync('logs/userActions.log', `Usuario: ${req.payload.usuarioId}. \n Método: ${req.method}. \n URL: ${req.originalUrl}. \n Fecha: ${req._startTime}. \n`);
    next();
}

module.exports = {
    checkToken: checkToken,
    registerAction: registerAction
}