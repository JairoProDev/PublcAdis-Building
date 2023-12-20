const mongoose = require('mongoose');

const anuncioSchema = new mongoose.Schema({
  adTitle: {
    type: String,
    required: [true, 'El título del anuncio es requerido'],
    unique: true,
    trim: true,
    maxlength: [50, 'El título del anuncio no puede tener más de 50 caracteres']
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción del anuncio es requerida'],
    trim: true,
    maxlength: [200, 'La descripción del anuncio no puede tener más de 200 caracteres']
  },
  imagen: {
    type: String,
    required: [true, 'La imagen del anuncio es requerida'],
    trim: true
  },
  precio: {
    type: Number,
    required: [true, 'El precio del anuncio es requerido'],
    trim: true
  },
  categoria: {
    type: String,
    required: [true, 'La categoría del anuncio es requerida'],
    trim: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  usuario: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  comentarios: [
    {
      usuario: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
      },
      texto: {
        type: String,
        required: [true, 'El comentario no puede estar vacío']
      },
      fecha: {
        type: Date,
        default: Date.now
      }
    }
  ]
});


module.exports = mongoose.model('Anuncio', anuncioSchema);