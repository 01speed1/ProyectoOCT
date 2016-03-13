// este modelo alamcena y muestra la relacion de los estudiantes con sus grupos 

var mongoose 	= require("mongoose"),
	config 		= require("../../config/config.js"),
	Group		= require("./group.js"),
	Student		= require("./user.js"); 


//establecer el schema para curse
var curseSchema = new mongoose.Schema({

	student: {
		type: mongoose.Schema.Types.ObjectId,
		ref: Student
	}, 
	group:{
		type: type: mongoose.Schema.Types.ObjectId,
		ref: Group
	},
	creation: {
		type: Date,
		default: Date.now
	}

});  

module.exports = mongoose.model("Curse", curseSchema);