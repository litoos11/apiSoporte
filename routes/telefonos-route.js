'use strict'

const express = require('express'),
			api = express.Router(),
			telefonosController = require('../controllers/telefonos-controller')

api
	.get('/telefonos', telefonosController.getTelefonos)
	.get('/telefono/:id', telefonosController.getTelefono)
	.post('/telefono', telefonosController.saveTelefono)
	.put('/telefono/:id', telefonosController.updateTelefono)
	.delete('/telefono/:id', telefonosController.deleteTelefono)
//Recargas
	.get('/recargas', telefonosController.getRecargas)
	.post('/recarga', telefonosController.saveRecarga)
module.exports = api