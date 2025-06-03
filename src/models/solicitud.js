//titulo, autor, editorial, categoria, fecha de solicitud, estado

const mongoose = require('mongoose');
const { Schema } = mongoose;

const solicitudSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'Autor',
        required: false
    },
    editorial: {
        type: String,
        required: true
    },  
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: false
    }});

const Solicitud = mongoose.model('Solicitud', solicitudSchema, 'solicitud');

module.exports = Solicitud;

        