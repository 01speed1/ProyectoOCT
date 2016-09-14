var express = require("express");
var moment = require("moment");
var paginate = require('express-paginate');
var gestorImagenes = require("../../config/gestorImagenes");
var router = express.Router();

var locals={};

//modelos DB
var Grupo = require("../models/grupos")
var Area = require("../models/area");
var Profesor = require("../models/usuarios")
//middlewere para cargar imagenes
var uploader = require("../../config/gestorImagenes");

//routes Administradores
module.exports = function (app) {

	//ver todos los grupos
	router.route("/")
		.get(function (sol, res) {
			
				locals={
					tipoDeUsuairo: "Grupos",
					paginate: "grupos",
					title: "Grupos",
					page_title: "Panel de Grupos"
				};

				var paginate_option = {
				populate: ["profesor","area"],
				page: sol.query.page, 
				limit: 10,
				offset: (sol.query.page-1)*10,
				sort: {nombres:1}
				}

			var promise = Grupo.paginate({},paginate_option)
			promise
				.then(function (grupos) {
					
					locals.grupos=grupos.docs;
					locals.page = sol.query.page;
					locals.limit = grupos.limit;
					locals.total = grupos.total;
				  locals.limit = grupos.limit;
				  locals.offset= grupos.offset;
				  var i = (grupos.total/grupos.limit);
				  if(grupos.total%grupos.limit == 0){
				  	if (i===0) {locals.pages=1;} else {locals.pages = parseInt(i);}
				  }
				  else{locals.pages = parseInt(i)+1;}

				})
				.then(function () {
					res.render("Admin/Grupos/index", locals);
				})
				.error(function (err) {
					console.log(err);
					res.json(err);
				})			
			

		})


	//crear grupo 
	router.route("/nuevo")
		.get(function (sol, res) {
			locals={
				title: "Nuevo Grupo",
				page_title: "Crear Grupo"
			}

			var promiseAreas = Area.find().populate('escuela').exec();
			promiseAreas
				.then(function (areas) {
					locals.areas= areas;
				
				})
				.then(function () {
					var promiseProfesores = Profesor.find({tipo:"PROFESOR"}).exec();
					promiseProfesores.then(function (profesores) {
						locals.profesores = profesores;
					})
					.then(function () {
						res.render("Admin/Grupos/nuevo",locals);
					})
					.error(function (err) {
						res.json(err);
					})				
				})
				.error(function (err) {
					res.json(err);
				})
		})
		.post(function (sol, res) {
			//convertir hora ampm
				var hourStart=parseInt(sol.body.horaInicio), hourEnd=parseInt(sol.body.horaFin);
				if (sol.body.AMPMInicio=="PM") {
					hourStart=parseInt(sol.body.horaInicio)+12;
				}
				if (sol.body.AMPMFin=="PM") {
					hourEnd=parseInt(sol.body.horaFin)+12;
				}
			

			var fechaInicio = moment(sol.body.fechaInicio).add(hourStart, "hours").add(sol.body.horaInicioMin, "minutes").subtract(5,'hours');
			var fechaFin = moment(sol.body.fechaFin).add(hourEnd, "hours").add(sol.body.horaFinMin, "minutes").subtract(5,'hours')			

			if (sol.body.limiteEstudiantes == ""){
				sol.body.limiteEstudiantes=0;
			}

			var data = {
				nombre: sol.body.nombre,
				profesor: sol.body.profesor,
				area: sol.body.area,
				fechaInicio: fechaInicio,
				fechaFin: fechaFin,
				estado: sol.body.estado,
				diasDeClase: sol.body.diasDeClase,
				limiteEstudiantes:sol.body.limiteEstudiantes,
				jornada: sol.body.jornada
			}


			nuevoGrupo = new Grupo(data);

			nuevoGrupo.save(function (err) {
				if (!err) {
					sol.flash("toast", "Grupo creado.");
					res.redirect("/admin/grupos");
				}
			})

		})

	//editar grupo 
	router.route("/editar/:id")
		.get(function (sol, res) {
			locals={
				title: "Editar Grupo",
				page_title: "Editar Grupo"
			}


			var promise = Grupo.findById(sol.params.id).exec();
			promise
			.then(function (grupo) {
				locals.grupo = grupo;

				var promiseArea = Area.find().populate("escuelas").exec();
				promiseArea
				.then(function (areas) {
					console.log(areas);
					locals.areas = areas;

					var promiseProfesores = Profesor.find().exec();
					promiseProfesores
					.then(function (profesores) {
						locals.profesores = profesores;
						res.render("Admin/Grupos/editar", locals);
					})
					.error(function (err) {
						res.json(err);
					})
				})
				.error(function (err) {
					res.json(err);
				})
			})
			.error(function (err) {
				res.json(err);
			});

			

		})

	app.use("/admin/grupos", router)
}