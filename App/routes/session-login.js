var express = require("express");
var crypto = require("../../config/crypto")
//var moment = require("moment");
//var paginate = require('express-paginate');
var router = express.Router();

var locals={};

//modelos DB
	var Estudiante = require("../models/usuarios"); 

module.exports = function (app) {
	router.route("/")
		.get(function (sol, res) {

			locals.title = "Iniciar sesion"

			res.render("Session/login", locals);
		})
		.post(function (sol, res) { 

			//encriptar la contrasea
				var passCrypt =  crypto.encrypt(sol.body.contraseña);
			
			var identi = sol.body.nombreUsuario;

			var promise = Estudiante.findOne({nombreUsuario:identi}).exec();

			promise.then(function (user) {

				if (sol.session.usuario_id) {
					res.redirect("/usuario/"+user.nombreUsuario)
				}

				if (!user) {
					sol.flash("toast", "Nombre de Usuario no encontrado");
					res.redirect("/login");
				}else{

					if (user.contraseña==passCrypt && user.nombreUsuario==identi) {

						sol.session.usuario_id=user.id;
						sol.session.user=user;						

						if (user.tipo == "ADMINISTRADOR") {
							sol.session.EsAdmin = true
							res.redirect("/admin");
						}else{
							res.redirect("/usuario/"+user.nombreUsuario);
						}
					}else{
						sol.flash("toast", "Nombre de usuario o contraseña incorrecta");
						res.redirect("/login");
						console.log("todo mal")
					}
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
