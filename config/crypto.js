<<<<<<< HEAD
//middleware para encriptar cadenas de texto

var config = require('./config');

var crypto = require('crypto'),
    algorithm = config.algorithm,
	password = config.cryptoPass;

var encrypt = module.exports.encrypt = function (text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

var decrypt = module.exports.decrypt = function (text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
=======
//middleware para encriptar cadenas de texto

var config = require('./config');

var crypto = require('crypto'),
    algorithm = config.algorithm,
	password = config.cryptoPass;

var encrypt = module.exports.encrypt = function (text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

var decrypt = module.exports.decrypt = function (text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
>>>>>>> 61e6907ab66902c521df8d20bf4a0ef28a1873df
}