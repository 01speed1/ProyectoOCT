var express = require("express");
var moment = require("moment");
var paginate = require('express-paginate');

var router = express.Router();


var locals={};

//modelos DB
var Profesor = require("../models/usuarios");

//routes Profesores
module.exports = function (app) {

	//ver todos los administradores
	router.route("/")
		.get(function (sol, res, next) {
			locals={
				tipoDeUsuairo: "Profesor",
				title: "Profesores",
				page_title: "Panel de Profesores"};

			//codigo con paginacion
			Profesor.paginate({tipo:"PROFESOR"}, {page: sol.query.page, limit: sol.query.limit}).then(function (profes) {
				locals.profes = profes.docs;
				//locals.pageCount =  pageCount;
				//locals.itemCount = itemCount;
				//locals.page = paginate.getArrayPages(sol)(3, pageCount, sol.query.page)
				res.render("Admin/Profesores/index", locals);
				console.log(locals);
			}).catch(function (err) {
				//res.json(err);
				if (err) return next(err);
			})

			/*Profesor.paginate({tipo:"PROFESOR"}, {page: sol.query.page, limit: sol.query.limit}, function (err, profes, pageCount, itemCount) {
				if (err) return next(err);
				locals.profes = profes.docs;
				locals.pageCount =  pageCount;
				locals.itemCount = itemCount;
				locals.page = paginate.getArrayPages(sol)(3, pageCount, sol.query.page)
				res.render("Admin/Profesores/index", locals);
				console.log(locals);

			});*/

			//codigo funcional sin paginacion
			/*var promise =  Profesor.find({tipo:"PROFESOR"}).exec();
			promise
			.then(function (profes) {
				locals.profes=profes;
				res.render("Admin/Profesores/index",locals)
			})
			.catch(function (err) {
				res.json(err);
			})*/
		})

	//Agregar un nuevo administrador
	router.route("/nuevo")
		.get(function (sol, res) {
			locals={
				title: "Nuevo profesor",
				page_title: "Crear profesor"
			}
			res.render("Admin/profesores/nuevo", locals);
		})
		.post(function (sol, res) {
			locals={};
			var nuevoProfesor = new Profesor();

			for(var key in sol.body){
				if (typeof key != undefined) {
					//console.log(key+":"+sol.body[key]);
				 	nuevoProfesor[key] = sol.body[key];
				}};

			//informacion fuera del sol.body
			nuevoProfesor.fechaNacimiento = moment(sol.body.fechaNacimiento_submit);
			nuevoProfesor.tipo = "PROFESOR";


			nuevoProfesor.save(function (err) {
				if (!err) {
					res.redirect("/admin/profesores");
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
				var promise = Administrador.findOne({numeroDocumento:sol.body.value}).exec();
				promise
				.then(function (admin) {
					if(admin!=null && admin.numeroDocumento == sol.body.value){
						res.send("Este numero de documento se encuentra registrado");
					}
				})
				.catch(function (err) {
					res.json(err);
				})
			}) 

	//verficar el registro del correo electronico
		router.route("/validarEmail")
			.post(function (sol, res) {
				var promise = Administrador.findOne({email:sol.body.value}).exec();
				promise
					.then(function (admin) {
						if(admin!=null && admin.email == sol.body.value){
						res.send("Este correo electronico ya se encuentra registrado");
					}
					})
					.catch(function (err) {
						
					})
			})
		
app.use("/admin/profesores", router);

//End router
};