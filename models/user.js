const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    cedula: { type: Number, required: true },
    nombre: String
})

module.exports = mongoose.model('user', userSchema, 'cedulas');