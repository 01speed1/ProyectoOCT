var express = require("express");
var moment = require("moment");
var paginate = require('express-paginate');
var gestorImagenes = require("../../config/gestorImagenes");
var router = express.Router();

var locals={};

//modelos DB
var Area = require("../models/area");
var Grupo = require("../models/grupos");
//middlewere para cargar imagenes
//var uploader = require("../../config/gestorImagenes");

//routes Administradores
module.exports = function (app) {

	//ver todas areas
	router.route("/")
		.get(function (sol, res) {
			locals={
				tipoDeUsuairo: "Grupos",
				paginate: "grupos",
				title: "Grupos"};

			var paginate_option = {
				populate: "profesor",
				populate: "area",
				page: sol.query.page,
				limit: 6,
				offset: (sol.query.page-1)*6,
				sort: {nombres:1}
				}
			var promise = Grupo.paginate({}, paginate_option);
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

				res.render("Home/Grupos/index", locals)
			})
			.error(function (err) {
				console.log(err);
				res.json(err);
			})
		})

	//ver areas de una escuela
	router.route("/:areaId")
		.get(function (sol, res) {
			locals={
				title: "Sin titulo",
				paginate: "grupos/"+sol.params.areaId
			}

			var paginate_option = {
				populate: "profesor",
				//populate: "area",
				page: sol.query.page,
				limit: 6,
				offset: (sol.query.page-1)*6,
				sort: {nombres:1}
			}

			var promise = Grupo.paginate({area:sol.params.areaId}, paginate_option);
				promise
				.then(function (grupos) {
					if (grupos.docs.length==0) {
						sol.flash("toast", "Esta area no tiene grupos")
						res.redirect("/grupos")
					}
					locals.grupos=grupos.docs
					locals.title = grupos.docs[0].area.nombre;
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

				  	res.render("Home/Grupos/byArea", locals);
						//res.json(grupos.docs)
				})
				.error(function (err) {
					res.json(err)
				})


		});

//solicitudes Ajax


app.use("/grupos", router);
};
