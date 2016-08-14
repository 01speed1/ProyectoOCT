var express = require("express");
var router = express.Router();

//routes Administradores
module.exports = function (app) {

	//ver todos los administradores
	router.route("/")
		.get(function (sol, res) {
			locals={};
			res.render("Admin/Administradores/index")
		})

	//Agregar un nuevo administrador
	router.route("/nuevo")
		.get(function (sol, res) {
			locals={
				page_title: "Crear administrador"
			}
			res.render("Admin/Administradores/nuevo", locals);
		});


		
	app.use("/admin/administradores", router);
};