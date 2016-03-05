//rutas de teacher
module.exports = function (app) {
	var userModel = require("../models/user.js");
	//post
	app.post("/teachers", function (sol, res) {
		var nuevoTeacher = new userModel({
			idDocument: 			sol.body.idd,
			typeUser: 				"Teacher",
			password: 				sol.body.p,
			password_confirmation: 	sol.body.pc
		});
		nuevoTeacher.save(function (err) {
			if (!err) {res.send("Profesor Guardado")}
			else { console.log(err.message); res.json(err.message);};
		});
	}); 

	//get all
	app.get("/teachers", function (sol, res) {
		userModel.find( { typeUser: "Teacher"} , function (err, teachers) {
			if (!err) {res.send(teachers)}
			else { console.log(err.message); res.json(err.message);}
		})
	});

	//get one
	app.get("/teacher/:id", function (sol, res) {
		var id = sol.params.id;
		userModel.findById(id, function (err, teacher) {
			if (!err) { res.send(teacher)}
			else { console.log(err.message); res.json(err.message);}
		})
	})

	//put
	app.put("/teacher/:id", function (sol, res) {
		var id = sol.params.id;
		userModel.findById(id, function (err, teacher) {
			teacher.idDocument 				= sol.body.idd;
			teacher.password				= sol.body.p;
			teacher.password_confirmation 	= sol.body.pc;

			teacher.save(function (err) {
				if (!err) {res.send("Profesor actulizado")}
				else {console.log(err.message); res.json(err.message);}
			})
		})
	}); 

	//delete
	app.delete("/teacher/:id", function (sol, res) {
		var id = sol.params.id; 
		userModel.findById(id, function (err, teacher) {
			teacher.remove(function (err) {
				if (!err) {res.send("Profesor eliminado")}
				else { console.log(err.message); res.json(err.message);}
			});
		});
	})
}