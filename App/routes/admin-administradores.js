var express = require("express");
var router = express.Router();

var locals={};

//modelos DB
var Administrador = require("../models/usuarios");

//routes Administradores
module.exports = function (app) {

	//ver todos los administradores
	router.route("/")
		.get(function (sol, res) {
			locals={
				title: "Administradores",
				page_title: "Panel de administradores"};
			res.render("Admin/Administradores/index", locals)
		})

	//Agregar un nuevo administrador
	router.route("/nuevo")
		.get(function (sol, res) {
			locals={
				title: "Nuevo administrador",
				page_title: "Crear administrador"
			}
			res.render("Admin/Administradores/nuevo", locals);
		})
		.post(function (sol, res) {
			locals={};
			
			var nuevoAdministrador = new Administrador();

			 for(var key in sol.body){
				if (typeof key != undefined) {
					//console.log(key+":"+sol.body[key]);
				 	nuevoAdministrador[key] = sol.body[key];
				}
			}

			nuevoAdministrador.fechaNacimiento = sol.body.fechaNacimiento_submit;


			nuevoAdministrador.save(function (err) {
				if (!err) {
					res.redirect("/admin/administradores");
				} else {
					res.json(err);
				}
				
			});

		});


		
	app.use("/admin/administradores", router);
};