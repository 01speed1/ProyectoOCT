var express = require("express");
var session = require("../../config/session")
var Avatar 	= require("../../config/gestorImagenes.js");

var crypto = require("../../config/crypto"); 
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

				title: "Perfil de "+sol.params.nombreUsuario
			}

			if (sol.session.usuario_id) {
				locals.user = sol.session.user
			}

			var promise = Usuario.findOne({nombreUsuario:sol.params.nombreUsuario}).exec()

			promise
				.then(function (usuario) {

					locals.usuario = usuario

					/*if (sol.session.usuario_id == usuario.id) {
						locals.user = usuario
					} else {
						res.redirect("/usuario/"+sol.session.user.nombreUsuario)
					}*/

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
							if (grupo[j]==locals.usuario.id) {
								locals.misGrupos.push(grupos[i])
							}								
						}	
					}

					res.render("Usuario/perfil", locals)
				})

		})

	router.route("/:nombreUsuario/edit")
		.put(function (sol, res) {
			
			var promise = Usuario.findOne({nombreUsuario: sol.params.nombreUsuario}).exec();
			promise.then(function (usuario) {

				for(var key in sol.body){
					if (typeof key != undefined) {
						//console.log(key+":"+sol.body[key]);
					 	usuario[key] = sol.body[key];
					}
				}

				//saltar validacion de contraseña
				usuario.contraseñaValidar = usuario.contraseña

				return usuario.save();
	
			})
			.then(function (result) {
				
				sol.session.regenerate(function (err) {
					if (!err) {
						sol.session.user = result
						sol.session.usuario_id = result.id

						sol.flash("toast", "informacion actualizada")
						res.redirect("/usuario/"+result.nombreUsuario);
					} else {
						res.json(err)
					}
				})
				



			})
			.error(function (err) {
				res.json(err)
			})

		})

	router.route("/:nombreUsuario/avatar")
		.put(Avatar.cargarAvatar, function (sol, res, next) {

			var promise =  Usuario.findOne({nombreUsuario: sol.params.nombreUsuario}).exec()
			promise.then(function (usuario) {

				res.locals.user = usuario

				//registrar el viejo id del avatar para validar si se borra
				res.locals.oldAvatarId = usuario.avatar_id
				res.locals.nombreUsuario = usuario.nombreUsuario
				
				//actualizar avatar
				usuario.avatar = res.locals.nuevoAvatar.url
				usuario.avatar_id = res.locals.nuevoAvatar.id
				usuario.contraseñaValidar = usuario.contraseña
				return usuario.save();

			})
			.then(function () {
				next();
			})
			.error(function (err) {
				res.json(err)
			})
	}, Avatar.borrarAvatar);

	router.route("/:nombreUsuario/pass")
		.put(function (sol, res) {

			var promise = Usuario.findOne({nombreUsuario:sol.params.nombreUsuario}).exec();
			promise.then(function (usuario) {
				if (crypto.encrypt(sol.body.oldContraseña)==usuario.contraseña) {

					usuario.contraseña = crypto.encrypt(sol.body.contraseña)
					usuario.contraseñaValidar = crypto.encrypt(sol.body.contraseñaValidar)

					usuario.estado = sol.body.estado

					usuario.save(function (err, usuario) {
						sol.flash("toast", "contraseña actualizada"); 
						res.redirect("/usuario/"+usuario.nombreUsuario+"#Configuracion")
					})

				}
				else{
					sol.flash("toast", "Tu antigua contraseña es incorrecta"); 
					res.redirect("/usuario/"+usuario.nombreUsuario+"#Configuracion")
				}
			})
			.error(function (err) {
				res.json(err)
			})

			//
		})


//validadores ajax 
	router.route("/:nombreUsuario/validar/cc")
		.post(function (sol, res) {
			
			var promise = Usuario.findOne({numeroDocumento:sol.body.value}).exec()
			promise.then(function (usuario) {
				if (usuario!=null) {
					if (usuario.nombreUsuario == sol.params.nombreUsuario) {
						res.send("ese es tu antiguo numero de documento, si lo vas a cambiar usa uno nuevo")
					}
					else{
						res.send("ese numero de documento ya esta en uso")
					}
				}
			})

		})
	router.route("/:nombreUsuario/validar/email")
		.post(function (sol, res) {
			
			var promise = Usuario.findOne({email:sol.body.value}).exec()
			promise.then(function (usuario) {
				if (usuario!=null) {
					if (usuario.email == sol.params.nombreUsuario) {
						res.send("ese es tu correo electronico antiguo, si lo vas a cambiar usa uno nuevo")
					}
					else{
						res.send("ese email ya esta en uso")
					}
				}
			})

		})
	router.route("/:nombreUsuario/validar/nombreUsuario")
		.post(function (sol, res) {
			
			var promise = Usuario.findOne({nombreUsuario:sol.body.value}).exec()
			promise.then(function (usuario) {
				if (usuario!=null) {
					if (usuario.nombreUsuario == sol.params.nombreUsuario) {
						res.send("ese es tu nombre de usuario antiguo, si lo vas a cambiar usa uno nuevo")
					}
					else{
						res.send("ese nombre de usuario ya esta en uso")
					}
				}
			})

		})



	app.use("/usuario", router);
}
