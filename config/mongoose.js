var mongoose	= require("mongoose");
mongoose.Promise = require('bluebird');	

module.exports = function (config) {
	//configurar la base de datos
	mongoose.connect(config.online_db,{
		server:{ reconnectTries: Number.MAX_VALUE}
	});
}