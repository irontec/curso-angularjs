'use strict';

var app = angular.module('app', [
  'ngResource',
  'angularFileUpload',
  'webcam'
]);


app.factory('Image', function($resource) {
    var url = 'http://localhost:3000/imagenes';
    var resource = $resource(url + '/:id', {id: '@cid'}, {update: {method: 'PUT'}});
    resource.prototype.url = url;
    return resource;
});


app.controller('MainCtrl', function (
    $scope, 
    $upload, 
    $location, 
    $http, 
    $timeout, 
    Image
) {
    $scope.items = Image.query(function (items) {
        $scope.items = items;
    });

    $scope.destroy = function(index) {
        Image.remove({id: $scope.items[index].id}, function() {
            $scope.items.splice(index, 1);
        });
    }

    /*
     * Photos
     */

    $scope.uploadFile = function(file) {
        file.upload = $upload.upload({
            url : Image.prototype.url,
            file: file.file,
            fileFormDataName: 'file'
        }).then(function () {
            console.log("done", arguments);
        }, function () {
            console.log("fail", arguments);
        });
    }

    $scope.fileAbort = function(file) {
        file.upload.abort();
        $scope.$apply(function() {
            file.upload = null;
        });
    };

    $scope.selectFiles = function($files) {
        angular.forEach($files, function($file) {
            var file = {
                file: $file,
                progress: -1
            };
            if (window.FileReader && $file.type.indexOf('image') > -1) {
                var fileReader = new FileReader();
                fileReader.readAsDataURL($file);
                fileReader.onload = function(e) {
                    $timeout(function() {
                        file.dataUrl = e.target.result;
                        $scope.items.push(file);
                    });
                }
                $scope.uploadFile(file);
            }
        });
    }

    /*
     * Camera
     */

    $scope.video = null;
    $scope.webcamError = false;

    // Funciones llamadas desde la directiva

    $scope.cameraError = function (err) {
        $scope.$apply(
            function() {
                $scope.webcamError = err;
            }
        );
    };

    $scope.cameraSuccess = function (videoElem) {
        $scope.$apply(function() {
            $scope.video = videoElem;
        });
    };

    $scope.cameraStream = function (stream, videoElem) {
        $scope.stream = stream;
        $scope.video = videoElem;
    };


    // Magia para sacar una foto del stream y convertirla en un dataUrl

    var hiddenCanvas = document.createElement('canvas');

    var dataURLtoBlob = function (dataURL) {
        var binary = atob(dataURL.split(',')[1]);
        var array = [];
        for(var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: 'image/png'});
    }

    $scope.makeSnapshot = function () {
        if (!$scope.video) return

        hiddenCanvas.width = $scope.video.width;
        hiddenCanvas.height = $scope.video.height;
        var ctx = hiddenCanvas.getContext('2d');

        ctx.drawImage($scope.video, 0, 0, $scope.video.width, $scope.video.height);

        var dataUrl = hiddenCanvas.toDataURL();
        var file = {
            dataUrl: dataUrl,
            file: dataURLtoBlob(dataUrl)
        };
        $scope.items.push(file);
        $scope.uploadFile(file);
    };

    $scope.closeCamera = function () {
        if ($scope.stream)
            $scope.stream.stop()
    }
});
