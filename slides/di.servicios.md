- Un valor
```javascript
app.value('existencia', 42);
```

- Una servicio
    ```javascript
    app.service('lista', function () {
        var lista = [];
        return {
            get: function (id) {
                return lista[id];
            }
        }
    });
    ```

- Un servicio
    ```javascript
    app.factory('services', function () {
      return $resource('/services/:serviceId', {serviceId:'@id'});
    });
    ```
