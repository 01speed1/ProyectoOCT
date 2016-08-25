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
	email:{
		type:String,
		require:true,
		maxlength: 300
	},
	constraseña:{
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
		require: true,
		enum:["H","M"]
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

//export el schema como modelo
module.exports = mongoose.model('Usuario', usuarioSchema);