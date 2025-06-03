const { Router } = require('express');
const { validateJWT } = require('../middleware/verifyJWT');
const { getUsuarios, getUsuarioPorId, agregarLibroLeido, agregarLibroQuiereLeer, getLibrosLeidos, getLibrosQuiereLeer } = require('../controllers/usuario');
const router = Router();

router.get('/', getUsuarios);
//router.get('/:id', getUsuarioPorId);
router.post('/leidos', validateJWT, agregarLibroLeido);
router.post('/quiereleer', validateJWT, agregarLibroQuiereLeer);
router.get('/leidos', validateJWT, getLibrosLeidos);
router.get('/quiereleer', validateJWT, getLibrosQuiereLeer);

module.exports = router;
