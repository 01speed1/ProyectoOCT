$().ready(function () {
	
	var nombreUsuario = $("#nomuserval").text()

	var validaciones1 = {
			rules:{
				nombres:{
					required: true,
					minlength: 2,
					maxlength: 200
				},
				apellidos:{
					required: true,
					minlength: 2,
					maxlength: 200
				},
				nombreUsuario:{
					required: true,
					minlength: 2,
					maxlength: 300
				},
				numeroDocumento:{
					required:true,
					minlength:7,
					maxlength:10
				},
				tipoDocumento:{
					required:true
				},
				email:{
					required: true, 
					email: true
				}
			},
			messages:{
				nombres:{
					required: "Debes ingresar tu nombre",
					minlength: "El nombre es demasiado corto.",
					maxlength: "El nombre es demasiado largo."
				},
				apellidos:{
					required: "Debes ingresar tus apellidos",
					minlength: "El apellido es demasiado corto.",
					maxlength: "El apellido es demasiado largo."
				},
				nombreUsuario:{
					required: "Debes ingresar un nombre de usuario .",
					minlength: "El  nombre de usuario es demasiado corto.",
					maxlength: "El  nombre de usuario es demasiado largo."
				},
				numeroDocumento:{
					required:"Debes ingresar un número de documento.",
					minlength:"Debe ser igual o mayor a 7 digitos."
				},
				tipoDocumento:{
					required:"Requerido"
				},
				email:{
					required: "Debes ingresar un correo electrónico.", 
					email: "Esto no parece un correo electrónico."
				}
			},
			errorElement : 'div',
			errorPlacement: function(error, element) {
	      var placement = $(element).data('error');
	      if (placement) {
	        $(placement).append(error)
	      } else {
	        error.insertAfter(element);
	      }
	    }	
	}

	var validacionesAvatar={
		rules:{
			avatar:{
				required:true
			}
		},
		messages:{
			avatar:{
				required: "Debes seleccionar una imagen"
			}
		},
		errorElement : 'div',
		errorPlacement: function(error, element) {
      var placement = $(element).data('error');
      if (placement) {
        $(placement).append(error)
      } else {
        error.insertAfter(element);
      }
    }	
	}

	var validarContraseña={
		rules:{
			oldContraseña:{
				required:true,
				minlength:8
			},
			contraseña:{
				required:true,
				minlength:8
			},
			contraseñaValidar:{
				required:true,
				minlength:8,
				equalTo: "#contraseña"
			}
		},
		messages:{
			oldContraseña:{
				required:"Debes escribir tu vieja contraseña",
				minlength:"La contraseña debe tener minimo 8 digitos"
			},
			contraseña:{
				required:"Debes escribir tu nueva contraseña",
				minlength:"La contraseña debe tener minimo 8 digitos"
			},
			contraseñaValidar:{
				required:"Debes escribir tu nueva contraseña otra vez",
				minlength:"La contraseña debe tener minimo 8 digitos",
				equalTo: "No coincide con tu nueva contraseña"
			}
		},
		errorElement : 'div',
		errorPlacement: function(error, element) {
      var placement = $(element).data('error');
      if (placement) {
        $(placement).append(error)
      } else {
        error.insertAfter(element);
      }
    }
	}

	$('.editarPerfil').validate(validaciones1);
	$('#avatar-form').validate(validacionesAvatar);
	$('#passform').validate(validarContraseña);
	

	//validar si el numero de usuario ya existe
		$('input#numeroDocumento').change(function () {
			verificar_dato2($(this),"/usuario/"+nombreUsuario+"/validar/cc")
		});
	//validar si email ya existe
		$('input#email').change(function () {
			verificar_dato2($(this),"/usuario/"+nombreUsuario+"/validar/email")
		});
	//validar si nombre de usuario ya existe
		$('input#nombreUsuario').change(function () {
			verificar_dato2($(this),"/usuario/"+nombreUsuario+"/validar/nombreUsuario")
		});

	//mensaje de espera para carga de imagen de perfil
		$("#avatar-form").submit(function (e) {
			//e.preventDefault()
			MensajeDeEspera("cargando", "su foto de perfil");
			

		})

	 


})