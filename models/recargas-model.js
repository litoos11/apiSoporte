'use strict'

const mongoose = require('mongoose'),
			Schema = mongoose.Schema,
      AutoIncrement = require('mongoose-sequence-plugin')

const recargasSchema = Schema({
	_id: Number,
	idTelefono: Number,
	numTelefono: Number,
	precio: Number,
	fechaFinal: Date,
	fechaInicial: Date,
}, {_id: false})

recargasSchema.plugin(AutoIncrement, {field: '_id', startAt: '0000-0000-0000-0001',})
module.exports = mongoose.model('Recarga', recargasSchema)