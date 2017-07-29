$().ready(function () {

	// preguntar antes de borrar estudiante
		$(".prevDelEstudiante").click(function (event) {
				event.preventDefault();
				var tipoUsuario = $("div.tipoUsuario.hide").text();
				var hrefDelete = $(this).parent().attr("action");

				var args = {
					tipoUsuario:tipoUsuario,
					hrefDelete:hrefDelete
				}
				preguntarAntesDeBorrar(args);
			});
})