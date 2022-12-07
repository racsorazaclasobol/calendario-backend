/*
*    Rutas de usuarios / Auth
*    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post( 
    '/new', 
    [ //Middlewares
        check('name', 'El Nombre es obligatorio').not().isEmpty(),
        check('email', 'El Email es obligatorio').isEmail(),
        check('password', 'La Contraseña debe de ser de 6 caracteres').isLength({ min:6 }),
        validarCampos,
    ], 
    crearUsuario);

router.post( 
    '/',
    [ // Middlewares
        check( 'email', 'El Email es obligatorio' ).isEmail(),
        check( 'password', 'La Contraseña debe de ser de 6 caracteres' ).isLength({ min:6 }),
        validarCampos
    ], 
    loginUsuario);

router.get( '/renew', validarJWT, revalidarToken);

module.exports = router;

