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

    if (!anuncios || anuncios.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron anuncios' });
    }

    res.status(200).json(anuncios);
  } catch (error) {
    console.error('Error al obtener los anuncios:', error);
    res.status(500).json({ error: 'Error interno al obtener los anuncios' });
  }
};

module.exports = { crearAnuncio, obtenerAnuncios };
