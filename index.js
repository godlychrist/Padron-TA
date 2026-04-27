const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Configuración de conexión (A tu MongoDB Local de Cédulas)
const mongoURI = 'mongodb://localhost:27017/Cedulas';

mongoose.connect(mongoURI)
    .then(() => console.log('✅ Conexión exitosa a Mongo [DB Cedulas]'))
    .catch(err => console.error('❌ Error de conexión:', err));

// --- ESQUEMA (Fusión) ---
// Definimos los campos de Cris para orden, pero dejamos strict: false por si hay campos extra
const CedulaSchema = new mongoose.Schema({
    cedula: String,
    nombre: String
}, { collection: 'Cedulas', strict: false });

const Cedula = mongoose.model('Cedula', CedulaSchema);

app.get('/api/user/:cedula', async (req, res) => {
    try {
        const { cedula } = req.params;
        
        // --- BÚSQUEDA ROBUSTA (Tu versión) ---
        // Esto es mejor porque busca si la cédula es Texto o Número en la DB
        console.log(`Buscando cédula: ${cedula} (tipo: ${typeof cedula})`);
        
        const result = await Cedula.findOne({
            $or: [
                { cedula: cedula },
                { cedula: String(cedula) },
                { cedula: Number(cedula) }
            ]
        });

        if (!result) {
            console.log("Cédula no encontrada en el padrón");
            return res.status(404).json({ error: 'La cedula no existe en el padrón' });
        }

        console.log("Cédula encontrada:", result.nombre);

        res.json({
            nombre: result.nombre,
            cedula: result.cedula
        });
    } catch (err) {
        console.error("Error en el API de padrón:", err);
        res.status(500).json({ error: 'Error interno del servidor de identidad' });
    }
});

app.listen(port, () => {
    console.log(`🚀 API de Padrón Nacional corriendo en http://localhost:${port}`);
});
