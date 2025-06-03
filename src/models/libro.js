const mongoose = require("mongoose");

const libroSchema = mongoose.Schema({
    ISBN: String,
    autor: { type: mongoose.Schema.Types.ObjectId, ref: 'Autor' },
    editorial: String,
    genero: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Categoria'
    },
    titulo: String,
    sinopsis: String,
    portada: String,
    promedio_calificaciones: Number,
    fecha_publicacion: String,
    numero_paginas: Number,
})

module.exports = mongoose.model("Libro", libroSchema, "libro");