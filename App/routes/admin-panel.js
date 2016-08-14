var express = require("express");
var router = express.Router();

//routes Administradores
module.exports = function (app) {

	//cargar el panel de administracion
	router.route("/")
		.get(function (sol, res) {
			var locals = {
				page_title: "Panel de Administración"
			}
			
			res.render("Admin/index", locals);
		});



	app.use("/admin", router);
};