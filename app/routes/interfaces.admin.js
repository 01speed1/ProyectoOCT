//rutas del Administrador
var express = require("express");
var config 	= require("../../config/config");
var validAdmin	= require("../middlewares/sessionValidAdmin")

//export a config/express.js
module.exports = function (app) {
	var Admin 	= require("../models/user");


	var air = express.Router(); //air = admin inteface router
 
	//publicas de administrador

	air.route("/login") 
		.get(function (sol, res) {
			res.render("admin/login");
		})
		.post(function (sol, res) {
			var cc = sol.body.cc,
				ps = sol.body.ps;
			Admin.findOne({idDocument: cc}, function (err, admin) {
					if (!err) {
						if (!admin) {
							res.render("admin/login", {
								massage: "No se encontro usuario Administrador o no escribiste una cedula"
							})
						} else if (admin.typeUser != "Admin" || admin.typeUser == null) {
							res.render("admin/login", {
								massage: "No eres un usuario de tipo administrador, no puede acceder a este panel de control"
							})
						} else if (ps != admin.password) {
							res.render("admin/login", {
								massage: "Contraseña incorrecta"
							})
						} else {
							sol.session.adminId = admin._id;
							res.redirect('/administrador');
						}
					} else {
						res.render("admin/login", {
							message: "Algo malo ocurrio, intenta de nuevo"
						});
					}	
					

			});
		});


	//privadas de admin
	air.get("/", validAdmin, function (sol, res) {
		Admin.find(function (err, admins) {
			res.render("admin/home", {admins: admins})
		}).sort({creation: 'asc', _id: -1 }).limit(5) //to find the last entry or model.findOne().sort({ field: -_id }).limit(1)		
	})

	//logout
	air.get("/logout", validAdmin, function (sol, res) {
		sol.session.destroy();
		res.render("admin/login",{
			message: "Adios administrador, feliz dia :D"
		});
	});


	//definir use de del router air para administradores
	app.use("/administrador", air);
	app.locals.title = "Panel de Administracion";





} 