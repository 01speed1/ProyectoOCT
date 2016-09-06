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

			alert($(this).val());

			var meses = ['enero','febrero','marzo','abril','mayo','junio','julio',
			               'agosto','septiembre','octubre','noviembre','diciembre'];


			arrayText[0] = $("#area").text().split(" ");
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
		
 

  	

//end jq script grupo-script
});