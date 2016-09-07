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

	app.use("/admin/grupos", router)
}