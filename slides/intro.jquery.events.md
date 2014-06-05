### Gestión de eventos

- Añadir un 
    ```javascript
    $(".selectorcss").click(function (ev) {
        alert("");
    });
    ```

- 
    ```javascript
    $( "body" ).on( "click", "script", function() {
        alert( $(this).text() );
    });
    ```

<!--
<script>
$( "body" ).on( "click", "script", function() {
    alert( $(this).text() );
});
</script>
-->
