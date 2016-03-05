//exportar ruta de usuario
module.exports =function (app) {
	userModel = require("../models/user.js");

	//este route/cotroller esta definido para el CRUD de usuarios

	//crear usuario
	app.post("/usuarios", function (sol, res) {
		var nuevoUsuario = new userModel({
			idDocument: 			sol.body.idd,
			password: 				sol.body.p,
			password_confirmation: 	sol.body.pc
		});

		nuevoUsuario.save(function (err) {
			
			if(!err) {console.log("Usuario Guardado"); res.send(nuevoUsuario); }
			else {
				//var mensajeErr = err.errors."nombreCampoDelJSON".message;
				console.log("Error creando usuario:"+ err.errors); 
				res.send(err.errors) }; // "err" envia donde ocurrio el error
 		});

 		
	});

	//ver usuarios
	app.get("/usuarios", function (sol, res) {
		userModel.find(function (err, usuarios) {
			if(!err){res.send(usuarios)}
			else {console.log(err)};
		});
	});

	//ver un usuario en especifico
	app.get("/usuario/:id", function (sol, res) {
		var id = sol.params.id;
		userModel.findById(id, function (err, user) {
			if (!err) { res.send(user) }
			else { res.send("No se encontro usuario")}
		});
	})

	//modificar usuario
	app.put("/usuario/:id", function (sol, res) {
		var id = sol.params.id;
		userModel.findById(id, function (err, user) {
			user.idDocument 			= sol.body.idd;
			user.password 				= sol.body.p;
			user.password_confirmation 	= sol.body.pc;

			user.save(function (err) {
			if(!err) {console.log("Usuario "+ id+" modificado"); res.send(user); }
			else {console.log("Error modificando usuario:"+ err.errors); res.send(err.errors) }; // "err" envia donde ocurrio el error
			});
		});

		

	});

	//eliminar usuario
	app.delete("/usuario/:id", function (sol, res) {
		var id = sol.params.id; 
		userModel.findById(id, function (err, user) {
			user.remove(function (err) {
				if (!err) {console.log("usuario "+id+" elminado"); res.send("Usuario eliminado")}
				else { console.log("Error eliminando usuario "+err.errors); res.send(err.errors);}; 
			});
		});
	});
}