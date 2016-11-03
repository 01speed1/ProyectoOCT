var cloudinary = require("cloudinary");


module.exports.cargarAvatar = function (sol, res, next) {

	var avatar = sol.body.avatar;
	
	if (avatar.size > 0) {
		cloudinary.uploader.upload(avatar.path, function (result) {

			res.locals.nuevoAvatar = {
				url: result.url,
				id:result.public_id
			}
			next();
		},
		{
		transformation: [
			{width: 400, height: 400, gravity: "auto" , crop: "thumb"},
			{width: 200}
		]})
	}

	//
}

module.exports.borrarAvatar = function (sol, res) {
		console.log("se borrara el antiguo avatar")
		var oldAvatar = res.locals.oldAvatarId
		console.log(oldAvatar);
		if (oldAvatar!="default-img-profile_crowfz") {

			cloudinary.uploader.destroy(oldAvatar, function (result) {
				console.log(result)

				sol.session.regenerate(function (err) {
				if (!err) {
					sol.session.usuario_id = res.locals.user.id
					sol.session.user = res.locals.user
					sol.flash("toast", "Imagen de perfil actualizada");
					res.redirect("/usuario/"+res.locals.nombreUsuario)
				}
			})

				
			})
		}
}

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
			console.log("se borrara un background..");
			if (res.locals.bid!="default_image") {
				cloudinary.uploader.destroy(res.locals.bid, function (result) {
					console.log("se borro la imagen anterior?");
					console.log(result);
					sol.flash("toast", res.locals.msToast)
					if (res.locals.send) {
						console.log("se detecto send: "+res.locals.send)
						res.send(res.locals.send);
					}
					if (res.locals.redirect) {
						console.log("se detecto redirect: "+res.locals.redirect)
						res.redirect(res.locals.redirect);
					}	
				})
			} else {
				sol.flash("toast", res.locals.msToast);
				if (res.locals.send) {
					console.log("se detecto send: "+res.locals.send)
					res.send(res.locals.send);
				}
				if (res.locals.redirect) {
					console.log("se detecto redirect: "+res.locals.redirect)
					res.redirect(res.locals.redirect);
				}
			}
		} else {
			sol.flash("toast", res.locals.msToast)
			if (res.locals.send) {
				console.log("se detecto send: "+res.locals.send)
				res.send(res.locals.send);
			}
			if (res.locals.redirect) {
				console.log("se detecto redirect: "+res.locals.redirect)
				res.redirect(res.locals.redirect);
			}
}
}


