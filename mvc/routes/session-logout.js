var express = require("express");
var crypto = require("../../config/crypto")
//var moment = require("moment");
//var paginate = require('express-paginate');
var router = express.Router();

var locals={};

//modelos DB
	var Estudiante = require("../models/usuarios"); 

module.exports = function (app) {
	router.route("/")
		.get(function (sol, res) {

			if (sol.session.usuario_id) {
				sol.session.regenerate(function (err) {
					sol.flash("toast", "Cerraste session exitosamente");
					res.redirect("/login");
				});
			} else{
				res.redirect("/");
			}

		})

	app.use("/logout", router);
}
