'use strict'

const mongoose = require('mongoose'),
			Schema = mongoose.Schema

const telefonoSchema = Schema({
	_id: Number,
	ip: String,
	numTelefono: Number,
	categoria: String,
	companiaTelefonica: String,
	puerto: String,
	diasServicio: Number,
	fecha: {type: Date, default: Date.now()}
}, {_id: false})

module.exports = mongoose.model('Telefono', telefonoSchema)