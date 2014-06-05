'use strict';

var url = "";


var app = angular.module('app', [
  'ngResource',
  'angularFileUpload',
  'webcam',
  'pascalprecht.translate'
]);


app.run(['$rootScope', function($rootScope) {
  $rootScope.lang = "es";
}]);


app.factory('Image', ['$resource', function($resource) {
    return $resource('http://ironangularjs.herokuapp.com/imagenes/:id', {id: '@cid'}, {update: {method: 'PUT'}});
}]);


app.controller('MainCtrl', function (
    $scope, 
    $upload, 
    $location, 
    $http, 
    $timeout, 
    Image,
    $translate
) {
    $scope.items = Image.query();

    $scope.destroy = function(index) {
        Image.remove({id: $scope.items[index].id}, function() {
            $scope.items.splice(index, 1);
        });
    }

    /*
     * Photos
     */

    var dataURLtoBlob = function (dataURL) {
        var binary = atob(dataURL.split(',')[1]);
        var array = [];
        for(var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: 'image/png'});
    }

    $scope.uploadFile = function(file) {
        // if is an image of the camera get blob 
        if (!file.file) {
            file.file = dataURLtoBlob(file.dataUrl);
        }

        var response = function (response) {
            file.id = response.data.original;
            angular.forEach(response.data.sons, function (hash) {
                $scope.files.push({id: hash});
            });
        }

        // FIXME
        var progress = function (evt) {
            file.progress = parseInt(100.0 * evt.loaded / evt.total);
        };
        
        file.progress = 0;
        file.upload = $upload.upload({
            url : files_url,
            file: file.file,
            fileFormDataName: 'file'
        });
        file.upload.then(response, null, progress);
    }

    $scope.uploadFiles = function () {
        for (var i = 0; i < $scope.selected.length; i++ ) {
            var $file = $scope.selected[i];
            
            // Upload if we don't have its hash
            if (!$file.id) {
                $scope.uploadFile($file);
            }
            var name = "image" + String.fromCharCode("A".charCodeAt(0) + i) + "Name";
            $scope.data[name] = $file.id;
        }
    }

    $scope.photo = function (file) {
        if (file.dataUrl)
            return file.dataUrl;
        if (file.id)
            return image_url + file.id;

        return null;
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
                        $scope.files.push(file);
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

    var hiddenCanvas = document.createElement('canvas');

    $scope.makeSnapshot = function () {
        if (!$scope.video) return

        hiddenCanvas.width = $scope.video.width;
        hiddenCanvas.height = $scope.video.height;
        var ctx = hiddenCanvas.getContext('2d');

        ctx.drawImage($scope.video, 0, 0, $scope.video.width, $scope.video.height);
        var file = {dataUrl: hiddenCanvas.toDataURL()};
        $scope.files.push(file);
    };

    $scope.closeCamera = function () {
        if ($scope.stream)
            $scope.stream.stop()
    }
});
