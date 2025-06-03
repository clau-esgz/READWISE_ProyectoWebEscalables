const { response, request } = require('express');
const libro = require('../models/libro');

const libros = [];

const getLibro = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const libroEncontrado = await libro.findById(id);
        if (!libroEncontrado) {
            return res.status(404).json({ msg: "Libro no encontrado" });
        }
        res.status(200).json(libroEncontrado);
    } catch (error) {
        res.status(500).json({ msg: "Error al buscar el libro", error: error.message });
    }
}

const createLibro = async (req, res) => {
    const { isbn, autor, editorial, genero, titulo, sinopsis, portada, promedio_calificaciones, fecha_publicacion, numero_paginas } = req.body;

    const usuario = req.activeUser;

    if (!usuario) {
        return res.status(401).json({ msg: "Usuario no autenticado" });
    }

    try {
        const nuevoLibro = new libro({
            isbn,
            autor,
            editorial,
            genero,
            titulo,
            sinopsis,
            portada,
            promedio_calificaciones,
            fecha_publicacion,
            numero_paginas
        });

        await nuevoLibro.save();

        return res.status(201).json({ msg: "Libro creado correctamente", libro: nuevoLibro });
    } catch (error) {
        return res.status(500).json({ msg: "Error al crear el libro", error: error.message });
    }
};

const getLibros = async (req = request, res = response) => {
    const search = req.query.search || '';
    let filter = {};

    if (search) {
        filter = {
            $or: [
                { titulo: { $regex: search, $options: 'i' } },
                { autor: { $regex: search, $options: 'i' } }
            ]
        };
        console.log(filter);
    }

    try {
        const libros = await libro.find(filter);
        res.json(libros);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getLibrosPorCategoria = async (req, res) => {
    const { id } = req.params;
    const libros = await libro.find({ genero: id });
    res.json(libros);
}




module.exports = {
    getLibro,
    getLibros,
    createLibro,
    getLibrosPorCategoria
}