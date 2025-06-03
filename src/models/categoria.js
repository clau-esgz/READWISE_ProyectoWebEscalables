const mongoose = require("mongoose");

const categoriaSchema = mongoose.Schema({
    genero: String,
    imagen: String,
    portada: String// URL o nombre de archivo de la imagen
});

module.exports = mongoose.model("Categoria", categoriaSchema, "categoria");
