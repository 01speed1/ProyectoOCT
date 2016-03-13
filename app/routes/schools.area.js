//gestionar las rutas para la administracion de las areas 
module.exports = function (app) {
	modelArea = require("../models/area.js");

	//POST
	app.post("/areas", function (sol, res) {
		var nuevaArea = new modelArea({
			name: sol.body.n,
			school: sol.body.s
			
		});

		nuevaArea.save(function (err) {
			if (!err) { res.json(nuevaArea);}
			else {console.log(res.errors); res.send(res.errors);}
		});

	}); 

	//GET ALL
	app.get("/areas", function (sol, res) {
		modelArea.find(function (err, areas) {
			if (!err) {res.json(areas);}
			else { console.log(err.errors), res.json(err.errors);}
		});
	}) 

	//GET ONE
	app.get("/area/:id", function (sol, res) {
		var id = sol.params.id; 
		modelArea.findById(id, function (err, area) {
			if (!err) {res.json(area);}
			else { console.log(err.errors), res.json(err.errors);}
		});
	});

	//PUT
	app.put("/area/:id", function (sol, res) {
		var id = sol.params.id;
		modelArea.findById(id, function (err, area) {
			area.name = sol.body.n;
			area.school = sol.body.s;

			area.save(function (err) {
				if (!err) {res.send("area "+id+ " modificada");}
				else {console.log(err.errors); res.json(err.errors);}
			} );
		})
	});

	//DELETE
	app.delete("/areas/:id", function (sol, res) {
		var id = sol.params.id; 
		modelArea.findById(id, function (err, area) {
			area.remove(function (err) {
				if (!err) {res.send("area "+id+" eliminada"); }
				else { console.log(err.errors); res.json(); }
			}); 
		}); 
	}); 


} 