const { Router } = require('express');
const { getCategorias, getCategoriaPorNombre } = require('../controllers/categoria');
const router = Router();

router.get('/', getCategorias);
router.get('/:nombre', getCategoriaPorNombre);

module.exports = router;
