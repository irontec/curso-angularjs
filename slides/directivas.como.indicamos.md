### ¿Cómo indicamos que es una directiva?

```html
<my-directive></my-directive>
<input my-directive>
<!-- directive: my-directive-->
<input class="my-directive">
```

Angular normalizará los nombres:

- Elimina x- y el data- de los elementos y atributos
- Convierte los nombres seperados por : - _ a camelCase
