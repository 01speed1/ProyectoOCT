$(document).ready(function(){

	//GET/ todas las escuelas
	$("#reloadSchools").on('click', function () {
		$.ajax({
			url:"/administrador/schools/reload",
			contentType: 'application/json',
			success: function (res) {
				var schoolsList = $(collapsible);
				schoolsList.html('');

				res.schools.forEach(function (school) {
					schoolsList.append('\
						<li>\
							<div class="collapsible-header">'+school.nombre+'<i class="material-icons">class</i>\
							</div>\
							<div class="collapsible-body">\
								<p>'+school.creation+'</p>\
							<div class="row right-align litle-margin">\
								<a href="/administrador/school/'+school._id+'" class="delscl btn waves-effect waves-light red" >Borrar esta escuela\
								</a>\
							</div>\
						</li>\
					');
				});
				console.log("reloaded");
			}
		});
	})

	//POST/ nueva escuela
	$("#newSchool").on('submit', function (e) {

		e.preventDefault();
		
		var ns = $('#ns'); // es el input del formulario que optiene el nombre de la nueva escuela
		console.log(ns.val());

		if (ns.val() === "" || ns.val() == undefined || ns.val().length == 0) {
			$('.message').html("");
			$('.message').append("No puedes crear una escuela sin nombre");
		} else {
			
			$.ajax({
				url: "/administrador/school",
				method: "POST", 
				contentType:'application/json', 
				data: JSON.stringify({ns:ns.val()}),
				success:function (res) {
					console.log(res);
					ns.val('');
					$("#reloadSchools").click();
					$('.message').html("");
				}
			});

		}
	});

	//DELETE
	$('.delscl').on('click', function () {

		$("#reloadSchools").click();
		
	})
});