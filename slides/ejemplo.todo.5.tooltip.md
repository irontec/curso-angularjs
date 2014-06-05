- Añadamos un efecto, un tooltip por ejemplo

    Necesitaremos inicializar el plugin cada vez que añadamos un nuevo elemento 

    ```javascript
    $("button").click(function () {
        ...
        $("ol [tooltip]").tooltip();
    });
    ```
