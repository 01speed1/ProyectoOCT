//Modelo para las escuelas de formacion 
var mongoose 	= require("mongoose"),
 	uniqueValidator = require('mongoose-unique-validator'),
 	config 		= require("../../config/config.js");

 //definir el esquema principal 
 var schoolSchema = new mongoose.Schema({
 		nombre : {
 			type: String,
 			require: [true, "Se debe agregar un nombre a esta escuela"],
 			unique: true
 		},
 		creation: {
 			 type: Date,
 			 default: Date.now
 		}
 });

 //plugins
schoolSchema.plugin(uniqueValidator, {message: "Ya existe esa escuela"}); //cambia el mensaje de unique error

//exportar el modelo de este Schema
module.exports = mongoose.model('School', schoolSchema);