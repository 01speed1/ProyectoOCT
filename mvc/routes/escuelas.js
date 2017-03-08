var express = require("express");
var crypto = require("../../config/crypto")
//var moment = require("moment");
//var paginate = require('express-paginate');
var router = express.Router();

var locals={};

//modelos DB
	var Escuela = require("../models/escuelas"); 

module.exports = function (app) {

	router.route("/")
		.get(function (sol, res) {
			locals={
				tipoDeUsuairo: "Escuelas",
				paginate: "escuelas",
				title: "Escuelas de formación",
				page_title: "Panel de escuelas"};

			if (sol.session.usuario_id) {
				locals.user = sol.session.user
			}

			var paginate_option = {
				page: sol.query.page, 
				limit: 6,
				offset: (sol.query.page-1)*6,
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
			  var i = (escuelas.total/escuelas.limit);
			  if(escuelas.total%escuelas.limit == 0){
			  	if (i===0) {locals.pages=1;} else {locals.pages = parseInt(i);}
			  }
			  else{locals.pages = parseInt(i)+1;}

				res.render("home/escuelas/index",locals)
			})
			.catch(function (err) {
				console.log(err);
				res.json(err);
			})

		})


	app.use("/escuelas", router);
}
