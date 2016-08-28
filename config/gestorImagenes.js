
var cloudinary = require("cloudinary");


var cargar = module.exports.cargarBackground = function (sol, res, next) {
	if (sol.body.background.size > 0) {
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