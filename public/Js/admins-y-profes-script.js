$().ready(function () {

//sweetalerts
	//confirmar
 	var swalConfirmar = function (title, text) {
		swal({
			title: title,
			text: text,
			type: "success",
			 closeOnConfirm: false
		},redireccionarPOST(hrefDelete));
		
	};

	//cancelar
	var swalCancelar = function (title, text) {
		swal({
			title: title,
			text: text,
			type: "error"
		})
	};

	//swal responder
	var swalResponder = function (isConfirm) {
		if (isConfirm) {
			var title = tipoUsuario+" eliminado!"
			var text = "El "+tipoUsuario+" ya no existe"
			swalConfirmar(title, text);
			
		}else{
			var title = "¡cancelaste!"
			var text = "El "+tipoUsuario+" esta a salvo"
			swalCancelar(title, text);		
		}		
	};

	var swalPreguntar = function () {
		swal({
			title:"¿Seguro que quieres borrar este "+tipoUsuario+"?",
			text:"Este "+tipoUsuario+" se perdera permanentemente.",
			type:"warning",
			showCancelButton: true,
			cancelButtonText: "Olvidalo",
			confirmButtonText: "Si!, borralo!",
			confirmButtonColor:"#f44336",
		  closeOnConfirm: false,
		  closeOnCancel: false
		},
			swalResponder
		);
	}
	
//funciones
	//verificar si un valor unico ya esta registrado
	var verificar_dato = function (elemento, url) {
			var data = {value:elemento.val()};
			$.post(url,data,function (res) {
				if(res){
					swalCancelar("Ups!", res);
				elemento.val("");
				}
			});
		}
	//redireccionar a la url que se pase por parametro
	var redireccionarPOST = function (url) {
		$.post({
			url:url,
			success: function (res) {
				window.location.assign(res);
			}
		})
	};
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

//data de validacion
	//validar campos del nuevo administrador
	var validaciones = {
		rules:{
			tipoDocumento:{
				required:true
			},
			numeroDocumento:{
				required:true,
				minlength:7,
				maxlength:10
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
				minlength:5,
				maxlength:10
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
			fechaNacimiento:{
				required:true
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
			fechaNacimiento:{
				required:  "La fecha de nacimiento es obligatoria."
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

//ejecutar fuciones
	//validacion del formulario del nuevo admin
		$('#nuevo-admin').validate(validaciones);
	//validacion del formulario para editar
		$('#modi-admin').validate(validaciones);
		
	//aplicar funciones
		$('input').change(quitar_espacios);

		$('#nombres').keyup(primera_mayuscula);
		$('#apellidos').keyup(primera_mayuscula);

		//$('#nombres.autoUsername').keyup(auto_username);
		//$('#apellidos.autoUsername').keyup(auto_username);
		$('.autoUsername').keyup(auto_username);

	// despliega mensaje antes de borrar 
		var tipoUsuario = $("div.tipoUsuario.hide").text();
		var hrefDelete = $("form.btn-borrar").attr("action");
		$(".prevenirBorarr").click(function (event) {
			event.preventDefault();
			swalPreguntar();
		});

	//validar si el numero de usuario ya existe
		$('input#numeroDocumento').change(function () {
			verificar_dato($(this),"/admin/administradores/validarCc")
		});

		$('input#email').change(function () {
		verificar_dato($(this),"/admin/administradores/validarEmail")
	});

	//impide que se ingresen mas de 10 caracteres al input
		$(".formater").keyup(function () {
			$(this).numeric();
			if ($(this).val().length > 10) {
				$(this).val($(this).val().substr(0,10));
			}
		})


	//lanzar toast
		var msn = $("div.toast").text();
		if (msn){
			Materialize.toast(msn, 4000);
		}

//End script
});