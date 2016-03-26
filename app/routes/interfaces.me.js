//interfaces para cualquier perfil en general 
var express = require("express");
var config 	= require("../../config/config");
var valid	= require("../middlewares/sessionValidAny")

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
				password_confirmation: pc
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

	//put pendiente
	mir.route("/edit", valid)
		.get(function (sol, res) {
			res.render("me/edit");
		})
		.put(function (argument) {
			// body...
		})

	mir.get("/logout", function (sol, res) {
		sol.session.destroy();
		res.render("me/login", {
			title: "Hasta luego :D",
			message: "Cerraste sesion exitosamente, hasta pronto"
		})
	})

	app.use("/me", mir);
}