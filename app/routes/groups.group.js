
//rutas para gestionar grupos
module.exports = function (app) {
	var groupModel = require("../models/group.js");

	//POST
	app.post("/grupos", function (sol, res) {
		var nuevoGroup = new groupModel({
			iniDate: sol.body.di,
			endDate: sol.body.de,
			iniSchedule: sol.body.si, 
			endSchedule: sol.body.se,
			teacher: sol.body.t,
			school: sol.body.s,
			area: sol.body.a
		});

		nuevoGroup.save(function (err) {
			if (!err) res.json(nuevoGroup);
			else {console.log(err); res.send(err.errors); }  
		}); 
	})

	//GET ALL
	app.get("/grupos", function (sol, res) {
		groupModel.find(function (err, groups) {
			if (!err) res.json(groups);
			else {console.log(err); res.json(err)};
		});
	}); 

	//GET ONE
	app.get("/grupo/:id", function (sol, res) {
		var id = sol.params.id;
		groupModel.find(id, function (err, group) {
			if (!err) res.json(group);
			else console.log(err.errors); res.send(err.errors);
		});
	});  

	//PUT
	app.put("/grupo/:id", function (sol, res) {
		var id = sol.params.id;
		groupModel.find(id, function (err, group) {
			group.iniDate = 	sol.body.di;
			group.endDate = 	sol.body.de;
			group.iniSchedule = sol.body.si; 
			group.endSchedule = sol.body.se;
			group.teacher = 	sol.body.t;
			group.school = 		sol.body.s;
			group.area = 		sol.body.a;

			if (!err) res.send("grupo "+id+" actualizado");
			else console.log(err.errors); res.send(err.errors);
		});
	});

	//DELETE
	app.delete("/grupo/:id", function (sol, res) {
		var id = sol.params.id;
		groupModel.find(id, function (err, group) {
			group.remove(function (err) {
				if (!err) res.send("Grupo eliminado");
				else console.log(err.errors); res.send(err.errors);
			});
			
		});
	});



}//end