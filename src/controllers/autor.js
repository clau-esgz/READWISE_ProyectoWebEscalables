const Autor = require('../models/autor');

const getAutorPorNombre = async (req, res) => {
    const { nombre } = req.params;
    try {
        const autor = await Autor.findOne({ 
            nombre: { $regex: `^${nombre}$`, $options: 'i' } 
        });
        if (!autor) return res.status(404).json({ msg: "Autor no encontrado" });
        res.json(autor);
    } catch (error) {
        res.status(500).json({ msg: "Error al buscar el autor", error: error.message });
    }
};

const getAutorPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const autor = await Autor.findById(id);
        if (!autor) return res.status(404).json({ msg: "Autor no encontrado" });
        res.json(autor);
    } catch (error) {
        res.status(500).json({ msg: "Error al buscar el autor", error: error.message });
    }
};

const getAutores = async (req, res) => {
    try {
        const autores = await Autor.find();
        res.json(autores);
    } catch (error) {
        res.status(500).json({ msg: "Error al buscar el autor", error: error.message });
    }
};
module.exports = { getAutorPorNombre, getAutorPorId, getAutores};
