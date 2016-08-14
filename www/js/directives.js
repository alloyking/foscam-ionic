angular.module('starter.directives', [])

.directive('cameraStream', function(CameraUrlBuilder) {
    return {

        templateUrl: 'templates/camera.html',
        link: function(scope, element, attr) {
            scope.stream_url = '';
            var camera_image;

            scope.dataReady = CameraUrlBuilder.getCommands();
            scope.$watchCollection('dataReady', function(newValue, oldValue) {
                if (!angular.equals({}, newValue)) {
                    scope.stream_url = newValue.stream;
                }
            });
         }
    }
})

.directive('irControl', function(CameraUrlBuilder) {
    return {
        templateUrl: 'templates/ir-control.html',
        controller: ['$scope',
            function($scope) {

                $scope.dataReady = CameraUrlBuilder.getCommands();
                $scope.$watchCollection('dataReady', function(newValue, oldValue) {
                    url = CameraUrlBuilder.doCommand('ir_on');
                    $scope.command_url = url;
                });
                $scope.ir_on = function() {
                    url = CameraUrlBuilder.doCommand('ir_on');
                    $scope.command_url = url;
                }
                $scope.ir_off = function() {
                    url = CameraUrlBuilder.doCommand('ir_off');
                    $scope.command_url = url;
                }
            }
        ]
    }
})

.directive('movementControls', function(CameraUrlBuilder) {
    return {
        templateUrl: 'templates/movement-controls.html',
        scope: {
            model: '=model'
        },
        controller: ['$scope',
            function($scope) {
                $scope.up = function() {
                    url = CameraUrlBuilder.doCommand('up');
                    $scope.command_url = url;
                };
                $scope.stop_up = function() {
                    url = CameraUrlBuilder.doCommand('stop_up');
                    $scope.command_url = url;
                };
                $scope.down = function() {
                    url = CameraUrlBuilder.doCommand('down');
                    $scope.command_url = url;
                };
                $scope.stop_down = function() {
                    url = CameraUrlBuilder.doCommand('stop_down');
                    $scope.command_url = url;
                };
                $scope.left = function() {
                    url = CameraUrlBuilder.doCommand('left');
                    $scope.command_url = url;
                };
                $scope.stop_left = function() {
                    url = CameraUrlBuilder.doCommand('stop_left');
                    $scope.command_url = url;
                };
                $scope.right = function() {
                    url = CameraUrlBuilder.doCommand('right');
                    $scope.command_url = url;
                };
                $scope.stop_right = function() {
                    url = CameraUrlBuilder.doCommand('stop_right');
                    $scope.command_url = url;
                };
            }
        ]
    };
})

//two iframes for passing other random controls.
//here we are turning on the IR for the new camera that has been loaded
//and truning off the IR on the last camera we just used.
.directive('cameraUtil', function(CameraUrlBuilder) {
    return {
        templateUrl: 'templates/camera-util.html',
        controller: ['$scope',
            function($scope) {
                $scope.dataReady = CameraUrlBuilder.getCommands();
                $scope.$watchCollection('dataReady', function(newValue, oldValue) {
                    if (!angular.equals({}, oldValue)) {
                        $scope.last_command_url = oldValue.ir_off;
                        $scope.new_command_url = newValue.ir_on;
                    }
                });
            }
        ]
    }
});