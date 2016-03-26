var express 	= require("express"), 
	config		= require("./config/config.js"); 

var app 		= express();

//importar la configuracion de express que esta en la carpeta config 
require("./config/express.js")(app, config);

//confiugar "home" solo para diferenciar la ruta raiz de un CRUD
//basicamente porner rutas aqui que no lleve CRUD 
app.get("/",function (sol, res) {
	//res.render("home");
	res.render("home/"); 
} ); 

app.get("*", function (sol, res) {
	//res.render("404") pagina 404
	res.status(404).send("Pagina no encontrada");
})