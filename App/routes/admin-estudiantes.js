var express = require("express");
var moment = require("moment");
var paginate = require('express-paginate');
var router = express.Router();


var locals={};

//modelos DB
var Estudiante = require("../models/usuarios"); //ESTUDIANTE

//routes Estudiante
module.exports = function (app) {

	//ver todos los Estudiantes
	router.route("/")
		.get(function (sol, res) {
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
		.get(function (sol, res) {
			res.redirect("/registro");
		})


	//modificar y eliminar administrador
	router.route("/editar/:id")
		.get(function (sol, res) {
			Profesor.findById(sol.params.id, function (err, profe) {
				locals={
					profe:profe,
					page_title:"Modificar profesor",
					title: "Modificar Profesor"
				}
				res.render("Admin/Profesores/editar", locals);
			})
		})
		.put(function (sol, res) {
			var promise = Profesor.findById(sol.params.id).exec();

			promise.then(function (profe) {
				for(var key in sol.body){
					if (typeof key != undefined) {
						//console.log(key+":"+sol.body[key]);
				 		profe[key] = sol.body[key];
				}};

				profe.fechaModificado = moment();

				return profe.save();
			})
			.then(function (profe) {
				sol.flash("toast", "Profesor modificado");
				res.redirect("/admin/administradores");
			})
			.catch(function (err) {
				res.json(err);
			});
		})
		.delete(function (sol, res) {
			var promise = Profesor.findById(sol.params.id).exec();
			promise
			.then(function (profe) {
				res.locals.nombre = admin.nombres+" "+admin.apellidos;
				return admin.remove();
			})
			.then(function () {
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
			.post(function (sol, res) {
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
			.post(function (sol, res) {
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