var express = require("express");
var session = require("../../config/session")

//var crypto = require("../../config/crypto"); 
//var moment = require("moment");
//var paginate = require('express-paginate');
var router = express.Router();

var locals={};

//modelos DB
	var Usuario = require("../models/usuarios.js"); //ESTUDIANTE
	var Grupos = require("../models/grupos");


module.exports = function (app) {
	router.route("/")
		.get(function (sol, res) {
			res.redirect("/login");
		})

	router.route("/:nombreUsuario")
		.get(session.user, function (sol, res) {
			locals={
				title: "perfil de "+sol.params.nombreUsuario
			}

			var promise = Usuario.findOne({nombreUsuario:sol.params.nombreUsuario}).exec()

			promise
				.then(function (usuario) {

					if (sol.session.usuario_id == usuario.id) {
						locals.user = usuario
					} else {
						res.redirect("/usuario/"+sol.session.user.nombreUsuario)
					}

					

					return Grupos.find().populate("profesor").exec();

				})
				.then(function (grupos) {
					locals.misGrupos = []

					var gruposl = grupos.length;

					if (gruposl==0) {
						locals.misGrupos=0
					}

					for (var i = 0; i < gruposl; i++) {
						var grupo = grupos[i].estudiantes;
						for (var j = 0; j < grupo.length; j++) {
							if (grupo[j]==sol.session.usuario_id) {
								locals.misGrupos.push(grupos[i])
							}								
						}	
					}

					res.render("Usuario/perfil", locals)
				})

		})





	app.use("/usuario", router);
}
