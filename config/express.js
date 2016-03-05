var express 		= require("express"),
	mongoose		= require("mongoose"),
	glob			= require("glob"),
	bodyParser 		= require('body-parser'),
	methodOverride 	= require('method-override');

//exportar configuracion de express a app.js
module.exports = function (app, config) {
	//Configuracion basica
	app.use(methodOverride());

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	//configurar la base datos
	require("./mongoose.js")(config);

	//configurar motor de vistas
	app.set("view engine", "jade");

	//configurar ruta para las vistas
	app.set("views", config.root+"/app/views");

	//configuracion para rutas 
	var routes = glob.sync(config.root + '/app/routes/*.js');
	routes.forEach(function (routes) {
		require(routes)(app);  //parametro "routes es la direccion de las rutas" y app es express 
	});

	//configurar es puerto
	app.listen(config.port, function (err) {
		if (err){
			console.log("error en el puerto de conexion");
		}
		console.log("aplicacion corriendo en el puerto: "+config.port);
	})




}