const mongoose = require("mongoose");

const autorSchema = mongoose.Schema({
    nombre: String,
    descripcion: String,
    foto: String,
    // ...otros campos
});

module.exports = mongoose.model("Autor", autorSchema, "autores");
