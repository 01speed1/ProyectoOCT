var express = require("express");
var crypto = require("../../config/crypto")
//var moment = require("moment");
//var paginate = require('express-paginate');
var router = express.Router();

var locals={};

//modelos DB
	//var Profesor = require("../models/usuarios");
	var Estudiante = require("../models/usuarios"); //ESTUDIANTE

module.exports = function (app) {

	router.route("/")
		.get(function (sol, res) {
			res.render("Session/login");
		})
		.post(function (sol, res) {

			//encriptar la contrasea
				var passCrypt =  crypto.encrypt(sol.body.contraseña);
			
			var identi = sol.body.nombreUsuario;

			var promise = Estudiante.findOne({nombreUsuario:identi}).exec();

			promise.then(function (user) {
				if (user==null) {
					sol.flash("toast", "Nombre de Usuario no encontrado");
					res.redirect("/login");
				}

				if (user.constraseña==passCrypt && user.nombreUsuario==identi) {
					sol.session.Usuario_id=user.id;
					if (user.tipo == "ADMINISTRADOR") {
						res.redirect("/admin");
					}else{
						res.redirect("/usuario/"+user.nombreUsuario);
					}
					
				}else{
					sol.flash("toast", "Nombre de usuario o contraseña incorrecta");
					res.redirect("/login");
				}
				
			})

		})

//Validadores Ajax 
	router.route("/validarUsername")
		.post(function (sol, res) {
			var value = sol.body.value;
			Estudiante.findOne({nombreUsuario:value}, function (err, user) {
				if (user==null && value!="") {
					res.send(value+" aun no esta registrado");
				}
			})
			

		})

	app.use("/login", router);
}
