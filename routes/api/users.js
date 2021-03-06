const express = require('express');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jwt-simple');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const User = require('../../models/user');

// POST http://localhost:3000/api/users/register
router.post('/register', [
    check('username', 'El nombre de usuario debe estar entre 3 y 15 caracteres alfanuméricos').isLength({ min: 3, max: 15 }).isAlphanumeric(),
    check('email', 'El email debe ser un email válido').isEmail(),
    check('password', 'La password debe tener entre 4 y 8 caracteres y debe incluir como mínimo un número').custom((value) => {
        return (/^(?=.*\d).{4,8}$/).test(value);
    })
], async (req, res) => {
    try {
        const errors = validationResult(req);

        // Si hay errores en el formulario, devolvemos un json con los errores
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }

        // Si hay un usuario con ese email, devolvemos un json con el error
        const emailExiste = await User.emailExists(req.body.email);
        if (emailExiste !== null) {
            return res.json({ error: 'Ya existe un usuario con ese email. Introduce otro por favor.' });
        }

        // Si no hay errores en el formulario y no existe ningún mail en la BD, encriptamos la contraseña y metemos el nuevo usuario en la BD
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const result = await User.create(req.body);
        res.json(result);
    }
    catch (err) {
        console.log(err);
    }
})

// POST http://localhost:3000/api/users/login
// Comprueba si hay error en email y/o password (no comprueba username) y devuelve un token si no hay errores
router.post('/login', async (req, res) => {
    try {
        const user = await User.emailExists(req.body.email);
        if (user === null) {
            return res.status(401).json({ error: 'Error en email y/o password' });
        }
        const passwordIguales = bcrypt.compareSync(req.body.password, user.password);
        if (passwordIguales) {
            res.json({ success: createToken(user) });
        }
        else res.status(401).json({ error: 'Error en email y/o password' });
    }
    catch (err) {
        console.log(err);
    }
})

// Funciones de apoyo
const createToken = (pUser) => {
    const payload = {
        usuarioId: pUser.id,
        fechaCreacion: moment().unix(),
        fechaExpiracion: moment().add(15, 'minutes').unix()
    }
    return jwt.encode(payload, process.env.SECRET_KEY);
}

module.exports = router;