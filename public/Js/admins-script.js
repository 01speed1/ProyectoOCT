$().ready(function () {

	var validaciones = {
		rules:{
			tipoDocumento:{
				required:true
			},
			numeroDocumento:{
				required:true,
				minlength:7
			},
			nombres:{
				required: true,
				minlength: 2,
				maxlength: 200
			},
			apellidos:{
				required: true,
				minlength: 2,
				maxlength: 200
			},
			email:{
				required: true, 
				email: true
			},
			contraseña:{
				required:true, 
				
			}
		},
		
	}




	$('#nuevo-admin').validate();
});