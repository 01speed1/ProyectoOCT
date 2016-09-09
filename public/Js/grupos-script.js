$().ready(function () {
	
	//lazar Datepicker para fecha de inicio
  	$(".dateGroupStart").pickadate({
  		selectMonths: true,
  		min:true,
  		selectYears: 2 
  	});

  //lanzar datepicker para fecha final

		$(".dateGroupStart").change(function () {
			var fechaDeInicio = $(this).val();

  		var fechaMin = fechaDeInicio.split("-");

  		$(".dateGroupEnd").pickadate({
	  		selectMonths: true,
	  		min:[fechaMin[0],fechaMin[1]-1,fechaMin[2]],
	  		selectYears: 2 
  		});
  		
  		$(".dateGroupEnd").val("");


  		fechaDeInicio = "";

		});

		if ($(".dateGroupStart").val()) {} else {
			$(".dateGroupEnd").click(function () {
		  	swal({
		  		title:"Ups!",
		  		text:"Debes seleccionar primero una fecha de inicio",
		  		type:"error"
		  	});
  		});
		  $(".dateGroupEnd").keyup(function () {
	  		$(this).val("");
	  	})
		}

	//habilitar la edicion del nombre
		var check = $("#activeName");
		var name = $("#nombre");
		check.change(function () {
			if (check.is(":checked")) {
				$("#nombre").prop("disabled", false);
			} else {
				$("#nombre").prop("disabled", true);
			}
		})

	//cambiar el nombre del grupo
		$("#fechaFin,#jornada,#area,#fechaInicio").change(function () {
			var arrayText = [];

			var meses = ['enero','febrero','marzo','abril','mayo','junio','julio',
			               'agosto','septiembre','octubre','noviembre','diciembre'];


			arrayText[0] = $("#area > option:selected").text().split(" ");
			arrayText[1] = $("#jornada").val();
			arrayText[2] = $("#fechaInicio").val().split("-");
			var mesNumero1 = arrayText[2][1]
			arrayText[3] = $("#fechaFin").val().split("-")
			var mesNumero2 = arrayText[3][1];

			function mostrarMes(argument) {
				var mes = meses[parseInt(argument)-1];
				return mes
			}

			if (arrayText[0]==undefined || arrayText[1]==undefined || mostrarMes(mesNumero1)==undefined || mostrarMes(mesNumero2)==undefined) {
				var str = "Clases de "+arrayText[0][0]
			} else {
				var str = "Clases de "+arrayText[0][0]+" por la "+arrayText[1]+" del "+arrayText[2][2]+" de "+mostrarMes(mesNumero1)+" al "+arrayText[3][2]+" de "+mostrarMes(mesNumero2);

				
			}

			$("#nombre").val(str);
			
		})
	
	//validar campos en formulario de grupo 
		var validaciones = {
			rules:{
				jornada:{
					required:true
				},
				area:{
					required:true
				},
				fechaInicio:{
					required:true
				},
				fechaFin:{
					required:true
				},
				horaInicio:{
					required:true
				},
				horaInicioMin:{
					required:true
				},
				DiasDeClase:{
					required:true
				},
				nombre:{
					required:true,
					minlength:2
				},
				limiteEstudiantes:{
					number:true
				}
			},
			messages:{
				jornada:{
					required:"Selecciona una jornada"
				},
				area:{
					required:"Selecciona un area"
				},
				fechaInicio:{
					required:"Debes seleccionar una fecha de inicio"
				},
				fechaFin:{
					required:"debes seleccionar una fecha de finalización"
				},
				horaInicio:{
					required:"Ajusta la hora de incio"
				},
				horaInicioMin:{
					required:"Ajusta la hora de finalizacion"
				},
				DiasDeClase:{
					required:"Debes selecionar almenos 1 dia de clase"
				},
				nombre:{
					required:"Este grupo debe tener un nombre",
					minlength: "El nombre del grupo es demasiado corto"
				},
				limiteEstudiantes:{
					number:"debe ser un numero"
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

	//validar dias de clase 
		$("#nuevo-grupo").submit(function (e) {
			var DiasDeClase = $("#DiasDeClase").val();
			$("#nombre").prop("disabled", false);	
			if (DiasDeClase=="") {
				e.preventDefault();
				$(".errorTxt5").text("Escoge al menos un día de clase").addClass("error");
				swalCancelar("Ups!", "Escoge al menos un día de clase")
			} else{
				MensajeDeEspera("creando", "grupo" );
			}


		})

	//formater para limite de estudiantes
	$("#limiteEstudiantes").numeric();

	// ejecutar validacion en formulario de grupo 
		$('#nuevo-grupo').validate(validaciones);
		

//end jq script grupo-script
});