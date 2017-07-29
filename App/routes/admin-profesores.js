var express = require("express");
var moment = require("moment");
var paginate = require('express-paginate');
var session = require("../../config/session"); //session.admin, 
var crypto = require("../../config/crypto.js");

var router = express.Router();


var locals={};

//modelos DB
var Profesor = require("../models/usuarios");

//routes Profesores
module.exports = function (app) {

	//ver todos los Profesores
	router.route("/")
		.get(session.admin, function (sol, res) {
			locals={
				usuario: sol.session.user,
				tipoDeUsuairo: "Profesor",
				paginate: "profesores",
				title: "Profesores",
				page_title: "Panel de Profesores"};

			var paginate_option = {
				page: sol.query.page, 
				limit: 10,
				offset: (sol.query.page-1)*10,
				sort: {nombres:1}
				}

			var promise = Profesor.paginate({tipo:"PROFESOR"},paginate_option);
			promise
			.then(function (profes) {
				locals.profes=profes.docs;
				locals.page = sol.query.page;
				locals.limit = profes.limit;
				locals.total = profes.total;
			  locals.limit = profes.limit;
			  locals.offset= profes.offset;
			  var i = (profes.total/profes.limit);
			  if(profes.total%profes.limit == 0){
			  	if (i===0) {locals.pages=1;} else {locals.pages = parseInt(i);}
			  }
			  else{locals.pages = parseInt(i)+1;}

			})
			.then(function () {
				if (sol.query.page > locals.pages || sol.query.page <=0){
			  	res.redirect("/admin/profesores?page="+locals.pages)
			  }else{
			  	res.render("Admin/profesores/index",locals)
			  }
			})
			.error(function (err) {
				res.json(err);
			})
		})

	//Agregar un nuevo Profesor
	router.route("/nuevo")
		.get(session.admin, function (sol, res) {
			locals={
				usuario: sol.session.user,
				title: "Nuevo profesor",
				page_title: "Crear profesor"
			}
			res.render("Admin/profesores/nuevo", locals);
		})
		.post(session.admin, function (sol, res) {
			locals={};
			var nuevoProfesor = new Profesor();

			for(var key in sol.body){
				if (typeof key != undefined) {
					//console.log(key+":"+sol.body[key]);
				 	nuevoProfesor[key] = sol.body[key];
				}};

			//informacion fuera del sol.body
			nuevoProfesor.contraseña = crypto.encrypt(sol.body.contraseña);
			nuevoProfesor.contraseñaValidar = crypto.encrypt(sol.body.contraseñaValidar);
			nuevoProfesor.fechaNacimiento = moment(sol.body.fechaNacimiento_submit);
			nuevoProfesor.tipo = "PROFESOR";


			nuevoProfesor.save(function (err) {
				if (!err) {
					sol.flash("toast","Se registro a "+sol.body.nombres+" "+sol.body.apellidos+" como profesor")
					res.redirect("/admin/profesores");
				} else {
					res.json(err);
				}
				
			});

		});

	//modificar y eliminar administrador
	router.route("/editar/:id")
		.get(session.admin, function (sol, res) {
			Profesor.findById(sol.params.id, function (err, profe) {
				locals={
					usuario: sol.session.user,
					profe:profe,
					page_title:"Modificar profesor",
					title: "Modificar Profesor"
				}
				res.render("Admin/Profesores/editar", locals);
			})
		})
		.put(session.admin, function (sol, res) {
			var promise = Profesor.findById(sol.params.id).exec();

			promise.then(function (profe) {
				for(var key in sol.body){
					if (typeof key != undefined) {
						//console.log(key+":"+sol.body[key]);
				 		profe[key] = sol.body[key];
				}};

				profe.contraseñaValidar = profe.contraseña

				profe.fechaModificado = moment();

				return profe.save();
			})
			.then(function (profe) {
				sol.flash("toast", "Profesor modificado");
				res.redirect("/admin/profesores");
			})
			.catch(function (err) {
				res.json(err);
			});
		})
		.delete(session.admin, function (sol, res) {
			var promise = Profesor.findById(sol.params.id).exec();
			promise
			.then(function (profe) {
				res.locals.nombre = profe.nombres+" "+profe.apellidos;
				profe.remove();
				sol.flash('toast', "Profesor "+res.locals.nombre+" eliminado");
				res.send("/admin/profesores");
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
		
app.use("/admin/profesores", router);

//End router
};