'use strict';

var url = "";


var app = angular.module('app', [
  'ngAnimate',
  'mgcrea.ngStrap',
  'colorpicker.module'
]);


app.controller('MainCtrl', function ($scope) {

  $scope.title = {
    color: "red",
    fontSize: "50px"
  }

  $scope.popover = {
    "title": "Title",
  };

});
