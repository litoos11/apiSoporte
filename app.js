'use strict'

const express = require('express'),
			bodyParser = require('body-parser'),
			app = express(),
			telefonosRoutes = require('./routes/telefonos-route')


app
	.use(bodyParser.urlencoded({extended: false}))
	.use(bodyParser.json())

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
})

app
	.use('/api', telefonosRoutes)

module.exports = app
