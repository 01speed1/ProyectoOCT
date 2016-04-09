$(document).ready(function(){
  
  //inicializadores de materialize  
  $('.modal-trigger').leanModal();
  $(".button-collapse").sideNav();
  $(".dropdown-button").dropdown();
  $('select').material_select();

  
	$('.datepicker').pickadate({
		selectMonths: true, // Creates a dropdown to control month
    	selectYears: 70, // Creates a dropdown of 15 years to control year
    	//botones 
    	today: 'Hoy',
		clear: 'Borrar',
		close: 'Aceptar',
		//meses
		monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		monthsShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
		weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
		weekdaysShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
		dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
		format:'dd-mm-yyyy',
		showMonthsShort: undefined,
		showWeekdaysFull: undefined

	});

	 $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    


}); 

 