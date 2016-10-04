var express = require("express");
var moment = require("moment");
var paginate = require('express-paginate');
var gestorImagenes = require("../../config/gestorImagenes");
var router = express.Router();

var locals={};

//modelos DB
var Area = require("../models/area");
var Escuela = require("../models/escuelas");
//middlewere para cargar imagenes
var uploader = require("../../config/gestorImagenes");


//routes Administradores
module.exports = function (app) {

	//ver todas areas
	router.route("/")
		.get(function (sol, res) {
			locals={
				tipoDeUsuairo: "Areas",
				paginate: "areas",
				title: "Areas",
				page_title: "Panel de Areas"};

			var paginate_option = {
				populate: "escuela",
				page: sol.query.page, 
				limit: 10,
				offset: (sol.query.page-1)*10,
				sort: {nombres:1}
				}
			var promise = Area.paginate({}, paginate_option);
			promise
			.then(function (areas) {
				
				locals.areas=areas.docs;
				locals.page = sol.query.page;
				locals.limit = areas.limit;
				locals.total = areas.total;
			  locals.limit = areas.limit;
			  locals.offset= areas.offset;
			  var i = (areas.total/areas.limit);
			  if(areas.total%areas.limit == 0){
			  	if (i===0) {locals.pages=1;} else {locals.pages = parseInt(i);}
			  }
			  else{locals.pages = parseInt(i)+1;}

				res.render("Home/Areas/index",locals)
			})
			.error(function (err) {
				console.log(err);
				res.json(err);
			})
		})

	//ver areas de una escuela
	router.route("/:escuela")
		.get(function (sol, res) {
			locals={
				title: sol.params.escuela,
				paginate: "areas",
			}

			var paginate_option = {
				populate: "escuela",
				page: sol.query.page, 
				limit: 10,
				offset: (sol.query.page-1)*10,
				sort: {nombres:1}
				}

			var promise = Area.paginate({escuela:sol.params.escuela}, paginate_option);
			promise
				.then(function (areas) {
					locals.areas = areas
				})
				.then(function () {
					res.render("Home/Areas/byEscuela", locals);
				})	
		});

//solicitudes Ajax
	//verificar el registro de la cedula
		router.route("/validarNombre")
			.post(function (sol, res) {
				var promise = Area.findOne({nombre:sol.body.value}).exec();
				promise
				.then(function (area) {
					if(area!=null && area.nombre == sol.body.value){
						res.send("El nombre "+sol.body.value+" ya lo usa otra area.");
					}
				})
				.catch(function (err) {
					res.json(err);
				})
			}) 

		
app.use("/areas", router);
};