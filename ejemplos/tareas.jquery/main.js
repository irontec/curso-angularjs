var lista = ["Puntuar muy bien a este super profe! "];

$("form").on("submit", function (ev) {
    // Evitamos que se envie el formulario
    ev.preventDefault();

    // Obtenemos el valor del cuadro de texto
    var contenido = $("input").val();

    // Vaciamos el cuadro de texto
    $("input").val("");

    // Comprobamos que haya contenido
    if (!contenido) {
        return;
    }

    // Creamos un nuevo elemento
    var nuevoElemento = $("<li><span></span><button class=\"btn\">Borrar</button></li>");

    // Añadimos el texto a dicho elemento
    nuevoElemento.find("span").text(contenido);

    // Añadimos el elemento a la lista
    $("ol").append(nuevoElemento);

    // Añadimos el elemento a la lista
    lista.push(contenido);

    console.log("elemento añadido", contenido); 
    console.log("lista contiene", lista);
});


$("ol").on("click", "button", function (ev) {
    // Conocindo el markup
    var li = $(this).parent();
    var ol = $(this).parent().parent();

    // Buscando el elemento que nos interesa
    var li = $(this).parents("li");
    var ol = $(this).parents("ol");

    var posicion = ol.children().index(li);
    
    var elemento = lista.splice(posicion, 1);

    console.log("elemento borrado", elemento[0]); 
    console.log("lista contiene", lista);

    // borramos el li
    li.remove();
});
