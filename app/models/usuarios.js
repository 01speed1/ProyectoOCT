//modelo de usuario
var mongoose 	= require("mongoose");

//validaciones

//definir el schema principal
var	usuarioSchema = mongoose.Schema({
	nombreUsuario:{
		type:String,
		require:true,
		maxlength: 60

	},
	nombres:{
		type: String,
		require: true,
		maxlength: 200
	},
	apellidos:{
		type: String,
		require: true,
		maxlength: 200
	},
	fechaNacimiento:{
		type:Date
	},
	genero:{
		type: String,
		require: true,
		maxlength: 200
	},
	tipo:{
		type:String,
		require:true,
		enum:["ADMINISTRADOR","PROFESOR","ESTUDIANTE","USUARIO"]
		default: "USUARIO"
	},
	//imagenes
	avatar:{
		type:String,
		default: "http://goo.gl/3Fy64e"
	},
	background:{
		type:String,
		default:"https://goo.gl/XIEAys"
	},
	creacion:{
		type:Date,
		default:Date.now();
	}
});

//virtuales 

//plugins

//export el schema como modelo
module.exports = mongoose.model('Usuario', usuarioSchema);