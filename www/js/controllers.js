angular.module('starter.controllers', [])

.controller('CameraHome', function($scope, CameraConfigLoader, CameraUrlBuilder, $ionicSlideBoxDelegate) {

	//what we load on the initail view
	CameraConfigLoader.get('camera-one-config.json').then(function() {
		// camera is loaded and displayed
	});

	//what happens when we change slides
	$scope.slideHasChanged = function(index) {
		if (index == 0) {

			CameraConfigLoader.get('camera-one-config.json').then(function() {
				// camera  1 is loaded and displayed
			});

		} else {
			CameraConfigLoader.get('camera-two-config.json').then(function() {
				// camera 2 is loaded and displayed
			});
		}
	};
});