var express = require("express");

module.exports = function (app) {

	var route = express.Router();

	//codigo del CRUD
	route.route("/")
		.get(function (sol,res) {
			res.send("Hola admins");
		})
	

	//ruta 
	app.use("/administracion", route);
};