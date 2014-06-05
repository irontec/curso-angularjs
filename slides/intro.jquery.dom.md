## manipulación DOM

- Leer el contenido de un input

    ```javascript
    var contenido = $("input").val();
    ```

- Asignar un valor a un input

    ```javascript
    $("input").val("valor");
    ```

- Añadir una clase css

    ```javascript
    $("selector").addClass("clickado");
    ```

- Crear un nuevo elemento y añadirlo a otro

    ```javascript
    $(this).append(
        $("<h4>has hecho Click!</h4")
    );
    ```
