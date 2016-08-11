var mongoose	= require("mongoose");	

module.exports = function (config) {
	//configurar la base de datos
	mongoose.connect(config.db,{
		server:{ reconnectTries: Number.MAX_VALUE}
	});
}