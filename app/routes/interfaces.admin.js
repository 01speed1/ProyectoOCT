//rutas de autenticacion 

	var express = require("express");
	var secret 	= require("../../config/config.js");
module.exports = function (app) {
	
	var User = require("../models/user.js");
	var air = express.Router(); //air = admin inteface router

	//rutas para autenticar admininstrador
	//GET
	air.get("/autenticar", function (sol, res) {
		res.render(); 
	}); 

	//POST 
	air.post("/autenticar", function (sol, res) {
		User.findOne();
	});  

	//establecer midlewhere de autenticacion
	air.use(function (sol , res , next) {
		
	});

	air.get("/", function (sol, res) { //interface resumen
		res.send("hola administrador"); 
	});

	app.use("/Admistrador", air);





} 