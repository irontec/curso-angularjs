### Compilación

- Compila el HTML analizando el DOM devuelto por el navegador
- Compara cada elemento, atributo, comentario o class css contra una lista de directivas registradas
- Si la directiva no está compilada, llama a la función compile (esta devolverá la función link)
- Llama a la función link de la directiva
    ```
    link: function(scope, element, attrs, ngModelController) { ... }
    ```
- Crea un scope y asigna el scope a cada directiva
