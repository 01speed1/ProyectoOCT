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
			var promise = Usuario.findOne({nombreUsuario:sol.params.nombreUsuario}).exec()
			promise
				.then(function (user) {
					if (!user && sol.session.usuario_id) {
						res.redirect("/usuario/"+sol.session.user.nombreUsuario)
					} else{
						locals.user = user
						locals.session = sol.session.Usuario_id

						return Grupos.find().exec();
						
					}		
				})
				.then(function (grupos) {

					locals.misGrupos = []

					if (grupos.length==0) {
						locals.misGrupos=0
					}

					for (var i = 0; i < grupos.length; i++) {
						var grupo = grupos[i].estudiantes;
						for (var i = 0; i < grupo.length; i++) {
							if (grupo[i]==sol.session.usuario_id) {
								locals.misGrupos.push(grupos[i])
							}
							//grupo[i]
						}
					}
					//console.log(locals.misGrupos);
					//res.send(locals.misGrupos);

					res.render("Usuario/perfil", locals);
				})
				.error(function (err) {
					res.json(err)
				})
		})





	app.use("/usuario", router);
}
