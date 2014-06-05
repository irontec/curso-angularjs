## Routing

```javascript
app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
        templateUrl: 'lista.html',
        controller: 'ListaCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});
```
