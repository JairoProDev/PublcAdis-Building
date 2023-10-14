const Anuncio = require('../models/adModel');

const crearAnuncio = async (req, res) => {
  try {
    const nuevoAnuncio = new Anuncio(req.body);
    await nuevoAnuncio.save();
    res.status(201).json({ mensaje: 'Anuncio creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el anuncio' });
  }
};

const obtenerAnuncios = async (req, res) => {
  try {
    const anuncios = await Anuncio.find();
    res.status(200).json(anuncios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los anuncios' });
  }
};

module.exports = { crearAnuncio, obtenerAnuncios };
