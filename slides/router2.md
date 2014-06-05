```javascript
.when('/:id', {
    templateUrl: 'editar.html',
    controller: 'EditarCtrl',
    resolve: {
        ingrediente: function ($route, Ingrediente) {
            return Ingrediente
                .get({id: $route.current.params.id})
                .$promise;
        }
    }
})
```
