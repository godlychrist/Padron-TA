const User = require("../models/user");

const getUser = async (req, res) => {
    let { cedula } = req.params;
    cedula = cedula.trim();

    console.log('🔍 Alguien está buscando la cédula:', cedula);

    try {
        // 1. Convertimos la cédula a número
        const cedulaNumero = Number(cedula);

        // 2. Validamos que sea un número real (que no sea NaN)
        if (isNaN(cedulaNumero)) {
            return res.status(400).json({ msg: "La cédula debe ser un valor numérico" });
        }

        // 3. Buscamos de forma exacta (sin $regex, ya que es Number)
        const persona = await User.findOne({ cedula: cedulaNumero }).lean();

        if (!persona) {
            console.log('❌ No existe esa cédula numérica:', cedulaNumero);
            return res.status(404).json({
                msg: `No se encuentra la cédula ${cedula}`
            });
        }

        console.log('✅ ¡Encontrado! Es:', persona.nombre);
        res.json(persona);

    } catch (err) {
        console.log('Error en la búsqueda:', err);
        res.status(500).json({ error: 'Error del servidor' });
    }
}

module.exports = {
    getUser,
}