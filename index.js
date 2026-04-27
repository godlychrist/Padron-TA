const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Configuración de conexión
const mongoURI = 'mongodb://localhost:27017/Cedulas';

mongoose.connect(mongoURI)
    .then(() => console.log('✅ Conexión exitosa a Mongo [DB Cedulas]'))
    .catch(err => console.error('❌ Error de conexión:', err));

// Esquema flexible para manejar cédulas como String o Number sin conflictos
const CedulaSchema = new mongoose.Schema({}, { collection: 'Cedulas', strict: false });
const Cedula = mongoose.model('Cedula', CedulaSchema);

app.get('/api/user/:cedula', async (req, res) => {
    try {
        const { cedula } = req.params;
        
        // Búsqueda simplificada y efectiva (Texto o Número)
        const result = await Cedula.findOne({
            $or: [
                { cedula: cedula },
                { cedula: Number(cedula) }
            ]
        });

        if (!result) {
            return res.status(404).json({ error: 'La cedula no existe en el padrón' });
        }

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
