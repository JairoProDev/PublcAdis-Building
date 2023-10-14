const mongoose = require('mongoose');

const anuncioSchema = new mongoose.Schema({
  adTitle: String,
  descripcion: String,
});

module.exports = mongoose.model('Anuncio', anuncioSchema);
