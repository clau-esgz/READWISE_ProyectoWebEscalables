const Categoria = require('../models/categoria');

const getCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener categorías", error: error.message });
    }
};

const getCategoriaPorNombre = async (req, res) => {
    const { nombre } = req.params;
    try {
        // Busca por el campo 'genero' (según tu base de datos)
        const categoria = await Categoria.findOne({
            genero: { $regex: `^${nombre}$`, $options: 'i' }
        });
        if (!categoria) return res.status(404).json({ msg: "Categoría no encontrada" });
        res.json(categoria);
    } catch (error) {
        res.status(500).json({ msg: "Error al buscar la categoría", error: error.message });
    }
};


module.exports = { getCategorias, getCategoriaPorNombre };
