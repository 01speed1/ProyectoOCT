//rutas de student
module.exports = function (app) {
	var userModel = require("../models/user.js");
	//post
	app.post("/estudiantes", function (sol, res) {
		var nuevoTeacher = new userModel({
			idDocument: 			sol.body.idd,
			typeUser: 				"Estudiante",
			password: 				sol.body.p,
			password_confirmation: 	sol.body.pc
		});
		nuevoTeacher.save(function (err) {
			if (!err) {res.send("Estudiante Guardado")}
			else {console.log(err.message); res.json(err.message);};
		});
	}); 

	//get all
	app.get("/estudiantes", function (sol, res) {
		userModel.find( { typeUser: "Estudiante"} , function (err, students) {
			if (!err) {res.send(students)}
			else { console.log(err.message); res.json(err.message);}
		})
	});

	//get one
	app.get("/estudiante/:id", function (sol, res) {
		var id = sol.params.id;
		userModel.findById(id, function (err, student) {
			if (!err) { res.send(student)}
			else { console.log(err.message); res.json(err.message);}
		})
	})

	//put
	app.put("/estudiante/:id", function (sol, res) {
		var id = sol.params.id;
		userModel.findById(id, function (err, student) {
			student.idDocument 				= sol.body.idd;
			student.password				= sol.body.p;
			student.password_confirmation 	= sol.body.pc;

			student.save(function (err) {
				if (!err) {res.send("Estudiante actulizado")}
				else {console.log(err.message); res.json(err.message);}
			})
		})
	}); 

	//delete
	app.delete("/estudiante/:id", function (sol, res) {
		var id = sol.params.id; 
		userModel.findById(id, function (err, student) {
			student.remove(function (err) {
				if (!err) {res.send("Estudiante eliminado")}
				else { console.log(err.message); res.json(err.message);}
			});
		});
	})
}