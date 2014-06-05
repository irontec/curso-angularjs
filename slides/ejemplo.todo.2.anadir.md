- Añadimos un gestor de eventos que inserta un nuevo elemento.

    ```javascript
    $("button").click(function () {
        // Obtenemos el valor del cuadro de texto
        var contenido = $("input").value();

        // Creamos un nuevo elemento
        var nuevoElemento = $("<li></li>");

        // Añadimos el texto a dicho elemento
        nuevoElemento.text("contenido");

        // Añadimos el elemento a la lista
        $("ol").append(nuevoElemento);
    });
    ```
