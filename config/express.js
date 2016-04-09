var express 		= require("express"),
	mongoose		= require("mongoose"),
	glob			= require("glob"),
	bodyParser 		= require('body-parser'),
	session 		= require('express-session'),
	methodOverride 	= require('method-override'),
	multer			= require('multer'),
	cloudinary 		= require('cloudinary');

//exportar configuracion de express a app.js
module.exports = function (app, config) {
	//configuracion de sesiones con express
	app.use(session({
		secret: config.secret,
		resave: false,
  		saveUninitialized: true
	}));

	//configuracion de multer
	var upload = multer({ dest: '../public/img/uploads/' })

	//configuracion de cloudinary
	cloudinary.config({ 
  		cloud_name: 'dcdrggs9p', 
  		api_key: '822244176372834', 
  		api_secret: 'MeLcmR9mNtWo2Qo8rLU2pY1Eaa8' 
	});

	//Configuracion basica
	app.use(methodOverride());

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	//configuracion de la capeta public 
	app.use(express.static("public"));

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

	//configurar es el puerto
	app.listen(config.port, function (err) {
		if (err){
			console.log("error en el puerto de conexion");
		}
		console.log("aplicacion corriendo en el puerto: "+config.port);
	})




}