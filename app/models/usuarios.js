//modelo de usuario
var mongoose 	= require("mongoose"),
 	moment 		=require("moment");

//validaciones

//definir el schema principal
var	usuarioSchema = mongoose.Schema({});

//virtuales 

//plugins

//export el schema como modelo
module.exports = mongoose.model('Usuario', usuarioSchema);