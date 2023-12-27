const Ad = require("../models/adModel");

const createAd = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newAd = new Ad({
      title: title,
      description: description,
    });

    await newAd.save();
    res
      .status(201)
      .json({ mensaje: "Anuncio creado exitosamente", anuncio: newAd });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el anuncio" });
  }
};

const getAds = async (req, res) => {
  try {
    const anuncios = await Ad.find();

    if (!anuncios || anuncios.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron anuncios" });
    }

    res.status(200).json(anuncios);
  } catch (error) {
    console.error("Error al obtener los anuncios:", error);
    res.status(500).json({ error: "Error interno al obtener los anuncios" });
  }
};

// Devuelve un solo anuncio por su ID
const getAdById = async (req, res) => {
  try {
    const anuncio = await Ad.findById(req.params.id);

    if (!anuncio) {
      return res.status(404).json({ mensaje: "No se encontró el anuncio" });
    }

    res.status(200).json(anuncio);
  } catch (error) {
    console.error("Error al obtener el anuncio:", error);
    res.status(500).json({ error: "Error interno al obtener el anuncio" });
  }
};
// Actaulizar anuncio (modificar)
const updateAd = async (req, res) => {
  try {
    const anuncio = await Ad.findById(req.params.id);

    if (!anuncio) {
      return res.status(404).json({ mensaje: "No se encontró el anuncio" });
    }

    anuncio.title = req.body.title || anuncio.title;
    anuncio.description = req.body.description || anuncio.description;

    await anuncio.save();
    res.status(200).json({ mensaje: "Anuncio actualizado", anuncio: anuncio });
  } catch (error) {
    console.error("Error al actualizar el anuncio:", error);
    res.status(500).json({ error: "Error interno al actualizar el anuncio" });
  }
};
// Eliminar anuncio
const deleteAd = async (req, res) => {
  try {
    const anuncio = await Ad.findById(req.params.id);

    if (!anuncio) {
      return res.status(404).json({ mensaje: "No se encontró el anuncio" });
    }

    await anuncio.remove();
    res.status(200).json({ mensaje: "Anuncio eliminado", anuncio: anuncio });
  } catch (error) {
    console.error("Error al eliminar el anuncio:", error);
    res.status(500).json({ error: "Error interno al eliminar el anuncio" });
  }
};

module.exports = { createAd, getAds, getAdById };
