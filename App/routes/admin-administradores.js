var express = require("express");
var moment = require("moment");
var paginate = require('express-paginate');
var crypto = require('../../config/crypto.js')
var session = require("../../config/session"); //session.admin,
var router = express.Router();


var locals={};

//modelos DB
var Administrador = require("../models/usuarios");

//routes Administradores
module.exports = function (app) {

	//ver todos los administradores
	router.route("/")
		.get(session.admin, function (sol, res) {
			locals={
				usuario: sol.session.user,
				tipoDeUsuairo: "Administrador",
				paginate: "administradores",
				title: "Administradores",
				page_title: "Panel de administradores"};

			var paginate_option = {
				page: sol.query.page, 
				limit: 10,
				offset: (sol.query.page-1)*10,
				sort: {nombres:1}
				}

			var promise = Administrador.paginate({tipo:"ADMINISTRADOR"},paginate_option);
			promise
			.then(function (admins) {
				locals.admins=admins.docs;
				locals.page = sol.query.page;
				locals.limit = admins.limit;
				locals.total = admins.total;
			  locals.limit = admins.limit;
			  locals.offset= admins.offset;
			  var i = (admins.total/admins.limit);
			  if(admins.total%admins.limit == 0){
			  	if (i===0) {locals.pages=1;} else {locals.pages = parseInt(i);}
			  }
			  else{locals.pages = parseInt(i)+1;}

			})
			.then(function () {
				if (sol.query.page > locals.pages || sol.query.page <=0 ){
			  	res.redirect("/admin/administradores?page="+locals.pages)
			  }else{
			  	res.render("Admin/Administradores/index",locals)
			  }			  
			})
			.error(function (err) {
				res.json(err);
			})
		})

	//Agregar un nuevo administrador
	router.route("/nuevo")
		.get(session.admin, function (sol, res) {
			locals={
				usuario: sol.session.user,
				title: "Nuevo administrador",
				page_title: "Crear administrador"
			}
			res.render("Admin/Administradores/nuevo", locals);
		})
		.post(session.admin, function (sol, res) {
			locals={};
			var nuevoAdministrador = new Administrador();

			for(var key in sol.body){
				if (typeof key != undefined) {
					//console.log(key+":"+sol.body[key]);
				 	nuevoAdministrador[key] = sol.body[key];
				}};

			//informacion fuera del sol.body
			//var crypto = require('../../config/crypto.js')
			nuevoAdministrador.contraseña = crypto.encrypt(sol.body.contraseña);
			nuevoAdministrador.contraseñaValidar = crypto.encrypt(sol.body.contraseñaValidar);
			nuevoAdministrador.fechaNacimiento = moment(sol.body.fechaNacimiento_submit);
			nuevoAdministrador.tipo = "ADMINISTRADOR";



			nuevoAdministrador.save(function (err) {
				if (!err) {
					sol.flash("toast", "Se registro a "+sol.body.nombres+" "+sol.body.apellidos+" como administrador");
					res.redirect("/admin/administradores");
				} else {
					res.json(err);
				}
				
			});

		});

	//modificar y eliminar administrador
	router.route("/editar/:id")
		.get(session.admin, function (sol, res) {
			Administrador.findById(sol.params.id, function (err, admin) {
				locals={
					admin:admin,
					usuario: sol.session.user,
					page_title:"Modificar administrador",
					title: "Modificar administrador"
				}
				res.render("Admin/Administradores/editar", locals);
			})
		})
		.put(session.admin, function (sol, res) {
			var promise = Administrador.findById(sol.params.id).exec();

			promise.then(function (admin) {
				for(var key in sol.body){
					if (typeof key != undefined) {
						//console.log(key+":"+sol.body[key]);
				 		admin[key] = sol.body[key];
				}};

				admin.fechaModificado = moment();

				return admin.save();
			})
			.then(function (admin) {
				sol.flash("toast", "Administrador modificado");
				res.redirect("/admin/administradores");
			})
			.catch(function (err) {
				res.json(err);
			});
		})
		.delete(session.admin, function (sol, res) {
			var promise = Administrador.findById(sol.params.id).exec();
			promise.then(function (admin) {
				res.locals.nombre = admin.nombres+" "+admin.apellidos;
				return admin.remove();
			})
			.then(function () {
				sol.flash('toast', "Administrador "+res.locals.nombre+" eliminado(a).");
				res.send("/admin/administradores");
			})
			.error(function (err) {
				res.json(err);
			});
		})

//solicitudes Ajax
	//verificar el registro de la cedula
		router.route("/validarCc")
			.post( function (sol, res) {
				var promise = Administrador.findOne({numeroDocumento:sol.body.value}).exec();
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
			.post( function (sol, res) {
				var promise = Administrador.findOne({email:sol.body.value}).exec();
				promise
					.then(function (admin) {
						if(admin!=null && admin.email == sol.body.value){
						res.send("Este correo electronico ya se encuentra registrado");
					}
					})
					.catch(function (err) {
						
					})
			})
		
	app.use("/admin/administradores", router);
};