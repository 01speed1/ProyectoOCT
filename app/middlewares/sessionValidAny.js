var User = require("../models/user");

module.exports = function (sol, res, next) {
	if (!sol.session.userId) {
		console.log("un usuario intento acceder a privado");
		res.render("me/login",{
			message: "Debes iniciar sesion para acceder a esta pagina"
		}) 
	}else{
		User.findById(sol.session.userId, function (err, user) {
			if (!err) {
				res.locals = {
					user: user
				}
			next();
			} else {
				res.render("me/login", { message: "Debes iniciar sesion para acceder a esta pagina"});
			}

			
		})
		
	}
}