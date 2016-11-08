var crypto = require("./crypto.js")

//inicar la crear del super admin
var superAdmin = require("../App/models/usuarios.js");

module.exports = function (sol, res, next) {


	var promise = superAdmin.count();
	promise
	.then(function (result) {

		if (result<=0) {
			console.log("Iniciando aplicacion por primera vez")
			var firstSuperAdmin = new superAdmin();
			firstSuperAdmin.tipoDocumento = "CC";
			firstSuperAdmin.numeroDocumento  = 000000000;
			firstSuperAdmin.nombreUsuario = "admin";
			firstSuperAdmin.nombres = "Primer";
			firstSuperAdmin.apellidos = "Super Administrador";
			firstSuperAdmin.email = "0000@0000.com";
			firstSuperAdmin.contraseña = crypto.encrypt("12345678");
			firstSuperAdmin.contraseñaValidar = crypto.encrypt("12345678");
			firstSuperAdmin.tipo = "ADMINISTRADOR";
			firstSuperAdmin.estado ="VISTO";
			firstSuperAdmin.superAdmin = true;

			return firstSuperAdmin.save()
		}else{
			console.log("hola de nuevo")
			next();
		}
	})
	.then(function (user) {

			console.log("primer super admin creado");
			console.log("---------------")
			console.log("bienvenido")
			next();
				
			})
	.error(function (err) {
		res.json(err);
	})


}