//modelo de usuario
var mongoose 	= require("mongoose"),
 	encrypt 	= require('mongoose-encryption'),
 	uniqueValidator = require('mongoose-unique-validator'),
 	config 		= require("../../config/config.js");

//validaciones
var passValidator = {
	validator: function (pass)  {
		return this.password_confirmation == pass
		}, message : "Las contraseñas no coinciden"
	};

//definir el schema principal
var	userSchema = mongoose.Schema({
	idDocument: {
		type: 		Number, 
		require: 	"Es obligatorio agregar tu numero de documento", 
		min: 		[1000000, "No es un numero de documento valido"],
		max: 		[2000000000, "No es un numero de documento valido"],
		unique: 	true}, 
	password: {
		type: 		String,
		require: 	"Es obligatorio establecer una constraseña", 
		minlength: 	[8, "Tu contraseña debe ser mayor a 8 caracteres"],
		maxlength: 	[50, "La contraseña debe ser menor a 50 caracteres"], 
		validate: 	passValidator},
	typeUser: 	{
		type: 		String,
		enum: 		["Admin", "Teacher", "Student", "User"],
		default: 	"User"
	},
	creation: { type: Date, default: Date.now}
});

//virtuales 
userSchema.virtual("password_confirmation")
	.get(function () {
		return this.cnfirmation;		
	})
	.set(function (password) {
		this.cnfirmation = password;
	});


//plugins
userSchema.plugin(uniqueValidator, {message: "Este documento ya esta registrado"}); //cambia el mensaje de unique error

	 
userSchema.plugin(encrypt, { //encryptacion
	
	secret: config.secret, 
	encryptedFields: ['password']});

//export el schema como modelo
module.exports = mongoose.model('User', userSchema);