
## Data binding

Sincronización automática entre el modelo y la vista.

```html
<body ng-app ng-init="name = 'World'">
    Say hello to: <input type="text" ng-model="name">
    <h1>Hello, {{name}}!</h1>
</body>
```

[ejemplo](ejemplos/databinding)
