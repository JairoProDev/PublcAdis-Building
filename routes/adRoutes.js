const express = require('express');
const router = express.Router();
const { crearAnuncio, obtenerAnuncios } = require('../controllers/adController');

router.post('/anuncios', crearAnuncio);
router.get('/anuncios', obtenerAnuncios);

module.exports = router;
