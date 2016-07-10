var express 	= require("express"), 
	config		= require("./config/config.js"); 

var app 		= express();

require("./config/express.js")(app, config);

app.get("/",function (sol, res) {
	//res.render("home");
	res.render("home/"); 
});

app.get("*", function (sol, res) {
	res.status(404).send("Pagina no encontrada");
});

