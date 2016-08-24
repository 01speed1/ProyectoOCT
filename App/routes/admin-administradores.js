var express = require("express");
var moment = require("moment");
var router = express.Router();


var locals={};

//modelos DB
var Administrador = require("../models/usuarios");

//routes Administradores
module.exports = function (app) {

	//ver todos los administradores
	router.route("/")
		.get(function (sol, res) {
			locals={
				title: "Administradores",
				page_title: "Panel de administradores"};

			Administrador.find(function (err, admins) {
				locals.admins = admins;
				res.render("Admin/Administradores/index", locals)
			})

			
		})

	//Agregar un nuevo administrador
	router.route("/nuevo")
		.get(function (sol, res) {
			locals={
				title: "Nuevo administrador",
				page_title: "Crear administrador"
			}
			res.render("Admin/Administradores/nuevo", locals);
		})
		.post(function (sol, res) {
			locals={};
			var nuevoAdministrador = new Administrador();

			for(var key in sol.body){
				if (typeof key != undefined) {
					//console.log(key+":"+sol.body[key]);
				 	nuevoAdministrador[key] = sol.body[key];
				}};

			//informacion fuera del sol.body
			nuevoAdministrador.fechaNacimiento = moment(sol.body.fechaNacimiento_submit);
			nuevoAdministrador.tipo = "ADMINISTRADOR";


			nuevoAdministrador.save(function (err) {
				if (!err) {
					res.redirect("/admin/administradores");
				} else {
					res.json(err);
				}
				
			});

		});

	//modificar y eliminar administrador
	router.route("/editar/:id")
		.get(function (sol, res) {
			Administrador.findById(sol.params.id, function (err, admin) {
				locals={
					admin:admin,
					page_title:"Modificar administrador",
					title: "Modificar administrador"
				}
				res.render("Admin/Administradores/editar", locals);
			})
		})
		.put(function (sol, res) {
			var promise = Administrador.findById(sol.params.id).exec();

			promise.then(function (admin) {
				for(var key in sol.body){
					if (typeof key != undefined) {
						//console.log(key+":"+sol.body[key]);
				 		admin[key] = sol.body[key];
				}};

				admin.fechaModificado = moment();

				return admin.save();
			})
			.then(function (admin) {
				res.redirect("/admin/administradores");
			})
			.catch(function (err) {
				res.json(err);
			});
		})
		.delete(function (sol, res) {
			var promise = Administrador.findOneAndRemove(sol.params.id).exec();
			promise.then(function () {
				sol.flash('success', "Administrador eliminado exitosamente");
				res.send("/admin/administradores");
			})
			.catch(function (err) {
				res.json(err);
			});
		})

//solicitudes Ajax
	//verificar el registro de la cedula
		router.route("/validarCc")
			.post(function (sol, res) {
				//console.log(sol.body.numeroDocumento);
				var promise = Administrador.find({numeroDocumento:sol.body.numeroDocumento}).exec();
				promise
				.then(function (admin) {
					console.log(admin);
					res.send("Este numero de documento se encuentra registrado");
				})
				.catch(function (err) {
					res.json(err);
				})
			}) 

		
	app.use("/admin/administradores", router);
};