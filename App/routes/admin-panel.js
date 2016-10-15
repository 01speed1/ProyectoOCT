var express = require("express");
var router = express.Router();

//routes Administradores
module.exports = function (app) {

	var Usuario = require("../models/usuarios");
	var Escuela = require("../models/escuelas");
	var Area = require("../models/area");
	var Grupo = require("../models/grupos");

	//cargar el panel de administracion
	router.route("/")
		.get(function (sol, res) {
			var locals = {
				usuario: sol.session.user,
				page_title: "Panel de Administración",
				title: "Panel de Administración"
			}

			var temp;

			var promise = Usuario.count({}).exec(); 
			promise
			.then(function (users) {
				locals.numUsers = users;
				return Usuario.find({tipo:"ADMINISTRADOR"}).exec();
			})
			.then(function (admins) {
				locals.numAdmins = admins.length
				locals.numNewAdmins=0;
				locals.numOldAdmins=0;
				for (var i = 0; i < admins.length; i++) {
					if (admins[i].estado=="NUEVO") {
						locals.numNewAdmins++;
					}else{
						locals.numOldAdmins++;
					}
				}
				locals.noAdmins = locals.numUsers-(locals.numNewAdmins + locals.numOldAdmins) 

				return Usuario.find({tipo:"PROFESOR"}).exec();
			})
			.then(function (profes) {
				locals.numProfes = profes.length
				locals.numNewProfes=0;
				locals.numOldProfes=0;
				for (var i = 0; i < profes.length; i++) {
					if (profes[i].estado=="NUEVO") {
						locals.numNewProfes++;
					}else{
						locals.numOldProfes++;
					}
				}
				locals.noProfes = locals.numUsers-(locals.numNewProfes + locals.numOldProfes)

				return Usuario.find({tipo:"ESTUDIANTE"}).exec();
			})
			.then(function (estudiantes) {
				locals.numEstudiantes = estudiantes.length
				locals.numNewEstudiantes=0;
				locals.numOldEstudiantes=0;
				for (var i = 0; i < estudiantes.length; i++) {
					if (estudiantes[i].estado=="NUEVO") {
						locals.numNewEstudiantes++;
					}else{
						locals.numOldEstudiantes++;
					}
				}
				locals.noEstudiantes = locals.numUsers-(locals.numNewEstudiantes + locals.numOldEstudiantes)

				return Escuela.find().exec();
			})
			.then(function (escuelas) {
				temp = escuelas;
				locals.numEscuelas = escuelas.length
				locals.numNewEscuelas=0;
				locals.numOldEscuelas=0;
				for (var i = 0; i < escuelas.length; i++) {
					if (escuelas[i].estado=="NUEVO") {
						locals.numNewEscuelas++;
					}else{
						locals.numOldEscuelas++;
					}
				}

				return Area.find().populate("escuela").exec();
			})
			.then(function (areas) {
				locals.numAreas ={
					num: areas.length,
					labels: []

				}

				for (var i = 0; i < temp.length; i++) {
					locals.numAreas.labels.push(temp[i].nombre);
				}

				var lnl = locals.numAreas.labels;

				locals.numAreas.areasPerLabel = new Array(parseInt(lnl.length));

				var lna =  locals.numAreas.areasPerLabel;

				for (var i = 0; i < lna.length; i++) {
					lna[i]=0;
				}			

				for (var i = 0; i < areas.length; i++) {
					for (var j = 0; j < lnl.length; j++) {
						if (areas[i].escuela.nombre == lnl[j]) {
							lna[j]++;
						}
					}
				}

				return Grupo.find().exec();
			})
			.then(function (grupos) {
				locals.numGrupos = grupos.length
				locals.numOldGrupos=0;
				locals.numNewGrupos=0
				for (var i = 0; i < grupos.length; i++) {
					if (grupos[i].estado=="NUEVO") {
						locals.numNewGrupos++;
					}else{
						locals.numOldGrupos++;
					}
				}
			})
			.then(function () {
				res.render("Admin/index", locals);
			})
		});



	app.use("/admin", router);
};