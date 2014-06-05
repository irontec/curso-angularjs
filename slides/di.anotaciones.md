- inferidas
    ```javascript
    $injector.invoke(function($compile, $rootScope) {
      //
    });
    ```

- inline
    ```javascript
    injector.invoke(['$compile', '$rootScope', function(obfCompile, obfRootScope) {
        //
    }]);
    ```

- Anotadas
    ```javascript
    var tmpFn = function(obfuscatedCompile, obfuscatedRootScope) {
      //
    };
    tmpFn.$inject = ['$compile', '$rootScope'];
    $injector.invoke(tmpFn);
    ```

