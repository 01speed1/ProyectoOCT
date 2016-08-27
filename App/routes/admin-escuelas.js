var express = require("express");
var moment = require("moment");
var paginate = require('express-paginate');
var router = express.Router();


var locals={};

//modelos DB
var Escuela = require("../models/escuelas");
//middlewere para cargar imagenes
var uploader = require("../../config/multer.js");

//routes Administradores
module.exports = function (app) {

	//ver todas las escuelas
	router.route("/")
		.get(function (sol, res) {
			locals={
				tipoDeUsuairo: "Escuela",
				title: "Escuelas",
				page_title: "Panel de escuelas"};

			var paginate_option = {
				page: sol.query.page, 
				limit: 10,
				offset: (sol.query.page-1)*10,
				sort: {nombres:1}
				}

			var promise = Escuela.paginate({}, paginate_option);
			promise
			.then(function (escuelas) {
				console.log(escuelas);
				locals.escuelas=escuelas.docs;
				locals.page = sol.query.page;
				locals.limit = escuelas.limit;
				locals.total = escuelas.total;
			  locals.limit = escuelas.limit;
			  locals.offset= escuelas.offset;
			  locals.pages = parseInt((escuelas.total/escuelas.limit)+1);
				res.render("Admin/Escuelas/index",locals)
			})
			.catch(function (err) {
				console.log(err);
				res.json(err);
			})
		})

	//Agregar un nuevo administrador
	router.route("/nuevo")
		.get(function (sol, res) {
			locals={
				title: "Nueva Escuela",
				page_title: "Crear Escuela"
			}
			res.render("Admin/Escuelas/nuevo", locals);
		})
		.post(uploader.single("foto"),function (sol, res) {
			locals={};
			var nuevoEscuela = new Escuela();

			/*nuevoEscuela.nombre = sol.body.nombre; 
			nuevoEscuela.descripcion  = sol.body.descripcion;*/

			console.log(sol.body);
			console.log(sol.file);

			/*for(var key in sol.body){
				if (typeof key != undefined) {
					//console.log(key+":"+sol.body[key]);
				 	nuevoAdministrador[key] = sol.body[key];
				}};*/


			/*nuevoAdministrador.save(function (err) {
				if (!err) {
					res.redirect("/admin/administradores");
				} else {
					res.json(err);
				}				
			});*/

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
		
	app.use("/admin/escuelas", router);
};