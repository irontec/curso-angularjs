## Servicios REST

```javascript
app.factory('services', function () {
  return $resource('/services/:serviceId', {serviceId:'@id'});
});
```