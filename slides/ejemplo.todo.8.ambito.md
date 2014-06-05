- ¿Y si deseamos usar la lista en varios lugares?

    - Deberemos tener cuidado con ámbito global.
    - El paso de referencias es complejo.

    ```javascript
    var lista = [];

    $.get("lista").done(function(obj) {
        lista = obj;
    });

    $("ol").on("click", "button", function (ev) {
        lista.splice($index, 1);
    });
    ```
