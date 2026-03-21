// routes/routes.js
const express = require('express');
const router = express.Router();
const { getUser } = require('../controllers/user');

// Ruta de prueba para ver si el API responde
router.get('/check', (req, res) => {
    res.json({ status: "API de Identidad funcionando ✅" });
});

router.get('/user/:cedula', getUser);

module.exports = router;