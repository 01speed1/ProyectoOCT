var express = require("express");
var moment = require("moment");
var paginate = require('express-paginate');
var gestorImagenes = require("../../config/gestorImagenes");
var router = express.Router();

var locals={};

//modelos DB
var Area = require("../models/area");
var Escuela = require("../models/escuelas");
//middlewere para cargar imagenes
var uploader = require("../../config/gestorImagenes");


//routes Administradores
module.exports = function (app) {

	//ver todas areas
	router.route("/")
		.get(function (sol, res) {
			locals={
				tipoDeUsuairo: "Areas",
				paginate: "areas",
				title: "Areas",
				page_title: "Panel de Areas"};

			var paginate_option = {
				populate: "escuela",
				page: sol.query.page, 
				limit: 10,
				offset: (sol.query.page-1)*10,
				sort: {nombres:1}
				}
			var promise = Area.paginate({}, paginate_option);
			promise
			.then(function (areas) {
				locals.areas=areas.docs;
				locals.page = sol.query.page;
				locals.limit = areas.limit;
				locals.total = areas.total;
			  locals.limit = areas.limit;
			  locals.offset= areas.offset;
			  var i = (areas.total/areas.limit);
			  if(areas.total%areas.limit == 0){
			  	if (i===0) {locals.pages=1;} else {locals.pages = parseInt(i);}
			  }
			  else{locals.pages = parseInt(i)+1;}

				res.render("Admin/Areas/index",locals)
			})
			.error(function (err) {
				console.log(err);
				res.json(err);
			})
		})

	//Agregar un nueva area
	router.route("/nuevo")
		.get(function (sol, res) {
			locals={
				title: "Nueva Area",
				page_title: "Crear Area"
			}
			//cargar nombre de escuelas
			var promise = Escuela.find({}).exec()
			promise
				.then(function (escuelas) {
					var listaEscuela = {};
					var arrayEscuelas = [];
					for (var i = escuelas.length - 1; i >= 0; i--) {
						listaEscuela = {
							id: escuelas[i].id,
							nombre: escuelas[i].nombre,
							background: escuelas[i].background
						} 
					arrayEscuelas.push(listaEscuela);
				}
				return arrayEscuelas;
			})
				.then(function (array) {
					locals.escuelas = array;
					res.render("Admin/Areas/nuevo", locals);
				})	
		})
		.post(uploader.cargarNuevoBackground, function (sol, res) {
			//res.json(sol.body);
			console.log(sol.body);
			var data = {
				nombre: sol.body.nombre,
				descripcion : sol.body.descripcion,
				escuela: sol.body.escuela,
				estado: sol.body.estado
			}

			if (res.locals.cloudinary) {
				data.background = res.locals.cloudinary.url,
				data.background_id = res.locals.cloudinary.id
			}

			var nuevaArea = new Area(data);
			nuevaArea.fechaModificado = moment();

			nuevaArea.save(function (err) {
				if (!err) {
					sol.flash("toast", "Area "+sol.body.nombre+" creada");
					res.redirect("/admin/areas");
				}
			});
		});

	//modificar y eliminar area
	router.route("/editar/:id")
		.get(function (sol, res) {
			var promise2 = Escuela.find({}).exec();
			promise2
				.then(function (escuelas) {
					var listaEscuela = {};
					var arrayEscuelas = [];
					for (var i = escuelas.length - 1; i >= 0; i--) {
						listaEscuela = {
							id: escuelas[i].id,
							nombre: escuelas[i].nombre,
							background: escuelas[i].background
						} 
						arrayEscuelas.push(listaEscuela);
					}
					return arrayEscuelas;
				})
				.then(function (arrayEscuelas) {
					
					var promise = Area.findById(sol.params.id).populate('escuela').exec();
					promise
						.then(function (area) {
							locals={
								area:area,
								page_title:"Modificar Escuela "+area.nombre,
								title: "Modificar Escuela",
								arrayEscuelas:arrayEscuelas
							}
							res.render("Admin/Areas/editar", locals);
						})
				})
		})
		.put(uploader.cargarNuevoBackground, function (sol, res, next) {
			var promise = Area.findById(sol.params.id).exec();
			promise
			.then(function (area) {
					area.nombre = sol.body.nombre
					area.descripcion = sol.body.descripcion 
					area.escuela = sol.body.escuela
					area.estado = sol.body.estado
					area.fechaModificado = moment();
				
				if (res.locals.cloudinary) {
					area.background = res.locals.cloudinary.url,
					area.background_id = res.locals.cloudinary.id
				}

				res.locals.bid = "default_image"
				if (sol.body.background_id!=area.background_id) {
					res.locals.bid = sol.body.background_id
				}

				console.log("area actualizada");
				return area.save();
			})
			.then(function (area) {
				res.locals.redirect = "/admin/areas";
				res.locals.msToast = "Area "+sol.body.nombre+" modificada.";
				next();
			})
			.error(function (err) {
				res.json(err);
			});
		}, uploader.borrarBackground)
		.delete(function (sol, res, next) {
			var promise = Area.findById(sol.params.id).exec();
			promise.then(function (escuela) {
				res.locals.nombre = escuela.nombre;
				res.locals.bid = escuela.background_id;
				return escuela.remove();
			})
			.then(function () {
				res.locals.msToast = "Escuela "+res.locals.nombre+" Borrada";
				res.locals.send = "/admin/areas"
				next();
			})
			.error(function (err) {
				res.json(err);
			});
		},uploader.borrarBackground)

//solicitudes Ajax
	//verificar el registro de la cedula
		router.route("/validarNombre")
			.post(function (sol, res) {
				var promise = Escuela.findOne({nombre:sol.body.value}).exec();
				promise
				.then(function (escuela) {
					if(escuela!=null && escuela.nombre == sol.body.value){
						res.send("El nombre "+sol.body.value+" ya lo usa otra escuela.");
					}
				})
				.catch(function (err) {
					res.json(err);
				})
			}) 

		
app.use("/admin/areas", router);
};