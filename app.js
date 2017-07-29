"use strict";
const express = require('express'); 
const config = require('./config/config.js'); 

const app = express();

require('./config/express.js')(app, express, config)
const locals = {}

app.get("/", (sol, res)=>{
	locals.title = "Bienvenido";

	if (sol.session.usuario_id) {
		locals.user = sol.session.user
	} else {locals.user = null}

	res.render('home/index.jade', locals)
})