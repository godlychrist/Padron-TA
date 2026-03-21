const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Configuración de conexión (A tu MongoDB Local de Cédulas)
const mongoURI = 'mongodb://localhost:27017/Cedulas';

mongoose.connect(mongoURI)
    .then(() => console.log('✅ Conexión exitosa a Mongo [DB Cedulas]'))
    .catch(err => console.error('❌ Error de conexión:', err));

// Esquema simple para la colección de Cédulas
const CedulaSchema = new mongoose.Schema({
    cedula: String,
    nombre: String
}, { collection: 'Cedulas' });

const Cedula = mongoose.model('Cedula', CedulaSchema);

app.get('/api/user/:cedula', async (req, res) => {
    try {
        const { cedula } = req.params;
        const result = await Cedula.findOne({ cedula: cedula });

        if (!result) {
            return res.status(404).json({ error: 'La cedula no existe en el padrón' });
        }

        res.json({
            nombre: result.nombre,
            cedula: result.cedula
        });
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor de identidad' });
    }
});

app.listen(port, () => {
    console.log(`🚀 API de Padrón Nacional corriendo en http://localhost:${port}`);
});
