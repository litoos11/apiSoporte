'use strict'

const Telefono = require('../models/telefonos-model'),
			Recarga = require('../models/recargas-model'),
			moment = require('moment')

function getTelefonos (req, res) {

	Telefono.find({}).sort('_id').exec((err, telefonos) => {
		if(err){
			res.status(500).send({message: `Error en la petición ${err}`})
		}else{
			if(!telefonos){
				res.status(404).send({message: `No hay telefonos...`})
			}else{
				res.status(200).send({telefonos})
			}
		}
	})
}


function getTelefono (req, res) {
	let telefonoId = req.params.id;

	Telefono.findById(telefonoId).exec((err, telefono) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!telefono){
				res.status(404).send({message: `Error el telefono numero ${telefonoId} no existe !!!`});
			}else{
				res.status(200).send({telefono});				
			}
		}
	})
}

function saveTelefono (req, res) {
	console.log(req.body)

	let telefono = new Telefono(),
			params = req.body

	telefono._id = params.id
	telefono.ip = params.ip
	telefono.numTelefono = params.numTelefono
	telefono.categoria = params.categoria
	telefono.diasServicio = params.diasServicio,
	telefono.companiaTelefonica = params.companiaTelefonica

	telefono.save((err, telefonoStored) => {
		if(err){
			res.status(500).send({message: `Error en la petición`})
		}else{
			if(!telefonoStored){
				res.status(404).send({message: 'Error al guardar el Telefono :-('})
			}else{
				res.status(200).send({telefono: telefonoStored})
			}
		}
	})
}


// EJECUTAR CON EXEC peddiente ###########################################################33
function updateTelefono (req, res) {
	let telefonoId = req.params.id,
			update = req.body
			console.log(update)

	Telefono.findByIdAndUpdate(telefonoId, update).exec((err, telefonoUpdate) => {
		if(err){
			res.status(500).send({message: `Error en la petición`})
		}else{
			if(!telefonoUpdate){
				res.status(404).send({message: `No se pudo actualizar el telefono: ${telefonoId}`})
			}else{
				res.status(200).send({telefono: telefonoUpdate})
			}
		}
	})
}

function deleteTelefono (req, res) {
	let telefonoId = req.params.id;

	Telefono.findByIdAndRemove(telefonoId).exec((err, telefonoDelete)=>{
		if(err){
			res.status(500).send({message: `Error en la petición`});
		}else{
			if(!telefonoDelete){
				res.status(404).send({message: `No se pudo eliminar el telefono: ${telefonoId}`});
			}else{
				res.status(200).send({album: telefonoDelete});				
			}
		}
	})
}

// RECARGAS /////////////////////////////////////////////////

function getRecargas (req, res){
	Recarga.find({}).sort('_id').exec((err, recargas) => {
		if(err){
			res.status(500).send({message: `Error en la petición ${err}`})
		}else{
			if(!recargas){
				res.status(404).send({message: `No hay telefonos...`})
			}else{
				res.status(200).send({recargas})
			}
		}
	})
}

function saveRecarga (req, res) {
	let recarga = new Recarga(),
			params = req.body,
			diasServicio;

	let promise = new Promise((resolve, reject) =>{
		Telefono.findOne({_id: params.idTelefono}, {diasServicio:1, numTelefono:1}, (err, telefono) => {
			if(err){
				res.status(500).send({message: `Error en la petición del schema telefono`})
				reject( new Error())
			}else{
				if(!telefono){
					res.status(404).send({message: `No existe el numero de telefono...`})
					reject(new Error())
				}else{				
					resolve(telefono)
				}
			}
		})

	})

	recarga.idTelefono = params.idTelefono
	recarga.precio = params.precio
	recarga.fechaInicial = moment().format()

	promise
		.then((dataPromise) => {
			console.log(dataPromise)
			recarga.fechaFinal = moment().add(dataPromise.diasServicio, 'days').format()
			recarga.numTelefono = dataPromise.numTelefono
			// console.log(recarga.fechaFinal)
			recarga.save((err, recargaStored) => {
				if(err){
					console.log(err)
					res.status(500).send({message: `Error en la petición: ${err}`})
				}else{
					if(!recargaStored){
						res.status(404).send({message: 'Error al guardar la recarga :-('})
					}else{
						res.status(200).send({telefono: recargaStored})
						// resolve()
					}
				}
			})
		})
		.catch((err)=>{
			console.log(err.message)
		})	

}

module.exports = {
	getTelefonos,
	getTelefono,
	saveTelefono,
	updateTelefono,
	deleteTelefono,
	//Recargas
	getRecargas,
	saveRecarga
}