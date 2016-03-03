var mongoose	= require("mongoose"); 	

module.exports = function (config) {
	//configurar la base de datos
	mongoose.connect(config.db);
	mongoose.connection.on('error db', function () {
		console.log("no se pudo establecer conexion con: "+config.db);
	})
}