const { Router } = require('express');
const { validateJWT } = require('../middleware/verifyJWT');
const { verifyAdminRole } = require('../middleware/verifyAdminRole');
const { agregarSolicitud, obtenerSolicitudes, eliminarSolicitud, obtenerSolicitudPorId } = require('../controllers/solicitud');

const router = Router();

router.post('/', validateJWT, agregarSolicitud);
router.get('/', validateJWT, verifyAdminRole, obtenerSolicitudes);
router.get('/:id', validateJWT, verifyAdminRole, obtenerSolicitudPorId);
router.delete('/:id', validateJWT, verifyAdminRole, eliminarSolicitud);

module.exports = router;