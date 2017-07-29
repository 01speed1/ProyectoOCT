var express = require("express");
var moment = require("moment");
var paginate = require('express-paginate');
var session = require("../../config/session"); //session.admin, 
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
		.get(session.admin, function (sol, res) {

			locals={
				usuario: sol.session.user,
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
					res.render("admin/grupos/index", locals);
				})
				.error(function (err) {
					console.log(err);
					res.json(err);
				})
		})

	//ver grupos por area
	router.route("/area/:areaId")
		.get(session.admin, function (sol, res) {

			locals={
				usuario: sol.session.user,
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

			var promise = Grupo.paginate({area:sol.params.areaId},paginate_option)
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
					res.render("admin/grupos/index", locals);
				})
				.error(function (err) {
					console.log(err);
					res.json(err);
				})
		})

	//crear grupo
	router.route("/nuevo")
		.get(session.admin, function (sol, res) {
			locals={
				usuario: sol.session.user,
				title: "Nuevo Grupo",
				page_title: "Crear Grupo"
			}

			var promiseAreas = Area.find().populate('escuela').exec();
			promiseAreas
				.then(function (areas) {
					if (areas.length == 0) {
						sol.flash("toast", "no hay Areas, crea una")
						res.redirect("/admin/areas/nuevo") }
					else {locals.areas= areas;}

					return Profesor.find({tipo:"PROFESOR"}).exec();
					
				})
				.then(function (profesores) {

					console.log(profesores.length)

					if (profesores.length == 0) {
							sol.flash("toast", "No hay profesores, primero crea uno");
							res.redirect("/admin/profesores/nuevo");

						} else {
							locals.profesores = profesores;
							res.render("admin/grupos/nuevo",locals);
						}
				

				})
				.error(function (err) {
					res.json(err);
				})
		})
		.post(session.admin, function (sol, res) {
			//ajustar hora para almacenarla
				var hourStart=parseInt(sol.body.horaInicio), hourEnd=parseInt(sol.body.horaFin);
					if (sol.body.AMPMInicio=="PM") {
						hourStart=parseInt(sol.body.horaInicio)+12;
					}
					if (sol.body.AMPMFin=="PM") {
						hourEnd=parseInt(sol.body.horaFin)+12;
					}

				var fechaInicio = moment(sol.body.fechaInicio).add(hourStart, "hours").add(sol.body.horaInicioMin, "minutes");
				var fechaFin = moment(sol.body.fechaFin).add(hourEnd, "hours").add(sol.body.horaFinMin, "minutes");

				var limiteEstudiantes;
				if (sol.body.limiteEstudiantes == ""){
					limiteEstudiantes=0;
				} else {
					limiteEstudiantes = sol.body.limiteEstudiantes
				}

				var data = {
					nombre: sol.body.nombre,
					profesor: sol.body.profesor,
					area: sol.body.area,
					fechaInicio: fechaInicio,
					fechaFin: fechaFin,
					estado: sol.body.estado,
					diasDeClase: sol.body.diasDeClase,
					limiteEstudiantes:limiteEstudiantes,
					jornada: sol.body.jornada
				}

				var nuevoGrupo = new Grupo(data);

				nuevoGrupo.save(function (err) {
					if (!err) {
						sol.flash("toast", "Grupo creado.");
						res.redirect("/admin/grupos");
					}
				})
		//
		})

	//editar grupo
	router.route("/editar/:id")
		.get(session.admin, function (sol, res) {
			locals={
				usuario: sol.session.user,
				title: "Editar Grupo",
				page_title: "Editar Grupo"
			}


			var promise = Grupo.findById(sol.params.id).populate("profesor").populate({path:"area", populate:{path:"escuela"}}).exec();
			promise
			.then(function (grupo) {
				locals.grupo = grupo;

				var promiseArea = Area.find().populate("escuela").exec();
				promiseArea
				.then(function (areas) {

					locals.areas = areas;

					var promiseProfesores = Profesor.find({tipo:"PROFESOR"}).exec();
					promiseProfesores
					.then(function (profesores) {
						locals.profesores = profesores;
						res.render("admin/grupos/editar", locals);
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
		.put(session.admin, function (sol, res) {
			//console.log(sol.body)

			//ajustar hora para almacenarla
				var hourStart=parseInt(sol.body.horaInicio), hourEnd=parseInt(sol.body.horaFin);
					if (sol.body.AMPMInicio=="PM") {
						hourStart=parseInt(sol.body.horaInicio)+12;
					}
					if (sol.body.AMPMFin=="PM") {
						hourEnd=parseInt(sol.body.horaFin)+12;
					}

			var fechaInicio = moment(sol.body.fechaInicio).add(hourStart, "hours").add(sol.body.horaInicioMin, "minutes");
			var fechaFin = moment(sol.body.fechaFin).add(hourEnd, "hours").add(sol.body.horaFinMin, "minutes");

			var limiteEstudiantes;
			if (sol.body.limiteEstudiantes == ""){
				limiteEstudiantes=0;
			} else {
				limiteEstudiantes = sol.body.limiteEstudiantes
			}

			var data = {
				nombre: sol.body.nombre,
				profesor: sol.body.profesor,
				area: sol.body.area,
				fechaInicio: fechaInicio,
				fechaFin: fechaFin,
				estado: sol.body.estado,
				diasDeClase: sol.body.diasDeClase,
				limiteEstudiantes:limiteEstudiantes,
				jornada: sol.body.jornada
			}

			var promise = Grupo.findById(sol.params.id).exec();
			promise
			.then(function (grupo) {


				for(var key in data){
					if (typeof key!=undefined) {
						grupo[key] = data[key];
					}
				}

				return grupo.save();
			})
			.then(function (result) {
				sol.flash("toast", "Grupo actualizado.");
				res.redirect("/admin/grupos");
			})
			.error(function (err) {
				res.json(err)
			})

		})
		.delete(session.admin, function (sol, res) {

			var promise = Grupo.findById(sol.params.id).exec();
			promise
			.then(function (grupo) {
				console.log(grupo)
				return grupo.remove();
			})
			.then(function () {
				sol.flash("toast", "Grupo Eliminado.");
				res.send("grupos");
			})
			.error(function (err) {
				res.json(err);
			})

		})

	app.use("/admin/grupos", router)
}
