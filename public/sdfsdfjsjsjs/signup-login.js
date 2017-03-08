$().ready(function () {
	
	//validar campos del nuevo usuario estudiante
		var validaciones = {
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
				numeroDocumento:{
					required:true,
					minlength:7,
					maxlength:10
				},
				tipoDocumento:{
					required:true
				},
				nombreUsuario:{
					required: true,
					minlength: 2,
					maxlength: 300
				},
				email:{
					required: true, 
					email: true
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
				numeroDocumento:{
					required:"Debes ingresar un número de documento.",
					minlength:"Debe ser igual o mayor a 7 digitos."
				},
				tipoDocumento:{
					required:"Requerido"
				},
				nombreUsuario:{
					required: "Debes ingresar un nombre de usuario .",
					minlength: "El  nombre de usuario es demasiado corto.",
					maxlength: "El  nombre de usuario es demasiado largo."
				},
				email:{
					required: "Debes ingresar un correo electrónico.", 
					email: "Esto no parece un correo electrónico."
				},
				contraseña:{
					required:"Debes ingresar una contraseña",
					minlength:"La contraseña es muy corta, debe ser 8 o más caracteres."				
				},
				contraseñaValidar:{
					required:"Debes repetir la contraseña",
					minlength:"La contraseña es muy corta, debe ser 8 o más caracteres.",
					equalTo: "Las contraseñas no coinciden."
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

		$('#nuevo-usuario').validate(validaciones);


	//avisar que el nombre de usuario no existe
		$(".nombreUsuario").change(function () {
			verificar_dato($(this), "/login/validarUsername");
		})

})