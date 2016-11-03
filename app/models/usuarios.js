//modelo de usuario
var mongoose 	= require("mongoose");
var moment = require("moment");

//validaciones
var passValidator = {
	validator: function (pass)  {
		return this.contraseñaValidar == pass
	}, message : "Las contraseñas no coinciden"
};
//definir el schema principal
var	usuarioSchema = mongoose.Schema({
	tipoDocumento:{
		type:String,
		require:true,
		enum:["CC","TI","CE"]
	},
	numeroDocumento:{
		type:Number,
		require:true
	},
	nombreUsuario:{
		type:String,
		require:true,
		maxlength: 60,
		unique:true
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
	email:{
		type:String,
		require:true,
		maxlength: 300
	},
	contraseña:{
		type:String,
		require:true,
		minlength: 8,
		validate: passValidator
	},
	fechaNacimiento:{
		type:Date
	},
	genero:{
		type: String,
		require: false,
		enum:["H","M"],
		default:"H"
	},
	telefono:{
		type:String
	},
	tipo:{
		type:String,
		require:true,
		enum:["ADMINISTRADOR","PROFESOR","ESTUDIANTE","USUARIO"],
		default: "USUARIO"
	},
	//imagenes
	avatar:{
		type:String,
		default: "http://goo.gl/3Fy64e"
	},
	avatar_id:{
		type:String,
		default: "default-img-profile_crowfz"
	},
	background:{
		type:String,
		default:"https://goo.gl/XIEAys"
	},
	creacion:{
		type:Date,
		default:Date.now()
	},
	estado:{
		type:String,
		enum:["NUEVO", "MODIFICADO", "VISTO"],
		default:"NUEVO"
	},
	fechaModificado:{
		type:Date
	},
	superAdmin:{
		type: Boolean,
		default:false
	}
});

//virtuales
usuarioSchema.virtual("contraseñaValidar")
	.get(function () {
		return this.cnfirmation;		
	})
	.set(function (constraseña) {
		this.cnfirmation = constraseña;
	});
usuarioSchema.virtual("edad")
	.get(function () {
		return moment(this.fechaNacimiento).locale('es').fromNow(true);
	})
usuarioSchema.virtual("ultimaModi")
	.get(function () {
		return moment(this.fechaModificado).locale('es').fromNow(true);
	})
usuarioSchema.virtual("fechaPretty")
	.get(function () {
		return moment(this.fechaNacimiento).locale('es').format("LL");
	})
usuarioSchema.virtual("creacionPretty")
	.get(function () {
		if (this.creacion == null) {
			return "No se ha modificado"
		} else {
			return moment(this.creacion).locale('es').format("LL");
		}
		
	})
usuarioSchema.virtual("fechaSubmit")
	.get(function () {
		return moment(this.fechaNacimiento).locale('es').format("YYYY-MM-DD");
	})

//plugins
usuarioSchema.plugin(require('mongoose-paginate'));

//pre
var Grupo = require("../models/grupos.js");

usuarioSchema.pre('remove', function (next) {

	if (this.tipo = "PROFESOR"){
		 var promise = Grupo.find({profesor: this.id}).exec()
		 promise
		 	.then(function (grupos) {
		 		console.log(grupos)
		 		for (var i = 0; i < grupos.length; i++) {
		 			grupos[i].estado = "SIN PROFESOR"
		 			//grupos[i].profesor = ""
		 			grupos[i].save();
		 		}
		 	})
		 	.error(function (err) {
		 		res.json(err)
		 	})
	}

	
	next();
})

//export el schema como modelo
module.exports = mongoose.model('Usuario', usuarioSchema);