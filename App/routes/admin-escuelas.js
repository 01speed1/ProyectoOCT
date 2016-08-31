var express = require("express");
var moment = require("moment");
var paginate = require('express-paginate');
var gestorImagenes = require("../../config/gestorImagenes");
var router = express.Router();


var locals={};

//modelos DB
var Escuela = require("../models/escuelas");
//middlewere para cargar imagenes
var uploader = require("../../config/gestorImagenes");


//routes Administradores
module.exports = function (app) {

	//ver todas las escuelas
	router.route("/")
		.get(function (sol, res) {
			locals={
				tipoDeUsuairo: "Escuelas",
				paginate: "escuelas",
				title: "Escuelas",
				page_title: "Panel de escuelas"};

			//!!! FALTA ACTUALIZAR LA PAGINACION 
			var paginate_option = {
				page: sol.query.page, 
				limit: 10,
				offset: (sol.query.page-1)*10,
				sort: {nombres:1}
				}

			var promise = Escuela.paginate({}, paginate_option);
			promise
			.then(function (escuelas) {
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

	//Agregar un nueva escuela
	router.route("/nuevo")
		.get(function (sol, res) {
			locals={
				title: "Nueva Escuela",
				page_title: "Crear Escuela"
			}
			res.render("Admin/Escuelas/nuevo", locals);
		})
		.post(uploader.cargarNuevoBackground, function (sol, res) {

			var data = {
				nombre: sol.body.nombre,
				descripcion : sol.body.descripcion,
				estado: sol.body.estado
			}

			if (res.locals.cloudinary) {
				data.background = res.locals.cloudinary.url,
				data.background_id = res.locals.cloudinary.id
			}

			var nuevaEscuela = new Escuela(data);
			nuevaEscuela.fechaModificado = moment();

			nuevaEscuela.save(function (err) {
				if (!err) {
					sol.flash("toast", "Escuela creada");
					res.redirect("/admin/escuelas");
				}
			});

		});

	//modificar y eliminar escuela
	router.route("/editar/:id")
		.get(function (sol, res) {
			Escuela.findById(sol.params.id, function (err, escuela) {
				locals={
					escuela:escuela,
					page_title:"Modificar Escuela "+escuela.nombre,
					title: "Modificar Escuela"
				}
				res.render("Admin/Escuelas/editar", locals);
			})
		})
		.put(uploader.cargarNuevoBackground, function (sol, res, next) {
			var promise = Escuela.findById(sol.params.id).exec();
			promise
			.then(function (escuela) {	
					escuela.nombre = sol.body.nombre,
					escuela.descripcion = sol.body.descripcion,
					escuela.estado = sol.body.estado
					escuela.fechaModificado = moment();
				
				if (res.locals.cloudinary) {
					escuela.background = res.locals.cloudinary.url,
					escuela.background_id = res.locals.cloudinary.id
				}

				if (sol.body.background_id!=escuela.background_id) {
					res.locals.bid = sol.body.background_id
				}

				console.log("escuela actualizada");
				return escuela.save();
			})
			.then(function (escuela) {
				res.locals.send = "/admin/escuelas";
				res.locals.msToast = "Escuela "+escuela.nombre+" modificada.";
				next();
			})
			.catch(function (err) {
				res.json(err);
			});
		},uploader.borrarBackground)
		.delete(function (sol, res) {
			var promise = Escuela.findById(sol.params.id).exec();
			promise.then(function (escuela) {
				res.locals.bid = escuela.background_id;
				return escuela.remove();
			})
			.then(function () {
				res.locals.msToast = "Escuela Borrada";
				res.locals.send = "/admin/escuelas"
				next();
			})
			.catch(function (err) {
				res.json(err);
			});
		},uploader.borrarBackground)

//solicitudes Ajax
	//verificar el registro de la cedula
		router.route("/validarNombre")
			.post(function (sol, res) {
				var promise = Escuela.findOne({nombre:sol.body.value}).exec();
				promise
				.then(function (escuela) {
					if(escuela!=null && escuela.nombre == sol.body.value){
						res.send("El nombre "+sol.body.value+" ya lo usa otra escuela.");
					}
				})
				.catch(function (err) {
					res.json(err);
				})
			}) 

		
app.use("/admin/escuelas", router);
};