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
			res.render("Session/signup");
		})
		.post(function (sol, res) {

			//encriptar la contrasea
				var passCrypt =  crypto.encrypt(sol.body.contraseña);
				var passVaCrypt =  crypto.encrypt(sol.body.contraseñaValidar);
			
			var data = {
				nombres: sol.body.nombres,
				apellidos: sol.body.apellidos,
				numeroDocumento: sol.body.numeroDocumento,
				tipoDocumento: sol.body.tipoDocumento,
				nombreUsuario: sol.body.nombreUsuario,
				email: sol.body.email,
				contraseña: passCrypt,
				contraseñaValidar: passVaCrypt,
				estado: sol.body.estado,
				tipo: "ESTUDIANTE"
			}

			var nuevoEstudiante = new Estudiante(data);

			var promise =  nuevoEstudiante.save();
			promise
			.then(function () {
				res.redirect("/");
			})
			.error(function (err) {
				res.json(err)
			})

			

		})

	app.use("/registro", router);
}
