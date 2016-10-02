$().ready(function () {
	$('select').material_select();
	$(".button-collapse").sideNav('show');
	$('.collapsible').collapsible({
      accordion : true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
  $('.tooltipped').tooltip({delay: 50});
	//configuracion del calendario
	$('.datepickerborn').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 80, 
    max: true,
    today: 'Hoy',
	  clear: 'limpiar',
	  close: 'Aceptar'
  });

  //configuracion del boton para cerrar mensaje emergente
  $(".closeCard").on("click",function () {
    $(this).closest("#card-alert").fadeOut("slow")
    });

  //init del slider
    $('.slider').slider({full_width: true});
  //paralax
   $('.parallax').parallax();

})



