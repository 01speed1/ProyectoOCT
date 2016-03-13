// modelo para los grupos de estudiantes que perteneces a una area de escuela de formacion 
var mongoose 		= require("mongoose"),
	uniqueValidator = require('mongoose-unique-validator'),
 	config 			= require("../../config/config.js"),
 	Techer 			= require("./user.js"),
 	School			= require("./school.js"),
 	Area 			= require("./area.js"),
 	autoIncrement 	= require('mongoose-auto-increment'), 
 	moment 			= require('moment'); 

//establecer validadores 


//establecer el modelo 
 var groupSchema = new mongoose.Schema({
 	iniDate:{
 		type: Date, 
 		require: true,
 		set: function (idate) {
 			return moment(idate, "DD MMMM YYYY").locale("es");
 		}
	 },
 	endDate:{
 		type: Date,
 		require: true, 
 		set: function (edate) {
 			return moment(edate, "DD MMMM YYYY").locale("es");
 		}
 	},
	iniSchedule:{
		type: Date, 
		require: true, 
		set: function (isch) {
			return moment(isch, "h:mm a").locale("es");
		}		
	},
	endSchedule: {
		type: Date,
		require: true, 
		set: function (esch) {
			return moment(esch, "h:mm a").locale("es");
		}
	},
 	teacher: {
 		type: mongoose.Schema.Types.ObjectId, 
 		ref: "Teacher" 
 	}, 
 	state: {
 		type: String,
 		require: true,
 		enum: ["Lanzado", "En Curso", "Terminado"],
 		default: "Lanzado"
 	}, 
 	students: {
 		type: Number, 
 		max: [2000, "El numero maximo de estudiantes son 2000 por grupo"],
 		default: 0
 	},
 	school: {
 		type: mongoose.Schema.Types.ObjectId,
 		ref: "School"
 	},
 	area: {
 		type: mongoose.Schema.Types.ObjectId, 
 		ref: "Area"
 	}, 
 	creation:{
 		type: Date, 
 		default: Date.now
 	}

 });
//plugins
groupSchema.plugin(autoIncrement.plugin, {
	model: "Group",
	field: "serial",
	startAt: 1,
	incrementBy: 1
});
//pre 


 
//Exportar el modelo 
 
 var groupModel = mongoose.model("Group", groupSchema);
 module.exports = groupModel
 
