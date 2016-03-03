var path = require('path'), //llama el modulo path para establecer rutas
	rootPath = path.normalize(__dirname + '/..'); //establece la ruta raiz

module.exports = config = { 
	root: rootPath, 
	app:{name: "Proyecto OCT"},
	port: 8080,
	db: "mongodb://localhost/OCT_DB2"
}