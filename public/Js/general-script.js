//sweetalerts
	//confirmar
	 	var swalConfirmar = function (title, text, hrefDelete) {
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
				var title = "¡Eliminado!"
				var text = "Se ha eliminado un registro de tipo: "+tipoUsuario+" exitosamente";
				swalConfirmar(title, text, hrefDelete);
				
			}else{
				var title = "¡Cancelaste!"
				var text = "Un registro de tipo: "+tipoUsuario+" esta a salvo";
				swalCancelar(title, text);		
			}		
		};

	//swal preguntar
		var swalPreguntar = function (tipoUsuario, hrefDelete) {
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
				swalResponder
			);
		}
	
//funciones

	// DEPRESED previsualizar imagenes
		/*var mostrarImagen =  function (input, destino) {
		 if (input.files && input.files[0]) {
		  var reader = new FileReader();
		  reader.onload = function (e) {
		   destino.attr('src', e.target.result);
		  }
		  reader.readAsDataURL(input.files[0]);
		 }
		}*/

	//verificar si un valor unico ya esta registrado
		var verificar_dato = function (selector, url) {
				var data = {value:selector.val()};
				$.post(url,data,function (res) {
					if(res){
						swalCancelar("Ups!", res);
					selector.val("");
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
			if ($(this).val()!=""){
					var nom = $('#nombres').val().split(" ");
					var ape = $('#apellidos').val().split(" ");
					var ran = Math.floor(Math.random()*11);
					var nomaperan = nom[0]+"."+ape[0]+ran;
					$('#nombreUsuario').val(nomaperan);
				}				
		};

	//impedir que uno click active todas los demas elementos, mostras mas contenido del adminsitrador
		$(".elemento").click(function () {
			var thiss = $(this);
			if (thiss.find(".mas-info").length){
				var son =  thiss.find(".mas-info");
				son.toggle("fast");
			}
		});
