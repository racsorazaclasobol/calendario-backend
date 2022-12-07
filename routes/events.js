/*
*   Rutas de eventos / Events
*   host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { obtenerEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const router = Router();

//* Validar tokens en todas las peticiones
router.use( validarJWT );


//* Obtener Eventos
router.get( '/events', obtenerEventos);

//* Crear un evento
router.post( '/new', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio no es valida').custom( isDate ),
    check('end', 'La fecha de termino no es valida').custom( isDate ),
    validarCampos,
] , crearEvento );

//* Actualizar un Evento
router.put( '/update/:id',[
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio no es valida').custom( isDate ),
    check('end', 'La fecha de termino no es valida').custom( isDate ),
    validarCampos,
] ,actualizarEvento )

//* Eliminar un Evento
router.delete( '/delete/:id', eliminarEvento )


module.exports = router;

