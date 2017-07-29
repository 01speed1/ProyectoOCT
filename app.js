"use strict";

var express = require("express"); 
var		config		= require("./config/config.js");

var letStart = require("./config/letsStart.js");


var app = express();

var locals={}

require("./config/express.js")(app,express,config);



app.get("/", letStart, function (sol, res) {

//>>>>>>> 61e6907ab66902c521df8d20bf4a0ef28a1873df
	locals.title = "Bienvenido";

	if (sol.session.usuario_id) {
		locals.user = sol.session.user

	}



	res.render("Home/index.jade", locals);
});

app.get("*", function (sol, res) {
	res.status(404).send("Pagina no encontrada");
});

//>>>>>>> 61e6907ab66902c521df8d20bf4a0ef28a1873df
