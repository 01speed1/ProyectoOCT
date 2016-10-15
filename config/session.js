var express = require("express");
var app = express();
var Usuario = require("../App/models/usuarios");

module.exports.user = function  (sol, res, next) {
	if (!sol.session.usuario_id) {
		console.log("Un Usuario esta intentado acceder a una ruta privada.");
		sol.flash("toast", "Primero inicia sesion acceso denegado");
		console.log("Primero inicia session")
		res.redirect("/login"); 
	}
	else{

		var promise = Usuario.findById(sol.session.usuario_id).exec();
		promise
			.then(function (user) {
				if (user) {next();}
				else{
					sol.flash("toast", "Primero inicia sesion");
					res.redirect("/login");
				}
			})
			.error(function (err) {
				sol.flash("toast", "Algo salio mal :C");
				console.log("Algo salio mal :C")
				res.redirect("/login");
			})		
	}
}

//falta editar el acceso a administracion
module.exports.admin  = function (sol, res, next) {

	

	if (!sol.session.EsAdmin) {
		console.log("Un Usuario intenta acceder a una ruta de administracion.");
		res.redirect("/usuario/login")
	} else{
		Usuario.findById(sol.session.Usuario_id, function (err, user) {
			if (!err) { 
				if (sol.session.EsAdmin) {
					sol.session.apodo=user.Apodo;
					next();
				} else {
					res.render("Usuarios/login", {error: "Debes iniciar sesion para acceder a esta pagina"});
			}
			} 
		})
	}
}
