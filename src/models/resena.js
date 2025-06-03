const mongoose = require("mongoose");

const resenaSchema = mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    libro: { type: mongoose.Schema.Types.ObjectId, ref: 'Libro' },
    calificacion: Number,
    contenido: String,
    fecha: String
})

module.exports = mongoose.model("Resena", resenaSchema, "resena");