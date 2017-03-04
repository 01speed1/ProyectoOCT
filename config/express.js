
// Archivo de configuracion para express

//exportar funcion de configuracion de express
module.exports = function (app, express, config) {

	//seteando hostname para plugins de redes sociales
	//app.set('hostname', config.hostname);

	//express formidable
	var formidable = require("express-formidable");
	app.use(formidable.parse({
		keepExtensions : true
	}))

	//express paginate
	var paginate = require('express-paginate');
	app.use(paginate.middleware(10, 50));
	app.all(function(sol, res, next) {
	  // set default or minimum is 10 (as it was prior to v0.2.0)
	  if (sol.query.limit <= 10) sol.query.limit = 10;
	  next();
	});

	//method override
	var methodOverride = require('method-override')
	app.use(methodOverride('_method'))

	//cookieparser
	var cookieParser = require('cookie-parser');
	app.use(cookieParser());

	//sesiones
	var session = require('express-session');
	app.use(session({
		cookie:{maxAge: 86400000},
		secret: config.secret,
		resave: false,
  		saveUninitialized: true
	}));
	//mensajes flash
	 var flash = require('express-flash');
	app.use(flash());

	//configuracion de cloudinary
	var cloudinary = require('cloudinary');
	cloudinary.config({ 
	  cloud_name: 'dpzzzde6u', 
	  api_key: '919145793589126', 
	  api_secret: 'Y7E7hiu1cDH-eyP3yXmYvy02tmI' 
	});

	//configuracion de la capeta public 
	app.use(express.static("Public"));

	//configurar la base datos 
	require("./mongoose")(config);

	//configurar motor de vistas
	app.set("view engine", "jade");

	//configurar ruta para las vistas config.root+
	app.set("views", config.root+"/mvc/views");

	//Configuracion de body-parer
	bodyParser 	= require('body-parser');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	//configruacion de glob
	var glob = require("glob");
	var routes = glob.sync(config.root + '/mvc/routes/*.js');
		routes.forEach(function (routes) {
			require(routes)(app);  //parametro "routes es la direccion de las rutas" y app es express 
		});

	//configuracion de respuesta del servidor
	app.listen(config.port, function () {
	console.log("Aplicacion corriendo en puerto: "+config.port);
	})
}



