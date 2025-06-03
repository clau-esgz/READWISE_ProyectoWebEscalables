const mongoose = require("mongoose");


const usuarioSchema = new mongoose.Schema({
    correo: {type: String, required: true, unique: true},
    contrasena: {type: String, required: true},
    rol: {type: String, required: true},
    leidos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Libro'
        }
    ],
    quiero_leer: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Libro'
        }
    ]
});

module.exports = mongoose.model("Usuario", usuarioSchema, "usuario");
