$(document).ready(function () {

// secuencia para desplegar el mesaje de borrado en admis y profesores
		var swalPreguntar2 = function () {
			swal({
				title:"¿Seguro que quieres borrar este registro de tipo: "+tipoUsuario+"?",
				text:"Este registro se perdera permanentemente y no se podra recuperar.",
				type:"warning",
				showCancelButton: true,
				cancelButtonText: "NO! aún no",
				confirmButtonText: "Si!, borralo!",
				confirmButtonColor:"#f44336",
			  closeOnConfirm: false,
			  closeOnCancel: false
			},
				swalResponder2
			);
		};

		var swalResponder2 = function (isConfirm) {
			if (isConfirm) {
				var title = "¡Eliminado!"
				var text = "Se ha eliminado un registro de tipo: "+tipoUsuario+" exitosamente";
				swalConfirmar2(title, text, hrefDelete);
				
			}else{
				var title = "¡Cancelaste!"
				var text = "Un registro de tipo: "+tipoUsuario+" esta a salvo";
				swalCancelar2(title, text);		
			}		
		};

	 	var swalConfirmar2 = function (title, text, hrefDelete) {
			swal({
				title: title,
				text: text,
				type: "success",
				closeOnConfirm: false
			},redireccionarPOST2(hrefDelete));
			
		};

		var swalCancelar2 = function (title, text) {
			swal({
				title: title,
				text: text,
				type: "error"
			})
		};

		var redireccionarPOST2 = function (url) {
			$.post({
				url:url,
				success: function (res) {
					window.location.assign(res);
				}
			})
		};
		
			
		var tipoUsuario = $("div.tipoUsuario.hide").text();
		var hrefDelete = $("form.btn-borrar").attr("action");

		$(".prevenirBorarr").click(function (event) {
			event.preventDefault();
			swalPreguntar2(tipoUsuario,hrefDelete);
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
		//hacer trim a todos los input
			$('input').change(quitar_espacios);

		//primera en mayusculas
			$('#nombres').keyup(primera_mayuscula);
			$('#apellidos').keyup(primera_mayuscula);

		//autousername
			$('.autoUsername').keyup(auto_username);

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