//sweetalerts

	//espere
	var MensajeDeEspera = function (procesoTexto, tipoUsuario) {
		swal({
			title: "Por favor Espere",
			text: "Se esta "+procesoTexto+" "+tipoUsuario,
			type:"info",
			closeOnConfirm: false,
			allowEscapeKey:false,
			showConfirmButton: false
		})
	}

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

	//mensaje prevenir borrar ""solo copy"" no funcional
		/*var prevenirBorrar = function (event) {
			event.preventDefault();
			var tipoUsuario = $("div.tipoUsuario.hide").text();
			var hrefDelete = $(this).parent().attr("action");

			var args = {
				tipoUsuario:tipoUsuario,
				hrefDelete:hrefDelete
			}
			preguntarAntesDeBorrar(args);
		}*/

	//funciones 2.0 prevenir borrar
		var preguntarAntesDeBorrar = function (argumentos) {

				var config = {}

				/*args={
					tipoUsuario:tipoUsuario,
					hrefDelete: hrefDelete
				}*/

				if (argumentos) {
					$.extend(config,argumentos)
				}
				else {
					console.log("No se configuraron argumentos");
				}

				//ejecutar primer swal
				swal({
					title:"¿Seguro que quieres borrar este registro de tipo: "+config.tipoUsuario+"?",
					text:"Este registro se perdera permanentemente.",
					type:"warning",
					showCancelButton: true,
					cancelButtonText: "NO! aún no",
					confirmButtonText: "Si!, borralo!",
					confirmButtonColor:"#f44336",
				  closeOnConfirm: false,
				  closeOnCancel: true
				},
				function (isConfirm) {
					if (isConfirm) {
						redireccionarPOST(config.hrefDelete);
					}

				})
			}

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
					console.log(res);
					//window.location.assign(res);
				}
			}).fail(function () {
				alert("WTF")
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

		var primera_mayuscula_2 =  function () {
				var value =$(this).val().split(' ');
				var finalText = "";
				var aux = "";
				for (var i = 0; i < value.length; i++) {
					var palabra = value[i].charAt(0).toUpperCase()+value[i].slice(1);
					if (value[i]!=undefined) {
						if (value.length===0) {
							finalText = palabra
						}
						else{
							aux = finalText+" "+palabra
							finalText = $.trim(aux)}
					}

				}
				$(this).val(finalText);
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

	//Generar colores aleatorios
		function aleatorio(inferior,superior){
	   numPosibilidades = superior - inferior
	   aleat = Math.random() * numPosibilidades
	   aleat = Math.floor(aleat)
	   return parseInt(inferior) + aleat
		}

		function dame_color_aleatorio(){
	   hexadecimal = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F")
	   color_aleatorio = "#";
	   for (i=0;i<6;i++){
	      posarray = aleatorio(0,hexadecimal.length)
	      color_aleatorio += hexadecimal[posarray]
	   }
	   return color_aleatorio
		}

		//genera un array de colores aleatorios
			function arrayColoresRandom(campos) {
				var array = [];
				for (var i = 0; i < campos; i++) {
					var color = dame_color_aleatorio();
					array.push(color);
				}
				return array
			}
