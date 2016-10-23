var express = require("express");
var moment = require("moment");
var paginate = require('express-paginate');
var session = require("../../config/session"); //session.admin, 
var crypto = require('../../config/crypto.js')

var router = express.Router();

var locals={};

//modelos DB
var Estudiante = require("../models/usuarios"); //ESTUDIANTE

//routes Estudiante
module.exports = function (app) {

	//ver todos los Estudiantes
	router.route("/")
		.get(session.admin, function (sol, res) {
			locals={
				tipoDeUsuairo: "Estudiante",
				paginate: "estudiantes",
				title: "Estudiantes",
				page_title: "Panel de Estudiantes"};

			var paginate_option = {
				page: sol.query.page, 
				limit: 10,
				offset: (sol.query.page-1)*10,
				sort: {nombres:1}
				}

			var promise = Estudiante.paginate({tipo:"ESTUDIANTE"},paginate_option);
			promise
			.then(function (estudiantes) {
				locals.estudiantes=estudiantes.docs;
				locals.page = sol.query.page;
				locals.limit = estudiantes.limit;
				locals.total = estudiantes.total;
			  locals.limit = estudiantes.limit;
			  locals.offset= estudiantes.offset;
			  var i = (estudiantes.total/estudiantes.limit);
			  if(estudiantes.total%estudiantes.limit == 0){
			  	if (i===0) {locals.pages=1;} else {locals.pages = parseInt(i);}
			  }
			  else{locals.pages = parseInt(i)+1;}

			})
			.then(function () {
				if (sol.query.page > locals.pages || sol.query.page <=0){
			  	res.redirect("/admin/estudiantes?page="+locals.pages)
			  }else{
			  	res.render("Admin/estudiantes/index",locals)
			  }
			})
			.error(function (err) {
				res.json(err);
			})
		})

	//Agregar un nuevo Estudiante
	router.route("/nuevo")
		.get(session.admin, function (sol, res) {
			res.redirect("/registro");
		})

	//modificar y eliminar administrador
	router.route("/editar/:id")
		.get(session.admin, function (sol, res) {
			Estudiante.findById(sol.params.id, function (err, estudiante) {
				locals={
					estudiante:estudiante,
					page_title:"Modificar estudiante",
					title: "Modificar Estudiante"
				}
				res.render("Admin/Estudiantes/editar", locals);
			})
		})
		.put(session.admin, function (sol, res) {
			var promise = Estudiante.findById(sol.params.id).exec();

			promise.then(function (estudiante) {
				for(var key in sol.body){
					if (typeof key != undefined) {
						//console.log(key+":"+sol.body[key]);
				 		estudiante[key] = sol.body[key];
				}};

				estudiante.contraseña = crypto.encrypt(sol.body.contraseña);
				estudiante.contraseñaValidar = crypto.encrypt(sol.body.contraseñaValidar);
				estudiante.fechaModificado = moment();

				return estudiante.save();
			})
			.then(function (estudiante) {
				sol.flash("toast", "Estudiante modificado");
				res.redirect("/admin/estudiantes");
			})
			.catch(function (err) {
				res.json(err);
			});
		})
		.delete(session.admin, function (sol, res) {
			var promise = Estudiante.findById(sol.params.id).exec();
			promise
			.then(function (profe) {
				res.locals.nombre = profe.nombres+" "+profe.apellidos;
				return profe.remove();
			})
			.then(function () {
				sol.flash('toast', "Estudiante "+res.locals.nombre+" eliminado");
				res.send("/admin/estudiantes");
			})
			.catch(function (err) {
				res.json(err);
			});
		})

//solicitudes Ajax
	//verificar el registro de la cedula
		router.route("/validarCc")
			.post(session.admin, function (sol, res) {
				var promise = Profesor.findOne({numeroDocumento:sol.body.value}).exec();
				promise
				.then(function (admin) {
					if(admin!=null && admin.numeroDocumento == sol.body.value){
						res.send("Este numero de documento se encuentra registrado");
					}
				})
				.catch(function (err) {
					res.json(err);
				})
			}) 

	//verficar el registro del correo electronico
		router.route("/validarEmail")
			.post(session.admin, function (sol, res) {
				var promise = Profesor.findOne({email:sol.body.value}).exec();
				promise
					.then(function (admin) {
						if(admin!=null && admin.email == sol.body.value){
						res.send("Este correo electronico ya se encuentra registrado");
					}
					})
					.catch(function (err) {
						
					})
			})
		
app.use("/admin/estudiantes", router);

//End router
};