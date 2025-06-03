const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const Libro = require('../models/libro');
const Resena = require('../models/resena');

const agregarResena = async (req, res) => {

    const { libro , contenido, calificacion, fecha } = req.body;

    const usuario = req.activeUser;


    if (!usuario) {
        return res.status(401).json({
            msg: "Usuario no autenticado"
        });
    }

    try {
        const libroBD = await Libro.findById(libro);

        if (!libroBD) {
            return res.status(404).json({
                msg: "Libro no encontrado"
            });
        }

        const nuevaResena = new Resena({
            usuario: usuario._id,
            libro: libro,
            contenido: contenido,
            calificacion: calificacion,
            fecha: fecha
        });

        await nuevaResena.save();

        return res.status(201).json(nuevaResena);
    } catch (error) {
        return res.status(500).json({
            msg: "Error al agregar la resena",
            error: error.message
        });
    }
};

const obtenerResenasPorLibro = async (req, res) => {
    const { libroId } = req.params;

    try {
        const libro = await Libro.findById(libroId);

        if (!libro) {
            return res.status(404).json({
                msg: "Libro no encontrado"
            });
        }

        const resenas = await Resena.find({ libro: libroId })
        .populate('libro')    // agrega la info del libro
        .populate('usuario'); // agrega la info del usuario que hizo la reseña;

        return res.status(200).json(resenas);
    } catch (error) {
        return res.status(500).json({
            msg: "Error al obtener las resenas",
            error: error.message
        });
    }
};

const actualizarResena = async (req, res) => {
    const { resenaId, contenido, calificacion } = req.body;

    try {
        const resena = await Resena.findById(resenaId);

        if (!resena) {
            return res.status(404).json({
                msg: "Resena no encontrada"
            });
        }

        resena.contenido = contenido;
        resena.calificacion = calificacion;

        await resena.save();

        return res.status(200).json({
            msg: "Reseña actualizada correctamente",
            resena: resena
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Error al actualizar la reseña",
            error: error.message
        });
    }
};

const getResenasPorUsuario = async (req, res) => {
    const usuario = req.activeUser;

    if (!usuario) {
        return res.status(401).json({
            msg: "Usuario no autenticado"
        });
    }

    try {
        const resenas = await Resena.find({ usuario: usuario._id })
        .populate('libro')    // agrega la info del libro
        .populate('usuario'); // agrega la info del usuario que hizo la reseña;

    return res.status(200).json(resenas);
    } catch (error) {
        return res.status(500).json({
            msg: "Error al obtener las resenas",
            error: error.message
        });
    }
};

    
module.exports = {
    agregarResena,
    obtenerResenasPorLibro,
    actualizarResena,
    getResenasPorUsuario
};