//modelo de usuario
var mongoose = require("mongoose");


var	userSchema = mongoose.Schema({
	idNumber: Number, 
	password: String
	creation: { type: Date, default: Date.now}
});

	 
