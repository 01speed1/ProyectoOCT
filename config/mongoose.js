var mongoose	= require("mongoose");
mongoose.Promise = require('bluebird');	

module.exports = function (config) {
	//configurar la base de datos
	mongoose.connect(config.db,{
		server:{ reconnectTries: Number.MAX_VALUE},
		useMongoClient: true
	});
}

