var express = require("express");
var router = express.Router();

module.exports = function (app) {

	router.route("/")
		.get((sol, res)=>{
		res.send("hi test");
	})


	app.use("/test", router);
}


///borrar lo mas pronto posible
