var express = require("express");
var moment = require("moment");
var paginate = require('express-paginate');
var session = require("../../config/session"); //session.admin, 

var router = express.Router();

var locals={};

//modelos DB
var Mensaje = require("../models/mensajes");

//middlewere para cargar imagenes


//routes Administradores
module.exports = function (app) {

	//estas usando areas

	//ver todos los mensajes
	router.route("/")
		.get(session.admin, function (sol, res) {

			locals={
				tipoDeUsuairo: "Mensajes",
				usuario: sol.session.user,
				paginate: "mensajes",
				title: "Mensajes",
				page_title: "Panel de Mensajes"};

			var paginate_option = {
				page: sol.query.page, 
				limit: 10,
				offset: (sol.query.page-1)*10,
				sort: {nombres:1}
				}
			var promise = Mensaje.paginate({}, paginate_option);
			promise
			.then(function (mensajes) {
				
				locals.mensajes=mensajes.docs;
				locals.page = sol.query.page;
				locals.limit = mensajes.limit;
				locals.total = mensajes.total;
			  locals.limit = mensajes.limit;
			  locals.offset= mensajes.offset;
			  var i = (mensajes.total/mensajes.limit);
			  if(mensajes.total%mensajes.limit == 0){
			  	if (i===0) {locals.pages=1;} else {locals.pages = parseInt(i);}
			  }
			  else{locals.pages = parseInt(i)+1;}

				res.render("Admin/Mensajes/index", locals)
			})
			.error(function (err) {
				console.log(err);
				res.json(err);
			})
		})

	//crear mensaje ruta publica 
	router.route("/nuevo")
		.post(function (sol, res) {
			var nuevoMesaje = new Mensaje();

			for(var key in sol.body){
				if (typeof key != undefined) {
					//console.log(key+":"+sol.body[key]);
				 	nuevoMesaje[key] = sol.body[key];
			}};

			nuevoMesaje.save(function (err, result) {
				if (!err) {
					sol.flash("toast", "Mensaje enviado");
					res.redirect("/#contacto")
				}
			})
			

		})

	// eliminar mensaje
	router.route("/editar/:id")
		.delete(session.admin, function (sol, res) {
			var promise = Mensaje.findById(sol.params.id).exec();
			promise.then(function (mensaje) {

				return mensaje.remove();
			})
			.then(function () {
				sol.flash("toast", "Mensaje borrado");
				res.send("/admin/mensajes")
			})
			.error(function (err) {
				res.json(err);
			});
		})

	
app.use("/admin/mensajes", router);
};