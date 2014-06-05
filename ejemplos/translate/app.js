'use strict';

var app = angular.module('app', [
  'pascalprecht.translate'
]);


app.config(function ($translateProvider) {

  $translateProvider
    .useStaticFilesLoader({
      prefix: './languages/',
      suffix: '.json'
    })
    .preferredLanguage('es');
});

app.run(['$rootScope', function($rootScope) {
  $rootScope.lang = "es";
}]);


app.controller('MainCtrl', function ($scope, $translate) {

    $scope.translatedText = $translate('DESCRIPTION');

    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
        $scope.lang = langKey;
        $scope.translatedText = $translate('DESCRIPTION');
    };

});
