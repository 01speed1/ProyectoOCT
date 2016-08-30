$().ready(function () {

// secuencia para desplegar el mesaje de borrado en admis y profesores
		var swalPreguntar3 = function () {
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
				swalResponder3
			);
		};

		var swalResponder3 = function (isConfirm) {
			if (isConfirm) {
				var title = "¡Eliminado!"
				var text = "Se ha eliminado un registro de tipo: "+tipoUsuario+" exitosamente";
				swalConfirmar3(title, text, hrefDelete);
				
			}else{
				var title = "¡Cancelaste!"
				var text = "Un registro de tipo: "+tipoUsuario+" esta a salvo";
				swalCancelar3(title, text);		
			}		
		};

	 	var swalConfirmar3 = function (title, text, hrefDelete) {
			swal({
				title: title,
				text: text,
				type: "success",
				closeOnConfirm: false
			},redireccionarPOST3(hrefDelete));
			
		};

		var swalCancelar3 = function (title, text) {
			swal({
				title: title,
				text: text,
				type: "error"
			})
		};

		var redireccionarPOST3 = function (url) {
			$.post({
				url:url,
				success: function (res) {
					window.location.assign(res);
				}
			})
		};
		
			
		var tipoUsuario = $("div.tipoUsuario.hide").text();
		var hrefDelete = $("form.btn-borrar").attr("action");

		$(".borrarEscuela").click(function (event) {
			event.preventDefault();
			swalPreguntar3(tipoUsuario,hrefDelete);
		});


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
		keyup: primera_mayuscula
	});
	/*$("#descripcion").on({
		change:quitar_espacios
	});*/

//previsualizar background	
	$("#background").change(function(){
	 mostrarImagen($("#background"), $('#imagenDestino'));
	 //alert(this.value);
 	//document.imagenDestino.src='file:///'+this.value;
	});




//end code
});

