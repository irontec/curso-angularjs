
var app = angular.module('app', []);

app.controller('ListaCtrl', ['$scope', function TodoCtrl($scope) {
    $scope.lista = [
        {
            producto: "Queso fresco",
            seleccionado: true,
            precio: 3.1
        },
        {
            producto: "Caviar de beluga",
            seleccionado: false,
            precio: 120
        },
        {
            producto: "Langosta",
            seleccionado: true,
            precio: 35.3
        },
    ];
    
    $scope.nuevo = {};

    $scope.anadir = function() {
        $scope.lista.push($scope.nuevo);
        $scope.nuevo = {};
    };

    $scope.eliminar = function($index) {
        $scope.lista.splice($index,1);
    };
}]);

app.filter('sumaprecios', function () {
    return function(lista, start) {
        return _(lista)
            // Selecionamos los elementos con el atributo activo
            .where("seleccionado")

            // Cogemos solo el precio
            .pluck("precio")

            // Reducimos la lista sumando los precios
            .reduce(function (sum, num) { 
                return sum + num; 
            });
   };
});
