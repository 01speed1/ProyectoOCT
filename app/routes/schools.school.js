//configurar las rutas para crear escuela de formacion
module.exports = function (app) {
	schoolModel = require("../models/school.js");

	//este route/controller esta definido para las rutas de las escuelas de formacion

	//POST 
	app.post("/escuelas", function (sol, res) {
		var nuevaEscuela = new schoolModel({
			nombre: sol.body.n
		}); 

		nuevaEscuela.save(function (err) {
			
			if (!err) { console.log("Escuela creada"); res.send(nuevaEscuela);}
			else {
				console.log(err);
				res.send(err);
			}
		});
	});

	//GET ALL
	app.get("/escuelas", function (sol, res) {
		schoolModel.find(function (err, escuelas) {
			if (!err) { res.send(escuelas);}
			else { console.log("error cargando todas las escuelas: "+err.errors); res.send(err.errors) }
		})
	});

	//GET ONE  
	app.get("/escuela/:id",function (sol, res) {
		var id = sol.params.id;
		schoolModel.findById(id, function (err, escuela) {
			if (!err) { res.send(escuela); }
			else {console.log(err.errors); res.send(err.errors); }
		});
	});

	//PUT 
	app.put("/escuela/:id", function (sol, res) {
		var id = sol.params.id;
		schoolModel.findById(id, function (err, escuela) {
			escuela.nombre = sol.body.n

			escuela.save(function (err) {
				if (!err) { res.send(escuela); }
				else { console.log(err.errors); res.send(err.errors);}
			});
		})
	});

	//DELETE 
	app.delete("/escuela/:id", function (sol, res) {
		var id = sol.params.id;
		schoolModel.findById(id, function (err, escuela) {
			escuela.remove(function (err) {
				if (!err) {res.send("Escuela eliminada");}
				else { console.log(err.errors); res.send(err.errors);}
			});
		});
	});
}