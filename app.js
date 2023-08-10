const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/anuncios', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define el esquema del anuncio
const anuncioSchema = new mongoose.Schema({
  // Define los campos aquí
});

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// Configura rutas y controladores aquí

app.listen(PORT, () => {
  console.log(`Servidor en línea en el puerto ${PORT}`);
});
