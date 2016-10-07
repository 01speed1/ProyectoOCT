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
				limit: 6,
				offset: (sol.query.page-1)*6,
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
	router.route("/:escuelaId")
		.get(function (sol, res) {
			locals={
				title: "Sin titulo",
				paginate: "areas/"+sol.params.escuelaId
			}

			var paginate_option = {
				populate: "escuela",
				page: sol.query.page,
				limit: 6,
				offset: (sol.query.page-1)*6,
				sort: {nombres:1}
			}

			var promise = Area.paginate({escuela:sol.params.escuelaId}, paginate_option);
				promise
				.then(function (areas) {
					if (areas.docs.length==0) {
						sol.flash("toast", "Esta escuela no tiene areas")
						res.redirect("/escuelas")
					}
					locals.areas=areas.docs
					locals.title = areas.docs[0].escuela.nombre;
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

				  	res.render("Home/Areas/byEscuela", locals);

				})
				.error(function (err) {
					res.json(err)
				})


		});

//solicitudes Ajax


app.use("/areas", router);
};
