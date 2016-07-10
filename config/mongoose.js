var mongoose	= require("mongoose");	

module.exports = function (config) {
	//configurar la base de datos
	vmongoose.connect(config.db,{
		server:{ reconnectTries: Number.MAX_VALUE}
	});
}