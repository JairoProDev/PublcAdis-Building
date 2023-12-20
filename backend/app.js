require('dotenv').config();
const express = require('express');
const { uploadMiddleware, crearAnuncio } = require('./controllers/adController');
const mongoose = require('mongoose');
const path = require('path');
const adRoutes = require('./routes/adRoutes');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
// Usa la variable de entorno MONGODB_URI o proporciona una cadena de conexión predeterminada
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://JairoProDev:isOgCEALmpQsfA86@cluster0.cykdeq5.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', adRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Servidor en línea en http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});
