//modelo de area
var mongoose 	= require("mongoose");
var moment = require("moment");

//validaciones

 
//definir el schema principal
var	grupoSchema = mongoose.Schema({
	nombre:{
		type:String,
		require:true,
		maxlength: 100
	},
	profesor:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Usuario",
		require: true
	},
	area:{
		type: mongoose.Schema.Types.ObjectId,
		ref:"Area",
		require:true
	},
	fechaInicio:{
		type:Date,
		require: true
	},
	fechaFin:{
		type:Date,
		require: true
	},
	//campos de creacion
	background:{
		type:String,
		default:"http://res.cloudinary.com/dcdrggs9p/image/upload/v1465666229/default_image.jpg"
	},
	background_id:{
		type:String,
		default:"default_image"
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
grupoSchema.virtual("ultimaModi")
	.get(function () {
		return moment(this.fechaModificado).locale('es').fromNow(true);
	})
grupoSchema.virtual("creacionPretty")
	.get(function () {
		if (this.creacion == null) {
			return "No se ha modificado"
		} else {
			return moment(this.creacion).locale('es').format("LL");
		}		
	})
//plugins
grupoSchema.plugin(require('mongoose-paginate'));

//export el schema como modelo
module.exports = mongoose.model('Grupo', grupoSchema);
