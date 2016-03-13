//configurar el modelo para las areas de las escuelas de formacion
var mongoose 		= require("mongoose"),
 	uniqueValidator = require('mongoose-unique-validator'),
 	config 			= require("../../config/config.js"),
 	School			= mongoose.model('School');

 //definir el Schema para el area
var areaSchema = new mongoose.Schema({
	name: {
		type: String, 
		require: [true, "Debes ponerle un nombre a esta area de aprendizaje"], 
		unique: true
	},
	school: {
		type: mongoose.Schema.ObjectId, 
		ref: "School"
	},
	creation: {
		type: Date, 
		default: Date.now
	}
});

//plugins
areaSchema.plugin(uniqueValidator, {message: "Ya existe esa area de aprendizaje"}); //cambia el mensaje de unique error

//exportar el modelo de este Schema
module.exports = mongoose.model('Area', areaSchema);