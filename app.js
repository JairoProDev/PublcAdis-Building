const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const adRoutes = require('./routes/adRoutes'); // Ruta a los archivos de rutas


const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://JairoProDev:isOgCEALmpQsfA86@cluster0.cykdeq5.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', adRoutes);

/*
app.use('/api', adRoutes); // Utiliza las rutas de anuncio

const anuncioSchema = new mongoose.Schema({
  adTitle: String,
  descripcion: String,
});

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

app.use(express.json());

app.post('/api/anuncios', async (req, res) => {
  try {
    const nuevoAnuncio = new Anuncio(req.body);
    await nuevoAnuncio.save();
    res.status(201).json({ mensaje: 'Anuncio creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el anuncio' });
  }
});

app.use(express.static(path.join(__dirname, 'public')));

/* app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
  }); */
/*
app.get('/api/anuncios', async (req, res) => {
  try {
    const anuncios = await Anuncio.find();
    res.status(200).json(anuncios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los anuncios' });
  }
});

*/

app.listen(PORT, () => {
  console.log(`Servidor en línea en http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});
