
var app = angular.module('app', []);

app.controller('ListaCtrl', function TodoCtrl($scope) {
    
    $scope.campos = [];
    
    $scope.tipos = [
        {
            nombre: 'text'
        }, {
            nombre: 'number'
        }
    ];

    $scope.anadir = function() {
        $scope.campos.push($scope.nuevo);
        $scope.nuevo = {};
    };

    $scope.eliminar = function($index) {
        $scope.campos[$index].$remove();
        $scope.campos.splice($index,1);
    };
});
