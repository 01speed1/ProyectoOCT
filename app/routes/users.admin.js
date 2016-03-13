//exportar rutas de admin
module.exports = function (app) {
	userModel = require("../models/user.js");
	//get
	app.get("/admins", function (sol, res) {
		userModel.find({typeUser: "Admin"}, function (err, admins) {
			if(!err) { res.json(admins) }
			else {
				cosole.log("Error al cargar Administradores: "+err); 
				res.send(err);};
		})
	})

	//get One
	app.get("/admin/:id", function (sol, res) {
		var id = sol.params.id; 
		userModel.findById(id, function (err, admin) {
			if (!err) {res.json(admin)}
			else { cosole.log("No se encontro administrador"); res.json(err) }
		})
	})

	//post
	app.post("/admins", function (sol, res) {
		var nuevoAdmin = new userModel({
			idDocument: 			sol.body.idd,
			typeUser: 				"Admin",
			password: 				sol.body.p,
			password_confirmation: 	sol.body.pc
		});

		nuevoAdmin.save(function (err) {
			if (!err) {res.send("Administrador Guardado");}
			else {console.log(err.errors); res.send(err.errors)};
		})
	})

	//put
	app.put("/admin/:id", function (sol, res) {
		var id = sol.params.id;
		userModel.findById(id, function (err, admin) {
			admin.idDocument 				= sol.body.idd;
			admin.password 					= sol.body.p;
			admin.password_confirmation 	= sol.body.pc;

			admin.save(function (err) {
				if (!err) {res.send("Administrador "+id+" modificiado")}
				else { conosole.log(err.errors); res.send(err.errors)};
			}); 
		});
	}); 


	//delete
	app.delete("/admin/:id", function (sol, res) {
		var id = sol.params.id; 
		userModel.findById(id, function (err, admin) {
			admin.remove(function (err) {
				if (!err) {res.send("Administrador "+id+" eliminado")}
				else { conosole.log(err.errors); res.send(err.errors)};	
			});
		});
	})
}