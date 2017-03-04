//js panel admin
$().ready(function () {

	var optionsChart = {	
				legend:{
					display:false
				},
				tooltips:{
					enabled:true
				},
				elements:{
					arc:{
						borderWidth:3
					}	
				},
				cutoutPercentage:70
			}
	
	//establecer el chart de adminsitradores
		var ctxAdmin =  $("#AdminsChrt");
		dataChartAdmin = {
			type:"doughnut",
			data: {
				labels:["Viejos","Nuevos", "Otros usuarios"],
				datasets:[{
					data:[ctxAdmin.attr("numOldAdmins"),ctxAdmin.attr("numNewAdmins"),ctxAdmin.attr("noAdmins")],
					backgroundColor:["#00bcd4", "#80deea", "#e0f7fa"]
				}]

			},
			options:optionsChart

		}

		var adminChart = new Chart(ctxAdmin, dataChartAdmin)

	//establecer el chart de profesores
		var ctxProfe =  $("#ProfesChrt");
		dataChartProfe = {
			type:"doughnut",
			data: {
				labels:["Viejos","Nuevos", "Otros usuarios"],
				datasets:[{
					data:[ctxProfe.attr("numOldProfes"),ctxProfe.attr("numNewProfes"),ctxProfe.attr("noProfes")],
					backgroundColor:["#009688", "#4db6ac", "#e0f2f1"]
				}]

			},
			options: optionsChart

		}

		var adminChart = new Chart(ctxProfe, dataChartProfe)

	//establecer el chart de estudiantes
		var ctxProfe =  $("#EstudiantesChrt");
		dataChartProfe = {
			type:"doughnut",
			data: {
				labels:["Viejos","Nuevos", "Otros usuarios"],
				datasets:[{
					data:[ctxProfe.attr("numOldEstudiantes"),ctxProfe.attr("numNewEstudiantes"),ctxProfe.attr("noEstudiantes")],
					backgroundColor:["#5c6bc0", "#9fa8da ", "#e8eaf6"]
				}]

			},
			options: optionsChart

		}

		var adminChart = new Chart(ctxProfe, dataChartProfe)


	//establecer el chart de escuelas 
		var ctxEscuela =  $("#EscuelaChrt");
		dataChartEscuela = {
			type:"doughnut",
			data: {
				labels:["Viejas","Nuevas"],
				datasets:[{
					data:[ctxEscuela.attr("numOldEscuelas"),ctxEscuela.attr("numNewEscuelas")],
					backgroundColor:["#673ab7", "#9575cd"]
				}]

			},
			options: optionsChart

		}

		var adminChart = new Chart(ctxEscuela, dataChartEscuela)

	//establecer el chart de areas 
		var ctxArea =  $("#AreasChrt");

		var labels = ctxArea.attr("labels").split(",");
		var areasPerLabel = ctxArea.attr("areasPerLabel").split(",");
		var backgroundColor = arrayColoresRandom(labels.length);

		dataChartEscuela = {
			type:"doughnut",
			data: {
				labels:labels,
				datasets:[{
					data:areasPerLabel,
					backgroundColor:backgroundColor
				}]

			},
			options: optionsChart

		}

		var adminChart = new Chart(ctxArea, dataChartEscuela)

	//establecer el chart de grupos 
		var ctxGrupo =  $("#GruposChrt");
		dataChartEscuela = {
			type:"doughnut",
			data: {
				labels:["Viejos","Nuevos"],
				datasets:[{
					data:[ctxGrupo.attr("numOldGrupos"),ctxGrupo.attr("numNewGrupos")],
					backgroundColor:["#cddc39", "#dce775"]
				}]

			},
			options: optionsChart

		}

		var adminChart = new Chart(ctxGrupo, dataChartEscuela)

})