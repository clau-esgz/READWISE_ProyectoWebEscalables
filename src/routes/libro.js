const { Router } = require('express');
const { getLibro, getLibros, createLibro, getLibrosPorCategoria } = require('../controllers/libro');
const { validateJWT } = require('../middleware/verifyJWT');
const { verifyAdminRole } = require('../middleware/verifyAdminRole');

const router = Router();

router.get("/", getLibros);

router.get("/:id", getLibro);

router.get("/categoria/:id", getLibrosPorCategoria);

router.post("/", [validateJWT,verifyAdminRole], createLibro);


module.exports = router;