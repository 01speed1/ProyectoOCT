var Admin 	= require("../models/user.js");

module.exports = function (sol, res, next) {
	if (!sol.session.adminId) {
		console.log("un usuario intento acceder a privado");
		res.render("admin/login",{
			massage: "Debes iniciar sesion para acceder a esta pagina"
		}) 
	}else{
		Admin.findById(sol.session.adminId, function (err, admin) {
			if (!err) {
				res.locals = {
					user: admin
				}
			next();
			} else {
				res.render("admin/login", { message: "Debes iniciar sesion para acceder a esta pagina"});
			}

			
		})
		
	}
}