//rutas del Administrador
var express = require("express");
var config 	= require("../../config/config");
var validAdmin	= require("../middlewares/sessionValidAdmin")

//export a config/express.js
module.exports = function (app) {
	var Admin 	= require("../models/user");
	var School 	= require("../models/school");


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
						} else if (admin.typeUser != "Administrador" || admin.typeUser == null) {
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

	//Crear Escuela 
	air.get("/schools/reload", function (sol, res) {
		School.find(function (err, schools) {
			res.send({schools:schools});
		}).sort({creation: 'desc', _id: -1});
	})

	air.route("/school")
		.get(validAdmin, function (sol, res) {
			School.find(function (err, schools) {
				res.render("admin/schools", {schools:schools});
				console.log()
			}).sort({creation: 'desc', _id: -1});

			
		})
		.post(validAdmin, function (sol, res) {
			//codigo pendiente para la creacion del de la escuela
			var ns = sol.body.ns; 

			var newSchool = new School({
				nombre: ns
			});

			newSchool.save(function (err) {
				if (!err) {
					res.send("Se ha creado "+ns+" como una nueva escuela");
				}
			});			
		})

	//borrar una school
	air.get("/school/:id", validAdmin, function (sol, res) {
			var id = sol.params.id; 

			School.findById(id, function (err, school) {
				school.remove(function () {
					res.redirect("/administrador/school");
				});
			})
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