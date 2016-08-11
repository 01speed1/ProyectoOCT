var express 	= require("express"), 
	config		= require("./config/config.js"); 

var app 		= express();

require("./config/express.js")(app,express,config);

app.get("/",function (sol, res) {
	res.render("Home/")	
});

app.get("*", function (sol, res) {
	res.status(404).send("Pagina no encontrada");
});

