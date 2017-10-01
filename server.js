'use strict'

const mongoose = require('mongoose'),
			app = require('./app'),
			config = require('./config')

mongoose.connect(config.db, { useMongoClient: true }, (err, res) => {
	if(err){
		return console.log(`Error al conectar con la base de datos: ${err}`)
	}
	console.log(`Conexión extablecida con la base de datos...`)
	app.listen(config.port, () => {
		console.log(`BITACORA DE SOPORTE corriendo el http://localhost:${config.port}`)
	})
})