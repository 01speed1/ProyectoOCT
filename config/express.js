var express 		= require("express");

//exportar configuracion de express a app.js
module.exports = function (app, config) {

	////Cofiguracion session
	var session = require('express-session');
	app.use(session({
		secret: config.secret,
		resave: false,
  		saveUninitialized: true
	}));

	//Cofiguracion multer
	var multer	= require('multer'),
	upload = multer({ dest: '../public/Img/uploads/' })

	//Cofiguracion Cloudinary
	var cloudinary = require('cloudinary');
	cloudinary.config({ 
		cloud_name: 'dcdrggs9p', 
		api_key: '822244176372834', 
		api_secret: 'MeLcmR9mNtWo2Qo8rLU2pY1Eaa8' 
	});

	var methodOverride 	= require('method-override');
	app.use(methodOverride(function (sol, res) {
		if (req.body && typeof req.body === 'object' && '_method' in req.body) {
	    var method = req.body._method
	    delete req.body._method
	    return method
	  }
	}));

	//Cofiguracion bodyParser
	var bodyParser = require('body-parser');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	//configuracion de la capeta public 
	app.use(express.static("public"));

	//configurar la Base de datos
	var	mongoose = require("mongoose");
	require("./mongoose.js")(config);

	//configurar motor de vistas
	app.set("view engine", "jade");

	//configurar ruta para las vistas
	app.set("views", config.root+"/app/views");

	//configuracion para rutas
	var	glob = require("glob");	
	var routes = glob.sync(config.root + '/app/routes/*.js');
	routes.forEach(function (routes) {
		require(routes)(app);  //parametro "routes es la direccion de las rutas" y app es express 
	});

	//configurar el puerto
	app.listen(config.port, function (err) {
		if (err){
			console.log("error en el puerto de conexion");
		}
		console.log("aplicacion corriendo en el puerto: "+config.port);
	})




}