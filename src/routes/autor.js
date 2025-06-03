const { Router } = require('express');
const { getAutorPorNombre, getAutorPorId, getAutores } = require('../controllers/autor');
const router = Router();

router.get('/', getAutores);
router.get('/nombre/:nombre', getAutorPorNombre);
router.get('/id/:id', getAutorPorId);

module.exports = router;
