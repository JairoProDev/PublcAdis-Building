const mongoose = require("mongoose");

const anuncioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "El título del anuncio es requerido"],
    unique: true,
    trim: true,
    maxlength: [
      50,
      "El título del anuncio no puede tener más de 50 caracteres",
    ],
  },
  description: {
    type: String,
    required: [true, "La descripción del anuncio es requerida"],
    trim: true,
    maxlength: [
      200,
      "La descripción del anuncio no puede tener más de 200 caracteres",
    ],
  },
});

module.exports = mongoose.model("Anuncio", anuncioSchema);