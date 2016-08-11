var express = require("express");
var app = express();
var Usuario = require("../App/Models/usuario");

module.exports.user = function  (sol, res, next) {
	if (!sol.session.Usuario_id) {
		console.log("Un Usuario esta intentado acceder a una ruta privada.");
		res.render("Usuarios/login",{
			error: "Debes iniciar sesion para acceder a esta pagina"
		}) 
	}
	else{
		Usuario.findById(sol.session.Usuario_id, function (err, user) {
			if (!err) {
				if (user) {
					sol.session.apodo=user.Apodo;
					next();
				} else{
					res.render("Usuarios/login", {error: "Debes iniciar sesion para acceder a esta pagina"});
				}
			} else {
				res.render("Usuarios/login", {error: "Debes iniciar sesion para acceder a esta pagina"});
			}

			
		})
		
	}
}
module.exports.admin  = function (sol, res,next) {
	var locals={}
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
