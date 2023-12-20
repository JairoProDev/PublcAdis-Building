const Anuncio = require('../models/adModel');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const uploadMiddleware = upload.single('image');

const crearAnuncio = async (req, res) => {
  const { adTitle, descripcion, numerosContacto, monto } = req.body;
  const image = req.file;

  try {
    const nuevoAnuncio = new Anuncio({
      adTitle,
      descripcion,
      numerosContacto,
      monto,
      image
    });

    await nuevoAnuncio.save();
    res.status(201).json({ mensaje: 'Anuncio creado exitosamente', anuncio: nuevoAnuncio });
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

module.exports = { uploadMiddleware, crearAnuncio, obtenerAnuncios };