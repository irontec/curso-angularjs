- Inicializamos la lista desde el servidor

    ```javascript
    // Pedimos el contenido al servidor
    $.get( "lista.php" ).done(function(obj) {

        // Por cada elemento
        obj.forEach(function(value, index, collection) {
            $("ol").append($("<li></li>").text(value));
            $("ol [tooltip]").tooltip();
        });
    });
    ```
