var express = require("express");
//var moment = require("moment");
//var paginate = require('express-paginate');
var router = express.Router();

var locals={};

//modelos DB
var Profesor = require("../models/usuarios");

module.exports = function (app) {

	router.route("/")
		.get(function (sol, res) {
			res.render("Session/signup");
		})

	app.use("/registro", router);
}
