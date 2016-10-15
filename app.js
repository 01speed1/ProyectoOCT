var express = require("express"), 
	config	= require("./config/config.js"); 

var app = express();

var locals={}

require("./config/express.js")(app,express,config);

app.get("/",function (sol, res) {

	if (sol.session.usuario_id) {
		locals.user = sol.session.user
	}

	res.render("Home/index", locals);
});

app.get("*", function (sol, res) {
	res.status(404).send("Pagina no encontrada");
});

