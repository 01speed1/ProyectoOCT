var express = require("express");
var moment = require("moment");
var paginate = require('express-paginate');
var router = express.Router();


var locals={};

//modelos DB
var Administrador = require("../models/usuarios");

//routes Administradores
module.exports = function (app) {

	//ver todos los administradores
	router.route("/")
		.get(function (sol, res) {
			locals={
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
			  if(admins.total%admins.limit == 0){locals.pages = parseInt(i);}else{locals.pages = parseInt(i)+1;}

			  if (sol.query.page > locals.pages){
			  	res.redirect("/admin/administradores?page="+locals.pages)
			  }else{
			  	res.render("Admin/Administradores/index",locals)
			  }

				

			})
			.catch(function (err) {
				res.json(err);
			})
		})

	//Agregar un nuevo administrador
	router.route("/nuevo")
		.get(function (sol, res) {
			locals={
				title: "Nuevo administrador",
				page_title: "Crear administrador"
			}
			res.render("Admin/Administradores/nuevo", locals);
		})
		.post(function (sol, res) {
			locals={};
			var nuevoAdministrador = new Administrador();

			for(var key in sol.body){
				if (typeof key != undefined) {
					//console.log(key+":"+sol.body[key]);
				 	nuevoAdministrador[key] = sol.body[key];
				}};

			//informacion fuera del sol.body
			nuevoAdministrador.fechaNacimiento = moment(sol.body.fechaNacimiento_submit);
			nuevoAdministrador.tipo = "ADMINISTRADOR";


			nuevoAdministrador.save(function (err) {
				if (!err) {
					sol.flash("toast", "Se registro a "+sol.body.nombres+" "+sol.body.apellidos);
					res.redirect("/admin/administradores");
				} else {
					res.json(err);
				}
				
			});

		});

	//modificar y eliminar administrador
	router.route("/editar/:id")
		.get(function (sol, res) {
			Administrador.findById(sol.params.id, function (err, admin) {
				locals={
					admin:admin,
					page_title:"Modificar administrador",
					title: "Modificar administrador"
				}
				res.render("Admin/Administradores/editar", locals);
			})
		})
		.put(function (sol, res) {
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
				res.redirect("/admin/administradores");
			})
			.catch(function (err) {
				res.json(err);
			});
		})
		.delete(function (sol, res) {
			var promise = Administrador.findById(sol.params.id).exec();
			promise.then(function (admin) {
				admin.remove();
			})
			promise.then(function () {
				sol.flash('toast', "Administrador eliminado");
				res.send("/admin/administradores");
			})
			.catch(function (err) {
				res.json(err);
			});
		})

//solicitudes Ajax
	//verificar el registro de la cedula
		router.route("/validarCc")
			.post(function (sol, res) {
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
			.post(function (sol, res) {
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