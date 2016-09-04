$().ready(function () {
	
	//lazar Datepicker en los input de fechas
  	$(".dateGroup").pickadate({
  		selectMonths: true,
  		min:true,
  		selectYears: 10, 
  	});

});