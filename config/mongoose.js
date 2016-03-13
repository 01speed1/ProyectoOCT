var mongoose	= require("mongoose"),
	autoIncrement = require('mongoose-auto-increment'); 	

module.exports = function (config) {
	//configurar la base de datos
	var con = mongoose.connect(config.db);
	autoIncrement.initialize(con);
	mongoose.connection.on('error db', function () {
		console.log("no se pudo establecer conexion con: "+config.db);
	})
}