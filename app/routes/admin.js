var express = require("express");

module.exports = function (app) {

	//route de CRUD
	var route = express.Router();

	//codigo del CRUD
	

	//ruta 
	app.use("/.model.", route);
};