const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const Libro = require('../models/libro');
const Resena = require('../models/resena');
const Solicitud = require('../models/solicitud');

const agregarSolicitud = async (req, res) => {
    const { titulo, autor, editorial, categoria } = req.body;

    const usuario = req.activeUser;

    if (!usuario) {
        return res.status(401).json({
            msg: "Usuario no autenticado"
        });
    }

    try {
        const nuevaSolicitud = new Solicitud({
            titulo,
            autor,
            editorial,
            categoria
        }); 

        await nuevaSolicitud.save();

        return res.status(201).json({
            msg: "Solicitud agregada correctamente",
            solicitud: nuevaSolicitud
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Error al agregar la solicitud",
            error: error.message
        });
    }
};

const eliminarSolicitud = async (req, res) => {
    const { id } = req.params;

    const usuario = req.activeUser;

    if (!usuario) {
        return res.status(401).json({
            msg: "Usuario no autenticado"
        });
    }

    try {
        await Solicitud.findByIdAndDelete(id);

        return res.status(200).json({ 
            msg: "Solicitud eliminada correctamente",
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Error al eliminar la solicitud",
            error: error.message
        });
    }
};

const obtenerSolicitudPorId = async (req, res) =>{
    const usuario = req.activeUser;
    
    if (!usuario) {
        return res.status(401).json({
            msg: "Usuario no autenticado"
        });
    }   
    try {
        const solicitudes = await Solicitud.findById(req.params.id).populate('autor').populate('categoria');

        return res.status(200).json(solicitudes);
    } catch (error) {
        return res.status(500).json({
            msg: "Error al obtener las solicitudes",
            error: error.message
        });
    }
}

const obtenerSolicitudes = async (req, res) => {
    const usuario = req.activeUser;

    if (!usuario) {
        return res.status(401).json({
            msg: "Usuario no autenticado"
        });
    }   

    try {
        const solicitudes = await Solicitud.find()
        .populate('autor')
        .populate('categoria');

        return res.status(200).json(solicitudes);
    } catch (error) {
        return res.status(500).json({
            msg: "Error al obtener las solicitudes",
            error: error.message
        });
    }
};



module.exports = {
    agregarSolicitud,
    obtenerSolicitudes,
    eliminarSolicitud,
    obtenerSolicitudPorId
};
