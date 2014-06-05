### Idea creativa!

```
app.config(function ($routeProvider) {
    $routeProvider
        .when('/services/:serviceId/service', {
            controller: 'ServiceCtrl',
            resolve: {
                service: function ($route, services) {
                    return services.get($route.current.params.serviceId);
                }
            }
        });
});

app.controller('ServiceCtrl', function ($scope, service) {
    $scope.service = service;
});
```
