(function() {
	'use strict';

	function DishPhoto($q, $cordovaCamera, dishSheetService, dishAlertService) {
		return {
			restrict: 'E',
			replace: true,
			require: 'ngModel',
			scope: {
				ngModel: '='
			},
			link: function(scope, elm, attrs, ctrl) {
				//console.log('Dish-photo', scope, attrs);
			},
			controller: ['$scope', function($scope) {
				var _self = $scope;
				var options = [];
				var message = {};
				if (navigator.camera) {
					var imageOptions;
				}

				//Set the photo if the model exists
				//if (_self.ngModel) {
				console.log('_self', _self.ngModel);
				_self.photo = _self.ngModel;
				//}

				_self.openPicker = function() {
					console.log('DishPhoto', $scope.ngModel, $scope.type, imageOptions);
					options[0] = {
						text: 'Choose from Library'
					};
					options[1] = {
						text: 'Take Photo'
					};
					dishSheetService.show(options).then(function(button) {
						if (button === 0) {
							console.log('Take from library');
							imageOptions = {
								quality: 50,
								destinationType: Camera.DestinationType.DATA_URL,
								sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
								allowEdit: false,
								targetWidth: 800,
								targetHeight: 800,
								encodingType: Camera.EncodingType.JPEG,
								popoverOptions: CameraPopoverOptions,
								saveToPhotoAlbum: false
							};
						}
						if (button === 1) {
							console.log('Take photo');
							imageOptions = {
								quality: 50,
								destinationType: Camera.DestinationType.DATA_URL,
								sourceType: Camera.PictureSourceType.CAMERA,
								allowEdit: false,
								targetWidth: 800,
								targetHeight: 800,
								encodingType: Camera.EncodingType.JPEG,
								popoverOptions: CameraPopoverOptions,
								saveToPhotoAlbum: false
							};
						}
						$cordovaCamera.getPicture(imageOptions).then(function(imageURI) {
							_self.photo = "data:image/jpeg;base64," + imageURI;
						}, function(err) {
							// error
							message.message = err;
							message.buttonText = 'Sure Thing.';
							dishAlertService.show(message);
						});
					});
				};
			}],
			template: '<div><div class="dish-photo"><div class="uploaded-photo" style="background-image:url({{photo}});"></div></div><div class="add-photo" ng-click="openPicker()"></div></div>'
		};
	}

	DishPhoto.$inject = ['$q', '$cordovaCamera', 'dishSheetService', 'dishAlertService'];

	angular.module('dish.photo')
		.directive('dishPhoto', DishPhoto);
})();