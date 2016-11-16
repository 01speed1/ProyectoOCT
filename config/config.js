var path = require('path'), //llama el modulo path para establecer rutas
	rootPath = path.normalize(__dirname + '/..'); //establece la ruta raiz

module.exports = config = { 
	root: 	rootPath, 
	hostname: "hostname temporal",
	app: 	{name: "Proyecto_OCT"},
	port: 	process.env.PORT || 8080,
	secret: "YourSecretIsMySecret",
	db: 	"mongodb://localhost/OCT_DB",
	//online_db: "mongodb://01speed1:speed13speed13@ds147377.mlab.com:47377/oct_db",
	algorithm: 'aes-256-ctr',
	cryptoPass: "your_secret_is_my_secret"
}