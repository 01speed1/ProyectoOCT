var path = require('path'), //llama el modulo path para establecer rutas
	rootPath = path.normalize(__dirname + '/..'); //establece la ruta raiz

module.exports = config = { 
	root: 	rootPath, 
	app: 	{name: "Proyecto OCT"},
	port: 	8080,
	secret: "YourSecretIsMySecret",
	db: 	"mongodb://localhost/OCT_DB2",
	encKey: "-OvW9dukswOEMDzpg4q6WZ35D5gINUBuEMgHnYz8WTL8=",
	sigkey: "-+2I4OUdWMy6T5i6SAHVfCLuLT1z5y+rPzRoKrs2iVJPnCQrjs875DRZ6JuHPavH/2MXE+5e9t3uDeK3smrsWqQ=="  
}