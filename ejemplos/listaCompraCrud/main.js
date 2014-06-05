
var app = angular.module('app', [
    'ngResource',
    'ngAnimate',
    'ngRoute',
    'ui.bootstrap',
]);


app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
        templateUrl: 'lista.html',
        controller: 'ListaCtrl'
    })
    .when('/nuevo', {
        templateUrl: 'nuevo.html',
        controller: 'NuevoCtrl',
    })
    .when('/:id', {
        templateUrl: 'editar.html',
        controller: 'EditarCtrl',
        resolve: {
            ingrediente: function ($route, Ingrediente) {
                return Ingrediente.get({id: $route.current.params.id}).$promise;
            }
        }
    })
    .otherwise({
      redirectTo: '/'
    });
});


app.run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function() {
        alert('No existe este elemento');
    });
});


app.factory('Ingrediente', function($resource) {
    return $resource('http://ironangularjs.herokuapp.com/ingredientes/:id', {id: '@cid'}, {update: {method: 'PUT'}});
});


app.controller('ListaCtrl', function TodoCtrl($scope, Ingrediente) {
    $scope.currentPage = 1;
    $scope.maxSize = 5;

    $scope.lista = Ingrediente.query(function (lista) {
        $scope.lista = lista;
    });

    $scope.eliminar = function($index) {
        $scope.lista[$index].$remove();
        $scope.lista.splice($index,1);
    };
});

app.controller('NuevoCtrl', function TodoCtrl($scope, Ingrediente, $location) {
    $scope.nuevo = new Ingrediente();

    $scope.anadir = function() {
        // Lo creamos en el servidor
        $scope.nuevo.$save(function () {
            $location.url('/');
        });
    };
});

app.controller('EditarCtrl', function ($scope, ingrediente, $location) {
    $scope.ingrediente = ingrediente;
    $scope.actualizar = function () {
        $scope.ingrediente.$update(function () {
            $location.url('/');
        });
    }
});


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


app.filter('startFrom', function () {
   return function(input, start) {
      return input.slice(+start);
   }
});
