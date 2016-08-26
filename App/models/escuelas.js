//modelo de escuela
var mongoose 	= require("mongoose");
var moment = require("moment");

//validaciones
var passValidator = {
	validator: function (pass)  {
		return this.contraseñaValidar == pass
	}, message : "Las contraseñas no coinciden"
};
//definir el schema principal
var	escuelaSchema = mongoose.Schema({
	nombre:{
		type:String,
		require:true,
		maxlength: 60
	},
	//imagenes
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
	}
});

//virtuales
escuelaSchema.virtual("contraseñaValidar")
	.get(function () {
		return this.cnfirmation;		
	})
	.set(function (constraseña) {
		this.cnfirmation = constraseña;
	});
escuelaSchema.virtual("ultimaModi")
	.get(function () {
		return moment(this.fechaModificado).locale('es').fromNow(true);
	})
escuelaSchema.virtual("creacionPretty")
	.get(function () {
		if (this.creacion == null) {
			return "No se ha modificado"
		} else {
			return moment(this.creacion).locale('es').format("LL");
		}		
	})
//plugins
escuelaSchema.plugin(require('mongoose-paginate'));

//export el schema como modelo
module.exports = mongoose.model('Usuario', escuelaSchema);