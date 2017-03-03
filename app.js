"use strict";
const express = require('express'); 
const config = require('./config/config.js'); 

const app = express();

//require('./config/express.js')(app, express, config)
const locals = {}

app.get("/", (sol, res)=>{
	locals.title = "Titulo";
	res.send("Hi bitches")
	//res.render('Home/index.jade', locals)
})

app.listen(config.port, ()=>{
	console.log("Run on: "+config.port)
})