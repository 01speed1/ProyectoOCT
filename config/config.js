var path = require('path'), //llama el modulo path para establecer rutas
	rootPath = path.normalize(__dirname + '/..'); //establece la ruta raiz

module.exports = config = { 
	root: 	rootPath, 
	hostname: "",
	app: 	{name: "Proyecto_OCT"},
	port: 	process.env.PORT || 8080,
	secret: "YourSecretIsMySecret",
	db: 	"mongodb://localhost/OCT_DB",
	algorithm: 'aes-256-ctr',
	cryptoPass: "your_secret_is_my_secret",
	secret: "why_so_serius"
}