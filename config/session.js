var express = require("express");
var app = express();
var Usuario = require("../App/models/usuarios");

module.exports.user = function  (sol, res, next) {
	if (!sol.session.usuario_id) {
		console.log("Un Usuario esta intentado acceder a una ruta privada.");
		sol.flash("toast", "Debes iniciar sesión.");
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
	if (!sol.session.usuario_id) {
		console.log("Un Usuario esta intentado acceder a una ruta privada.");
		sol.flash("toast", "Debes iniciar sesión.");
		res.redirect("/login"); 
	}
	else{
		var promise = Usuario.findById(sol.session.usuario_id).exec();
		promise
			.then(function (usuario) {
				if (usuario.tipo == "ADMINISTRADOR") {next();}
				else{
					sol.flash("toast", "No eres Administrador, acceso denegado");
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
