//modelo de usuario
var mongoose 	= require("mongoose"),
 	encrypt 	= require('mongoose-encryption'),
 	uniqueValidator = require('mongoose-unique-validator'),
 	config 		= require("../../config/config.js"),
 	moment 		=require("moment");

 	moment().locale("es");

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
		enum: 		["Administrador", "Profesor", "Estudiante", "Usuario"],
		default: 	"Usuario"
	},
	imageAvatar: {
		type: String,
		default: "http://res.cloudinary.com/dcdrggs9p/image/upload/v1459184609/default-img-profile_nq0je2.png"
	},
	userName:{
		type: String,
		unique: true
	},
	firstName:{
		type: String,
		maxlength: 25
	},
	secondName:{
		type: String,
		maxlength: 25
	},
	lastName:{
		type: String,
		maxlength: 25
	},
	mail:{
		type: String,
		unique: true
	},
	born:{
		type: Date,
		get: function (formated) {
			return moment(formated).format();
			
		}
	},
	gender:{
		type: String,
		enum:["M", "F"]
	},
	creation: { 
		type: Date, 
		default: Date.now
	},
	isUpdate:{
		type: Boolean,
		default: false
	}
});

//virtuales 
userSchema.virtual("password_confirmation")
	.get(function () {
		return this.cnfirmation;		
	})
	.set(function (password) {
		this.cnfirmation = password;
	});

userSchema.virtual("full_name")
	.get(function () {
		return this.firstName+' '+this.secondName+' '+this.lastName;
	});

userSchema.virtual("edad")
	.get(function () {
		return moment(this.born).fromNow(true);
	})
userSchema.virtual("my_born")
	.get(function () {
		return moment(this.born).format("DD-MM-YYYY");
	})


//plugins
userSchema.plugin(uniqueValidator, {message: "Este documento ya esta registrado"}); //cambia el mensaje de unique error

	 
userSchema.plugin(encrypt, { //encryptacion
	
	secret: config.secret, 
	encryptedFields: ['password']});

//export el schema como modelo
module.exports = mongoose.model('User', userSchema);