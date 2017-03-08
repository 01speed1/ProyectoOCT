//modelo de usuario
var mongoose 	= require("mongoose");
var moment = require("moment");

//validaciones

//definir el schema principal
var	mensajeSchema = mongoose.Schema({
	nombre:{
		type:String,
		require:true
	},
	email:{
		type:String,
		require:true,
		maxlength: 300
	},
	mensaje:{
		type: String,
		require: true,
		maxlength:250
	},
	creacion:{
		type:Date,
		default:Date.now()
	},
	estado:{
		type:String,
		enum:["NUEVO", "MODIFICADO", "VISTO"],
		default:"NUEVO"
	}
});

//virtuales
mensajeSchema.virtual("creacionPretty")
	.get(function () {
		if (this.creacion == null) {
			return "No se ha modificado"
		} else {
			return moment(this.creacion).locale('es').format("LL");
		}
		
	})

//plugins
mensajeSchema.plugin(require('mongoose-paginate'));

//pre


//export el schema como modelo
module.exports = mongoose.model('Mensaje', mensajeSchema);