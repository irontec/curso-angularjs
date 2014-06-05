- Añadimos la posibilidad de borrar elementos.

    ```html
    <ol id="lista">
       <li>Elemento 1 <button>borrar</button></li>
       <li>Elemento 2 <button>borrar</button></li>
    </ol>
    ```

    ```javascript
    $("ol").on("click", "button", function (ev) {
        $(this).parent().remove();
    });
    ```