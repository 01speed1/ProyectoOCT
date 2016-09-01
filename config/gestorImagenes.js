
var cloudinary = require("cloudinary");


module.exports.cargarNuevoBackground = function (sol, res, next) {

	if (sol.body.background.size > 0) {
		console.log("se cargara un background");
		var imagen = sol.body.background;

		var x = cloudinary.uploader.upload(imagen.path, function (result) {
			var cloudinary = {
				url: result.url,
				id : result.public_id
			}
			res.locals.cloudinary = cloudinary;
			next();
	},
	{ 
		width: 945, 
		height: 330, 
		crop: "limit" });
	} else {
		console.log("no se cargo background en esta peticion");
		next();
	}	
}

module.exports.borrarBackground = function (sol, res) {
		if (res.locals.bid) {
			console.log("se borrara un background");
			if (res.locals.bid!="default_image") {
				cloudinary.uploader.destroy(res.locals.bid, function (result) {
					console.log("se borro la imagen anterior?");
					console.log(result);
					sol.flash("toast", res.locals.msToast)
					if (res.locals.send) {
						res.send(res.locals.send);
					}
					if (res.locals.redirect) {
						res.redirect(res.locals.redirect);
					}
					
				})
			} 
			if (res.locals.bid=="default_image") {
				sol.flash("toast", res.locals.msToast);
				if (res.locals.send) {
						res.send(res.locals.send);
				}
				if (res.locals.redirect) {
					res.redirect(res.locals.redirect);
				}
			}
		} 
}


