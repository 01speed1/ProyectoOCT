var multer = require('multer');

// Multer Storage para mantener la extenteción del archivo.
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Public/Img'); // Directirio donde se guardaran los archivos.
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+'.jpg');
  }
})

var upload = multer({ storage: storage });

module.exports = upload;