const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const Libro = require('../models/libro');
require("dotenv").config();

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener usuarios", error: error.message });
    }
};

// Obtener usuario por ID
const getUsuarioPorId = async (req, res) => {
    console.log("aaaaa?");
    const { id } = req.params;
    try {
        const usuario = await Usuario.findById(id);
        if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ msg: "Error al buscar el usuario", error: error.message });
    }
};


const agregarLibroLeido = async (req, res) => {
    
    const { libroId } = req.body;

    try {
        const usuario = req.activeUser; // Este debe estar poblado por el middleware de autenticación
        const libro = await Libro.findById(libroId);

        if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });
        if (!libro) return res.status(404).json({ msg: "Libro no encontrado" });

        const yaLeido = usuario.leidos.includes(libroId);
        if (yaLeido) {
            return res.status(400).json({ msg: "El libro ya está en la lista de leídos" });
        }

        // Eliminar de quiero_leer si está
        usuario.quiero_leer = usuario.quiero_leer.filter(id => id.toString() !== libroId);

        // Agregar a leídos
        usuario.leidos.push(libroId);

        await usuario.save();

        res.json({ msg: "Libro movido a leídos", usuario });
    } catch (error) {
        res.status(500).json({ msg: "Error al agregar libro a leídos", error: error.message });
    }
};


const agregarLibroQuiereLeer = async (req, res) => {
    const { libroId } = req.body;

    try {
        const usuario = req.activeUser; // Este debe estar poblado por el middleware de autenticación
        const libro = await Libro.findById(libroId);

        if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });
        if (!libro) return res.status(404).json({ msg: "Libro no encontrado" });

        const yaLeido = usuario.quiero_leer.includes(libroId);
        if (yaLeido) {
            return res.status(400).json({ msg: "El libro ya está en la lista de quiero leer" });
        }

        // Eliminar de quiero_leer si está
        usuario.leidos = usuario.leidos.filter(id => id.toString() !== libroId);

        // Agregar a leídos
        usuario.quiero_leer.push(libroId);

        await usuario.save();

        res.status(200).json( usuario );
    } catch (error) {
        res.status(500).json({ msg: "Error al agregar libro a quiero leer", error: error.message });
    }
};

const getLibrosLeidos = async (req, res) => {
    const usuario = req.activeUser;
    const libros = await Libro.find({ _id: { $in: usuario.leidos } });
    res.json(libros);
};

const getLibrosQuiereLeer = async (req, res) => {
    const usuario = req.activeUser;
    const libros = await Libro.find({ _id: { $in: usuario.quiero_leer } });
    res.json(libros);
};



module.exports = { getUsuarios, getUsuarioPorId, agregarLibroLeido, agregarLibroQuiereLeer, getLibrosLeidos, getLibrosQuiereLeer };
