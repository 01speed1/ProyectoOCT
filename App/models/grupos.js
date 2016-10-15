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
	limiteEstudiantes:{
		type:Number,
		require: true,
		default: 0
	},
	diasDeClase:{
		type:Array,
		require: true
	},
	jornada:{
		type: String,
		require: true
	},
	//lista de usuarios en el grupo
	estudiantes:[
	{type:  mongoose.Schema.Types.ObjectId}
	],
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
grupoSchema.virtual("fechaInicioPretty")
	.get(function () {
		return moment(this.fechaInicio).locale('es').format("LL");			
	})
grupoSchema.virtual("fechaFinPretty")
	.get(function () {
		return moment(this.fechaFin).locale('es').format("LL");			
	})

grupoSchema.virtual("horario")
	.get(function () {
		var horaInicio =  moment(this.fechaInicio).locale('es').format("h:mm a");
		var horaFin =  moment(this.fechaFin).locale('es').format("h:mm a");
		return 	horaInicio+" - "+horaFin;		
	})

grupoSchema.virtual("fehcaInicioReturn")
	.get(function () {
		return moment(this.fechaInicio).locale('es').format("YYYY-MM-DD");
	})

grupoSchema.virtual("fehcaFinReturn")
	.get(function () {
		return moment(this.fechaFin).locale('es').format("YYYY-MM-DD");
	})

//hora inicio return
	grupoSchema.virtual("horaInicioReturn")
		.get(function () {
			var hourReturn;
			if (moment(this.fechaInicio).hours()>12) {
				hourReturn = moment(this.fechaInicio).hours()-12;
			} else{
				hourReturn = moment(this.fechaInicio).hours();
			}
			return hourReturn;
		})

	grupoSchema.virtual("horaMinInicioReturn")
		.get(function () {
			return moment(this.fechaInicio).minutes();
		})

	grupoSchema.virtual("horaAMPMInicioReturn")
		.get(function () {
			var Return;
			if (moment(this.fechaInicio).hours()>12) {
				Return = "PM";
			} else{
				Return = "AM";
			}
			return Return;
		})

//hora fin return
	grupoSchema.virtual("horaFinReturn")
		.get(function () {
			var hourReturn;
			if (moment(this.fechaFin).hours()>12) {
				hourReturn = moment(this.fechaFin).hours()-12;
			} else{
				hourReturn = moment(this.fechaFin).hours();
			}
			return hourReturn;
		})

	grupoSchema.virtual("horaMinFinReturn")
		.get(function () {
			return moment(this.fechaFin).minutes();
		})

	grupoSchema.virtual("horaAMPMFinReturn")
		.get(function () {
			var Return;
			if (moment(this.fechaFin).hours()>12) {
				Return = "PM";
			} else{
				Return = "AM";
			}
			return Return;
		})

//plugins
grupoSchema.plugin(require('mongoose-paginate'));

//export el schema como modelo
module.exports = mongoose.model('Grupo', grupoSchema);
