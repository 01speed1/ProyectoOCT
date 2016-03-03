module.exports =function (app) {

	//este route/cotroller esta definido para el CRUD de usuarios

	app.get("/", function (sol, res) {
		res.json({mensaje:"Hola mundo"});
	});
}