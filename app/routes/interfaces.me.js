//interfaces para cualquier perfil en general 
var express = require("express");
var config 	= require("../../config/config");
var valid	= require("../middlewares/sessionValidAny");

var moment = require('moment');
moment.locale('es');

//midlewhere de autenticacion: pendiente

//rutas
module.exports = function (app) {
	var User = require("../models/user");

	var mir = express.Router(); //mir = me profile interface routes
	
	mir.route("/login")
		.get(function (sol, res) {
			res.render("me/login");
		})
		.post(function (sol, res) {
			var cc = sol.body.cc; 
			var ps = sol.body.ps;

			User.findOne({idDocument: cc}, function (err, user) {
				if (!err) {
					if (!user) {
						res.render("me/login", {
							message: "No encontramos un usuario con esos datos"
						})
					} else if (ps != user.password) {
						res.render("me/login", {
							message: "Contraseña incorrecta"
						})
					} else {
						sol.session.userId = user._id;
						res.redirect('/me');
					}
				} else {
					res.render("me/login", {
						message: "Algo malo ocurrio, intentalo de nuevo"
					});
				}
			})
		})

	mir.route("/signup")
		.get(function (sol, res) {
			res.render("me/signup")
		})
		.post(function (sol, res) {
			var cc = sol.body.cc; 
			var ps = sol.body.ps; 
			var pc = sol.body.pc;

			nuevoUser = new User({
				idDocument: cc,
				password: ps,
				password_confirmation: pc,
				lastUpdate: moment()
			});

			nuevoUser.save(function (err) {
				if (!err) {
					res.render("me/login", {
						message: "Ya estas registrado, ahora puedes iniciar sesion"
					})
				} else{
					console.log(err);
					res.render("me/signup", {
						massage: "No pudimos registrar, intentalo de nuevo"
					})
				}
			})
		})
	
	//rutas privadas

	mir.get("/", valid, function (sol, res) {
		res.render("me/home");
	});

	//editar perfil personalmente
	mir.route("/edit")
		.get( valid, function (sol, res) {
			res.render("me/edit");
		})
		.post(valid, function (sol, res) {
			var n = sol.body.n,
				fn = sol.body.fn,
				sn = sol.body.sn,
				ln = sol.body.ln,
				mail = sol.body.mail, 
				g = sol.body.g,
				bd = moment(sol.body.bd, "DD-MM-YYYY");


			User.findById(sol.session.userId, function (err, user) {
				if (!err) {
					user.userName = n; 
					user.firstName = fn;
					user.secondName = sn;
					user.lastName = ln;
					user.mail= mail;
					user.gender = g;
					user.born = bd;
					user.isUpdate = true;
					user.password_confirmation = user.password;

					user.save(function (err) {
						console.log("Guardando..."+user)
						if (!err) {
							console.log(user.born)
							res.render("me/home", {message: "Datos actualizados"},function (html) {
								res.redirect("/me");
							});
							
						}else{
							console.log(err)
							if (err.errors.userName)
								{res.render("me/edit", {message: "Ese nombre de usuario ya esta registrado"});}

							if (err.errors.mail) {
								res.render("me/edit", {message: "Ese correo electronico ya esta registrado"});
							}
						}
						
					})
						
				} else{
					console.log(err);
				}
			})

				
		})

	//destruir mi cuenta
	mir.post("/delete", function (sol, res) {
		User.findById(sol.session.userId, function (err, user) {
			//confirmacion de contraseña
			var pov = sol.body.pov

			if (pov != user.password) {
					res.redirect("/me"); 
				}else{
				user.remove(function(err) {
				if (!err) {
					sol.session.destroy();
					res.redirect("/");
				} 
			})
			}	
		})
	})

	//actualizar foto de perfil
	mir.post("/image_avatar", valid,function (sol, res) {
		console.log(sol.files);
	});

	mir.get("/logout", function (sol, res) {
		sol.session.destroy();
		res.render("me/login", {
			title: "Hasta luego :D",
			message: "Cerraste sesion exitosamente, hasta pronto"
		})
	})

	app.use("/me", mir);
}