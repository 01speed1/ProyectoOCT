"use strict";
const express = require('express'); 
const config = require('./config/config.js'); 

const app = express();

require('./config/express.js')(app, express, config)
const locals = {}

app.get("/", (sol, res)=>{
	locals.title = "Bienvenido";

	res.render('home/index.jade', locals)
})