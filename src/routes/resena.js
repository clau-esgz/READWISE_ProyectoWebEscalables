const { Router } = require('express');
const { validateJWT } = require('../middleware/verifyJWT');
const { agregarResena, obtenerResenasPorLibro, actualizarResena, getResenasPorUsuario } = require('../controllers/resena');

const router = Router();

router.post('/', validateJWT, agregarResena);
router.get('/libro/:libroId', obtenerResenasPorLibro);
router.put('/:resenaId', validateJWT, actualizarResena);
router.get('/usuario', validateJWT, getResenasPorUsuario);

module.exports = router;
