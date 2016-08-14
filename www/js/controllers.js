angular.module('starter.controllers', [])

.controller('CameraHome', function($scope, CameraConfigLoader, CameraUrlBuilder, $ionicSlideBoxDelegate) {

	//what we load on the initail view
	CameraConfigLoader.get('camera-one-config.json').then(function() {
		// camera is loaded and displayed

		// I want IR on when I arrive at the camera
		//$scope.command_url = CameraUrlBuilder.doCommand('ir_on');
	});

	//what happens when we change slides
	$scope.slideHasChanged = function(index) {
		if (index == 0) {
			
			CameraConfigLoader.get('camera-one-config.json').then(function() {
				// camera is loaded and displayed
				
				// I want IR on when I arrive at the camera
				//$scope.command_url = CameraUrlBuilder.doCommand('ir_on');
			});

		} else {
			CameraConfigLoader.get('camera-two-config.json').then(function() {
				// camera is loaded and displayed

				// I want IR on when I arrive at the camera
				//$scope.command_url = CameraUrlBuilder.doCommand('ir_on');
			});
		}
	};
});