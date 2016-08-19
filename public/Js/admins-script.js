$().ready(function () {

	//Quitar espacion antes y despues
	var quitar_espacios = function () {
			var nval = $.trim($(this).val());
			$(this).val(nval);
	};

	//la primera mayuscula 
	var primera_mayuscula =  function () {
			var value =$(this).val().split(' ');
			p_palabra = value[0].charAt(0).toUpperCase()+value[0].slice(1);
			
			if (value[1]!=undefined) {
				s_palabra = value[1].charAt(0).toUpperCase()+value[1].slice(1);
				$(this).val(p_palabra+" "+s_palabra);
			} else{
				$(this).val(p_palabra);
			}
	};

	//nombre de usuario aleatorio
		var auto_username = function () {
			if ($('#nombres .autoUsername').val() !=""){
				var nom = $('#nombres').val().split(" ");
				var ape = $('#apellidos').val().split(" ");
				var ran = Math.floor(Math.random()*11);
				var nomaperan = nom[0]+"."+ape[0]+ran;
				$('#nombreUsuario').val(nomaperan);
			}			
	};

	//impedir que uno click active todas los demas elementos 
	//mostras mas contenido del adminsitrador
	$(".elemento").click(function () {
		var thiss = $(this);
		if (thiss.find(".mas-info").length){
			var son =  thiss.find(".mas-info");
			son.toggle("fast");
		}
	});


	//validar campos del nuevo administrador
	var validaciones = {
		ignore:"#fechaNacimiento",
		rules:{
			tipoDocumento:{
				required:true
			},
			numeroDocumento:{
				required:true,
				minlength:7
			},
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
			telefono:{
				minlength:5
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
			},
			genero:"required"
		},
		messages:{
			tipoDocumento:{
				required:"Requerido"
			},
			numeroDocumento:{
				required:"Debes ingresar un número de documento.",
				minlength:"Debe ser igual o mayor a 7 digitos."
			},
			nombres:{
				required: "Debes ingresar el o los nombres de nuevo administrador.",
				minlength: "El nombre es demasiado corto.",
				maxlength: "El nombre es demasiado largo."
			},
			apellidos:{
				required: "Debes ingresar el o los apellido del nuevo administrador.",
				minlength: "El apellido es demasiado corto.",
				maxlength: "El apellido es demasiado largo."
			},
			nombreUsuario:{
				required: "Debes ingresar un nombre de usuario para el administrador.",
				minlength: "El  nombre de usuario es demasiado corto.",
				maxlength: "El  nombre de usuario es demasiado largo."
			},
			telefono:{
				minlength: "Parece que al teléfono le faltan digitos."
			},
			email:{
				required: "Debes ingresar el correo electrónico del administrador.", 
				email: "Esto no parece un correo electrónico."
			},
			contraseña:{
				required:"Debes ingresar una contraseña",
				minlength:"La contraseña es muy corta, debe de 8 o más caracteres."
			},
			contraseñaValidar:{
				required:"Debes repetir la contraseña",
				minlength:"La contraseña es muy corta, debe de 8 o más caracteres.",
				equalTo: "Las contraseñas no coinciden."
			},
			genero:"Debes seleccionar un género."
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

	//validacion del formulario del nuevo admin
	$('#nuevo-admin').validate(validaciones);
	//validacion del formulario para editar
	$('#modi-admin').validate(validaciones);

	//formatear campos antes de enviar
		$('#numeroDocumento').formatter({
			pattern :"{{9999999999}}",
			persistent:true
		});

		$('#telefono').formatter({
			pattern :"{{9999999999}}",
			persistent:true
		});

	$('input').change(quitar_espacios);

	$('#nombres').keyup(primera_mayuscula);
	$('#apellidos').keyup(primera_mayuscula);

	$('#nombres.autoUsername').keyup(auto_username);
	$('#apellidos.autoUsername').keyup(auto_username);

//End script
});