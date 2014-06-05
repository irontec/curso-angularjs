#### Advanced

- La etiqueta ng-app construye un inyector

```javascript
var injector = angular.element($("body")).injector();

var $templateCache = injector.get("$templateCache");

$templateCache.get("popover/docs/popover.tpl.demo.html");
```
