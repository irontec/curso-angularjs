function TodoCtrl($scope) {
    $scope.lista = [
        {
            nombre: "Puntuar muy bien a este super profe!"
        }
    ];
 
    $scope.anadir = function() {
        $scope.lista.push({nombre: $scope.nuevo});
        $scope.nuevo = '';
    };

    $scope.eliminar = function($index) {
        $scope.lista.splice($index,1);
    };
}