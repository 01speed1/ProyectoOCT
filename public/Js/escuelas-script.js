$().ready(function () {

// desplegar el mesaje de borrado de escuela
	$(".borrarEscuela").click(function (event) {
			event.preventDefault();
			var tipoUsuario = $("div.tipoUsuario.hide").text();
			var hrefDelete = $(this).parent().attr("action");

			var args = {
				tipoUsuario:tipoUsuario,
				hrefDelete:hrefDelete
			}
			preguntarAntesDeBorrar(args);
		});

//deplegar mensaje espera creando y actualizando escuela
	/*$(".creando").click(function () {
		MensajeDeEspera("creando", "escuela" );
		
	})*/

	$(".modificando").click(function () {
		var tipoUsuario = $("div.tipoUsuario.hide").text();
		MensajeDeEspera("modificando", "escuela");
	})


//validar campos del nuevo administrador
	var validaciones = {
		rules:{
			nombre:{
				required:true,
				maxlength:50
			},
			descripcion:{
				required:true,
				minlength:2,
				maxlength:250
			}
		},
		messages:{
			nombre:{
				required:"Requerido",
				maxlength:"El nombre es demasiado largo :O"
			},
			descripcion:{
				required:"Debes ingresar una descripción.",
				minlength:"Descripción demasiado corta."
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
	};
	$("form#nueva-escuela").validate(validaciones);

//aplicar trim, validar nombre y primera mayuscula
	$("#nombre").on({
		change:quitar_espacios,
		change:function () {
			var url = "/admin/escuelas/validarNombre";
			verificar_dato($("#nombre"),url);
		},
		change: primera_mayuscula_2
	});

	$("#descripcion").on({
		change:quitar_espacios
	});




//end code
});

