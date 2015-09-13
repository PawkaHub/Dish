angular.module('dish', [
  'ionic',
  'ngStorage',
  'ngCordova',
  'ngMessages',
  'ksSwiper',
  'firebase',
  'templates',
  'dish.bootstrap',
  'dish.keyboard',
  'dish.input',
  'dish.button',
  'dish.sheet',
  'dish.alert',
  'dish.modal',
  'dish.slider',
  'dish.tray',
  'dish.photo',
  'dish.forgot',
  'dish.login',
  'dish.signup',
  'dish.home',
  'dish.food',
  'dish.cook',
  'dish.profile',
  'dish.favorites',
  'dish.payment',
  'dish.transactions',
  'dish.promotions',
  'dish.help',
  'dish.settings'
]);
(function() {
	'use strict';

	angular.module('dish.bootstrap', []);
})();
angular.module('dish.bootstrap')

.config(function($stateProvider, $urlRouterProvider) {})
angular.module('dish.bootstrap')

.constant('FURL', 'https://dishapp.firebaseio.com/');
(function() {
	'use strict';

	function DishBootstrapController($scope, $ionicPlatform, $timeout, $log, Auth, dishModalService) {

		$ionicPlatform.ready(function() {
			$timeout(function() {
				if (Auth.signedIn() === false) {
					$log.log('show shit');
					dishModalService.open($scope, 'signup');
				} else {
					console.log('Auth', Auth.user);
					$scope.currentUser = Auth.user;
					dishModalService.close();
				}
			});
		});
	}

	DishBootstrapController.$inject = ['$scope', '$ionicPlatform', '$timeout', '$log', 'Auth', 'dishModalService'];

	angular.module('dish.bootstrap')
		.controller('dishBootstrapController', DishBootstrapController);
})();
angular.module('dish.bootstrap')

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			window.cordova.plugins.Keyboard.disableScroll(true);
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
});
(function() {
	'use strict';

	angular.module('dish.keyboard', []);
})();
(function() {
	'use strict';

	function DishKeyboardDirective($window, $q, $timeout) {
		return {
			restrict: 'A',
			link: function(scope, elm, attrs) {
				//console.log('attrs', attrs, elm);
				//Maintain focus whenever it gets lost
				elm[0].addEventListener('focusout', function(e) {
					if (window.disableConstantFocus) {
						return;
					}
					//console.log('focus lost', e);
					if (e.relatedTarget && e.relatedTarget.tagName === 'INPUT') {
						//console.log('don\'t refocus');
						return;
					} else {
						//console.log('refocus');
						elm[0].focus();
					}
				});

				/*ctrl.scope.$on('$ionicView.beforeEnter', function viewEnter(e) {
					console.log('$ionicView.beforeEnter', attrs.constantFocus);
					if (attrs.constantFocus === 'first') {
						document.getElementById('maintainKeyboard').focus();
					}
				});*/

				/*ctrl.scope.$on('$ionicView.afterEnter', function viewEnter(e) {
					//console.log('$ionicView.afterEnter', attrs.constantFocus);
					//if (attrs.constantFocus === 'first') {
					elm[0].focus();
					//}
				});*/

				/*scope.$on('$ionicView.loaded', function viewEnter(e) {
					console.log('$ionicView.loaded', attrs.constantFocus);
				});

				ctrl.scope.$on('$ionicView.enter', function viewEnter(e) {
					console.log('$ionicView.enter', attrs.constantFocus);
					if (attrs.constantFocus === 'first') {
						console.log('focus first');
						elm[0].focus();
					}
				});

				scope.$on('$ionicView.leave', function viewEnter(e) {
					console.log('$ionicView.leave', attrs.constantFocus);
				});

				scope.$on('$ionicView.beforeEnter', function viewEnter(e) {
					console.log('$ionicView.beforeEnter', attrs.constantFocus);
					document.getElementById('maintainKeyboard').focus();
				});

				scope.$on('$ionicView.beforeLeave', function viewEnter(e) {
					console.log('$ionicView.beforeLeave', attrs.constantFocus);
					//if (attrs.constantFocus === 'first') {
					//document.getElementById('maintainKeyboard').focus();
					//}
				});

				scope.$on('$ionicView.afterEnter', function viewEnter(e) {
					console.log('$ionicView.afterEnter', attrs.constantFocus);
				});

				scope.$on('$ionicView.afterLeave', function viewEnter(e) {
					console.log('$ionicView.afterLeave', attrs.constantFocus);
				});

				scope.$on('$ionicView.unloaded', function viewEnter(e) {
					console.log('$ionicView.unloaded', attrs.constantFocus);
				});*/
			}
		};
	};

	DishKeyboardDirective.$inject = ['$window', '$q', '$timeout'];

	angular.module('dish.keyboard')
		.directive('constantFocus', DishKeyboardDirective);
})();
(function() {
	'use strict';

	function DishKeyboardService($window, $q, $timeout) {
		var _self = this;

		_self.close = function _close() {
			if (window.cordova) {
				window.disableConstantFocus = true;
				ionic.keyboard.disable();
				cordova.plugins.Keyboard.close();
				$timeout(function() {
					ionic.keyboard.enable();
					window.disableConstantFocus = false;
				}, 400);
			}
		};

		_self.focusInput = function _focusInput(inputId, delay) {
			var input;
			var focusTime = 0;
			if (inputId) {
				if (delay) {
					focusTime = 400;
				}
				$timeout(function() {
					input = document.querySelector('#' + inputId);
					if (input) {
						input.focus();
					}
				}, focusTime);
			}
		}
	};

	DishKeyboardService.$inject = ['$window', '$q', '$timeout'];

	angular.module('dish.keyboard')
		.service('dishKeyboardService', DishKeyboardService);
})();
(function() {
	'use strict';

	angular.module('dish.input', []);
})();
(function() {
	'use strict';

	function DishInputDirective($window, $q, $ionicPopup) {
		var invalid;
		return {
			restrict: 'AE',
			require: 'ngModel',
			scope: {
				ngModel: '='
			},
			replace: true,
			link: function(scope, elm, attrs, ctrl) {
				//Get the last section of the model and use that as the input name
				scope.inputName = attrs.ngModel.split('.').pop();
				scope.placeholder = attrs.placeholder;
				scope.id = attrs.id;
				console.log('attrs', attrs.readonly);
				if (attrs.readonly) {
					scope.readonly = true;
				} else {
					scope.readonly = false;
				}

				//Based on the input name, assign the proper field type accordingly if it's a password or email
				switch (scope.inputName) {
					case 'email':
						scope.inputType = 'email';
						scope.minLength = 0;
						scope.pattern = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
						break;
					case 'password':
						scope.inputType = 'password';
						scope.minLength = 8;
						break;
					case 'price':
						scope.inputType = 'number';
						//scope.minLength = 9;
						scope.pattern = '[0-9]*';
						break;
					case 'portions':
						scope.inputType = 'number';
						//scope.minLength = 0;
						//scope.maxLength = 3;
						scope.pattern = '[0-9]*';
						break;
					default:
						scope.inputType = 'text';
						scope.minLength = 0;
				}
			},
			template: '<label class="item item-input dish-input"><input id="{{id}}" name="{{inputName}}" type="{{inputType}}" autocomplete="off" autocorrect="off" autocapitalize="off" required="true" ng-model="ngModel" pattern="{{pattern}}" ng-minlength="minLength" placeholder="{{placeholder}}" ng-readonly="readonly"><i class="error icon ion-ios-close assertive"></i></label>'
		};
	}

	DishInputDirective.$inject = ['$window', '$q', '$ionicPopup'];

	angular.module('dish.input')
		.directive('dishInput', DishInputDirective);
})();
(function() {
	'use strict';

	angular.module('dish.button', []);
})();
(function() {
	'use strict';

	function DishButtonDirective($window, $q) {
		var invalid;
		return {
			restrict: 'AE',
			replace: true,
			link: function(scope, elm, attrs, ctrl) {
				//Get the last section of the model and use that as the input name
				//console.log('buttonText', attrs.text);
				attrs.$observe('text', function() {
					console.log('buttonText', attrs.text);
					scope.buttonText = attrs.text;
				});
				if (attrs.type) {
					scope.buttonType = 'button-' + attrs.type;
				} else {
					scope.buttonType = 'button-positive';
				}
			},
			template: '<button class="dish-button button button-full {{buttonType}}">{{buttonText}}</button>'
		};
	}

	DishButtonDirective.$inject = ['$window', '$q'];

	angular.module('dish.button')
		.directive('dishButton', DishButtonDirective);
})();
(function() {
	'use strict';

	angular.module('dish.sheet', []);
})();
(function() {
	'use strict';

	function DishSheetService($window, $q, $ionicActionSheet, $timeout) {
		var _self = this;
		var sheetActive = false;

		_self.show = function _show(options) {
			var deferred = $q.defer();
			var actionSheet;

			if (sheetActive) {
				return deferred.promise;
			}

			if (!options) {
				deferred.reject({
					error: 'No options included for action sheet.'
				});
			}

			sheetActive = true;

			actionSheet = $ionicActionSheet.show({
				buttons: options,
				cancelText: 'Cancel',
				cancel: function() {
					sheetActive = false;
				},
				buttonClicked: function(index) {
					sheetActive = false;
					actionSheet(); //Close the actionSheet
					deferred.resolve(index);
				}
			})
			return deferred.promise;
		};
	};

	DishSheetService.$inject = ['$window', '$q', '$ionicActionSheet', '$timeout'];

	angular.module('dish.sheet')
		.service('dishSheetService', DishSheetService);
})();
(function() {
	'use strict';

	angular.module('dish.alert', []);
})();
(function() {
	'use strict';

	function DishAlertService($window, $q, $ionicPopup, $timeout) {
		var _self = this;
		var alertActive = false;

		_self.show = function _showAlert(data) {
			var deferred = $q.defer();
			var alertPopup;

			if (alertActive) {
				return deferred.promise;
			}

			if (!data) {
				deferred.reject({
					error: 'No data included for alert.'
				});
			}

			alertActive = true;

			alertPopup = $ionicPopup.alert({
				title: '',
				template: data.message,
				buttons: [{
					text: data.buttonText
				}]
			});

			alertPopup.then(function(res) {
				alertActive = false;
				deferred.resolve(res);
			});

			return deferred.promise;
		};
	};

	DishAlertService.$inject = ['$window', '$q', '$ionicPopup', '$timeout'];

	angular.module('dish.alert')
		.service('dishAlertService', DishAlertService);
})();
(function() {
	'use strict';

	angular.module('dish.slider', []);
})();
(function() {
	'use strict';

	function DishSliderService($window, $q, $timeout, $ionicSlideBoxDelegate) {
		var _self = this;

		_self.enableSlide = function _enableSlide(enabled) {
			$ionicSlideBoxDelegate.$getByHandle('dishSlider').enableSlide(enabled);
		};

		_self.slide = function _slide(index, speed) {
			//console.log('DishSliderService slide');
			window.disableConstantFocus = true;
			$ionicSlideBoxDelegate.$getByHandle('dishSlider').slide(index, speed);
			$timeout(function() {
				window.disableConstantFocus = false;
			}, 400);
		};

		_self.currentIndex = function _currentIndex() {
			$ionicSlideBoxDelegate.$getByHandle('dishSlider').currentIndex();
		}
	}

	DishSliderService.$inject = ['$window', '$q', '$timeout', '$ionicSlideBoxDelegate'];

	angular.module('dish.slider')
		.service('dishSliderService', DishSliderService);
})();
(function() {
	'use strict';

	function DishSliderDirective($window, $q, $compile, $templateRequest, $ionicSlideBoxDelegate, dishSliderService) {
		return {
			restrict: 'E',
			transclude: true,
			scope: {
				onSlideChanged: '&'
			},
			link: function(scope, elm, attrs, ctrl, transclude) {
				//Get the type and use that as the name of the modal, showing a default modal if the template doesn't exist
				var templateUrl;

				transclude(scope, function(clones) {
					angular.forEach(clones, function(clone) {
						if (clone.tagName === 'DISH-SLIDE') {
							//console.log('found', clone);
							templateUrl = clone.attributes.template.value;
							scope.slides.push(templateUrl);
						}
					});
				});

				//dishSliderService.enableSlide(false);
			},
			controller: ['$scope', function($scope) {
				$scope.slides = [];
				$scope.slide = function(index) {
					dishSliderService.slide(index);
				};
			}],
			template: '<ion-slide-box class="dish-slider" show-pager="false" delegate-handle="dishSlider" active-slide="0"><dish-slide ng-repeat="slide in slides" template="{{slide}}"></dish-slide></ion-slide-box>'
		};
	}

	DishSliderDirective.$inject = ['$window', '$q', '$compile', '$templateRequest', '$ionicSlideBoxDelegate', 'dishSliderService'];

	angular.module('dish.slider')
		.directive('dishSlider', DishSliderDirective);
})();
(function() {
	'use strict';

	function DishSlideDirective($window, $q, $templateRequest, $compile) {
		return {
			restrict: 'E',
			transclude: true,
			scope: {},
			link: function(scope, elm, attrs, ctrl) {
				//console.log('dishSlide!', elm, attrs);
				//Get the templateContentUrl and use that to display the appropriate content page
				var templateContentUrl = attrs.template;
				$templateRequest(templateContentUrl).then(function(html) {
					var template = angular.element(html);
					elm.append(template);
					$compile(template)(scope);
				});
				elm[0].classList.add('slider-slide');
			},
		};
	}

	DishSlideDirective.$inject = ['$window', '$q', '$templateRequest', '$compile'];

	angular.module('dish.slider')
		.directive('dishSlide', DishSlideDirective);
})();
(function() {
  'use strict';

  angular.module('dish.tray', []);
})();
(function() {
  'use strict';

  function DishTrayFactory($scope) {
    return {
      transitionUp: function() {
        console.log('up');
        draggableTray.transitionUp();
      },
      transitionDown: function() {
        console.log('down');
        draggableTray.transitionDown();
      },
      transitionHide: function() {
        console.log('hide');
        draggableTray.transitionHide();
      }
    }
  };

  DishTrayFactory.$inject = ['$scope'];

  angular.module('dish.tray')
    .factory('$dishTrayDelegate', DishTrayFactory);
})();
(function(ionic) {
  'use strict';

  function DishTrayDirective($ionicScrollDelegate) {
    // Get transform origin poly
    var d = document.createElement('div');
    var transformKeys = ['webkitTransformOrigin', 'transform-origin', '-webkit-transform-origin', 'webkit-transform-origin',
      '-moz-transform-origin', 'moz-transform-origin', 'MozTransformOrigin', 'mozTransformOrigin'
    ];

    var TRANSFORM_ORIGIN = 'webkitTransformOrigin';
    for (var i = 0; i < transformKeys.length; i++) {
      if (d.style[transformKeys[i]] !== undefined) {
        TRANSFORM_ORIGIN = transformKeys[i];
        break;
      }
    }

    var transitionKeys = ['webkitTransition', 'transition', '-webkit-transition', 'webkit-transition',
      '-moz-transition', 'moz-transition', 'MozTransition', 'mozTransition'
    ];
    var TRANSITION = 'webkitTransition';
    for (var i = 0; i < transitionKeys.length; i++) {
      if (d.style[transitionKeys[i]] !== undefined) {
        TRANSITION = transitionKeys[i];
        break;
      }
    }

    var SwipeableCardView = ionic.views.View.inherit({
      /**
       * Initialize a card with the given options.
       */
      initialize: function(opts) {
        opts = ionic.extend({}, opts);

        ionic.extend(this, opts);

        this.el = opts.el;

        this.openY = opts.openY;

        this.closedY = opts.closedY;

        this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(0,' + (this.openY) + 'px, 0)';

        this.open = false;

        this.bindEvents();
      },

      /**
       * Disable transitions on the card (for when dragging)
       */
      disableTransition: function(animationClass) {
        this.el.classList.remove(animationClass);
      },

      /**
       * Fly the tray up or animate back into resting position.
       */
      transitionOut: function(e, direction) {
        $ionicScrollDelegate.freezeScroll(false);
        var self = this;

        //console.log('drag', this.y);

        //Bounce back threshold
        if (this.y < -400) {
          console.log('FLY UP', this.y);
          this.el.style[TRANSITION] = '-webkit-transform 0.2s ease-in-out';
          this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(0,' + (this.openY) + 'px, 0)';
          this.open = true;
          setTimeout(function() {
            self.el.style[TRANSITION] = 'none';
          }, 200);
        } else {
          console.log('FLY DOWN', this.y);
          // Fly out
          this.el.style[TRANSITION] = '-webkit-transform 0.2s ease-in-out';
          this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(0,' + (this.closedY) + 'px, 0)';
          this.open = false;
          setTimeout(function() {
            self.el.style[TRANSITION] = 'none';
          }, 200);
        }
      },

      transitionUp: function(e) {
        $ionicScrollDelegate.freezeScroll(false);
        console.log('transitionUp');
        var self = this;

        this.swiped = true;
        this.el.style[TRANSITION] = '-webkit-transform 0.2s ease-in-out';
        this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(0,' + (this.openY) + 'px, 0)';
        this.open = true;
        setTimeout(function() {
          self.el.style[TRANSITION] = 'none';
          this.swiped = false;
        }, 200);
      },

      transitionDown: function(e) {
        $ionicScrollDelegate.freezeScroll(false);
        console.log('transitionDown');
        var self = this;

        this.el.style[TRANSITION] = '-webkit-transform 0.2s ease-in-out';
        this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(0,' + (this.closedY) + 'px, 0)';
        this.open = false;
        setTimeout(function() {
          self.el.style[TRANSITION] = 'none';
          this.swiped = false;
        }, 200);
      },

      /**
       * Bind drag events on the card.
       */
      bindEvents: function() {
        var self = this;
        ionic.onGesture('dragstart', function(e) {
          ionic.requestAnimationFrame(function() {
            self._doDragStart(e)
          });
        }, this.el);

        ionic.onGesture('dragup', function(e) {
          ionic.requestAnimationFrame(function() {
            self._doDrag(e)
          });
        }, this.el);

        ionic.onGesture('dragdown', function(e) {
          ionic.requestAnimationFrame(function() {
            self._doDrag(e)
          });
        }, this.el);

        ionic.onGesture('dragend', function(e) {
          ionic.requestAnimationFrame(function() {
            if (self.swiped) {
              return false;
            } else {
              self._doDragEnd(e);
            }
          });
        }, this.el);

        ionic.onGesture('swipeup', function(e) {
          ionic.requestAnimationFrame(function() {
            self._doSwipeUp(e)
          });
        }, this.el);

        ionic.onGesture('swipedown', function(e) {
          ionic.requestAnimationFrame(function() {
            self._doSwipeDown(e)
          });
        }, this.el);
      },

      _doDragStart: function(e) {
        //$ionicScrollDelegate.freezeScroll(true);
        var width = this.el.offsetWidth;
        var point = window.innerWidth / 2 + this.rotationDirection * (width / 2)
        var distance = Math.abs(point - e.gesture.touches[0].pageX); // - window.innerWidth/2);
        //console.log('dragStart',distance);

        this.touchDistance = distance * 10;

      },

      _doDrag: function(e) {
        $ionicScrollDelegate.freezeScroll(true);
        var o = e.gesture.deltaY / 3;

        /*if (this.open) {
          this.y = this.openY + (e.gesture.deltaY * 0.4);
        } else {
          this.y = this.closedY + (e.gesture.deltaY * 0.50);
        }*/

        if (this.open) {
          this.y = this.openY + (e.gesture.deltaY * 0.75);
        } else {
          this.y = this.closedY + (e.gesture.deltaY * 0.75);
        }

        this.swiped = false;

        console.log('drag', this.y);

        this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(0, ' + this.y + 'px, 0)';
      },
      _doDragEnd: function(e, direction) {
        this.transitionOut(e, direction);
      },
      _doSwipeUp: function(e, direction) {
        this.transitionUp(e, direction);
      },
      _doSwipeDown: function(e, direction) {
        this.transitionDown(e, direction);
      }
    });

    return {
      restrict: 'E',
      template: '<div class="dish-tray" ng-transclude></div>',
      replace: true,
      transclude: true,
      compile: function(element, attr) {
        return function($scope, $element, $attr, swipeCards) {
          var el = $element[0];
          // Instantiate our card view - lazy hack to get events going
          window.draggableTray = new SwipeableCardView({
            el: el,
            openY: -window.innerHeight,
            closedY: 0
          });
        }
      }
    }
  };

  DishTrayDirective.$inject = ['$ionicScrollDelegate'];

  angular.module('dish.tray')
    .directive('dishTray', DishTrayDirective);
})(window.ionic);
(function() {
	'use strict';

	angular.module('dish.modal', []);
})();
(function() {
	'use strict';

	function DishModalService($window, $q, $ionicModal) {
		var _self = this;
		var dishModal, modalUrl;

		_self.open = function open($scope, name) {
			if (!name) return;
			modalUrl = 'views/dish-' + name + '/' + 'dish-' + name + '-modal.html';
			$ionicModal.fromTemplateUrl(modalUrl, {
				scope: $scope,
				hardwareBackButtonClose: false,
				focusFirstInput: true,
				animation: 'slide-in-up'
			}).then(function(modal) {
				dishModal = modal;
				dishModal.show();
			});
		};

		_self.close = function close() {
			if (!dishModal) return;
			dishModal.hide();
			dishModal.remove();
		};
	}

	DishModalService.$inject = ['$window', '$q', '$ionicModal'];

	angular.module('dish.modal')
		.service('dishModalService', DishModalService);
})();
(function() {
	'use strict';
	angular.module('dish.photo', []);
})();
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
angular.module('dish').factory('Auth', function(FURL, $firebaseAuth, $firebaseArray, $firebaseObject, $localStorage, Utils) {

  var ref = new Firebase(FURL);
  var auth = $firebaseAuth(ref);

  var Auth = {
    user: {},

    createProfile: function(uid, user) {
      var profile = {
        id: uid,
        email: user.email,
        username: user.username,
        gravatar: get_gravatar(user.email, 40),
        registered_in: Date()
      };

      var profileRef = $firebaseArray(ref.child('profile'));
      return profileRef.$add(profile).then(function(ref) {
        var id = ref.key();
        //console.log("added record with id " + id);
        profileRef.$indexFor(id); // returns location in the array
      });
    },

    login: function(user) {
      return auth.$authWithPassword({
        email: user.email,
        password: user.password
      });
    },

    signup: function(user) {
      return auth.$createUser({
          email: user.email,
          password: user.password
        })
        .then(function() {
          // authenticate so we have permission to write to Firebase
          return Auth.login(user);
        })
        .then(function(data) {
          // store user data in Firebase after creating account
          //console.log("datos del usuario:" + JSON.stringify(data));
          return Auth.createProfile(data.uid, user);
        });
    },

    logout: function() {
      auth.$unauth();
      console.log("Logout.");
    },

    resetPassword: function(user) {
      return auth.$resetPassword({
        email: user.email
      }).then(function() {
        Utils.alertshow("Password Reset.", "Check Your Email.");
        //console.log("Password reset email sent successfully!");
      }).catch(function(error) {
        Utils.errMessage(error);
        //console.error("Error: ", error.message);
      });
    },

    changePassword: function(user) {
      return auth.$changePassword({
        email: user.email,
        oldPassword: user.oldPass,
        newPassword: user.newPass
      });
    },

    signedIn: function() {
      return !!Auth.user.provider; //using !! means (0, undefined, null, etc) = false | otherwise = true
    }
  };

  auth.$onAuth(function(authData) {
    console.log('Authed', authData);
    if (authData) {
      angular.copy(authData, Auth.user);
      var obj = $firebaseObject(ref.child('profile').child($localStorage.userkey));

      obj.$loaded().then(function(data) {
        console.log('Loaded', data);
        Auth.user.profile = data;
      });

    } else {
      if (Auth.user && Auth.user.profile) {
        Auth.user.profile.$destroy();

      }

      angular.copy({}, Auth.user);
    }
  });

  function get_gravatar(email, size) {

    email = email.toLowerCase();

    var MD5 = function(s) {
      function L(k, d) {
        return (k << d) | (k >>> (32 - d))
      }

      function K(G, k) {
        var I, d, F, H, x;
        F = (G & 2147483648);
        H = (k & 2147483648);
        I = (G & 1073741824);
        d = (k & 1073741824);
        x = (G & 1073741823) + (k & 1073741823);
        if (I & d) {
          return (x ^ 2147483648 ^ F ^ H)
        }
        if (I | d) {
          if (x & 1073741824) {
            return (x ^ 3221225472 ^ F ^ H)
          } else {
            return (x ^ 1073741824 ^ F ^ H)
          }
        } else {
          return (x ^ F ^ H)
        }
      }

      function r(d, F, k) {
        return (d & F) | ((~d) & k)
      }

      function q(d, F, k) {
        return (d & k) | (F & (~k))
      }

      function p(d, F, k) {
        return (d ^ F ^ k)
      }

      function n(d, F, k) {
        return (F ^ (d | (~k)))
      }

      function u(G, F, aa, Z, k, H, I) {
        G = K(G, K(K(r(F, aa, Z), k), I));
        return K(L(G, H), F)
      }

      function f(G, F, aa, Z, k, H, I) {
        G = K(G, K(K(q(F, aa, Z), k), I));
        return K(L(G, H), F)
      }

      function D(G, F, aa, Z, k, H, I) {
        G = K(G, K(K(p(F, aa, Z), k), I));
        return K(L(G, H), F)
      }

      function t(G, F, aa, Z, k, H, I) {
        G = K(G, K(K(n(F, aa, Z), k), I));
        return K(L(G, H), F)
      }

      function e(G) {
        var Z;
        var F = G.length;
        var x = F + 8;
        var k = (x - (x % 64)) / 64;
        var I = (k + 1) * 16;
        var aa = Array(I - 1);
        var d = 0;
        var H = 0;
        while (H < F) {
          Z = (H - (H % 4)) / 4;
          d = (H % 4) * 8;
          aa[Z] = (aa[Z] | (G.charCodeAt(H) << d));
          H++
        }
        Z = (H - (H % 4)) / 4;
        d = (H % 4) * 8;
        aa[Z] = aa[Z] | (128 << d);
        aa[I - 2] = F << 3;
        aa[I - 1] = F >>> 29;
        return aa
      }

      function B(x) {
        var k = "",
          F = "",
          G, d;
        for (d = 0; d <= 3; d++) {
          G = (x >>> (d * 8)) & 255;
          F = "0" + G.toString(16);
          k = k + F.substr(F.length - 2, 2)
        }
        return k
      }

      function J(k) {
        k = k.replace(/rn/g, "n");
        var d = "";
        for (var F = 0; F < k.length; F++) {
          var x = k.charCodeAt(F);
          if (x < 128) {
            d += String.fromCharCode(x)
          } else {
            if ((x > 127) && (x < 2048)) {
              d += String.fromCharCode((x >> 6) | 192);
              d += String.fromCharCode((x & 63) | 128)
            } else {
              d += String.fromCharCode((x >> 12) | 224);
              d += String.fromCharCode(((x >> 6) & 63) | 128);
              d += String.fromCharCode((x & 63) | 128)
            }
          }
        }
        return d
      }
      var C = Array();
      var P, h, E, v, g, Y, X, W, V;
      var S = 7,
        Q = 12,
        N = 17,
        M = 22;
      var A = 5,
        z = 9,
        y = 14,
        w = 20;
      var o = 4,
        m = 11,
        l = 16,
        j = 23;
      var U = 6,
        T = 10,
        R = 15,
        O = 21;
      s = J(s);
      C = e(s);
      Y = 1732584193;
      X = 4023233417;
      W = 2562383102;
      V = 271733878;
      for (P = 0; P < C.length; P += 16) {
        h = Y;
        E = X;
        v = W;
        g = V;
        Y = u(Y, X, W, V, C[P + 0], S, 3614090360);
        V = u(V, Y, X, W, C[P + 1], Q, 3905402710);
        W = u(W, V, Y, X, C[P + 2], N, 606105819);
        X = u(X, W, V, Y, C[P + 3], M, 3250441966);
        Y = u(Y, X, W, V, C[P + 4], S, 4118548399);
        V = u(V, Y, X, W, C[P + 5], Q, 1200080426);
        W = u(W, V, Y, X, C[P + 6], N, 2821735955);
        X = u(X, W, V, Y, C[P + 7], M, 4249261313);
        Y = u(Y, X, W, V, C[P + 8], S, 1770035416);
        V = u(V, Y, X, W, C[P + 9], Q, 2336552879);
        W = u(W, V, Y, X, C[P + 10], N, 4294925233);
        X = u(X, W, V, Y, C[P + 11], M, 2304563134);
        Y = u(Y, X, W, V, C[P + 12], S, 1804603682);
        V = u(V, Y, X, W, C[P + 13], Q, 4254626195);
        W = u(W, V, Y, X, C[P + 14], N, 2792965006);
        X = u(X, W, V, Y, C[P + 15], M, 1236535329);
        Y = f(Y, X, W, V, C[P + 1], A, 4129170786);
        V = f(V, Y, X, W, C[P + 6], z, 3225465664);
        W = f(W, V, Y, X, C[P + 11], y, 643717713);
        X = f(X, W, V, Y, C[P + 0], w, 3921069994);
        Y = f(Y, X, W, V, C[P + 5], A, 3593408605);
        V = f(V, Y, X, W, C[P + 10], z, 38016083);
        W = f(W, V, Y, X, C[P + 15], y, 3634488961);
        X = f(X, W, V, Y, C[P + 4], w, 3889429448);
        Y = f(Y, X, W, V, C[P + 9], A, 568446438);
        V = f(V, Y, X, W, C[P + 14], z, 3275163606);
        W = f(W, V, Y, X, C[P + 3], y, 4107603335);
        X = f(X, W, V, Y, C[P + 8], w, 1163531501);
        Y = f(Y, X, W, V, C[P + 13], A, 2850285829);
        V = f(V, Y, X, W, C[P + 2], z, 4243563512);
        W = f(W, V, Y, X, C[P + 7], y, 1735328473);
        X = f(X, W, V, Y, C[P + 12], w, 2368359562);
        Y = D(Y, X, W, V, C[P + 5], o, 4294588738);
        V = D(V, Y, X, W, C[P + 8], m, 2272392833);
        W = D(W, V, Y, X, C[P + 11], l, 1839030562);
        X = D(X, W, V, Y, C[P + 14], j, 4259657740);
        Y = D(Y, X, W, V, C[P + 1], o, 2763975236);
        V = D(V, Y, X, W, C[P + 4], m, 1272893353);
        W = D(W, V, Y, X, C[P + 7], l, 4139469664);
        X = D(X, W, V, Y, C[P + 10], j, 3200236656);
        Y = D(Y, X, W, V, C[P + 13], o, 681279174);
        V = D(V, Y, X, W, C[P + 0], m, 3936430074);
        W = D(W, V, Y, X, C[P + 3], l, 3572445317);
        X = D(X, W, V, Y, C[P + 6], j, 76029189);
        Y = D(Y, X, W, V, C[P + 9], o, 3654602809);
        V = D(V, Y, X, W, C[P + 12], m, 3873151461);
        W = D(W, V, Y, X, C[P + 15], l, 530742520);
        X = D(X, W, V, Y, C[P + 2], j, 3299628645);
        Y = t(Y, X, W, V, C[P + 0], U, 4096336452);
        V = t(V, Y, X, W, C[P + 7], T, 1126891415);
        W = t(W, V, Y, X, C[P + 14], R, 2878612391);
        X = t(X, W, V, Y, C[P + 5], O, 4237533241);
        Y = t(Y, X, W, V, C[P + 12], U, 1700485571);
        V = t(V, Y, X, W, C[P + 3], T, 2399980690);
        W = t(W, V, Y, X, C[P + 10], R, 4293915773);
        X = t(X, W, V, Y, C[P + 1], O, 2240044497);
        Y = t(Y, X, W, V, C[P + 8], U, 1873313359);
        V = t(V, Y, X, W, C[P + 15], T, 4264355552);
        W = t(W, V, Y, X, C[P + 6], R, 2734768916);
        X = t(X, W, V, Y, C[P + 13], O, 1309151649);
        Y = t(Y, X, W, V, C[P + 4], U, 4149444226);
        V = t(V, Y, X, W, C[P + 11], T, 3174756917);
        W = t(W, V, Y, X, C[P + 2], R, 718787259);
        X = t(X, W, V, Y, C[P + 9], O, 3951481745);
        Y = K(Y, h);
        X = K(X, E);
        W = K(W, v);
        V = K(V, g)
      }
      var i = B(Y) + B(X) + B(W) + B(V);
      return i.toLowerCase()
    };

    var size = size || 80;

    return 'https://www.gravatar.com/avatar/' + MD5(email) + '.jpg?d=identicon';
  }

  return Auth;

});
angular.module('dish').factory('Utils', function($ionicLoading, $ionicPopup) {

	var Utils = {

		show: function() {
			$ionicLoading.show({
				animation: 'fade-in',
				showBackdrop: false,
				maxWidth: 200,
				showDelay: 500,
				template: '<p class="item-icon-left">Loading...<ion-spinner icon="lines"/></p>'
			});
		},

		hide: function() {
			$ionicLoading.hide();
		},

		alertshow: function(tit, msg) {
			var alertPopup = $ionicPopup.alert({
				title: tit,
				template: msg
			});
			alertPopup.then(function(res) {
				//console.log('Registrado correctamente.');
			});
		},

		errMessage: function(err) {

			var msg = "Unknown Error...";

			if (err && err.code) {
				switch (err.code) {
					case "EMAIL_TAKEN":
						msg = "This Email has been taken.";
						break;
					case "INVALID_EMAIL":
						msg = "Invalid Email.";
						break;
					case "NETWORK_ERROR":
						msg = "Network Error.";
						break;
					case "INVALID_PASSWORD":
						msg = "Invalid Password.";
						break;
					case "INVALID_USER":
						msg = "Invalid User.";
						break;
				}
			}
			Utils.alertshow("Error", msg);
		},


	};

	return Utils;

});
(function() {
	'use strict';

	angular.module('dish.forgot', []);
})();
(function() {
  'use strict';

  function DishForgotController($scope, $log, Auth, dishSliderService) {

    $scope.resetPassword = function(user) {
      $log.log('oh', user);
      if (angular.isDefined(user)) {
        Auth.resetPassword(user).then(function() {
          $log.log("Password reset email sent successfully!");
        }, function(err) {
          $log.error("Error: ", err);
        });
      }
    };

    $scope.toLogin = function() {
      dishSliderService.slide(1);
    };
  }

  DishForgotController.$inject = ['$scope', '$log', 'Auth', 'dishSliderService'];

  angular.module('dish.forgot')
    .controller('dishForgotController', DishForgotController);
})();
(function() {
	'use strict';

	angular.module('dish.login', []);
})();
(function() {
	'use strict';

	function DishLoginController($scope, $log, $localStorage, $firebaseObject, Utils, Auth, FURL, dishSliderService, dishModalService) {
		var ref = new Firebase(FURL);
		var userkey = '';

		$scope.login = function(user) {
			$log.log('Logging In', user);
			if (angular.isDefined(user)) {
				Utils.show();
				Auth.login(user).then(function(authData) {
					//console.log('user id:' + JSON.stringify(authData));

					ref.child('profile').orderByChild('id').equalTo(authData.uid).on('child_added', function(snapshot) {
						console.log(snapshot.key());
						userkey = snapshot.key();
						$log.log('userkey', userkey);
						var obj = $firebaseObject(ref.child('profile').child(userkey));
						$log.log('profile', obj);

						obj.$loaded().then(function(data) {
								$log.log('the data', data);
								$localStorage.email = obj.email;
								$localStorage.userkey = userkey;

								$log.log('userkey', $localStorage.userkey);

								Auth.user.profile = data;
								$scope.currentUser = Auth.user;

								Utils.hide();
								dishModalService.close();
							})
							.catch(function(error) {
								console.error('Error:', error);
							});
					});

				}, function(err) {
					Utils.hide();
					Utils.errMessage(err);
				});
			}
		};

		$scope.toSignup = function() {
			dishSliderService.slide(0);
		};

		$scope.toForgot = function() {
			dishSliderService.slide(2);
		}
	}

	DishLoginController.$inject = ['$scope', '$log', '$localStorage', '$firebaseObject', 'Utils', 'Auth', 'FURL', 'dishSliderService', 'dishModalService'];

	angular.module('dish.login')
		.controller('dishLoginController', DishLoginController);
})();
(function() {
	'use strict';

	angular.module('dish.signup', []);
})();
(function() {
  'use strict';

  function DishSignupController($scope, $log, $controller, Auth, Utils, dishSliderService) {

    //This allows us to reference the loginController from within signup
    var dishLoginController = $scope.$new(); //You need to supply a scope while instantiating.
    //Provide the scope, you can also do $scope.$new(true) in order to create an isolated scope.
    //In this case it is the child scope of this scope.
    $controller('dishLoginController', {
      $scope: dishLoginController
    });

    $scope.signup = function(user) {
      $log.log('signup', user);
      if (angular.isDefined(user)) {
        Utils.show();
        Auth.signup(user).then(function(authData) {
          $log.log('User successfully created:', authData);
          dishLoginController.login(user);
        }, function(err) {
          Utils.hide();
          Utils.errMessage(err);
        });
      }
    };

    $scope.toLogin = function() {
      dishSliderService.slide(1);
    };
  }

  DishSignupController.$inject = ['$scope', '$log', '$controller', 'Auth', 'Utils', 'dishSliderService'];

  angular.module('dish.signup')
    .controller('dishSignupController', DishSignupController);
})();
(function() {
	'use strict';

	angular.module('dish.home', []);
})();
(function() {
	'use strict';

	function DishHomeController($scope, $log, Auth, dishKeyboardService, dishModalService) {

		$scope.swiper = {};
		$scope.currentUser = Auth.user;

		//We use this to populate the swiper screens, as it only fires when it's got an ng-repeat included with it
		$scope.screens = [{
			template: 'dish-cook/dish-cook.html'
		}, {
			template: 'dish-food/dish-food.html'
		}, {
			template: 'dish-favorites/dish-favorites.html'
		}];

		$scope.getCardWidth = function(food, index) {
			return window.innerWidth;
		}

		$scope.getCardHeight = function(food, index) {
			return window.innerHeight;
		}

		$scope.toCook = function() {
			$log.log('toCook');
			$scope.swiper.slideTo(0);
		}

		$scope.toFood = function() {
			$log.log('toFood');
			$scope.swiper.slideTo(1);
		}

		$scope.toProfile = function() {
			$log.log('toProfile');
			$scope.swiper.slideTo(2);
		}

		$scope.onSwiperReady = function(swiper) {
			swiper.on('sliderMove', function() {
				dishKeyboardService.close();
			});
		}

		$scope.onScroll = function() {
			dishKeyboardService.close();
		}

		$scope.openModal = function(name) {
			if (!name) return;
			dishModalService.open($scope, name);
		}

		$scope.closeModal = function() {
			dishModalService.close();
		}
	}

	DishHomeController.$inject = ['$scope', '$log', 'Auth', 'dishKeyboardService', 'dishModalService'];

	angular.module('dish.home')
		.controller('dishHomeController', DishHomeController);
})();
(function() {
	'use strict';

	angular.module('dish.food', []);
})();
(function() {
	'use strict';

	function DishFoodController($scope, $log) {
		$scope.foods = [{}, {}, {}, {}, {}, {}];

		$scope.food = function() {
			$log.log('food');
		};

	}

	DishFoodController.$inject = ['$scope', '$log'];

	angular.module('dish.forgot')
		.controller('dishFoodController', DishFoodController);
})();
(function() {
	'use strict';

	angular.module('dish.cook', []);
})();
(function() {
  'use strict';

  function DishCookController($scope, $log) {
    $scope.recipes = [{}, {}, {}, {}, {}, {}];

    $scope.cook = function() {
      $log.log('cook');
    };

  }

  DishCookController.$inject = ['$scope', '$log'];

  angular.module('dish.cook')
    .controller('dishCookController', DishCookController);
})();
(function() {
	'use strict';

	angular.module('dish.profile', []);
})();
(function() {
	'use strict';

	function DishProfileController($scope, $log, Auth, dishModalService) {}

	DishProfileController.$inject = ['$scope', '$log', 'Auth', 'dishModalService'];

	angular.module('dish.profile')
		.controller('dishProfileController', DishProfileController);
})();
(function() {
	'use strict';

	angular.module('dish.favorites', []);
})();
(function() {
	'use strict';

	function DishFavoritesController($scope, $log) {

		//In order to display the profile card, we'll always have an empty object as the first element in the array, and populate favorites accordingly after that.
		$scope.favorites = [{}, {}, {}];

		$scope.favorite = function() {
			$log.log('favorite');
		};
	}

	DishFavoritesController.$inject = ['$scope', '$log'];

	angular.module('dish.favorites')
		.controller('dishFavoritesController', DishFavoritesController);
})();
(function() {
	'use strict';

	angular.module('dish.payment', []);
})();
(function() {
	'use strict';

	function DishPaymentController($scope, $log, $controller, Auth, Utils) {

		$scope.delete = function() {
			$log.log('delete');
		}

		$scope.add = function() {
			$log.log('add');
		};

		$scope.getCardHeight = function(payment, index) {
			if (index === 0) {
				return 271;
			} else if (index === $scope.payments.length - 1) {
				return 236;
			} else {
				return 226;
			}
		};

		$scope.payments = [{
			type: 'delete'
		}, {
			type: 'delete'
		}, {
			type: 'add'
		}];

	}

	DishPaymentController.$inject = ['$scope', '$log', '$controller', 'Auth', 'Utils'];

	angular.module('dish.payment')
		.controller('dishPaymentController', DishPaymentController);
})();
(function() {
	'use strict';

	angular.module('dish.transactions', []);
})();
(function() {
	'use strict';

	function DishTransactionsController($scope, $log) {

		//In order to display the profile card, we'll always have an empty object as the first element in the array, and populate transactions accordingly after that.
		$scope.transactions = [{}, {}, {}];

		$scope.transaction = function() {
			$log.log('transaction');
		};
	}

	DishTransactionsController.$inject = ['$scope', '$log'];

	angular.module('dish.transactions')
		.controller('dishTransactionsController', DishTransactionsController);
})();
(function() {
	'use strict';

	angular.module('dish.promotions', []);
})();
(function() {
	'use strict';

	function DishPromotionsController($scope, $log, $controller, Auth, Utils) {

		$scope.invite = function() {
			$log.log('invite');
		};

		$scope.rate = function() {
			$log.log('rate');
		};

		$scope.share = function() {
			$log.log('share');
		};

		$scope.getCardHeight = function(promotion, index) {
			if (index === 0) {
				return 165;
			} else if (index === $scope.promotions.length - 1) {
				return 125;
			} else {
				return 115;
			}
		};

		$scope.promotions = [{
			icon: 'ion-android-person',
			command: $scope.invite,
			button: 'Invite a Friend and<br/>Get a meal for free'
		}, {
			icon: 'ion-ios-heart',
			command: $scope.rate,
			button: 'Recommend Dish and get a free meal'
		}, {
			icon: 'ion-ios-upload',
			command: $scope.share,
			button: 'Share Dish and get<br/>a meal for free'
		}];

	}

	DishPromotionsController.$inject = ['$scope', '$log', '$controller', 'Auth', 'Utils'];

	angular.module('dish.promotions')
		.controller('dishPromotionsController', DishPromotionsController);
})();
(function() {
	'use strict';

	angular.module('dish.help', []);
})();
(function() {
  'use strict';

  function DishHelpController($scope, $log, $controller, Auth, Utils) {

    $scope.help = function() {
      $log.log('help');
    };

  }

  DishHelpController.$inject = ['$scope', '$log', '$controller', 'Auth', 'Utils'];

  angular.module('dish.help')
    .controller('dishHelpController', DishHelpController);
})();
(function() {
	'use strict';

	angular.module('dish.settings', []);
})();
(function() {
  'use strict';

  function DishSettingsController($scope, $log, $controller, Auth, Utils, dishModalService) {

    $scope.logout = function() {
      $log.log('logout');
      Auth.logout();
      dishModalService.open($scope, 'signup');
    };

  }

  DishSettingsController.$inject = ['$scope', '$log', '$controller', 'Auth', 'Utils', 'dishModalService'];

  angular.module('dish.settings')
    .controller('dishSettingsController', DishSettingsController);
})();
/*!
 * ngCordova
 * v0.1.20-alpha
 * Copyright 2015 Drifty Co. http://drifty.com/
 * See LICENSE in this repository for license information
 */
!function(){angular.module("ngCordova",["ngCordova.plugins"]),angular.module("ngCordova.plugins.actionSheet",[]).factory("$cordovaActionSheet",["$q","$window",function(e,n){return{show:function(t){var r=e.defer();return n.plugins.actionsheet.show(t,function(e){r.resolve(e)}),r.promise},hide:function(){return n.plugins.actionsheet.hide()}}}]),angular.module("ngCordova.plugins.adMob",[]).factory("$cordovaAdMob",["$q","$window",function(e,n){return{createBannerView:function(t){var r=e.defer();return n.plugins.AdMob.createBannerView(t,function(){r.resolve()},function(){r.reject()}),r.promise},createInterstitialView:function(t){var r=e.defer();return n.plugins.AdMob.createInterstitialView(t,function(){r.resolve()},function(){r.reject()}),r.promise},requestAd:function(t){var r=e.defer();return n.plugins.AdMob.requestAd(t,function(){r.resolve()},function(){r.reject()}),r.promise},showAd:function(t){var r=e.defer();return n.plugins.AdMob.showAd(t,function(){r.resolve()},function(){r.reject()}),r.promise},requestInterstitialAd:function(t){var r=e.defer();return n.plugins.AdMob.requestInterstitialAd(t,function(){r.resolve()},function(){r.reject()}),r.promise}}}]),angular.module("ngCordova.plugins.appAvailability",[]).factory("$cordovaAppAvailability",["$q",function(e){return{check:function(n){var t=e.defer();return appAvailability.check(n,function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise}}}]),angular.module("ngCordova.plugins.appRate",[]).provider("$cordovaAppRate",[function(){this.setPreferences=function(e){e&&angular.isObject(e)&&(AppRate.preferences.useLanguage=e.language||null,AppRate.preferences.displayAppName=e.appName||"",AppRate.preferences.promptAgainForEachNewVersion=e.promptForNewVersion||!0,AppRate.preferences.openStoreInApp=e.openStoreInApp||!1,AppRate.preferences.usesUntilPrompt=e.usesUntilPrompt||3,AppRate.preferences.useCustomRateDialog=e.useCustomRateDialog||!1,AppRate.preferences.storeAppURL.ios=e.iosURL||null,AppRate.preferences.storeAppURL.android=e.androidURL||null,AppRate.preferences.storeAppURL.blackberry=e.blackberryURL||null,AppRate.preferences.storeAppURL.windows8=e.windowsURL||null)},this.setCustomLocale=function(e){var n={title:"Rate %@",message:"If you enjoy using %@, would you mind taking a moment to rate it? It won’t take more than a minute. Thanks for your support!",cancelButtonLabel:"No, Thanks",laterButtonLabel:"Remind Me Later",rateButtonLabel:"Rate It Now"};n=angular.extend(n,e),AppRate.preferences.customLocale=n},this.$get=["$q",function(e){return{promptForRating:function(n){var t=e.defer(),r=AppRate.promptForRating(n);return t.resolve(r),t.promise},navigateToAppStore:function(){var n=e.defer(),t=AppRate.navigateToAppStore();return n.resolve(t),n.promise},onButtonClicked:function(e){AppRate.onButtonClicked=function(n){e.call(this,n)}},onRateDialogShow:function(e){AppRate.onRateDialogShow=e()}}}]}]),angular.module("ngCordova.plugins.appVersion",[]).factory("$cordovaAppVersion",["$q",function(e){return{getVersionNumber:function(){var n=e.defer();return cordova.getAppVersion.getVersionNumber(function(e){n.resolve(e)}),n.promise},getVersionCode:function(){var n=e.defer();return cordova.getAppVersion.getVersionCode(function(e){n.resolve(e)}),n.promise}}}]),angular.module("ngCordova.plugins.backgroundGeolocation",[]).factory("$cordovaBackgroundGeolocation",["$q","$window",function(e,n){return{init:function(){n.navigator.geolocation.getCurrentPosition(function(e){return e})},configure:function(t){this.init();var r=e.defer();return n.plugins.backgroundGeoLocation.configure(function(e){r.notify(e),n.plugins.backgroundGeoLocation.finish()},function(e){r.reject(e)},t),this.start(),r.promise},start:function(){var t=e.defer();return n.plugins.backgroundGeoLocation.start(function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},stop:function(){var t=e.defer();return n.plugins.backgroundGeoLocation.stop(function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise}}}]),angular.module("ngCordova.plugins.badge",[]).factory("$cordovaBadge",["$q",function(e){return{hasPermission:function(){var n=e.defer();return cordova.plugins.notification.badge.hasPermission(function(e){e?n.resolve(!0):n.reject("You do not have permission")}),n.promise},promptForPermission:function(){return cordova.plugins.notification.badge.promptForPermission()},set:function(n,t,r){var o=e.defer();return cordova.plugins.notification.badge.hasPermission(function(e){e?o.resolve(cordova.plugins.notification.badge.set(n,t,r)):o.reject("You do not have permission to set Badge")}),o.promise},get:function(){var n=e.defer();return cordova.plugins.notification.badge.hasPermission(function(e){e?cordova.plugins.notification.badge.get(function(e){n.resolve(e)}):n.reject("You do not have permission to get Badge")}),n.promise},clear:function(n,t){var r=e.defer();return cordova.plugins.notification.badge.hasPermission(function(e){e?r.resolve(cordova.plugins.notification.badge.clear(n,t)):r.reject("You do not have permission to clear Badge")}),r.promise},increase:function(n,t,r){var o=e.defer();return this.hasPermission().then(function(){o.resolve(cordova.plugins.notification.badge.increase(n,t,r))},function(){o.reject("You do not have permission to increase Badge")}),o.promise},decrease:function(n,t,r){var o=e.defer();return this.hasPermission().then(function(){o.resolve(cordova.plugins.notification.badge.decrease(n,t,r))},function(){o.reject("You do not have permission to decrease Badge")}),o.promise},configure:function(e){return cordova.plugins.notification.badge.configure(e)}}}]),angular.module("ngCordova.plugins.barcodeScanner",[]).factory("$cordovaBarcodeScanner",["$q",function(e){return{scan:function(n){var t=e.defer();return cordova.plugins.barcodeScanner.scan(function(e){t.resolve(e)},function(e){t.reject(e)},n),t.promise},encode:function(n,t){var r=e.defer();return n=n||"TEXT_TYPE",cordova.plugins.barcodeScanner.encode(n,t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise}}}]),angular.module("ngCordova.plugins.batteryStatus",[]).factory("$cordovaBatteryStatus",["$rootScope","$window","$timeout",function(e,n,t){var r=function(n){t(function(){e.$broadcast("$cordovaBatteryStatus:status",n)})},o=function(n){t(function(){e.$broadcast("$cordovaBatteryStatus:critical",n)})},i=function(n){t(function(){e.$broadcast("$cordovaBatteryStatus:low",n)})};return document.addEventListener("deviceready",function(){navigator.battery&&(n.addEventListener("batterystatus",r,!1),n.addEventListener("batterycritical",o,!1),n.addEventListener("batterylow",i,!1))},!1),!0}]).run(["$injector",function(e){e.get("$cordovaBatteryStatus")}]),angular.module("ngCordova.plugins.ble",[]).factory("$cordovaBLE",["$q","$timeout",function(e,n){return{scan:function(t,r){var o=e.defer();return ble.startScan(t,function(e){o.notify(e)},function(e){o.reject(e)}),n(function(){ble.stopScan(function(){o.resolve()},function(e){o.reject(e)})},1e3*r),o.promise},connect:function(n){var t=e.defer();return ble.connect(n,function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},disconnect:function(n){var t=e.defer();return ble.disconnect(n,function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},read:function(n,t,r){var o=e.defer();return ble.read(n,t,r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},write:function(n,t,r,o){var i=e.defer();return ble.write(n,t,r,o,function(e){i.resolve(e)},function(e){i.reject(e)}),i.promise},writeCommand:function(n,t,r,o){var i=e.defer();return ble.writeCommand(n,t,r,o,function(e){i.resolve(e)},function(e){i.reject(e)}),i.promise},startNotification:function(n,t,r){var o=e.defer();return ble.startNotification(n,t,r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},stopNotification:function(n,t,r){var o=e.defer();return ble.stopNotification(n,t,r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},isConnected:function(n){var t=e.defer();return ble.isConnected(n,function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},isEnabled:function(){var n=e.defer();return ble.isEnabled(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise}}}]),angular.module("ngCordova.plugins.bluetoothSerial",[]).factory("$cordovaBluetoothSerial",["$q","$window",function(e,n){return{connect:function(t){var r=e.defer(),o=e.defer(),i=!1;return n.bluetoothSerial.connect(t,function(){i=!0,r.resolve(o)},function(e){i===!1&&o.reject(e),r.reject(e)}),r.promise},connectInsecure:function(t){var r=e.defer();return n.bluetoothSerial.connectInsecure(t,function(){r.resolve()},function(e){r.reject(e)}),r.promise},disconnect:function(){var t=e.defer();return n.bluetoothSerial.disconnect(function(){t.resolve()},function(e){t.reject(e)}),t.promise},list:function(){var t=e.defer();return n.bluetoothSerial.list(function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},discoverUnpaired:function(){var t=e.defer();return n.bluetoothSerial.discoverUnpaired(function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},setDeviceDiscoveredListener:function(){var t=e.defer();return n.bluetoothSerial.setDeviceDiscoveredListener(function(e){t.notify(e)}),t.promise},clearDeviceDiscoveredListener:function(){n.bluetoothSerial.clearDeviceDiscoveredListener()},showBluetoothSettings:function(){var t=e.defer();return n.bluetoothSerial.showBluetoothSettings(function(){t.resolve()},function(e){t.reject(e)}),t.promise},isEnabled:function(){var t=e.defer();return n.bluetoothSerial.isEnabled(function(){t.resolve()},function(){t.reject()}),t.promise},enable:function(){var t=e.defer();return n.bluetoothSerial.enable(function(){t.resolve()},function(){t.reject()}),t.promise},isConnected:function(){var t=e.defer();return n.bluetoothSerial.isConnected(function(){t.resolve()},function(){t.reject()}),t.promise},available:function(){var t=e.defer();return n.bluetoothSerial.available(function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},read:function(){var t=e.defer();return n.bluetoothSerial.read(function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},readUntil:function(t){var r=e.defer();return n.bluetoothSerial.readUntil(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},write:function(t){var r=e.defer();return n.bluetoothSerial.write(t,function(){r.resolve()},function(e){r.reject(e)}),r.promise},subscribe:function(t){var r=e.defer();return n.bluetoothSerial.subscribe(t,function(e){r.notify(e)},function(e){r.reject(e)}),r.promise},subscribeRawData:function(){var t=e.defer();return n.bluetoothSerial.subscribeRawData(function(e){t.notify(e)},function(e){t.reject(e)}),t.promise},unsubscribe:function(){var t=e.defer();return n.bluetoothSerial.unsubscribe(function(){t.resolve()},function(e){t.reject(e)}),t.promise},unsubscribeRawData:function(){var t=e.defer();return n.bluetoothSerial.unsubscribeRawData(function(){t.resolve()},function(e){t.reject(e)}),t.promise},clear:function(){var t=e.defer();return n.bluetoothSerial.clear(function(){t.resolve()},function(e){t.reject(e)}),t.promise},readRSSI:function(){var t=e.defer();return n.bluetoothSerial.readRSSI(function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise}}}]),angular.module("ngCordova.plugins.brightness",[]).factory("$cordovaBrightness",["$q","$window",function(e,n){return{get:function(){var t=e.defer();return n.cordova?n.cordova.plugins.brightness.getBrightness(function(e){t.resolve(e)},function(e){t.reject(e)}):t.reject("Not supported without cordova.js"),t.promise},set:function(t){var r=e.defer();return n.cordova?n.cordova.plugins.brightness.setBrightness(t,function(e){r.resolve(e)},function(e){r.reject(e)}):r.reject("Not supported without cordova.js"),r.promise},setKeepScreenOn:function(t){var r=e.defer();return n.cordova?n.cordova.plugins.brightness.setKeepScreenOn(t,function(e){r.resolve(e)},function(e){r.reject(e)}):r.reject("Not supported without cordova.js"),r.promise}}}]),angular.module("ngCordova.plugins.calendar",[]).factory("$cordovaCalendar",["$q","$window",function(e,n){return{createCalendar:function(t){var r=e.defer(),o=n.plugins.calendar.getCreateCalendarOptions();return"string"==typeof t?o.calendarName=t:o=angular.extend(o,t),n.plugins.calendar.createCalendar(o,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},deleteCalendar:function(t){var r=e.defer();return n.plugins.calendar.deleteCalendar(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},createEvent:function(t){var r=e.defer(),o={title:null,location:null,notes:null,startDate:null,endDate:null};return o=angular.extend(o,t),n.plugins.calendar.createEvent(o.title,o.location,o.notes,new Date(o.startDate),new Date(o.endDate),function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},createEventWithOptions:function(t){var r=e.defer(),o=[],i=window.plugins.calendar.getCalendarOptions(),a={title:null,location:null,notes:null,startDate:null,endDate:null};o=Object.keys(a);for(var c in t)-1===o.indexOf(c)?i[c]=t[c]:a[c]=t[c];return n.plugins.calendar.createEventWithOptions(a.title,a.location,a.notes,new Date(a.startDate),new Date(a.endDate),i,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},createEventInteractively:function(t){var r=e.defer(),o={title:null,location:null,notes:null,startDate:null,endDate:null};return o=angular.extend(o,t),n.plugins.calendar.createEventInteractively(o.title,o.location,o.notes,new Date(o.startDate),new Date(o.endDate),function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},createEventInNamedCalendar:function(t){var r=e.defer(),o={title:null,location:null,notes:null,startDate:null,endDate:null,calendarName:null};return o=angular.extend(o,t),n.plugins.calendar.createEventInNamedCalendar(o.title,o.location,o.notes,new Date(o.startDate),new Date(o.endDate),o.calendarName,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},findEvent:function(t){var r=e.defer(),o={title:null,location:null,notes:null,startDate:null,endDate:null};return o=angular.extend(o,t),n.plugins.calendar.findEvent(o.title,o.location,o.notes,new Date(o.startDate),new Date(o.endDate),function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},listEventsInRange:function(t,r){var o=e.defer();return n.plugins.calendar.listEventsInRange(t,r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},listCalendars:function(){var t=e.defer();return n.plugins.calendar.listCalendars(function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},findAllEventsInNamedCalendar:function(t){var r=e.defer();return n.plugins.calendar.findAllEventsInNamedCalendar(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},modifyEvent:function(t){var r=e.defer(),o={title:null,location:null,notes:null,startDate:null,endDate:null,newTitle:null,newLocation:null,newNotes:null,newStartDate:null,newEndDate:null};return o=angular.extend(o,t),n.plugins.calendar.modifyEvent(o.title,o.location,o.notes,new Date(o.startDate),new Date(o.endDate),o.newTitle,o.newLocation,o.newNotes,new Date(o.newStartDate),new Date(o.newEndDate),function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},deleteEvent:function(t){var r=e.defer(),o={newTitle:null,location:null,notes:null,startDate:null,endDate:null};return o=angular.extend(o,t),n.plugins.calendar.deleteEvent(o.newTitle,o.location,o.notes,new Date(o.startDate),new Date(o.endDate),function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise}}}]),angular.module("ngCordova.plugins.camera",[]).factory("$cordovaCamera",["$q",function(e){return{getPicture:function(n){var t=e.defer();return navigator.camera?(navigator.camera.getPicture(function(e){t.resolve(e)},function(e){t.reject(e)},n),t.promise):(t.resolve(null),t.promise)},cleanup:function(){var n=e.defer();return navigator.camera.cleanup(function(){n.resolve()},function(e){n.reject(e)}),n.promise}}}]),angular.module("ngCordova.plugins.capture",[]).factory("$cordovaCapture",["$q",function(e){return{captureAudio:function(n){var t=e.defer();return navigator.device.capture?(navigator.device.capture.captureAudio(function(e){t.resolve(e)},function(e){t.reject(e)},n),t.promise):(t.resolve(null),t.promise)},captureImage:function(n){var t=e.defer();return navigator.device.capture?(navigator.device.capture.captureImage(function(e){t.resolve(e)},function(e){t.reject(e)},n),t.promise):(t.resolve(null),t.promise)},captureVideo:function(n){var t=e.defer();return navigator.device.capture?(navigator.device.capture.captureVideo(function(e){t.resolve(e)},function(e){t.reject(e)},n),t.promise):(t.resolve(null),t.promise)}}}]),angular.module("ngCordova.plugins.cardIO",[]).provider("$cordovaNgCardIO",[function(){var e=["card_type","redacted_card_number","card_number","expiry_month","expiry_year","short_expiry_year","cvv","zip"],n={expiry:!0,cvv:!0,zip:!1,suppressManual:!1,suppressConfirm:!1,hideLogo:!0};this.setCardIOResponseFields=function(n){n&&angular.isArray(n)&&(e=n)},this.setScanerConfig=function(e){e&&angular.isObject(e)&&(n.expiry=e.expiry||!0,n.cvv=e.cvv||!0,n.zip=e.zip||!1,n.suppressManual=e.suppressManual||!1,n.suppressConfirm=e.suppressConfirm||!1,n.hideLogo=e.hideLogo||!0)},this.$get=["$q",function(t){return{scanCard:function(){var r=t.defer();return CardIO.scan(n,function(n){if(null===n)r.reject(null);else{for(var t={},o=0,i=e.length;i>o;o++){var a=e[o];"short_expiry_year"===a?t[a]=String(n.expiry_year).substr(2,2)||"":t[a]=n[a]||""}r.resolve(t)}},function(){r.reject(null)}),r.promise}}}]}]),angular.module("ngCordova.plugins.clipboard",[]).factory("$cordovaClipboard",["$q","$window",function(e,n){return{copy:function(t){var r=e.defer();return n.cordova.plugins.clipboard.copy(t,function(){r.resolve()},function(){r.reject()}),r.promise},paste:function(){var t=e.defer();return n.cordova.plugins.clipboard.paste(function(e){t.resolve(e)},function(){t.reject()}),t.promise}}}]),angular.module("ngCordova.plugins.contacts",[]).factory("$cordovaContacts",["$q",function(e){return{save:function(n){var t=e.defer(),r=navigator.contacts.create(n);return r.save(function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},remove:function(n){var t=e.defer(),r=navigator.contacts.create(n);return r.remove(function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},clone:function(e){var n=navigator.contacts.create(e);return n.clone(e)},find:function(n){var t=e.defer(),r=n.fields||["id","displayName"];return delete n.fields,0===Object.keys(n).length?navigator.contacts.find(r,function(e){t.resolve(e)},function(e){t.reject(e)}):navigator.contacts.find(r,function(e){t.resolve(e)},function(e){t.reject(e)},n),t.promise},pickContact:function(){var n=e.defer();return navigator.contacts.pickContact(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise}}}]),angular.module("ngCordova.plugins.datePicker",[]).factory("$cordovaDatePicker",["$window","$q",function(e,n){return{show:function(t){var r=n.defer();return t=t||{date:new Date,mode:"date"},e.datePicker.show(t,function(e){r.resolve(e)}),r.promise}}}]),angular.module("ngCordova.plugins.device",[]).factory("$cordovaDevice",[function(){return{getDevice:function(){return device},getCordova:function(){return device.cordova},getModel:function(){return device.model},getName:function(){return device.name},getPlatform:function(){return device.platform},getUUID:function(){return device.uuid},getVersion:function(){return device.version},getManufacturer:function(){return device.manufacturer}}}]),angular.module("ngCordova.plugins.deviceMotion",[]).factory("$cordovaDeviceMotion",["$q",function(e){return{getCurrentAcceleration:function(){var n=e.defer();return(angular.isUndefined(navigator.accelerometer)||!angular.isFunction(navigator.accelerometer.getCurrentAcceleration))&&n.reject("Device do not support watchAcceleration"),navigator.accelerometer.getCurrentAcceleration(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise},watchAcceleration:function(n){var t=e.defer();(angular.isUndefined(navigator.accelerometer)||!angular.isFunction(navigator.accelerometer.watchAcceleration))&&t.reject("Device do not support watchAcceleration");var r=navigator.accelerometer.watchAcceleration(function(e){t.notify(e)},function(e){t.reject(e)},n);return t.promise.cancel=function(){navigator.accelerometer.clearWatch(r)},t.promise.clearWatch=function(e){navigator.accelerometer.clearWatch(e||r)},t.promise.watchID=r,t.promise},clearWatch:function(e){return navigator.accelerometer.clearWatch(e)}}}]),angular.module("ngCordova.plugins.deviceOrientation",[]).factory("$cordovaDeviceOrientation",["$q",function(e){var n={frequency:3e3};return{getCurrentHeading:function(){var n=e.defer();return navigator.compass?(navigator.compass.getCurrentHeading(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise):(n.reject("No compass on Device"),n.promise)},watchHeading:function(t){var r=e.defer();if(!navigator.compass)return r.reject("No compass on Device"),r.promise;var o=angular.extend(n,t),i=navigator.compass.watchHeading(function(e){r.notify(e)},function(e){r.reject(e)},o);return r.promise.cancel=function(){navigator.compass.clearWatch(i)},r.promise.clearWatch=function(e){navigator.compass.clearWatch(e||i)},r.promise.watchID=i,r.promise},clearWatch:function(e){return navigator.compass.clearWatch(e)}}}]),angular.module("ngCordova.plugins.dialogs",[]).factory("$cordovaDialogs",["$q","$window",function(e,n){return{alert:function(t,r,o){var i=e.defer();return n.navigator.notification?navigator.notification.alert(t,function(){i.resolve()},r,o):(n.alert(t),i.resolve()),i.promise},confirm:function(t,r,o){var i=e.defer();return n.navigator.notification?navigator.notification.confirm(t,function(e){i.resolve(e)},r,o):n.confirm(t)?i.resolve(1):i.resolve(2),i.promise},prompt:function(t,r,o,i){var a=e.defer();if(n.navigator.notification)navigator.notification.prompt(t,function(e){a.resolve(e)},r,o,i);else{var c=n.prompt(t,i);null!==c?a.resolve({input1:c,buttonIndex:1}):a.resolve({input1:c,buttonIndex:2})}return a.promise},beep:function(e){return navigator.notification.beep(e)}}}]),angular.module("ngCordova.plugins.emailComposer",[]).factory("$cordovaEmailComposer",["$q",function(e){return{isAvailable:function(){var n=e.defer();return cordova.plugins.email.isAvailable(function(e){e?n.resolve():n.reject()}),n.promise},open:function(n){var t=e.defer();return cordova.plugins.email.open(n,function(){t.reject()}),t.promise},addAlias:function(e,n){cordova.plugins.email.addAlias(e,n)}}}]),angular.module("ngCordova.plugins.facebook",[]).provider("$cordovaFacebook",[function(){this.browserInit=function(e,n){this.appID=e,this.appVersion=n||"v2.0",facebookConnectPlugin.browserInit(this.appID,this.appVersion)},this.$get=["$q",function(e){return{login:function(n){var t=e.defer();return facebookConnectPlugin.login(n,function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},showDialog:function(n){var t=e.defer();return facebookConnectPlugin.showDialog(n,function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},api:function(n,t){var r=e.defer();return facebookConnectPlugin.api(n,t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},getAccessToken:function(){var n=e.defer();return facebookConnectPlugin.getAccessToken(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise},getLoginStatus:function(){var n=e.defer();return facebookConnectPlugin.getLoginStatus(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise},logout:function(){var n=e.defer();return facebookConnectPlugin.logout(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise}}}]}]),angular.module("ngCordova.plugins.facebookAds",[]).factory("$cordovaFacebookAds",["$q","$window",function(e,n){return{setOptions:function(t){var r=e.defer();return n.FacebookAds.setOptions(t,function(){r.resolve()},function(){r.reject()}),r.promise},createBanner:function(t){var r=e.defer();return n.FacebookAds.createBanner(t,function(){r.resolve()},function(){r.reject()}),r.promise},removeBanner:function(){var t=e.defer();return n.FacebookAds.removeBanner(function(){t.resolve()},function(){t.reject()}),t.promise},showBanner:function(t){var r=e.defer();return n.FacebookAds.showBanner(t,function(){r.resolve()},function(){r.reject()}),r.promise},showBannerAtXY:function(t,r){var o=e.defer();return n.FacebookAds.showBannerAtXY(t,r,function(){o.resolve()},function(){o.reject()}),o.promise},hideBanner:function(){var t=e.defer();return n.FacebookAds.hideBanner(function(){t.resolve()},function(){t.reject()}),t.promise},prepareInterstitial:function(t){var r=e.defer();return n.FacebookAds.prepareInterstitial(t,function(){r.resolve()},function(){r.reject()}),r.promise},showInterstitial:function(){var t=e.defer();return n.FacebookAds.showInterstitial(function(){t.resolve()},function(){t.reject()}),t.promise}}}]),angular.module("ngCordova.plugins.file",[]).constant("$cordovaFileError",{1:"NOT_FOUND_ERR",2:"SECURITY_ERR",3:"ABORT_ERR",4:"NOT_READABLE_ERR",5:"ENCODING_ERR",6:"NO_MODIFICATION_ALLOWED_ERR",7:"INVALID_STATE_ERR",8:"SYNTAX_ERR",9:"INVALID_MODIFICATION_ERR",10:"QUOTA_EXCEEDED_ERR",11:"TYPE_MISMATCH_ERR",12:"PATH_EXISTS_ERR"}).provider("$cordovaFile",[function(){this.$get=["$q","$window","$cordovaFileError",function(e,n,t){return{getFreeDiskSpace:function(){var n=e.defer();return cordova.exec(function(e){n.resolve(e)},function(e){n.reject(e)},"File","getFreeDiskSpace",[]),n.promise},checkDir:function(r,o){var i=e.defer();/^\//.test(o)&&i.reject("directory cannot start with /");try{var a=r+o;n.resolveLocalFileSystemURL(a,function(e){e.isDirectory===!0?i.resolve(e):i.reject({code:13,message:"input is not a directory"})},function(e){e.message=t[e.code],i.reject(e)})}catch(c){c.message=t[c.code],i.reject(c)}return i.promise},checkFile:function(r,o){var i=e.defer();/^\//.test(o)&&i.reject("directory cannot start with /");try{var a=r+o;n.resolveLocalFileSystemURL(a,function(e){e.isFile===!0?i.resolve(e):i.reject({code:13,message:"input is not a file"})},function(e){e.message=t[e.code],i.reject(e)})}catch(c){c.message=t[c.code],i.reject(c)}return i.promise},createDir:function(r,o,i){var a=e.defer();/^\//.test(o)&&a.reject("directory cannot start with /"),i=i?!1:!0;var c={create:!0,exclusive:i};try{n.resolveLocalFileSystemURL(r,function(e){e.getDirectory(o,c,function(e){a.resolve(e)},function(e){e.message=t[e.code],a.reject(e)})},function(e){e.message=t[e.code],a.reject(e)})}catch(s){s.message=t[s.code],a.reject(s)}return a.promise},createFile:function(r,o,i){var a=e.defer();/^\//.test(o)&&a.reject("file-name cannot start with /"),i=i?!1:!0;var c={create:!0,exclusive:i};try{n.resolveLocalFileSystemURL(r,function(e){e.getFile(o,c,function(e){a.resolve(e)},function(e){e.message=t[e.code],a.reject(e)})},function(e){e.message=t[e.code],a.reject(e)})}catch(s){s.message=t[s.code],a.reject(s)}return a.promise},removeDir:function(r,o){var i=e.defer();/^\//.test(o)&&i.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(r,function(e){e.getDirectory(o,{create:!1},function(e){e.remove(function(){i.resolve({success:!0,fileRemoved:e})},function(e){e.message=t[e.code],i.reject(e)})},function(e){e.message=t[e.code],i.reject(e)})},function(e){e.message=t[e.code],i.reject(e)})}catch(a){a.message=t[a.code],i.reject(a)}return i.promise},removeFile:function(r,o){var i=e.defer();/^\//.test(o)&&i.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(r,function(e){e.getFile(o,{create:!1},function(e){e.remove(function(){i.resolve({success:!0,fileRemoved:e})},function(e){e.message=t[e.code],i.reject(e)})},function(e){e.message=t[e.code],i.reject(e)})},function(e){e.message=t[e.code],i.reject(e)})}catch(a){a.message=t[a.code],i.reject(a)}return i.promise},removeRecursively:function(r,o){var i=e.defer();/^\//.test(o)&&i.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(r,function(e){e.getDirectory(o,{create:!1},function(e){e.removeRecursively(function(){i.resolve({success:!0,fileRemoved:e})},function(e){e.message=t[e.code],i.reject(e)})},function(e){e.message=t[e.code],i.reject(e)})},function(e){e.message=t[e.code],i.reject(e)})}catch(a){a.message=t[a.code],i.reject(a)}return i.promise},writeFile:function(r,o,i,a){var c=e.defer();/^\//.test(o)&&c.reject("file-name cannot start with /"),a=a?!1:!0;var s={create:!0,exclusive:a};try{n.resolveLocalFileSystemURL(r,function(e){e.getFile(o,s,function(e){e.createWriter(function(e){s.append===!0&&e.seek(e.length),s.truncate&&e.truncate(s.truncate),e.onwriteend=function(e){this.error?c.reject(this.error):c.resolve(e)},e.write(i),c.promise.abort=function(){e.abort()}})},function(e){e.message=t[e.code],c.reject(e)})},function(e){e.message=t[e.code],c.reject(e)})}catch(u){u.message=t[u.code],c.reject(u)}return c.promise},writeExistingFile:function(r,o,i){var a=e.defer();/^\//.test(o)&&a.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(r,function(e){e.getFile(o,{create:!1},function(e){e.createWriter(function(e){e.seek(e.length),e.onwriteend=function(e){this.error?a.reject(this.error):a.resolve(e)},e.write(i),a.promise.abort=function(){e.abort()}})},function(e){e.message=t[e.code],a.reject(e)})},function(e){e.message=t[e.code],a.reject(e)})}catch(c){c.message=t[c.code],a.reject(c)}return a.promise},readAsText:function(r,o){var i=e.defer();/^\//.test(o)&&i.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(r,function(e){e.getFile(o,{create:!1},function(e){e.file(function(e){var n=new FileReader;n.onloadend=function(e){void 0!==e.target.result||null!==e.target.result?i.resolve(e.target.result):void 0!==e.target.error||null!==e.target.error?i.reject(e.target.error):i.reject({code:null,message:"READER_ONLOADEND_ERR"})},n.readAsText(e)})},function(e){e.message=t[e.code],i.reject(e)})},function(e){e.message=t[e.code],i.reject(e)})}catch(a){a.message=t[a.code],i.reject(a)}return i.promise},readAsDataURL:function(r,o){var i=e.defer();/^\//.test(o)&&i.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(r,function(e){e.getFile(o,{create:!1},function(e){e.file(function(e){var n=new FileReader;n.onloadend=function(e){void 0!==e.target.result||null!==e.target.result?i.resolve(e.target.result):void 0!==e.target.error||null!==e.target.error?i.reject(e.target.error):i.reject({code:null,message:"READER_ONLOADEND_ERR"})},n.readAsDataURL(e)})},function(e){e.message=t[e.code],i.reject(e)})},function(e){e.message=t[e.code],i.reject(e)})}catch(a){a.message=t[a.code],i.reject(a)}return i.promise},readAsBinaryString:function(r,o){var i=e.defer();/^\//.test(o)&&i.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(r,function(e){e.getFile(o,{create:!1},function(e){e.file(function(e){var n=new FileReader;n.onloadend=function(e){void 0!==e.target.result||null!==e.target.result?i.resolve(e.target.result):void 0!==e.target.error||null!==e.target.error?i.reject(e.target.error):i.reject({code:null,message:"READER_ONLOADEND_ERR"})},n.readAsBinaryString(e)})},function(e){e.message=t[e.code],i.reject(e)})},function(e){e.message=t[e.code],i.reject(e)})}catch(a){a.message=t[a.code],i.reject(a)}return i.promise},readAsArrayBuffer:function(r,o){var i=e.defer();/^\//.test(o)&&i.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(r,function(e){e.getFile(o,{create:!1},function(e){e.file(function(e){var n=new FileReader;n.onloadend=function(e){void 0!==e.target.result||null!==e.target.result?i.resolve(e.target.result):void 0!==e.target.error||null!==e.target.error?i.reject(e.target.error):i.reject({code:null,message:"READER_ONLOADEND_ERR"})},n.readAsArrayBuffer(e)})},function(e){e.message=t[e.code],i.reject(e)})},function(e){e.message=t[e.code],i.reject(e)})}catch(a){a.message=t[a.code],i.reject(a)}return i.promise},moveFile:function(t,r,o,i){var a=e.defer();i=i||r,(/^\//.test(r)||/^\//.test(i))&&a.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(t,function(e){e.getFile(r,{create:!1},function(e){n.resolveLocalFileSystemURL(o,function(n){e.moveTo(n,i,function(e){a.resolve(e)},function(e){a.reject(e)})},function(e){a.reject(e)})},function(e){a.reject(e);
})},function(e){a.reject(e)})}catch(c){a.reject(c)}return a.promise},moveDir:function(t,r,o,i){var a=e.defer();i=i||r,(/^\//.test(r)||/^\//.test(i))&&a.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(t,function(e){e.getDirectory(r,{create:!1},function(e){n.resolveLocalFileSystemURL(o,function(n){e.moveTo(n,i,function(e){a.resolve(e)},function(e){a.reject(e)})},function(e){a.reject(e)})},function(e){a.reject(e)})},function(e){a.reject(e)})}catch(c){a.reject(c)}return a.promise},copyDir:function(r,o,i,a){var c=e.defer();a=a||o,(/^\//.test(o)||/^\//.test(a))&&c.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(r,function(e){e.getDirectory(o,{create:!1,exclusive:!1},function(e){n.resolveLocalFileSystemURL(i,function(n){e.copyTo(n,a,function(e){c.resolve(e)},function(e){e.message=t[e.code],c.reject(e)})},function(e){e.message=t[e.code],c.reject(e)})},function(e){e.message=t[e.code],c.reject(e)})},function(e){e.message=t[e.code],c.reject(e)})}catch(s){s.message=t[s.code],c.reject(s)}return c.promise},copyFile:function(r,o,i,a){var c=e.defer();a=a||o,/^\//.test(o)&&c.reject("file-name cannot start with /");try{n.resolveLocalFileSystemURL(r,function(e){e.getFile(o,{create:!1,exclusive:!1},function(e){n.resolveLocalFileSystemURL(i,function(n){e.copyTo(n,a,function(e){c.resolve(e)},function(e){e.message=t[e.code],c.reject(e)})},function(e){e.message=t[e.code],c.reject(e)})},function(e){e.message=t[e.code],c.reject(e)})},function(e){e.message=t[e.code],c.reject(e)})}catch(s){s.message=t[s.code],c.reject(s)}return c.promise}}}]}]),angular.module("ngCordova.plugins.fileOpener2",[]).factory("$cordovaFileOpener2",["$q",function(e){return{open:function(n,t){var r=e.defer();return cordova.plugins.fileOpener2.open(n,t,{error:function(e){r.reject(e)},success:function(){r.resolve()}}),r.promise},uninstall:function(n){var t=e.defer();return cordova.plugins.fileOpener2.uninstall(n,{error:function(e){t.reject(e)},success:function(){t.resolve()}}),t.promise},appIsInstalled:function(n){var t=e.defer();return cordova.plugins.fileOpener2.appIsInstalled(n,{success:function(e){t.resolve(e)}}),t.promise}}}]),angular.module("ngCordova.plugins.fileTransfer",[]).factory("$cordovaFileTransfer",["$q","$timeout",function(e,n){return{download:function(t,r,o,i){var a=e.defer(),c=new FileTransfer,s=o&&o.encodeURI===!1?t:encodeURI(t);return o&&void 0!==o.timeout&&null!==o.timeout&&(n(function(){c.abort()},o.timeout),o.timeout=null),c.onprogress=function(e){a.notify(e)},a.promise.abort=function(){c.abort()},c.download(s,r,a.resolve,a.reject,i,o),a.promise},upload:function(t,r,o,i){var a=e.defer(),c=new FileTransfer,s=o&&o.encodeURI===!1?t:encodeURI(t);return o&&void 0!==o.timeout&&null!==o.timeout&&(n(function(){c.abort()},o.timeout),o.timeout=null),c.onprogress=function(e){a.notify(e)},a.promise.abort=function(){c.abort()},c.upload(r,s,a.resolve,a.reject,o,i),a.promise}}}]),angular.module("ngCordova.plugins.flashlight",[]).factory("$cordovaFlashlight",["$q","$window",function(e,n){return{available:function(){var t=e.defer();return n.plugins.flashlight.available(function(e){t.resolve(e)}),t.promise},switchOn:function(){var t=e.defer();return n.plugins.flashlight.switchOn(function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},switchOff:function(){var t=e.defer();return n.plugins.flashlight.switchOff(function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},toggle:function(){var t=e.defer();return n.plugins.flashlight.toggle(function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise}}}]),angular.module("ngCordova.plugins.flurryAds",[]).factory("$cordovaFlurryAds",["$q","$window",function(e,n){return{setOptions:function(t){var r=e.defer();return n.FlurryAds.setOptions(t,function(){r.resolve()},function(){r.reject()}),r.promise},createBanner:function(t){var r=e.defer();return n.FlurryAds.createBanner(t,function(){r.resolve()},function(){r.reject()}),r.promise},removeBanner:function(){var t=e.defer();return n.FlurryAds.removeBanner(function(){t.resolve()},function(){t.reject()}),t.promise},showBanner:function(t){var r=e.defer();return n.FlurryAds.showBanner(t,function(){r.resolve()},function(){r.reject()}),r.promise},showBannerAtXY:function(t,r){var o=e.defer();return n.FlurryAds.showBannerAtXY(t,r,function(){o.resolve()},function(){o.reject()}),o.promise},hideBanner:function(){var t=e.defer();return n.FlurryAds.hideBanner(function(){t.resolve()},function(){t.reject()}),t.promise},prepareInterstitial:function(t){var r=e.defer();return n.FlurryAds.prepareInterstitial(t,function(){r.resolve()},function(){r.reject()}),r.promise},showInterstitial:function(){var t=e.defer();return n.FlurryAds.showInterstitial(function(){t.resolve()},function(){t.reject()}),t.promise}}}]),angular.module("ngCordova.plugins.ga",[]).factory("$cordovaGA",["$q","$window",function(e,n){return{init:function(t,r){var o=e.defer();return r=r>=0?r:10,n.plugins.gaPlugin.init(function(e){o.resolve(e)},function(e){o.reject(e)},t,r),o.promise},trackEvent:function(t,r,o,i,a,c){var s=e.defer();return n.plugins.gaPlugin.trackEvent(function(e){s.resolve(e)},function(e){s.reject(e)},o,i,a,c),s.promise},trackPage:function(t,r,o){var i=e.defer();return n.plugins.gaPlugin.trackPage(function(e){i.resolve(e)},function(e){i.reject(e)},o),i.promise},setVariable:function(t,r,o,i){var a=e.defer();return n.plugins.gaPlugin.setVariable(function(e){a.resolve(e)},function(e){a.reject(e)},o,i),a.promise},exit:function(){var t=e.defer();return n.plugins.gaPlugin.exit(function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise}}}]),angular.module("ngCordova.plugins.geolocation",[]).factory("$cordovaGeolocation",["$q",function(e){return{getCurrentPosition:function(n){var t=e.defer();return navigator.geolocation.getCurrentPosition(function(e){t.resolve(e)},function(e){t.reject(e)},n),t.promise},watchPosition:function(n){var t=e.defer(),r=navigator.geolocation.watchPosition(function(e){t.notify(e)},function(e){t.reject(e)},n);return t.promise.cancel=function(){navigator.geolocation.clearWatch(r)},t.promise.clearWatch=function(e){navigator.geolocation.clearWatch(e||r)},t.promise.watchID=r,t.promise},clearWatch:function(e){return navigator.geolocation.clearWatch(e)}}}]),angular.module("ngCordova.plugins.globalization",[]).factory("$cordovaGlobalization",["$q",function(e){return{getPreferredLanguage:function(){var n=e.defer();return navigator.globalization.getPreferredLanguage(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise},getLocaleName:function(){var n=e.defer();return navigator.globalization.getLocaleName(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise},getFirstDayOfWeek:function(){var n=e.defer();return navigator.globalization.getFirstDayOfWeek(function(e){n.resolve(e)},function(e){n.reject(e)}),n.promise},dateToString:function(n,t){var r=e.defer();return navigator.globalization.dateToString(n,function(e){r.resolve(e)},function(e){r.reject(e)},t),r.promise},stringToDate:function(n,t){var r=e.defer();return navigator.globalization.stringToDate(n,function(e){r.resolve(e)},function(e){r.reject(e)},t),r.promise},getDatePattern:function(n){var t=e.defer();return navigator.globalization.getDatePattern(function(e){t.resolve(e)},function(e){t.reject(e)},n),t.promise},getDateNames:function(n){var t=e.defer();return navigator.globalization.getDateNames(function(e){t.resolve(e)},function(e){t.reject(e)},n),t.promise},isDayLightSavingsTime:function(n){var t=e.defer();return navigator.globalization.isDayLightSavingsTime(n,function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},numberToString:function(n,t){var r=e.defer();return navigator.globalization.numberToString(n,function(e){r.resolve(e)},function(e){r.reject(e)},t),r.promise},stringToNumber:function(n,t){var r=e.defer();return navigator.globalization.stringToNumber(n,function(e){r.resolve(e)},function(e){r.reject(e)},t),r.promise},getNumberPattern:function(n){var t=e.defer();return navigator.globalization.getNumberPattern(function(e){t.resolve(e)},function(e){t.reject(e)},n),t.promise},getCurrencyPattern:function(n){var t=e.defer();return navigator.globalization.getCurrencyPattern(n,function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise}}}]),angular.module("ngCordova.plugins.googleAds",[]).factory("$cordovaGoogleAds",["$q","$window",function(e,n){return{setOptions:function(t){var r=e.defer();return n.AdMob.setOptions(t,function(){r.resolve()},function(){r.reject()}),r.promise},createBanner:function(t){var r=e.defer();return n.AdMob.createBanner(t,function(){r.resolve()},function(){r.reject()}),r.promise},removeBanner:function(){var t=e.defer();return n.AdMob.removeBanner(function(){t.resolve()},function(){t.reject()}),t.promise},showBanner:function(t){var r=e.defer();return n.AdMob.showBanner(t,function(){r.resolve()},function(){r.reject()}),r.promise},showBannerAtXY:function(t,r){var o=e.defer();return n.AdMob.showBannerAtXY(t,r,function(){o.resolve()},function(){o.reject()}),o.promise},hideBanner:function(){var t=e.defer();return n.AdMob.hideBanner(function(){t.resolve()},function(){t.reject()}),t.promise},prepareInterstitial:function(t){var r=e.defer();return n.AdMob.prepareInterstitial(t,function(){r.resolve()},function(){r.reject()}),r.promise},showInterstitial:function(){var t=e.defer();return n.AdMob.showInterstitial(function(){t.resolve()},function(){t.reject()}),t.promise}}}]),angular.module("ngCordova.plugins.googleAnalytics",[]).factory("$cordovaGoogleAnalytics",["$q","$window",function(e,n){return{startTrackerWithId:function(t){var r=e.defer();return n.analytics.startTrackerWithId(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},setUserId:function(t){var r=e.defer();return n.analytics.setUserId(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},debugMode:function(){var t=e.defer();return n.analytics.debugMode(function(e){t.resolve(e)},function(){t.reject()}),t.promise},trackView:function(t){var r=e.defer();return n.analytics.trackView(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},addCustomDimension:function(t,r){var o=e.defer();return n.analytics.addCustomDimension(t,r,function(){o.resolve()},function(e){o.reject(e)}),o.promise},trackEvent:function(t,r,o,i){var a=e.defer();return n.analytics.trackEvent(t,r,o,i,function(e){a.resolve(e)},function(e){a.reject(e)}),a.promise},trackException:function(t,r){var o=e.defer();return n.analytics.trackException(t,r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},trackTiming:function(t,r,o,i){var a=e.defer();return n.analytics.trackTiming(t,r,o,i,function(e){a.resolve(e)},function(e){a.reject(e)}),a.promise},addTransaction:function(t,r,o,i,a,c){var s=e.defer();return n.analytics.addTransaction(t,r,o,i,a,c,function(e){s.resolve(e)},function(e){s.reject(e)}),s.promise},addTransactionItem:function(t,r,o,i,a,c,s){var u=e.defer();return n.analytics.addTransactionItem(t,r,o,i,a,c,s,function(e){u.resolve(e)},function(e){u.reject(e)}),u.promise}}}]),angular.module("ngCordova.plugins.googleMap",[]).factory("$cordovaGoogleMap",["$q","$window",function(e,n){var t=null;return{getMap:function(r){var o=e.defer();if(n.plugin.google.maps){var i=document.getElementById("map_canvas");t=n.plugin.google.maps.Map.getMap(r),t.setDiv(i),o.resolve(t)}else o.reject(null);return o.promise},isMapLoaded:function(){return!!t},addMarker:function(n){var r=e.defer();return t.addMarker(n,function(e){r.resolve(e)}),r.promise},getMapTypeIds:function(){return n.plugin.google.maps.mapTypeId},setVisible:function(n){var r=e.defer();return t.setVisible(n),r.promise},cleanup:function(){t=null}}}]),angular.module("ngCordova.plugins.googlePlayGame",[]).factory("$cordovaGooglePlayGame",["$q",function(e){return{auth:function(){var n=e.defer();return googleplaygame.auth(function(e){return n.resolve(e)},function(e){return n.reject(e)}),n.promise},signout:function(){var n=e.defer();return googleplaygame.signout(function(e){return n.resolve(e)},function(e){return n.reject(e)}),n.promise},isSignedIn:function(){var n=e.defer();return googleplaygame.isSignedIn(function(e){return n.resolve(e)},function(e){return n.reject(e)}),n.promise},showPlayer:function(){var n=e.defer();return googleplaygame.showPlayer(function(e){return n.resolve(e)},function(e){return n.reject(e)}),n.promise},submitScore:function(n){var t=e.defer();return googleplaygame.submitScore(n,function(e){return t.resolve(e)},function(e){return t.reject(e)}),t.promise},showAllLeaderboards:function(){var n=e.defer();return googleplaygame.showAllLeaderboards(function(e){return n.resolve(e)},function(e){return n.reject(e)}),n.promise},showLeaderboard:function(n){var t=e.defer();return googleplaygame.showLeaderboard(n,function(e){return t.resolve(e)},function(e){return t.reject(e)}),t.promise},unlockAchievement:function(n){var t=e.defer();return googleplaygame.unlockAchievement(n,function(e){return t.resolve(e)},function(e){return t.reject(e)}),t.promise},incrementAchievement:function(n){var t=e.defer();return googleplaygame.incrementAchievement(n,function(e){return t.resolve(e)},function(e){return t.reject(e)}),t.promise},showAchievements:function(){var n=e.defer();return googleplaygame.showAchievements(function(e){return n.resolve(e)},function(e){return n.reject(e)}),n.promise}}}]),angular.module("ngCordova.plugins.googlePlus",[]).factory("$cordovaGooglePlus",["$q","$window",function(e,n){return{login:function(t){var r=e.defer();return void 0===t&&(t={}),n.plugins.googleplus.login({iOSApiKey:t},function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},silentLogin:function(t){var r=e.defer();return void 0===t&&(t={}),n.plugins.googleplus.trySilentLogin({iOSApiKey:t},function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},logout:function(){var t=e.defer();n.plugins.googleplus.logout(function(e){t.resolve(e)})},disconnect:function(){var t=e.defer();n.plugins.googleplus.disconnect(function(e){t.resolve(e)})},isAvailable:function(){var t=e.defer();return n.plugins.googleplus.isAvailable(function(e){e?t.resolve(e):t.reject(e)}),t.promise}}}]),angular.module("ngCordova.plugins.healthKit",[]).factory("$cordovaHealthKit",["$q","$window",function(e,n){return{isAvailable:function(){var t=e.defer();return n.plugins.healthkit.available(function(e){t.resolve(e)},function(e){t.reject(e)}),t.promise},checkAuthStatus:function(t){var r=e.defer();return t=t||"HKQuantityTypeIdentifierHeight",n.plugins.healthkit.checkAuthStatus({type:t},function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},requestAuthorization:function(t,r){var o=e.defer();return t=t||["HKCharacteristicTypeIdentifierDateOfBirth","HKQuantityTypeIdentifierActiveEnergyBurned","HKQuantityTypeIdentifierHeight"],r=r||["HKQuantityTypeIdentifierActiveEnergyBurned","HKQuantityTypeIdentifierHeight","HKQuantityTypeIdentifierDistanceCycling"],n.plugins.healthkit.requestAuthorization({readTypes:t,writeTypes:r},function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},readDateOfBirth:function(){var t=e.defer();return n.plugins.healthkit.readDateOfBirth(function(e){t.resolve(e)},function(e){t.resolve(e)}),t.promise},readGender:function(){var t=e.defer();return n.plugins.healthkit.readGender(function(e){t.resolve(e)},function(e){t.resolve(e)}),t.promise},saveWeight:function(t,r,o){var i=e.defer();return n.plugins.healthkit.saveWeight({unit:r||"lb",amount:t,date:o||new Date},function(e){i.resolve(e)},function(e){i.resolve(e)}),i.promise},readWeight:function(t){var r=e.defer();return n.plugins.healthkit.readWeight({unit:t||"lb"},function(e){r.resolve(e)},function(e){r.resolve(e)}),r.promise},saveHeight:function(t,r,o){var i=e.defer();return n.plugins.healthkit.saveHeight({unit:r||"in",amount:t,date:o||new Date},function(e){i.resolve(e)},function(e){i.resolve(e)}),i.promise},readHeight:function(t){var r=e.defer();return n.plugins.healthkit.readHeight({unit:t||"in"},function(e){r.resolve(e)},function(e){r.resolve(e)}),r.promise},findWorkouts:function(){var t=e.defer();return n.plugins.healthkit.findWorkouts({},function(e){t.resolve(e)},function(e){t.resolve(e)}),t.promise},saveWorkout:function(t){var r=e.defer();return n.plugins.healthkit.saveWorkout(t,function(e){r.resolve(e)},function(e){r.resolve(e)}),r.promise},querySampleType:function(t){var r=e.defer();return n.plugins.healthkit.querySampleType(t,function(e){r.resolve(e)},function(e){r.resolve(e)}),r.promise}}}]),angular.module("ngCordova.plugins.httpd",[]).factory("$cordovaHttpd",["$q",function(e){return{startServer:function(n){var t=e.defer();return cordova.plugins.CorHttpd.startServer(n,function(){t.resolve()},function(){t.reject()}),t.promise},stopServer:function(){var n=e.defer();return cordova.plugins.CorHttpd.stopServer(function(){n.resolve()},function(){n.reject()}),n.promise},getURL:function(){var n=e.defer();return cordova.plugins.CorHttpd.getURL(function(e){n.resolve(e)},function(){n.reject()}),n.promise},getLocalPath:function(){var n=e.defer();return cordova.plugins.CorHttpd.getLocalPath(function(e){n.resolve(e)},function(){n.reject()}),n.promise}}}]),angular.module("ngCordova.plugins.iAd",[]).factory("$cordovaiAd",["$q","$window",function(e,n){return{setOptions:function(t){var r=e.defer();return n.iAd.setOptions(t,function(){r.resolve()},function(){r.reject()}),r.promise},createBanner:function(t){var r=e.defer();return n.iAd.createBanner(t,function(){r.resolve()},function(){r.reject()}),r.promise},removeBanner:function(){var t=e.defer();return n.iAd.removeBanner(function(){t.resolve()},function(){t.reject()}),t.promise},showBanner:function(t){var r=e.defer();return n.iAd.showBanner(t,function(){r.resolve()},function(){r.reject()}),r.promise},showBannerAtXY:function(t,r){var o=e.defer();return n.iAd.showBannerAtXY(t,r,function(){o.resolve()},function(){o.reject()}),o.promise},hideBanner:function(){var t=e.defer();return n.iAd.hideBanner(function(){t.resolve()},function(){t.reject()}),t.promise},prepareInterstitial:function(t){var r=e.defer();return n.iAd.prepareInterstitial(t,function(){r.resolve()},function(){r.reject()}),r.promise},showInterstitial:function(){var t=e.defer();return n.iAd.showInterstitial(function(){t.resolve()},function(){t.reject()}),t.promise}}}]),angular.module("ngCordova.plugins.imagePicker",[]).factory("$cordovaImagePicker",["$q","$window",function(e,n){return{getPictures:function(t){var r=e.defer();return n.imagePicker.getPictures(function(e){r.resolve(e)},function(e){r.reject(e)},t),r.promise}}}]),angular.module("ngCordova.plugins.inAppBrowser",[]).provider("$cordovaInAppBrowser",[function(){var e,n=this.defaultOptions={};this.setDefaultOptions=function(e){n=angular.extend(n,e)},this.$get=["$rootScope","$q","$window","$timeout",function(t,r,o,i){return{open:function(a,c,s){var u=r.defer();if(s&&!angular.isObject(s))return u.reject("options must be an object"),u.promise;var l=angular.extend({},n,s),d=[];angular.forEach(l,function(e,n){d.push(n+"="+e)});var f=d.join();return e=o.open(a,c,f),e.addEventListener("loadstart",function(e){i(function(){t.$broadcast("$cordovaInAppBrowser:loadstart",e)})},!1),e.addEventListener("loadstop",function(e){u.resolve(e),i(function(){t.$broadcast("$cordovaInAppBrowser:loadstop",e)})},!1),e.addEventListener("loaderror",function(e){u.reject(e),i(function(){t.$broadcast("$cordovaInAppBrowser:loaderror",e)})},!1),e.addEventListener("exit",function(e){i(function(){t.$broadcast("$cordovaInAppBrowser:exit",e)})},!1),u.promise},close:function(){e.close(),e=null},show:function(){e.show()},executeScript:function(n){var t=r.defer();return e.executeScript(n,function(e){t.resolve(e)}),t.promise},insertCSS:function(n){var t=r.defer();return e.insertCSS(n,function(e){t.resolve(e)}),t.promise}}}]}]),angular.module("ngCordova.plugins.insomnia",[]).factory("$cordovaInsomnia",["$window",function(e){return{keepAwake:function(){return e.plugins.insomnia.keepAwake()},allowSleepAgain:function(){return e.plugins.insomnia.allowSleepAgain()}}}]),angular.module("ngCordova.plugins.instagram",[]).factory("$cordovaInstagram",["$q",function(e){return{share:function(n){var t=e.defer();return window.Instagram?(Instagram.share(n.image,n.caption,function(e){e?t.reject(e):t.resolve(!0)}),t.promise):(console.error("Tried to call Instagram.share but the Instagram plugin isn't installed!"),t.resolve(null),t.promise)},isInstalled:function(){var n=e.defer();return window.Instagram?(Instagram.isInstalled(function(e,t){e?n.reject(e):n.resolve(t||!0)}),n.promise):(console.error("Tried to call Instagram.isInstalled but the Instagram plugin isn't installed!"),n.resolve(null),n.promise)}}}]),angular.module("ngCordova.plugins.keyboard",[]).factory("$cordovaKeyboard",["$rootScope",function(e){var n=function(){e.$evalAsync(function(){e.$broadcast("$cordovaKeyboard:show")})},t=function(){e.$evalAsync(function(){e.$broadcast("$cordovaKeyboard:hide")})};return document.addEventListener("deviceready",function(){cordova.plugins.Keyboard&&(window.addEventListener("native.keyboardshow",n,!1),window.addEventListener("native.keyboardhide",t,!1))}),{hideAccessoryBar:function(e){return cordova.plugins.Keyboard.hideKeyboardAccessoryBar(e)},close:function(){return cordova.plugins.Keyboard.close()},show:function(){return cordova.plugins.Keyboard.show()},disableScroll:function(e){return cordova.plugins.Keyboard.disableScroll(e)},isVisible:function(){return cordova.plugins.Keyboard.isVisible},clearShowWatch:function(){document.removeEventListener("native.keyboardshow",n),e.$$listeners["$cordovaKeyboard:show"]=[]},clearHideWatch:function(){document.removeEventListener("native.keyboardhide",t),e.$$listeners["$cordovaKeyboard:hide"]=[]}}}]),angular.module("ngCordova.plugins.keychain",[]).factory("$cordovaKeychain",["$q",function(e){return{getForKey:function(n,t){var r=e.defer(),o=new Keychain;return o.getForKey(r.resolve,r.reject,n,t),r.promise},setForKey:function(n,t,r){var o=e.defer(),i=new Keychain;return i.setForKey(o.resolve,o.reject,n,t,r),o.promise},removeForKey:function(n,t){var r=e.defer(),o=new Keychain;return o.removeForKey(r.resolve,r.reject,n,t),r.promise}}}]),angular.module("ngCordova.plugins.launchNavigator",[]).factory("$cordovaLaunchNavigator",["$q",function(e){return{navigate:function(n,t,r,o,i){var a=e.defer();return launchnavigator.navigate(n,t,function(){a.resolve()},function(e){a.reject(e)},i),a.promise}}}]),angular.module("ngCordova.plugins.localNotification",[]).factory("$cordovaLocalNotification",["$q","$window","$rootScope","$timeout",function(e,n,t,r){return document.addEventListener("deviceready",function(){n.cordova&&n.cordova.plugins&&n.cordova.plugins.notification&&n.cordova.plugins.notification.local&&(n.cordova.plugins.notification.local.on("schedule",function(e,n){r(function(){t.$broadcast("$cordovaLocalNotification:schedule",e,n)})}),n.cordova.plugins.notification.local.on("trigger",function(e,n){r(function(){t.$broadcast("$cordovaLocalNotification:trigger",e,n)})}),n.cordova.plugins.notification.local.on("update",function(e,n){r(function(){t.$broadcast("$cordovaLocalNotification:update",e,n)})}),n.cordova.plugins.notification.local.on("clear",function(e,n){r(function(){t.$broadcast("$cordovaLocalNotification:clear",e,n)})}),n.cordova.plugins.notification.local.on("clearall",function(e){r(function(){t.$broadcast("$cordovaLocalNotification:clearall",e)})}),n.cordova.plugins.notification.local.on("cancel",function(e,n){r(function(){t.$broadcast("$cordovaLocalNotification:cancel",e,n)})}),n.cordova.plugins.notification.local.on("cancelall",function(e){r(function(){t.$broadcast("$cordovaLocalNotification:cancelall",e)})}),n.cordova.plugins.notification.local.on("click",function(e,n){r(function(){t.$broadcast("$cordovaLocalNotification:click",e,n)})}))},!1),{schedule:function(t,r){var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.schedule(t,function(e){o.resolve(e)},r),o.promise},add:function(t,r){console.warn('Deprecated: use "schedule" instead.');var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.schedule(t,function(e){o.resolve(e)},r),o.promise},update:function(t,r){var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.update(t,function(e){o.resolve(e)},r),o.promise},clear:function(t,r){var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.clear(t,function(e){o.resolve(e)},r),o.promise},clearAll:function(t){var r=e.defer();return t=t||null,n.cordova.plugins.notification.local.clearAll(function(e){r.resolve(e)},t),r.promise},cancel:function(t,r){var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.cancel(t,function(e){o.resolve(e)},r),o.promise},cancelAll:function(t){var r=e.defer();return t=t||null,n.cordova.plugins.notification.local.cancelAll(function(e){r.resolve(e)},t),r.promise},isPresent:function(t,r){var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.isPresent(t,function(e){o.resolve(e)},r),o.promise},isScheduled:function(t,r){var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.isScheduled(t,function(e){o.resolve(e)},r),o.promise},isTriggered:function(t,r){var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.isTriggered(t,function(e){o.resolve(e)},r),o.promise},hasPermission:function(t){var r=e.defer();return t=t||null,n.cordova.plugins.notification.local.hasPermission(function(e){e?r.resolve(e):r.reject(e)},t),r.promise},registerPermission:function(t){var r=e.defer();return t=t||null,n.cordova.plugins.notification.local.registerPermission(function(e){e?r.resolve(e):r.reject(e)},t),r.promise},promptForPermission:function(t){console.warn('Deprecated: use "registerPermission" instead.');var r=e.defer();return t=t||null,n.cordova.plugins.notification.local.registerPermission(function(e){e?r.resolve(e):r.reject(e)},t),r.promise},getAllIds:function(t){var r=e.defer();return t=t||null,n.cordova.plugins.notification.local.getAllIds(function(e){r.resolve(e)},t),r.promise},getIds:function(t){var r=e.defer();return t=t||null,n.cordova.plugins.notification.local.getIds(function(e){r.resolve(e)},t),r.promise},getScheduledIds:function(t){var r=e.defer();return t=t||null,n.cordova.plugins.notification.local.getScheduledIds(function(e){r.resolve(e)},t),r.promise},getTriggeredIds:function(t){var r=e.defer();return t=t||null,n.cordova.plugins.notification.local.getTriggeredIds(function(e){r.resolve(e)},t),r.promise},get:function(t,r){var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.get(t,function(e){o.resolve(e)},r),o.promise},getAll:function(t){var r=e.defer();return t=t||null,n.cordova.plugins.notification.local.getAll(function(e){r.resolve(e)},t),r.promise},getScheduled:function(t,r){var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.getScheduled(t,function(e){o.resolve(e)},r),o.promise},getAllScheduled:function(t){var r=e.defer();return t=t||null,n.cordova.plugins.notification.local.getAllScheduled(function(e){r.resolve(e)},t),r.promise},getTriggered:function(t,r){var o=e.defer();return r=r||null,n.cordova.plugins.notification.local.getTriggered(t,function(e){o.resolve(e)},r),o.promise},getAllTriggered:function(t){var r=e.defer();return t=t||null,n.cordova.plugins.notification.local.getAllTriggered(function(e){r.resolve(e)},t),r.promise},getDefaults:function(){return n.cordova.plugins.notification.local.getDefaults()},setDefaults:function(e){n.cordova.plugins.notification.local.setDefaults(e)}}}]),angular.module("ngCordova.plugins.mMediaAds",[]).factory("$cordovaMMediaAds",["$q","$window",function(e,n){return{setOptions:function(t){var r=e.defer();return n.mMedia.setOptions(t,function(){r.resolve()},function(){r.reject()}),r.promise},createBanner:function(t){var r=e.defer();return n.mMedia.createBanner(t,function(){r.resolve()},function(){r.reject()}),r.promise},removeBanner:function(){var t=e.defer();return n.mMedia.removeBanner(function(){t.resolve()},function(){t.reject()}),t.promise},showBanner:function(t){var r=e.defer();return n.mMedia.showBanner(t,function(){r.resolve()},function(){r.reject()}),r.promise},showBannerAtXY:function(t,r){var o=e.defer();return n.mMedia.showBannerAtXY(t,r,function(){o.resolve()},function(){o.reject()}),o.promise},hideBanner:function(){var t=e.defer();return n.mMedia.hideBanner(function(){t.resolve()},function(){t.reject()}),t.promise},prepareInterstitial:function(t){var r=e.defer();return n.mMedia.prepareInterstitial(t,function(){r.resolve()},function(){r.reject()}),r.promise},showInterstitial:function(){var t=e.defer();return n.mMedia.showInterstitial(function(){t.resolve()},function(){t.reject()}),t.promise}}}]),angular.module("ngCordova.plugins.media",[]).service("NewMedia",["$q","$interval",function(e,n){function t(e){angular.isDefined(u)||(u=n(function(){0>f&&(f=e.getDuration(),a&&f>0&&a.notify({duration:f})),e.getCurrentPosition(function(e){e>-1&&(d=e)},function(e){console.log("Error getting pos="+e)}),a&&a.notify({position:d})},1e3))}function r(){angular.isDefined(u)&&(n.cancel(u),u=void 0)}function o(){d=-1,f=-1}function i(e){this.media=new Media(e,function(e){r(),o(),a.resolve(e)},function(e){r(),o(),a.reject(e)},function(e){l=e,a.notify({status:l})})}var a,c,s,u,l=null,d=-1,f=-1;return i.prototype.play=function(n){return a=e.defer(),"object"!=typeof n&&(n={}),this.media.play(n),t(this.media),a.promise},i.prototype.pause=function(){r(),this.media.pause()},i.prototype.stop=function(){this.media.stop()},i.prototype.release=function(){this.media.release(),this.media=void 0},i.prototype.seekTo=function(e){this.media.seekTo(e)},i.prototype.setVolume=function(e){this.media.setVolume(e)},i.prototype.startRecord=function(){this.media.startRecord()},i.prototype.stopRecord=function(){this.media.stopRecord()},i.prototype.currentTime=function(){return c=e.defer(),this.media.getCurrentPosition(function(e){c.resolve(e)}),c.promise},i.prototype.getDuration=function(){return s=e.defer(),this.media.getDuration(function(e){s.resolve(e)}),s.promise},i}]).factory("$cordovaMedia",["NewMedia",function(e){return{newMedia:function(n){return new e(n)}}}]),angular.module("ngCordova.plugins.mobfoxAds",[]).factory("$cordovaMobFoxAds",["$q","$window",function(e,n){return{setOptions:function(t){var r=e.defer();return n.MobFox.setOptions(t,function(){r.resolve()},function(){r.reject()}),r.promise},createBanner:function(t){var r=e.defer();return n.MobFox.createBanner(t,function(){r.resolve()},function(){r.reject()}),r.promise},removeBanner:function(){var t=e.defer();return n.MobFox.removeBanner(function(){t.resolve()},function(){t.reject()}),t.promise},showBanner:function(t){var r=e.defer();return n.MobFox.showBanner(t,function(){r.resolve()},function(){r.reject()}),r.promise},showBannerAtXY:function(t,r){var o=e.defer();return n.MobFox.showBannerAtXY(t,r,function(){o.resolve()},function(){o.reject()}),o.promise},hideBanner:function(){var t=e.defer();return n.MobFox.hideBanner(function(){t.resolve()},function(){t.reject()}),t.promise},prepareInterstitial:function(t){var r=e.defer();return n.MobFox.prepareInterstitial(t,function(){r.resolve()},function(){r.reject()}),r.promise},showInterstitial:function(){var t=e.defer();return n.MobFox.showInterstitial(function(){t.resolve()},function(){t.reject()}),t.promise}}}]),angular.module("ngCordova.plugins",["ngCordova.plugins.actionSheet","ngCordova.plugins.adMob","ngCordova.plugins.appAvailability","ngCordova.plugins.appRate","ngCordova.plugins.appVersion","ngCordova.plugins.backgroundGeolocation","ngCordova.plugins.badge","ngCordova.plugins.barcodeScanner","ngCordova.plugins.batteryStatus","ngCordova.plugins.ble","ngCordova.plugins.bluetoothSerial","ngCordova.plugins.brightness","ngCordova.plugins.calendar","ngCordova.plugins.camera","ngCordova.plugins.capture","ngCordova.plugins.clipboard","ngCordova.plugins.contacts","ngCordova.plugins.datePicker","ngCordova.plugins.device","ngCordova.plugins.deviceMotion","ngCordova.plugins.deviceOrientation","ngCordova.plugins.dialogs","ngCordova.plugins.emailComposer","ngCordova.plugins.facebook","ngCordova.plugins.facebookAds","ngCordova.plugins.file","ngCordova.plugins.fileTransfer","ngCordova.plugins.fileOpener2","ngCordova.plugins.flashlight","ngCordova.plugins.flurryAds","ngCordova.plugins.ga","ngCordova.plugins.geolocation","ngCordova.plugins.globalization","ngCordova.plugins.googleAds","ngCordova.plugins.googleAnalytics","ngCordova.plugins.googleMap","ngCordova.plugins.googlePlayGame","ngCordova.plugins.googlePlus","ngCordova.plugins.healthKit","ngCordova.plugins.httpd","ngCordova.plugins.iAd","ngCordova.plugins.imagePicker","ngCordova.plugins.inAppBrowser","ngCordova.plugins.instagram","ngCordova.plugins.keyboard","ngCordova.plugins.keychain","ngCordova.plugins.launchNavigator","ngCordova.plugins.localNotification","ngCordova.plugins.media","ngCordova.plugins.mMediaAds","ngCordova.plugins.mobfoxAds","ngCordova.plugins.mopubAds","ngCordova.plugins.nativeAudio","ngCordova.plugins.network","ngCordovaOauth","ngCordova.plugins.pinDialog","ngCordova.plugins.prefs","ngCordova.plugins.printer","ngCordova.plugins.progressIndicator","ngCordova.plugins.push","ngCordova.plugins.sms","ngCordova.plugins.socialSharing","ngCordova.plugins.spinnerDialog","ngCordova.plugins.splashscreen","ngCordova.plugins.sqlite","ngCordova.plugins.statusbar","ngCordova.plugins.toast","ngCordova.plugins.touchid","ngCordova.plugins.vibration","ngCordova.plugins.videoCapturePlus","ngCordova.plugins.zip","ngCordova.plugins.insomnia"]),
angular.module("ngCordova.plugins.mopubAds",[]).factory("$cordovaMoPubAds",["$q","$window",function(e,n){return{setOptions:function(t){var r=e.defer();return n.MoPub.setOptions(t,function(){r.resolve()},function(){r.reject()}),r.promise},createBanner:function(t){var r=e.defer();return n.MoPub.createBanner(t,function(){r.resolve()},function(){r.reject()}),r.promise},removeBanner:function(){var t=e.defer();return n.MoPub.removeBanner(function(){t.resolve()},function(){t.reject()}),t.promise},showBanner:function(t){var r=e.defer();return n.MoPub.showBanner(t,function(){r.resolve()},function(){r.reject()}),r.promise},showBannerAtXY:function(t,r){var o=e.defer();return n.MoPub.showBannerAtXY(t,r,function(){o.resolve()},function(){o.reject()}),o.promise},hideBanner:function(){var t=e.defer();return n.MoPub.hideBanner(function(){t.resolve()},function(){t.reject()}),t.promise},prepareInterstitial:function(t){var r=e.defer();return n.MoPub.prepareInterstitial(t,function(){r.resolve()},function(){r.reject()}),r.promise},showInterstitial:function(){var t=e.defer();return n.MoPub.showInterstitial(function(){t.resolve()},function(){t.reject()}),t.promise}}}]),angular.module("ngCordova.plugins.nativeAudio",[]).factory("$cordovaNativeAudio",["$q","$window",function(e,n){return{preloadSimple:function(t,r){var o=e.defer();return n.plugins.NativeAudio.preloadSimple(t,r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},preloadComplex:function(t,r,o,i){var a=e.defer();return n.plugins.NativeAudio.preloadComplex(t,r,o,i,function(e){a.resolve(e)},function(e){a.reject(e)}),a.promise},play:function(t,r){var o=e.defer();return n.plugins.NativeAudio.play(t,r,function(e){o.reject(e)},function(e){o.resolve(e)}),o.promise},stop:function(t){var r=e.defer();return n.plugins.NativeAudio.stop(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},loop:function(t){var r=e.defer();return n.plugins.NativeAudio.loop(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},unload:function(t){var r=e.defer();return n.plugins.NativeAudio.unload(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},setVolumeForComplexAsset:function(t,r){var o=e.defer();return n.plugins.NativeAudio.setVolumeForComplexAsset(t,r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise}}}]),angular.module("ngCordova.plugins.network",[]).factory("$cordovaNetwork",["$rootScope","$timeout",function(e,n){var t=function(){var t=navigator.connection.type;n(function(){e.$broadcast("$cordovaNetwork:offline",t)})},r=function(){var t=navigator.connection.type;n(function(){e.$broadcast("$cordovaNetwork:online",t)})};return document.addEventListener("deviceready",function(){navigator.connection&&(document.addEventListener("offline",t,!1),document.addEventListener("online",r,!1))}),{getNetwork:function(){return navigator.connection.type},isOnline:function(){var e=navigator.connection.type;return e!==Connection.UNKNOWN&&e!==Connection.NONE},isOffline:function(){var e=navigator.connection.type;return e===Connection.UNKNOWN||e===Connection.NONE},clearOfflineWatch:function(){document.removeEventListener("offline",t),e.$$listeners["$cordovaNetwork:offline"]=[]},clearOnlineWatch:function(){document.removeEventListener("online",r),e.$$listeners["$cordovaNetwork:online"]=[]}}}]).run(["$injector",function(e){e.get("$cordovaNetwork")}]),angular.module("ngCordova.plugins.pinDialog",[]).factory("$cordovaPinDialog",["$q","$window",function(e,n){return{prompt:function(t,r,o){var i=e.defer();return n.plugins.pinDialog.prompt(t,function(e){i.resolve(e)},r,o),i.promise}}}]),angular.module("ngCordova.plugins.prefs",[]).factory("$cordovaPreferences",["$window","$q",function(e,n){return{set:function(t,r){var o=n.defer();return e.appgiraffe.plugins.applicationPreferences.set(t,r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise},get:function(t){var r=n.defer();return e.appgiraffe.plugins.applicationPreferences.get(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise}}}]),angular.module("ngCordova.plugins.printer",[]).factory("$cordovaPrinter",["$q","$window",function(e,n){return{isAvailable:function(){var t=e.defer();return n.plugin.printer.isAvailable(function(e){t.resolve(e)}),t.promise},print:function(t,r){var o=e.defer();return n.plugin.printer.print(t,r,function(){o.resolve()}),o.promise}}}]),angular.module("ngCordova.plugins.progressIndicator",[]).factory("$cordovaProgress",[function(){return{show:function(e){var n=e||"Please wait...";return ProgressIndicator.show(n)},showSimple:function(e){var n=e||!1;return ProgressIndicator.showSimple(n)},showSimpleWithLabel:function(e,n){var t=e||!1,r=n||"Loading...";return ProgressIndicator.showSimpleWithLabel(t,r)},showSimpleWithLabelDetail:function(e,n,t){var r=e||!1,o=n||"Loading...",i=t||"Please wait";return ProgressIndicator.showSimpleWithLabelDetail(r,o,i)},showDeterminate:function(e,n){var t=e||!1,r=n||5e4;return ProgressIndicator.showDeterminate(t,r)},showDeterminateWithLabel:function(e,n,t){var r=e||!1,o=n||5e4,i=t||"Loading...";return ProgressIndicator.showDeterminateWithLabel(r,o,i)},showAnnular:function(e,n){var t=e||!1,r=n||5e4;return ProgressIndicator.showAnnular(t,r)},showAnnularWithLabel:function(e,n,t){var r=e||!1,o=n||5e4,i=t||"Loading...";return ProgressIndicator.showAnnularWithLabel(r,o,i)},showBar:function(e,n){var t=e||!1,r=n||5e4;return ProgressIndicator.showBar(t,r)},showBarWithLabel:function(e,n,t){var r=e||!1,o=n||5e4,i=t||"Loading...";return ProgressIndicator.showBarWithLabel(r,o,i)},showSuccess:function(e,n){var t=e||!1,r=n||"Success";return ProgressIndicator.showSuccess(t,r)},showText:function(e,n,t){var r=e||!1,o=n||"Warning",i=t||"center";return ProgressIndicator.showText(r,o,i)},hide:function(){return ProgressIndicator.hide()}}}]),angular.module("ngCordova.plugins.push",[]).factory("$cordovaPush",["$q","$window","$rootScope","$timeout",function(e,n,t,r){return{onNotification:function(e){r(function(){t.$broadcast("$cordovaPush:notificationReceived",e)})},register:function(t){var r,o=e.defer();return void 0!==t&&void 0===t.ecb&&(r=null===document.querySelector("[ng-app]")?"document.body":"document.querySelector('[ng-app]')",t.ecb="angular.element("+r+").injector().get('$cordovaPush').onNotification"),n.plugins.pushNotification.register(function(e){o.resolve(e)},function(e){o.reject(e)},t),o.promise},unregister:function(t){var r=e.defer();return n.plugins.pushNotification.unregister(function(e){r.resolve(e)},function(e){r.reject(e)},t),r.promise},setBadgeNumber:function(t){var r=e.defer();return n.plugins.pushNotification.setApplicationIconBadgeNumber(function(e){r.resolve(e)},function(e){r.reject(e)},t),r.promise}}}]),angular.module("ngCordova.plugins.sms",[]).factory("$cordovaSms",["$q",function(e){return{send:function(n,t,r){var o=e.defer();return sms.send(n,t,r,function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise}}}]),angular.module("ngCordova.plugins.socialSharing",[]).factory("$cordovaSocialSharing",["$q","$window",function(e,n){return{share:function(t,r,o,i){var a=e.defer();return r=r||null,o=o||null,i=i||null,n.plugins.socialsharing.share(t,r,o,i,function(){a.resolve(!0)},function(){a.reject(!1)}),a.promise},shareViaTwitter:function(t,r,o){var i=e.defer();return r=r||null,o=o||null,n.plugins.socialsharing.shareViaTwitter(t,r,o,function(){i.resolve(!0)},function(){i.reject(!1)}),i.promise},shareViaWhatsApp:function(t,r,o){var i=e.defer();return r=r||null,o=o||null,n.plugins.socialsharing.shareViaWhatsApp(t,r,o,function(){i.resolve(!0)},function(){i.reject(!1)}),i.promise},shareViaFacebook:function(t,r,o){var i=e.defer();return t=t||null,r=r||null,o=o||null,n.plugins.socialsharing.shareViaFacebook(t,r,o,function(){i.resolve(!0)},function(){i.reject(!1)}),i.promise},shareViaFacebookWithPasteMessageHint:function(t,r,o,i){var a=e.defer();return r=r||null,o=o||null,n.plugins.socialsharing.shareViaFacebookWithPasteMessageHint(t,r,o,i,function(){a.resolve(!0)},function(){a.reject(!1)}),a.promise},shareViaSMS:function(t,r){var o=e.defer();return n.plugins.socialsharing.shareViaSMS(t,r,function(){o.resolve(!0)},function(){o.reject(!1)}),o.promise},shareViaEmail:function(t,r,o,i,a,c){var s=e.defer();return o=o||null,i=i||null,a=a||null,c=c||null,n.plugins.socialsharing.shareViaEmail(t,r,o,i,a,c,function(){s.resolve(!0)},function(){s.reject(!1)}),s.promise},shareVia:function(t,r,o,i,a){var c=e.defer();return r=r||null,o=o||null,i=i||null,a=a||null,n.plugins.socialsharing.shareVia(t,r,o,i,a,function(){c.resolve(!0)},function(){c.reject(!1)}),c.promise},canShareViaEmail:function(){var t=e.defer();return n.plugins.socialsharing.canShareViaEmail(function(){t.resolve(!0)},function(){t.reject(!1)}),t.promise},canShareVia:function(t,r,o,i,a){var c=e.defer();return n.plugins.socialsharing.canShareVia(t,r,o,i,a,function(e){c.resolve(e)},function(e){c.reject(e)}),c.promise},available:function(){var n=e.defer();window.plugins.socialsharing.available(function(e){e?n.resolve():n.reject()})}}}]),angular.module("ngCordova.plugins.spinnerDialog",[]).factory("$cordovaSpinnerDialog",["$window",function(e){return{show:function(n,t,r){return r=r||!1,e.plugins.spinnerDialog.show(n,t,r)},hide:function(){return e.plugins.spinnerDialog.hide()}}}]),angular.module("ngCordova.plugins.splashscreen",[]).factory("$cordovaSplashscreen",[function(){return{hide:function(){return navigator.splashscreen.hide()},show:function(){return navigator.splashscreen.show()}}}]),angular.module("ngCordova.plugins.sqlite",[]).factory("$cordovaSQLite",["$q","$window",function(e,n){return{openDB:function(e,t){return"object"!=typeof e&&(e={name:e}),"undefined"!=typeof t&&(e.bgType=t),n.sqlitePlugin.openDatabase(e)},execute:function(n,t,r){var o=e.defer();return n.transaction(function(e){e.executeSql(t,r,function(e,n){o.resolve(n)},function(e,n){o.reject(n)})}),o.promise},insertCollection:function(n,t,r){var o=e.defer(),i=r.slice(0);return n.transaction(function(e){!function n(){var r=i.splice(0,1)[0];try{e.executeSql(t,r,function(e,t){0===i.length?o.resolve(t):n()},function(e,n){o.reject(n)})}catch(a){o.reject(a)}}()}),o.promise},nestedExecute:function(n,t,r,o,i){var a=e.defer();return n.transaction(function(e){e.executeSql(t,o,function(e,n){a.resolve(n),e.executeSql(r,i,function(e,n){a.resolve(n)})})},function(e,n){a.reject(n)}),a.promise},deleteDB:function(t){var r=e.defer();return n.sqlitePlugin.deleteDatabase(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise}}}]),angular.module("ngCordova.plugins.statusbar",[]).factory("$cordovaStatusbar",[function(){return{overlaysWebView:function(e){return StatusBar.overlaysWebView(!!e)},STYLES:{DEFAULT:0,LIGHT_CONTENT:1,BLACK_TRANSLUCENT:2,BLACK_OPAQUE:3},style:function(e){switch(e){case 0:return StatusBar.styleDefault();case 1:return StatusBar.styleLightContent();case 2:return StatusBar.styleBlackTranslucent();case 3:return StatusBar.styleBlackOpaque();default:return StatusBar.styleDefault()}},styleColor:function(e){return StatusBar.backgroundColorByName(e)},styleHex:function(e){return StatusBar.backgroundColorByHexString(e)},hide:function(){return StatusBar.hide()},show:function(){return StatusBar.show()},isVisible:function(){return StatusBar.isVisible}}}]),angular.module("ngCordova.plugins.toast",[]).factory("$cordovaToast",["$q","$window",function(e,n){return{showShortTop:function(t){var r=e.defer();return n.plugins.toast.showShortTop(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},showShortCenter:function(t){var r=e.defer();return n.plugins.toast.showShortCenter(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},showShortBottom:function(t){var r=e.defer();return n.plugins.toast.showShortBottom(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},showLongTop:function(t){var r=e.defer();return n.plugins.toast.showLongTop(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},showLongCenter:function(t){var r=e.defer();return n.plugins.toast.showLongCenter(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},showLongBottom:function(t){var r=e.defer();return n.plugins.toast.showLongBottom(t,function(e){r.resolve(e)},function(e){r.reject(e)}),r.promise},show:function(t,r,o){var i=e.defer();return n.plugins.toast.show(t,r,o,function(e){i.resolve(e)},function(e){i.reject(e)}),i.promise}}}]),angular.module("ngCordova.plugins.touchid",[]).factory("$cordovaTouchID",["$q",function(e){return{checkSupport:function(){var n=e.defer();return window.cordova?touchid.checkSupport(function(e){n.resolve(e)},function(e){n.reject(e)}):n.reject("Not supported without cordova.js"),n.promise},authenticate:function(n){var t=e.defer();return window.cordova?touchid.authenticate(function(e){t.resolve(e)},function(e){t.reject(e)},n):t.reject("Not supported without cordova.js"),t.promise}}}]),angular.module("ngCordova.plugins.vibration",[]).factory("$cordovaVibration",[function(){return{vibrate:function(e){return navigator.notification.vibrate(e)},vibrateWithPattern:function(e,n){return navigator.notification.vibrateWithPattern(e,n)},cancelVibration:function(){return navigator.notification.cancelVibration()}}}]),angular.module("ngCordova.plugins.videoCapturePlus",[]).provider("$cordovaVideoCapturePlus",[function(){var e={};this.setLimit=function(n){e.limit=n},this.setMaxDuration=function(n){e.duration=n},this.setHighQuality=function(n){e.highquality=n},this.useFrontCamera=function(n){e.frontcamera=n},this.setPortraitOverlay=function(n){e.portraitOverlay=n},this.setLandscapeOverlay=function(n){e.landscapeOverlay=n},this.setOverlayText=function(n){e.overlayText=n},this.$get=["$q","$window",function(n,t){return{captureVideo:function(r){var o=n.defer();return t.plugins.videocaptureplus?(t.plugins.videocaptureplus.captureVideo(o.resolve,o.reject,angular.extend({},e,r)),o.promise):(o.resolve(null),o.promise)}}}]}]),angular.module("ngCordova.plugins.zip",[]).factory("$cordovaZip",["$q","$window",function(e,n){return{unzip:function(t,r){var o=e.defer();return n.zip.unzip(t,r,function(e){0===e?o.resolve():o.reject()},function(e){o.notify(e)}),o.promise}}}]),angular.module("oauth.providers",["oauth.utils"]).factory("$cordovaOauth",["$q","$http","$cordovaOauthUtility",function(e,n,t){return{adfs:function(r,o,i){var a=e.defer();if(window.cordova){var c=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(c)===!0){var s=window.open(o+"/adfs/oauth2/authorize?response_type=code&client_id="+r+"&redirect_uri=http://localhost/callback&resource="+i,"_blank","location=no");s.addEventListener("loadstart",function(e){if(0===e.url.indexOf("http://localhost/callback")){var t=e.url.split("code=")[1];n.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",n({method:"post",url:o+"/adfs/oauth2/token",data:"client_id="+r+"&code="+t+"&redirect_uri=http://localhost/callback&grant_type=authorization_code"}).success(function(e){a.resolve(e)}).error(function(e,n){a.reject("Problem authenticating")})["finally"](function(){setTimeout(function(){s.close()},10)})}}),s.addEventListener("exit",function(e){a.reject("The sign in flow was canceled")})}else a.reject("Could not find InAppBrowser plugin")}else a.reject("Cannot authenticate via a web browser");return a.promise},dropbox:function(n,r){var o=e.defer();if(window.cordova){var i=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(i)===!0){var a="http://localhost/callback";void 0!==r&&r.hasOwnProperty("redirect_uri")&&(a=r.redirect_uri);var c=window.open("https://www.dropbox.com/1/oauth2/authorize?client_id="+n+"&redirect_uri="+a+"&response_type=token","_blank","location=no,clearsessioncache=yes,clearcache=yes");c.addEventListener("loadstart",function(e){if(0===e.url.indexOf(a)){c.removeEventListener("exit",function(e){}),c.close();for(var n=e.url.split("#")[1],t=n.split("&"),r=[],i=0;i<t.length;i++)r[t[i].split("=")[0]]=t[i].split("=")[1];void 0!==r.access_token&&null!==r.access_token?o.resolve({access_token:r.access_token,token_type:r.token_type,uid:r.uid}):o.reject("Problem authenticating")}}),c.addEventListener("exit",function(e){o.reject("The sign in flow was canceled")})}else o.reject("Could not find InAppBrowser plugin")}else o.reject("Cannot authenticate via a web browser");return o.promise},digitalOcean:function(r,o,i){var a=e.defer();if(window.cordova){var c=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(c)===!0){var s="http://localhost/callback";void 0!==i&&i.hasOwnProperty("redirect_uri")&&(s=i.redirect_uri);var u=window.open("https://cloud.digitalocean.com/v1/oauth/authorize?client_id="+r+"&redirect_uri="+s+"&response_type=code&scope=read%20write","_blank","location=no,clearsessioncache=yes,clearcache=yes");u.addEventListener("loadstart",function(e){if(0===e.url.indexOf(s)){var t=e.url.split("code=")[1];n.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",n({method:"post",url:"https://cloud.digitalocean.com/v1/oauth/token",data:"client_id="+r+"&client_secret="+o+"&redirect_uri="+s+"&grant_type=authorization_code&code="+t}).success(function(e){a.resolve(e)}).error(function(e,n){a.reject("Problem authenticating")})["finally"](function(){setTimeout(function(){u.close()},10)})}}),u.addEventListener("exit",function(e){a.reject("The sign in flow was canceled")})}else a.reject("Could not find InAppBrowser plugin")}else a.reject("Cannot authenticate via a web browser");return a.promise},google:function(n,r,o){var i=e.defer();if(window.cordova){var a=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(a)===!0){var c="http://localhost/callback";void 0!==o&&o.hasOwnProperty("redirect_uri")&&(c=o.redirect_uri);var s=window.open("https://accounts.google.com/o/oauth2/auth?client_id="+n+"&redirect_uri="+c+"&scope="+r.join(" ")+"&approval_prompt=force&response_type=token","_blank","location=no,clearsessioncache=yes,clearcache=yes");s.addEventListener("loadstart",function(e){if(0===e.url.indexOf(c)){s.removeEventListener("exit",function(e){}),s.close();for(var n=e.url.split("#")[1],t=n.split("&"),r=[],o=0;o<t.length;o++)r[t[o].split("=")[0]]=t[o].split("=")[1];void 0!==r.access_token&&null!==r.access_token?i.resolve({access_token:r.access_token,token_type:r.token_type,expires_in:r.expires_in}):i.reject("Problem authenticating")}}),s.addEventListener("exit",function(e){i.reject("The sign in flow was canceled")})}else i.reject("Could not find InAppBrowser plugin")}else i.reject("Cannot authenticate via a web browser");return i.promise},github:function(r,o,i,a){var c=e.defer();if(window.cordova){var s=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(s)===!0){var u="http://localhost/callback";void 0!==a&&a.hasOwnProperty("redirect_uri")&&(u=a.redirect_uri);var l=window.open("https://github.com/login/oauth/authorize?client_id="+r+"&redirect_uri="+u+"&scope="+i.join(","),"_blank","location=no,clearsessioncache=yes,clearcache=yes");l.addEventListener("loadstart",function(e){0===e.url.indexOf(u)&&(requestToken=e.url.split("code=")[1],n.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",n.defaults.headers.post.accept="application/json",n({method:"post",url:"https://github.com/login/oauth/access_token",data:"client_id="+r+"&client_secret="+o+"&redirect_uri="+u+"&code="+requestToken}).success(function(e){c.resolve(e)}).error(function(e,n){c.reject("Problem authenticating")})["finally"](function(){setTimeout(function(){l.close()},10)}))}),l.addEventListener("exit",function(e){c.reject("The sign in flow was canceled")})}else c.reject("Could not find InAppBrowser plugin")}else c.reject("Cannot authenticate via a web browser");return c.promise},facebook:function(n,r,o){var i=e.defer();if(window.cordova){var a=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(a)===!0){var c="http://localhost/callback";void 0!==o&&o.hasOwnProperty("redirect_uri")&&(c=o.redirect_uri);var s="https://www.facebook.com/v2.0/dialog/oauth?client_id="+n+"&redirect_uri="+c+"&response_type=token&scope="+r.join(",");void 0!==o&&o.hasOwnProperty("auth_type")&&(s+="&auth_type="+o.auth_type);var u=window.open(s,"_blank","location=no,clearsessioncache=yes,clearcache=yes");u.addEventListener("loadstart",function(e){if(0===e.url.indexOf(c)){u.removeEventListener("exit",function(e){}),u.close();for(var n=e.url.split("#")[1],t=n.split("&"),r=[],o=0;o<t.length;o++)r[t[o].split("=")[0]]=t[o].split("=")[1];void 0!==r.access_token&&null!==r.access_token?i.resolve({access_token:r.access_token,expires_in:r.expires_in}):0!==e.url.indexOf("error_code=100")?i.reject("Facebook returned error_code=100: Invalid permissions"):i.reject("Problem authenticating")}}),u.addEventListener("exit",function(e){i.reject("The sign in flow was canceled")})}else i.reject("Could not find InAppBrowser plugin")}else i.reject("Cannot authenticate via a web browser");return i.promise},linkedin:function(r,o,i,a,c){var s=e.defer();if(window.cordova){var u=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(u)===!0){var l="http://localhost/callback";void 0!==c&&c.hasOwnProperty("redirect_uri")&&(l=c.redirect_uri);var d=window.open("https://www.linkedin.com/uas/oauth2/authorization?client_id="+r+"&redirect_uri="+l+"&scope="+i.join(" ")+"&response_type=code&state="+a,"_blank","location=no,clearsessioncache=yes,clearcache=yes");d.addEventListener("loadstart",function(e){0===e.url.indexOf(l)&&(requestToken=e.url.split("code=")[1],n.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",n({method:"post",url:"https://www.linkedin.com/uas/oauth2/accessToken",data:"client_id="+r+"&client_secret="+o+"&redirect_uri="+l+"&grant_type=authorization_code&code="+requestToken}).success(function(e){s.resolve(e)}).error(function(e,n){s.reject("Problem authenticating")})["finally"](function(){setTimeout(function(){d.close()},10)}))}),d.addEventListener("exit",function(e){s.reject("The sign in flow was canceled")})}else s.reject("Could not find InAppBrowser plugin")}else s.reject("Cannot authenticate via a web browser");return s.promise},instagram:function(n,r,o){var i=e.defer(),a={code:"?",token:"#"};if(window.cordova){var c=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(c)===!0){var s="http://localhost/callback",u="token";void 0!==o&&(o.hasOwnProperty("redirect_uri")&&(s=o.redirect_uri),o.hasOwnProperty("response_type")&&(u=o.response_type));var l=window.open("https://api.instagram.com/oauth/authorize/?client_id="+n+"&redirect_uri="+s+"&scope="+r.join(" ")+"&response_type="+u,"_blank","location=no,clearsessioncache=yes,clearcache=yes");l.addEventListener("loadstart",function(e){if(0===e.url.indexOf(s)){l.removeEventListener("exit",function(e){}),l.close();var n=e.url.split(a[u])[1],r=t.parseResponseParameters(n);void 0!==r.access_token&&null!==r.access_token?i.resolve({access_token:r.access_token}):void 0!==r.code&&null!==r.code?i.resolve({code:r.code}):i.reject("Problem authenticating")}}),l.addEventListener("exit",function(e){i.reject("The sign in flow was canceled")})}else i.reject("Could not find InAppBrowser plugin")}else i.reject("Cannot authenticate via a web browser");return i.promise},box:function(r,o,i,a){var c=e.defer();if(window.cordova){var s=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(s)===!0){var u="http://localhost/callback";void 0!==a&&a.hasOwnProperty("redirect_uri")&&(u=a.redirect_uri);var l=window.open("https://app.box.com/api/oauth2/authorize/?client_id="+r+"&redirect_uri="+u+"&state="+i+"&response_type=code","_blank","location=no,clearsessioncache=yes,clearcache=yes");l.addEventListener("loadstart",function(e){0===e.url.indexOf(u)&&(requestToken=e.url.split("code=")[1],n.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",n({method:"post",url:"https://app.box.com/api/oauth2/token",data:"client_id="+r+"&client_secret="+o+"&redirect_uri="+u+"&grant_type=authorization_code&code="+requestToken}).success(function(e){c.resolve(e)}).error(function(e,n){c.reject("Problem authenticating")})["finally"](function(){setTimeout(function(){l.close()},10)}))}),l.addEventListener("exit",function(e){c.reject("The sign in flow was canceled")})}else c.reject("Could not find InAppBrowser plugin")}else c.reject("Cannot authenticate via a web browser");return c.promise},reddit:function(r,o,i,a,c){var s=e.defer();if(window.cordova){var u=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(u)===!0){var l="http://localhost/callback";void 0!==c&&c.hasOwnProperty("redirect_uri")&&(l=c.redirect_uri);var d=window.open("https://ssl.reddit.com/api/v1/authorize?client_id="+r+"&redirect_uri="+l+"&duration=permanent&state=ngcordovaoauth&scope="+i.join(",")+"&response_type=code","_blank","location=no,clearsessioncache=yes,clearcache=yes");d.addEventListener("loadstart",function(e){0===e.url.indexOf(l)&&(requestToken=e.url.split("code=")[1],n.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",n.defaults.headers.post.Authorization="Basic "+btoa(r+":"+o),n({method:"post",url:"https://ssl.reddit.com/api/v1/access_token",data:"redirect_uri="+l+"&grant_type=authorization_code&code="+requestToken}).success(function(e){s.resolve(e)}).error(function(e,n){s.reject("Problem authenticating")})["finally"](function(){setTimeout(function(){d.close()},10)}))}),d.addEventListener("exit",function(e){s.reject("The sign in flow was canceled")})}else s.reject("Could not find InAppBrowser plugin")}else s.reject("Cannot authenticate via a web browser");return s.promise},twitter:function(r,o,i){var a=e.defer();if(window.cordova){var c=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(c)===!0){var s="http://localhost/callback";if(void 0!==i&&i.hasOwnProperty("redirect_uri")&&(s=i.redirect_uri),"undefined"!=typeof jsSHA){var u={oauth_consumer_key:r,oauth_nonce:t.createNonce(10),oauth_signature_method:"HMAC-SHA1",oauth_timestamp:Math.round((new Date).getTime()/1e3),oauth_version:"1.0"},l=t.createSignature("POST","https://api.twitter.com/oauth/request_token",u,{oauth_callback:s},o);n({method:"post",url:"https://api.twitter.com/oauth/request_token",headers:{Authorization:l.authorization_header,"Content-Type":"application/x-www-form-urlencoded"},data:"oauth_callback="+encodeURIComponent(s)}).success(function(e){for(var r=e.split("&"),i={},c=0;c<r.length;c++)i[r[c].split("=")[0]]=r[c].split("=")[1];i.hasOwnProperty("oauth_token")===!1&&a.reject("Oauth request token was not received");var l=window.open("https://api.twitter.com/oauth/authenticate?oauth_token="+i.oauth_token,"_blank","location=no,clearsessioncache=yes,clearcache=yes");l.addEventListener("loadstart",function(e){if(0===e.url.indexOf(s)){for(var r=e.url.split("?")[1],i=r.split("&"),c={},d=0;d<i.length;d++)c[i[d].split("=")[0]]=i[d].split("=")[1];c.hasOwnProperty("oauth_verifier")===!1&&a.reject("Browser authentication failed to complete.  No oauth_verifier was returned"),delete u.oauth_signature,u.oauth_token=c.oauth_token;var f=t.createSignature("POST","https://api.twitter.com/oauth/access_token",u,{oauth_verifier:c.oauth_verifier},o);n({method:"post",url:"https://api.twitter.com/oauth/access_token",headers:{Authorization:f.authorization_header},params:{oauth_verifier:c.oauth_verifier}}).success(function(e){for(var n=e.split("&"),t={},r=0;r<n.length;r++)t[n[r].split("=")[0]]=n[r].split("=")[1];t.hasOwnProperty("oauth_token_secret")===!1&&a.reject("Oauth access token was not received"),a.resolve(t)}).error(function(e){a.reject(e)})["finally"](function(){setTimeout(function(){l.close()},10)})}}),l.addEventListener("exit",function(e){a.reject("The sign in flow was canceled")})}).error(function(e){a.reject(e)})}else a.reject("Missing jsSHA JavaScript library")}else a.reject("Could not find InAppBrowser plugin")}else a.reject("Cannot authenticate via a web browser");return a.promise},meetup:function(n,r){var o=e.defer();if(window.cordova){var i=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(i)===!0){var a="http://localhost/callback";void 0!==r&&r.hasOwnProperty("redirect_uri")&&(a=r.redirect_uri);var c=window.open("https://secure.meetup.com/oauth2/authorize/?client_id="+n+"&redirect_uri="+a+"&response_type=token","_blank","location=no,clearsessioncache=yes,clearcache=yes");c.addEventListener("loadstart",function(e){if(0===e.url.indexOf(a)){c.removeEventListener("exit",function(e){}),c.close();for(var n=e.url.split("#")[1],t=n.split("&"),r={},i=0;i<t.length;i++)r[t[i].split("=")[0]]=t[i].split("=")[1];void 0!==r.access_token&&null!==r.access_token?o.resolve(r):o.reject("Problem authenticating")}}),c.addEventListener("exit",function(e){o.reject("The sign in flow was canceled")})}else o.reject("Could not find InAppBrowser plugin")}else o.reject("Cannot authenticate via a web browser");return o.promise},salesforce:function(n,r){var o="http://localhost/callback",i=function(e,n,t){return e+"services/oauth2/authorize?display=touch&response_type=token&client_id="+escape(n)+"&redirect_uri="+escape(t)},a=function(e,n){return e.substr(0,n.length)===n},c=e.defer();if(window.cordova){var s=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(s)===!0){var u=window.open(i(n,r,o),"_blank","location=no,clearsessioncache=yes,clearcache=yes");u.addEventListener("loadstart",function(e){if(a(e.url,o)){var n={},t=e.url.split("#")[1];if(t){var r=t.split("&");for(var i in r){var s=r[i].split("=");n[s[0]]=unescape(s[1])}}"undefined"==typeof n||"undefined"==typeof n.access_token?c.reject("Problem authenticating"):c.resolve(n),setTimeout(function(){u.close()},10)}}),u.addEventListener("exit",function(e){c.reject("The sign in flow was canceled")})}else c.reject("Could not find InAppBrowser plugin")}else c.reject("Cannot authenticate via a web browser");return c.promise},strava:function(r,o,i,a){var c=e.defer();if(window.cordova){var s=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(s)===!0){var u="http://localhost/callback";void 0!==a&&a.hasOwnProperty("redirect_uri")&&(u=a.redirect_uri);var l=window.open("https://www.strava.com/oauth/authorize?client_id="+r+"&redirect_uri="+u+"&scope="+i.join(",")+"&response_type=code&approval_prompt=force","_blank","location=no,clearsessioncache=yes,clearcache=yes");l.addEventListener("loadstart",function(e){0===e.url.indexOf(u)&&(requestToken=e.url.split("code=")[1],n.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",n({method:"post",url:"https://www.strava.com/oauth/token",data:"client_id="+r+"&client_secret="+o+"&code="+requestToken}).success(function(e){c.resolve(e)}).error(function(e,n){c.reject("Problem authenticating")})["finally"](function(){setTimeout(function(){l.close()},10)}))}),l.addEventListener("exit",function(e){c.reject("The sign in flow was canceled")})}else c.reject("Could not find InAppBrowser plugin")}else c.reject("Cannot authenticate via a web browser");return c.promise},withings:function(r,o){var i=e.defer();if(window.cordova){var a=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(a)===!0)if("undefined"!=typeof jsSHA){var c=t.generateOauthParametersInstance(r);c.oauth_callback="http://localhost/callback";var s="https://oauth.withings.com/account/request_token",u=t.createSignature("GET",s,{},c,o);c.oauth_signature=u.signature;var l=t.generateUrlParameters(c);n({method:"get",url:s+"?"+l}).success(function(e){var a=t.parseResponseParameters(e);a.hasOwnProperty("oauth_token")===!1&&i.reject("Oauth request token was not received");var c=t.generateOauthParametersInstance(r);c.oauth_token=a.oauth_token;var s=a.oauth_token_secret,u="https://oauth.withings.com/account/authorize",l=t.createSignature("GET",u,{},c,o);c.oauth_signature=l.signature;var d=t.generateUrlParameters(c),f=window.open(u+"?"+d,"_blank","location=no,clearsessioncache=yes,clearcache=yes");f.addEventListener("loadstart",function(e){
if(0===e.url.indexOf("http://localhost/callback")){var c=e.url.split("?")[1];a=t.parseResponseParameters(c),a.hasOwnProperty("oauth_verifier")===!1&&i.reject("Browser authentication failed to complete.  No oauth_verifier was returned");var u=t.generateOauthParametersInstance(r);u.oauth_token=a.oauth_token;var l="https://oauth.withings.com/account/access_token",d=t.createSignature("GET",l,{},u,o,s);u.oauth_signature=d.signature;var p=t.generateUrlParameters(u);n({method:"get",url:l+"?"+p}).success(function(e){var n=t.parseResponseParameters(e);n.hasOwnProperty("oauth_token_secret")===!1&&i.reject("Oauth access token was not received"),i.resolve(n)}).error(function(e){i.reject(e)})["finally"](function(){setTimeout(function(){f.close()},10)})}}),f.addEventListener("exit",function(e){i.reject("The sign in flow was canceled")})}).error(function(e){i.reject(e)})}else i.reject("Missing jsSHA JavaScript library");else i.reject("Could not find InAppBrowser plugin")}else i.reject("Cannot authenticate via a web browser");return i.promise},foursquare:function(n,r){var o=e.defer();if(window.cordova){var i=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(i)===!0){var a="http://localhost/callback";void 0!==r&&r.hasOwnProperty("redirect_uri")&&(a=r.redirect_uri);var c=window.open("https://foursquare.com/oauth2/authenticate?client_id="+n+"&redirect_uri="+a+"&response_type=token","_blank","location=no,clearsessioncache=yes,clearcache=yes");c.addEventListener("loadstart",function(e){if(0===e.url.indexOf(a)){c.removeEventListener("exit",function(e){}),c.close();for(var n=e.url.split("#")[1],t=n.split("&"),r=[],i=0;i<t.length;i++)r[t[i].split("=")[0]]=t[i].split("=")[1];if(void 0!==r.access_token&&null!==r.access_token){var s={access_token:r.access_token,expires_in:r.expires_in};o.resolve(s)}else o.reject("Problem authenticating")}}),c.addEventListener("exit",function(e){o.reject("The sign in flow was canceled")})}else o.reject("Could not find InAppBrowser plugin")}else o.reject("Cannot authenticate via a web browser");return o.promise},magento:function(r,o,i){var a=e.defer();if(window.cordova){var c=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(c)===!0)if("undefined"!=typeof jsSHA){var s={oauth_callback:"http://localhost/callback",oauth_consumer_key:o,oauth_nonce:t.createNonce(5),oauth_signature_method:"HMAC-SHA1",oauth_timestamp:Math.round((new Date).getTime()/1e3),oauth_version:"1.0"},u=t.createSignature("POST",r+"/oauth/initiate",s,{oauth_callback:"http://localhost/callback"},i);n.defaults.headers.post.Authorization=u.authorization_header,n.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",n({method:"post",url:r+"/oauth/initiate",data:"oauth_callback=http://localhost/callback"}).success(function(e){for(var o=e.split("&"),c={},u=0;u<o.length;u++)c[o[u].split("=")[0]]=o[u].split("=")[1];c.hasOwnProperty("oauth_token")===!1&&a.reject("Oauth request token was not received");var l=c.oauth_token_secret,d=window.open(r+"/oauth/authorize?oauth_token="+c.oauth_token,"_blank","location=no,clearsessioncache=yes,clearcache=yes");d.addEventListener("loadstart",function(e){if(0===e.url.indexOf("http://localhost/callback")){for(var o=e.url.split("?")[1],c=o.split("&"),u={},f=0;f<c.length;f++)u[c[f].split("=")[0]]=c[f].split("=")[1];u.hasOwnProperty("oauth_verifier")===!1&&a.reject("Browser authentication failed to complete.  No oauth_verifier was returned"),delete s.oauth_signature,delete s.oauth_callback,s.oauth_token=u.oauth_token,s.oauth_nonce=t.createNonce(5),s.oauth_verifier=u.oauth_verifier;var p=t.createSignature("POST",r+"/oauth/token",s,{},i,l);n.defaults.headers.post.Authorization=p.authorization_header,n.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",n({method:"post",url:r+"/oauth/token"}).success(function(e){for(var n=e.split("&"),t={},r=0;r<n.length;r++)t[n[r].split("=")[0]]=n[r].split("=")[1];t.hasOwnProperty("oauth_token_secret")===!1&&a.reject("Oauth access token was not received"),a.resolve(t)}).error(function(e){a.reject(e)})["finally"](function(){setTimeout(function(){d.close()},10)})}}),d.addEventListener("exit",function(e){a.reject("The sign in flow was canceled")})}).error(function(e){a.reject(e)})}else a.reject("Missing jsSHA JavaScript library");else a.reject("Could not find InAppBrowser plugin")}else a.reject("Cannot authenticate via a web browser");return a.promise},vkontakte:function(n,r){var o=e.defer();if(window.cordova){var i=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(i)===!0){var a=window.open("https://oauth.vk.com/authorize?client_id="+n+"&redirect_uri=http://oauth.vk.com/blank.html&response_type=token&scope="+r.join(",")+"&display=touch&response_type=token","_blank","location=no,clearsessioncache=yes,clearcache=yes");a.addEventListener("loadstart",function(e){var n=e.url.split("#");if("https://oauth.vk.com/blank.html"==n[0]||"http://oauth.vk.com/blank.html"==n[0]){a.removeEventListener("exit",function(e){}),a.close();for(var t=e.url.split("#")[1],r=t.split("&"),i=[],c=0;c<r.length;c++)i[r[c].split("=")[0]]=r[c].split("=")[1];if(void 0!==i.access_token&&null!==i.access_token){var s={access_token:i.access_token,expires_in:i.expires_in};void 0!==i.email&&null!==i.email&&(s.email=i.email),o.resolve(s)}else o.reject("Problem authenticating")}}),a.addEventListener("exit",function(e){o.reject("The sign in flow was canceled")})}else o.reject("Could not find InAppBrowser plugin")}else o.reject("Cannot authenticate via a web browser");return o.promise},odnoklassniki:function(n,r){var o=e.defer();if(window.cordova){var i=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(i)===!0){var a=window.open("http://www.odnoklassniki.ru/oauth/authorize?client_id="+n+"&scope="+r.join(",")+"&response_type=token&redirect_uri=http://localhost/callback&layout=m","_blank","location=no,clearsessioncache=yes,clearcache=yes");a.addEventListener("loadstart",function(e){if(0===e.url.indexOf("http://localhost/callback")){for(var n=e.url.split("#")[1],t=n.split("&"),r=[],i=0;i<t.length;i++)r[t[i].split("=")[0]]=t[i].split("=")[1];void 0!==r.access_token&&null!==r.access_token?o.resolve({access_token:r.access_token,session_secret_key:r.session_secret_key}):o.reject("Problem authenticating"),setTimeout(function(){a.close()},10)}}),a.addEventListener("exit",function(e){o.reject("The sign in flow was canceled")})}else o.reject("Could not find InAppBrowser plugin")}else o.reject("Cannot authenticate via a web browser");return o.promise},imgur:function(n,r){var o=e.defer();if(window.cordova){var i=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(i)===!0){var a="http://localhost/callback";void 0!==r&&r.hasOwnProperty("redirect_uri")&&(a=r.redirect_uri);var c=window.open("https://api.imgur.com/oauth2/authorize?client_id="+n+"&response_type=token","_blank","location=no,clearsessioncache=yes,clearcache=yes");c.addEventListener("loadstart",function(e){if(0===e.url.indexOf(a)){c.removeEventListener("exit",function(e){}),c.close();for(var n=e.url.split("#")[1],t=n.split("&"),r=[],i=0;i<t.length;i++)r[t[i].split("=")[0]]=t[i].split("=")[1];void 0!==r.access_token&&null!==r.access_token?o.resolve({access_token:r.access_token,expires_in:r.expires_in,account_username:r.account_username}):o.reject("Problem authenticating")}}),c.addEventListener("exit",function(e){o.reject("The sign in flow was canceled")})}else o.reject("Could not find InAppBrowser plugin")}else o.reject("Cannot authenticate via a web browser");return o.promise},spotify:function(n,r,o){var i=e.defer();if(window.cordova){var a=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(a)===!0){var c="http://localhost/callback";void 0!==o&&o.hasOwnProperty("redirect_uri")&&(c=o.redirect_uri);var s=window.open("https://accounts.spotify.com/authorize?client_id="+n+"&redirect_uri="+c+"&response_type=token&scope="+r.join(" "),"_blank","location=no,clearsessioncache=yes,clearcache=yes");s.addEventListener("loadstart",function(e){if(0===e.url.indexOf(c)){s.removeEventListener("exit",function(e){}),s.close();for(var n=e.url.split("#")[1],t=n.split("&"),r=[],o=0;o<t.length;o++)r[t[o].split("=")[0]]=t[o].split("=")[1];void 0!==r.access_token&&null!==r.access_token?i.resolve({access_token:r.access_token,expires_in:r.expires_in,account_username:r.account_username}):i.reject("Problem authenticating")}}),s.addEventListener("exit",function(e){i.reject("The sign in flow was canceled")})}else i.reject("Could not find InAppBrowser plugin")}else i.reject("Cannot authenticate via a web browser");return i.promise},uber:function(n,r,o){var i=e.defer();if(window.cordova){var a=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(a)===!0){var c="http://localhost/callback";void 0!==o&&o.hasOwnProperty("redirect_uri")&&(c=o.redirect_uri);var s=window.open("https://login.uber.com/oauth/authorize?client_id="+n+"&redirect_uri="+c+"&response_type=token&scope="+r.join(" "),"_blank","location=no,clearsessioncache=yes,clearcache=yes");s.addEventListener("loadstart",function(e){if(0===e.url.indexOf(c)){s.removeEventListener("exit",function(e){}),s.close();for(var n=e.url.split("#")[1],t=n.split("&"),r=[],o=0;o<t.length;o++)r[t[o].split("=")[0]]=t[o].split("=")[1];void 0!==r.access_token&&null!==r.access_token?i.resolve({access_token:r.access_token,token_type:r.token_type,expires_in:r.expires_in,scope:r.scope}):i.reject("Problem authenticating")}}),s.addEventListener("exit",function(e){i.reject("The sign in flow was canceled")})}else i.reject("Could not find InAppBrowser plugin")}else i.reject("Cannot authenticate via a web browser");return i.promise},windowsLive:function(n,r,o){var i=e.defer();if(window.cordova){var a=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(a)===!0){var c="https://login.live.com/oauth20_desktop.srf";void 0!==o&&o.hasOwnProperty("redirect_uri")&&(c=o.redirect_uri);var s=window.open("https://login.live.com/oauth20_authorize.srf?client_id="+n+"&scope="+r.join(",")+"&response_type=token&display=touch&redirect_uri="+c,"_blank","location=no,clearsessioncache=yes,clearcache=yes");s.addEventListener("loadstart",function(e){if(0===e.url.indexOf(c)){s.removeEventListener("exit",function(e){}),s.close();for(var n=e.url.split("#")[1],t=n.split("&"),r=[],o=0;o<t.length;o++)r[t[o].split("=")[0]]=t[o].split("=")[1];void 0!==r.access_token&&null!==r.access_token?i.resolve({access_token:r.access_token,expires_in:r.expires_in}):i.reject("Problem authenticating")}}),s.addEventListener("exit",function(e){i.reject("The sign in flow was canceled")})}else i.reject("Could not find InAppBrowser plugin")}else i.reject("Cannot authenticate via a web browser");return i.promise},yammer:function(n,r){var o=e.defer();if(window.cordova){var i=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(i)===!0){var a="http://localhost/callback";void 0!==r&&r.hasOwnProperty("redirect_uri")&&(a=r.redirect_uri);var c=window.open("https://www.yammer.com/dialog/oauth?client_id="+n+"&redirect_uri="+a+"&response_type=token","_blank","location=no,clearsessioncache=yes,clearcache=yes");c.addEventListener("loadstart",function(e){if(0===e.url.indexOf(a)){c.removeEventListener("exit",function(e){}),c.close();for(var n=e.url.split("#")[1],t=n.split("&"),r=[],i=0;i<t.length;i++)r[t[i].split("=")[0]]=t[i].split("=")[1];void 0!==r.access_token&&null!==r.access_token?o.resolve({access_token:r.access_token}):o.reject("Problem authenticating")}}),c.addEventListener("exit",function(e){o.reject("The sign in flow was canceled")})}else o.reject("Could not find InAppBrowser plugin")}else o.reject("Cannot authenticate via a web browser");return o.promise},venmo:function(n,r,o){var i=e.defer();if(window.cordova){var a=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(a)===!0){var c="http://localhost/callback";void 0!==o&&o.hasOwnProperty("redirect_uri")&&(c=o.redirect_uri);var s=window.open("https://api.venmo.com/v1/oauth/authorize?client_id="+n+"&redirect_uri="+c+"&response_type=token&scope="+r.join(" "),"_blank","location=no,clearsessioncache=yes,clearcache=yes");s.addEventListener("loadstart",function(e){if(0===e.url.indexOf(c)){s.removeEventListener("exit",function(e){}),s.close();for(var n=e.url.split("#")[1],t=n.split("&"),r=[],o=0;o<t.length;o++)r[t[o].split("=")[0]]=t[o].split("=")[1];void 0!==r.access_token&&null!==r.access_token?i.resolve({access_token:r.access_token,expires_in:r.expires_in}):i.reject("Problem authenticating")}}),s.addEventListener("exit",function(e){i.reject("The sign in flow was canceled")})}else i.reject("Could not find InAppBrowser plugin")}else i.reject("Cannot authenticate via a web browser");return i.promise},stripe:function(r,o,i,a){var c=e.defer();if(window.cordova){var s=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(s)===!0){var u="http://localhost/callback";void 0!==a&&a.hasOwnProperty("redirect_uri")&&(u=a.redirect_uri);var l=window.open("https://connect.stripe.com/oauth/authorize?client_id="+r+"&redirect_uri="+u+"&scope="+i+"&response_type=code","_blank","location=no,clearsessioncache=yes,clearcache=yes");l.addEventListener("loadstart",function(e){0===e.url.indexOf("http://localhost/callback")&&(requestToken=e.url.split("code=")[1],n.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",n({method:"post",url:"https://connect.stripe.com/oauth/token",data:"client_id="+r+"&client_secret="+o+"&redirect_uri="+u+"&grant_type=authorization_code&code="+requestToken}).success(function(e){c.resolve(e)}).error(function(e,n){c.reject("Problem authenticating")})["finally"](function(){setTimeout(function(){l.close()},10)}))}),l.addEventListener("exit",function(e){c.reject("The sign in flow was canceled")})}else c.reject("Could not find InAppBrowser plugin")}else c.reject("Cannot authenticate via a web browser");return c.promise},rally:function(r,o,i,a){var c=e.defer();if(window.cordova){var s=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(s)===!0){var u="http://localhost/callback";void 0!==a&&a.hasOwnProperty("redirect_uri")&&(u=a.redirect_uri);var l=window.open("https://rally1.rallydev.com/login/oauth2/auth?client_id="+r+"&redirect_uri="+u+"&scope="+i+"&response_type=code","_blank","location=no,clearsessioncache=yes,clearcache=yes");l.addEventListener("loadstart",function(e){0===e.url.indexOf("http://localhost/callback")&&(requestToken=e.url.split("code=")[1],n.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",n({method:"post",url:"https://rally1.rallydev.com/login/oauth2/auth",data:"client_id="+r+"&client_secret="+o+"&redirect_uri="+u+"&grant_type=authorization_code&code="+requestToken}).success(function(e){c.resolve(e)}).error(function(e,n){c.reject("Problem authenticating")})["finally"](function(){setTimeout(function(){l.close()},10)}))}),l.addEventListener("exit",function(e){c.reject("The sign in flow was canceled")})}else c.reject("Could not find InAppBrowser plugin")}else c.reject("Cannot authenticate via a web browser");return c.promise},familySearch:function(t,r,o){var i=e.defer();if(window.cordova){var a=cordova.require("cordova/plugin_list").metadata;if(a.hasOwnProperty("cordova-plugin-inappbrowser")===!0){var c="http://localhost/callback";void 0!==o&&o.hasOwnProperty("redirect_uri")&&(c=o.redirect_uri);var s=window.open("https://ident.familysearch.org/cis-web/oauth2/v3/authorization?client_id="+t+"&redirect_uri="+c+"&response_type=code&state="+r,"_blank","location=no,clearsessioncache=yes,clearcache=yes");s.addEventListener("loadstart",function(e){if(0===e.url.indexOf(c)){var r=e.url.split("code=")[1];n.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",n({method:"post",url:"https://ident.familysearch.org/cis-web/oauth2/v3/token",data:"client_id="+t+"&redirect_uri="+c+"&grant_type=authorization_code&code="+r}).success(function(e){i.resolve(e)}).error(function(e,n){i.reject("Problem authenticating")})["finally"](function(){setTimeout(function(){s.close()},10)})}}),s.addEventListener("exit",function(e){i.reject("The sign in flow was canceled")})}else i.reject("Could not find InAppBrowser plugin")}else i.reject("Cannot authenticate via a web browser");return i.promise},envato:function(n,r){var o=e.defer();if(window.cordova){var i=cordova.require("cordova/plugin_list").metadata;if(t.isInAppBrowserInstalled(i)===!0){var a="http://localhost/callback";void 0!==r&&r.hasOwnProperty("redirect_uri")&&(a=r.redirect_uri);var c=window.open("https://api.envato.com/authorization?client_id="+n+"&redirect_uri="+a+"&response_type=token","_blank","location=no,clearsessioncache=yes,clearcache=yes");c.addEventListener("loadstart",function(e){if(0===e.url.indexOf(a)){c.removeEventListener("exit",function(e){}),c.close();for(var n=e.url.split("#")[1],t=n.split("&"),r=[],i=0;i<t.length;i++)r[t[i].split("=")[0]]=t[i].split("=")[1];void 0!==r.access_token&&null!==r.access_token?o.resolve({access_token:r.access_token,expires_in:r.expires_in}):o.reject("Problem authenticating")}}),c.addEventListener("exit",function(e){o.reject("The sign in flow was canceled")})}else o.reject("Could not find InAppBrowser plugin")}else o.reject("Cannot authenticate via a web browser");return o.promise}}}]),angular.module("ngCordovaOauth",["oauth.providers","oauth.utils"]),angular.module("oauth.utils",[]).factory("$cordovaOauthUtility",["$q",function(e){return{isInAppBrowserInstalled:function(e){var n=["cordova-plugin-inappbrowser","org.apache.cordova.inappbrowser"];return n.some(function(n){return e.hasOwnProperty(n)})},createSignature:function(e,n,t,r,o,i){if("undefined"!=typeof jsSHA){for(var a=angular.copy(t),c=Object.keys(r),s=0;s<c.length;s++)a[c[s]]=encodeURIComponent(r[c[s]]);var u=e+"&"+encodeURIComponent(n)+"&",l=Object.keys(a).sort();for(s=0;s<l.length;s++)u+=s==l.length-1?encodeURIComponent(l[s]+"="+a[l[s]]):encodeURIComponent(l[s]+"="+a[l[s]]+"&");var d=new jsSHA(u,"TEXT"),f="";i&&(f=encodeURIComponent(i)),t.oauth_signature=encodeURIComponent(d.getHMAC(encodeURIComponent(o)+"&"+f,"TEXT","SHA-1","B64"));var p=Object.keys(t),v="OAuth ";for(s=0;s<p.length;s++)v+=s==p.length-1?p[s]+'="'+t[p[s]]+'"':p[s]+'="'+t[p[s]]+'",';return{signature_base_string:u,authorization_header:v,signature:t.oauth_signature}}return"Missing jsSHA JavaScript library"},createNonce:function(e){for(var n="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=0;e>r;r++)n+=t.charAt(Math.floor(Math.random()*t.length));return n},generateUrlParameters:function(e){var n=Object.keys(e);n.sort();for(var t="",r="",o=0;o<n.length;o++)t+=r+n[o]+"="+e[n[o]],r="&";return t},parseResponseParameters:function(e){if(e.split){for(var n=e.split("&"),t={},r=0;r<n.length;r++)t[n[r].split("=")[0]]=n[r].split("=")[1];return t}return{}},generateOauthParametersInstance:function(e){var n=new jsSHA(Math.round((new Date).getTime()/1e3),"TEXT"),t={oauth_consumer_key:e,oauth_nonce:n.getHash("SHA-1","HEX"),oauth_signature_method:"HMAC-SHA1",oauth_timestamp:Math.round((new Date).getTime()/1e3),oauth_version:"1.0"};return t}}}])}();
/*! ngstorage 0.3.6 | Copyright (c) 2015 Gias Kay Lee | MIT License */!function(a,b){"use strict";return"function"==typeof define&&define.amd?void define("ngStorage",["angular"],function(a){return b(a)}):b(a)}("undefined"==typeof angular?null:angular,function(a){"use strict";function b(b){return["$rootScope","$window","$log","$timeout",function(c,d,e,f){function g(a){var b;try{b=d[a]}catch(c){b=!1}if(b&&"localStorage"===a){var e="__"+Math.round(1e7*Math.random());try{localStorage.setItem(e,e),localStorage.removeItem(e)}catch(c){b=!1}}return b}var h,i,j=g(b)||(e.warn("This browser does not support Web Storage!"),{setItem:function(){},getItem:function(){}}),k={$default:function(b){for(var c in b)a.isDefined(k[c])||(k[c]=b[c]);return k},$reset:function(a){for(var b in k)"$"===b[0]||delete k[b]&&j.removeItem("ngStorage-"+b);return k.$default(a)}};try{j=d[b],j.length}catch(l){e.warn("This browser does not support Web Storage!"),j={}}for(var m,n=0,o=j.length;o>n;n++)(m=j.key(n))&&"ngStorage-"===m.slice(0,10)&&(k[m.slice(10)]=a.fromJson(j.getItem(m)));return h=a.copy(k),c.$watch(function(){var b;i||(i=f(function(){if(i=null,!a.equals(k,h)){b=a.copy(h),a.forEach(k,function(c,d){a.isDefined(c)&&"$"!==d[0]&&j.setItem("ngStorage-"+d,a.toJson(c)),delete b[d]});for(var c in b)j.removeItem("ngStorage-"+c);h=a.copy(k)}},100,!1))}),"localStorage"===b&&d.addEventListener&&d.addEventListener("storage",function(b){"ngStorage-"===b.key.slice(0,10)&&(b.newValue?k[b.key.slice(10)]=a.fromJson(b.newValue):delete k[b.key.slice(10)],h=a.copy(k),c.$apply())}),k}]}a.module("ngStorage",[]).factory("$localStorage",b("localStorage")).factory("$sessionStorage",b("sessionStorage"))});
/*! @license Firebase v2.2.7
    License: https://www.firebase.com/terms/terms-of-service.html */
(function() {var h,aa=this;function n(a){return void 0!==a}function ba(){}function ca(a){a.ub=function(){return a.tf?a.tf:a.tf=new a}}
function da(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function ea(a){return"array"==da(a)}function fa(a){var b=da(a);return"array"==b||"object"==b&&"number"==typeof a.length}function p(a){return"string"==typeof a}function ga(a){return"number"==typeof a}function ha(a){return"function"==da(a)}function ia(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}function ja(a,b,c){return a.call.apply(a.bind,arguments)}
function ka(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function q(a,b,c){q=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ja:ka;return q.apply(null,arguments)}var la=Date.now||function(){return+new Date};
function ma(a,b){function c(){}c.prototype=b.prototype;a.Zg=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Vg=function(a,c,f){for(var g=Array(arguments.length-2),k=2;k<arguments.length;k++)g[k-2]=arguments[k];return b.prototype[c].apply(a,g)}};function r(a,b){for(var c in a)b.call(void 0,a[c],c,a)}function na(a,b){var c={},d;for(d in a)c[d]=b.call(void 0,a[d],d,a);return c}function oa(a,b){for(var c in a)if(!b.call(void 0,a[c],c,a))return!1;return!0}function pa(a){var b=0,c;for(c in a)b++;return b}function qa(a){for(var b in a)return b}function ra(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function sa(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}function ta(a,b){for(var c in a)if(a[c]==b)return!0;return!1}
function ua(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return d}function va(a,b){var c=ua(a,b,void 0);return c&&a[c]}function wa(a){for(var b in a)return!1;return!0}function xa(a){var b={},c;for(c in a)b[c]=a[c];return b}var ya="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function za(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<ya.length;f++)c=ya[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};function Aa(a){a=String(a);if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);}function Ba(){this.Pd=void 0}
function Ca(a,b,c){switch(typeof b){case "string":Da(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(null==b){c.push("null");break}if(ea(b)){var d=b.length;c.push("[");for(var e="",f=0;f<d;f++)c.push(e),e=b[f],Ca(a,a.Pd?a.Pd.call(b,String(f),e):e,c),e=",";c.push("]");break}c.push("{");d="";for(f in b)Object.prototype.hasOwnProperty.call(b,f)&&(e=b[f],"function"!=typeof e&&(c.push(d),Da(f,c),
c.push(":"),Ca(a,a.Pd?a.Pd.call(b,f,e):e,c),d=","));c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}}var Ea={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Fa=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;
function Da(a,b){b.push('"',a.replace(Fa,function(a){if(a in Ea)return Ea[a];var b=a.charCodeAt(0),e="\\u";16>b?e+="000":256>b?e+="00":4096>b&&(e+="0");return Ea[a]=e+b.toString(16)}),'"')};function Ga(){return Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^la()).toString(36)};var Ha;a:{var Ia=aa.navigator;if(Ia){var Ja=Ia.userAgent;if(Ja){Ha=Ja;break a}}Ha=""};function Ka(){this.Wa=-1};function La(){this.Wa=-1;this.Wa=64;this.R=[];this.le=[];this.Tf=[];this.Id=[];this.Id[0]=128;for(var a=1;a<this.Wa;++a)this.Id[a]=0;this.be=this.$b=0;this.reset()}ma(La,Ka);La.prototype.reset=function(){this.R[0]=1732584193;this.R[1]=4023233417;this.R[2]=2562383102;this.R[3]=271733878;this.R[4]=3285377520;this.be=this.$b=0};
function Ma(a,b,c){c||(c=0);var d=a.Tf;if(p(b))for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.R[0];c=a.R[1];for(var g=a.R[2],k=a.R[3],l=a.R[4],m,e=0;80>e;e++)40>e?20>e?(f=k^c&(g^k),m=1518500249):(f=c^g^k,m=1859775393):60>e?(f=c&g|k&(c|g),m=2400959708):(f=c^g^k,m=3395469782),f=(b<<
5|b>>>27)+f+l+m+d[e]&4294967295,l=k,k=g,g=(c<<30|c>>>2)&4294967295,c=b,b=f;a.R[0]=a.R[0]+b&4294967295;a.R[1]=a.R[1]+c&4294967295;a.R[2]=a.R[2]+g&4294967295;a.R[3]=a.R[3]+k&4294967295;a.R[4]=a.R[4]+l&4294967295}
La.prototype.update=function(a,b){if(null!=a){n(b)||(b=a.length);for(var c=b-this.Wa,d=0,e=this.le,f=this.$b;d<b;){if(0==f)for(;d<=c;)Ma(this,a,d),d+=this.Wa;if(p(a))for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.Wa){Ma(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.Wa){Ma(this,e);f=0;break}}this.$b=f;this.be+=b}};var t=Array.prototype,Na=t.indexOf?function(a,b,c){return t.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(p(a))return p(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Oa=t.forEach?function(a,b,c){t.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Pa=t.filter?function(a,b,c){return t.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,g=p(a)?
a.split(""):a,k=0;k<d;k++)if(k in g){var l=g[k];b.call(c,l,k,a)&&(e[f++]=l)}return e},Qa=t.map?function(a,b,c){return t.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=p(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));return e},Ra=t.reduce?function(a,b,c,d){for(var e=[],f=1,g=arguments.length;f<g;f++)e.push(arguments[f]);d&&(e[0]=q(b,d));return t.reduce.apply(a,e)}:function(a,b,c,d){var e=c;Oa(a,function(c,g){e=b.call(d,e,c,g,a)});return e},Sa=t.every?function(a,b,
c){return t.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;return!0};function Ta(a,b){var c=Ua(a,b,void 0);return 0>c?null:p(a)?a.charAt(c):a[c]}function Ua(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return f;return-1}function Va(a,b){var c=Na(a,b);0<=c&&t.splice.call(a,c,1)}function Wa(a,b,c){return 2>=arguments.length?t.slice.call(a,b):t.slice.call(a,b,c)}
function Xa(a,b){a.sort(b||Ya)}function Ya(a,b){return a>b?1:a<b?-1:0};var Za=-1!=Ha.indexOf("Opera")||-1!=Ha.indexOf("OPR"),$a=-1!=Ha.indexOf("Trident")||-1!=Ha.indexOf("MSIE"),ab=-1!=Ha.indexOf("Gecko")&&-1==Ha.toLowerCase().indexOf("webkit")&&!(-1!=Ha.indexOf("Trident")||-1!=Ha.indexOf("MSIE")),bb=-1!=Ha.toLowerCase().indexOf("webkit");
(function(){var a="",b;if(Za&&aa.opera)return a=aa.opera.version,ha(a)?a():a;ab?b=/rv\:([^\);]+)(\)|;)/:$a?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:bb&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(Ha))?a[1]:"");return $a&&(b=(b=aa.document)?b.documentMode:void 0,b>parseFloat(a))?String(b):a})();var cb=null,db=null,eb=null;function fb(a,b){if(!fa(a))throw Error("encodeByteArray takes an array as a parameter");gb();for(var c=b?db:cb,d=[],e=0;e<a.length;e+=3){var f=a[e],g=e+1<a.length,k=g?a[e+1]:0,l=e+2<a.length,m=l?a[e+2]:0,v=f>>2,f=(f&3)<<4|k>>4,k=(k&15)<<2|m>>6,m=m&63;l||(m=64,g||(k=64));d.push(c[v],c[f],c[k],c[m])}return d.join("")}
function gb(){if(!cb){cb={};db={};eb={};for(var a=0;65>a;a++)cb[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),db[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a),eb[db[a]]=a,62<=a&&(eb["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a)]=a)}};function u(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function w(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]}function hb(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])}function ib(a){var b={};hb(a,function(a,d){b[a]=d});return b};function jb(a){var b=[];hb(a,function(a,d){ea(d)?Oa(d,function(d){b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))}):b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))});return b.length?"&"+b.join("&"):""}function kb(a){var b={};a=a.replace(/^\?/,"").split("&");Oa(a,function(a){a&&(a=a.split("="),b[a[0]]=a[1])});return b};function x(a,b,c,d){var e;d<b?e="at least "+b:d>c&&(e=0===c?"none":"no more than "+c);if(e)throw Error(a+" failed: Was called with "+d+(1===d?" argument.":" arguments.")+" Expects "+e+".");}function z(a,b,c){var d="";switch(b){case 1:d=c?"first":"First";break;case 2:d=c?"second":"Second";break;case 3:d=c?"third":"Third";break;case 4:d=c?"fourth":"Fourth";break;default:throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?");}return a=a+" failed: "+(d+" argument ")}
function A(a,b,c,d){if((!d||n(c))&&!ha(c))throw Error(z(a,b,d)+"must be a valid function.");}function lb(a,b,c){if(n(c)&&(!ia(c)||null===c))throw Error(z(a,b,!0)+"must be a valid context object.");};function mb(a){return"undefined"!==typeof JSON&&n(JSON.parse)?JSON.parse(a):Aa(a)}function B(a){if("undefined"!==typeof JSON&&n(JSON.stringify))a=JSON.stringify(a);else{var b=[];Ca(new Ba,a,b);a=b.join("")}return a};function nb(){this.Sd=C}nb.prototype.j=function(a){return this.Sd.oa(a)};nb.prototype.toString=function(){return this.Sd.toString()};function ob(){}ob.prototype.pf=function(){return null};ob.prototype.xe=function(){return null};var pb=new ob;function qb(a,b,c){this.Qf=a;this.Ka=b;this.Hd=c}qb.prototype.pf=function(a){var b=this.Ka.D;if(rb(b,a))return b.j().M(a);b=null!=this.Hd?new sb(this.Hd,!0,!1):this.Ka.u();return this.Qf.Xa(a,b)};qb.prototype.xe=function(a,b,c){var d=null!=this.Hd?this.Hd:tb(this.Ka);a=this.Qf.me(d,b,1,c,a);return 0===a.length?null:a[0]};function ub(){this.tb=[]}function vb(a,b){for(var c=null,d=0;d<b.length;d++){var e=b[d],f=e.Yb();null===c||f.Z(c.Yb())||(a.tb.push(c),c=null);null===c&&(c=new wb(f));c.add(e)}c&&a.tb.push(c)}function xb(a,b,c){vb(a,c);yb(a,function(a){return a.Z(b)})}function zb(a,b,c){vb(a,c);yb(a,function(a){return a.contains(b)||b.contains(a)})}
function yb(a,b){for(var c=!0,d=0;d<a.tb.length;d++){var e=a.tb[d];if(e)if(e=e.Yb(),b(e)){for(var e=a.tb[d],f=0;f<e.sd.length;f++){var g=e.sd[f];if(null!==g){e.sd[f]=null;var k=g.Ub();Ab&&Bb("event: "+g.toString());Cb(k)}}a.tb[d]=null}else c=!1}c&&(a.tb=[])}function wb(a){this.qa=a;this.sd=[]}wb.prototype.add=function(a){this.sd.push(a)};wb.prototype.Yb=function(){return this.qa};function D(a,b,c,d){this.type=a;this.Ja=b;this.Ya=c;this.Je=d;this.Nd=void 0}function Db(a){return new D(Eb,a)}var Eb="value";function Fb(a,b,c,d){this.te=b;this.Wd=c;this.Nd=d;this.rd=a}Fb.prototype.Yb=function(){var a=this.Wd.lc();return"value"===this.rd?a.path:a.parent().path};Fb.prototype.ye=function(){return this.rd};Fb.prototype.Ub=function(){return this.te.Ub(this)};Fb.prototype.toString=function(){return this.Yb().toString()+":"+this.rd+":"+B(this.Wd.lf())};function Gb(a,b,c){this.te=a;this.error=b;this.path=c}Gb.prototype.Yb=function(){return this.path};Gb.prototype.ye=function(){return"cancel"};
Gb.prototype.Ub=function(){return this.te.Ub(this)};Gb.prototype.toString=function(){return this.path.toString()+":cancel"};function sb(a,b,c){this.B=a;this.$=b;this.Tb=c}function Hb(a){return a.$}function rb(a,b){return a.$&&!a.Tb||a.B.Ha(b)}sb.prototype.j=function(){return this.B};function Ib(a){this.dg=a;this.Ad=null}Ib.prototype.get=function(){var a=this.dg.get(),b=xa(a);if(this.Ad)for(var c in this.Ad)b[c]-=this.Ad[c];this.Ad=a;return b};function Jb(a,b){this.Mf={};this.Yd=new Ib(a);this.ca=b;var c=1E4+2E4*Math.random();setTimeout(q(this.Hf,this),Math.floor(c))}Jb.prototype.Hf=function(){var a=this.Yd.get(),b={},c=!1,d;for(d in a)0<a[d]&&u(this.Mf,d)&&(b[d]=a[d],c=!0);c&&this.ca.Te(b);setTimeout(q(this.Hf,this),Math.floor(6E5*Math.random()))};function Kb(){this.Dc={}}function Lb(a,b,c){n(c)||(c=1);u(a.Dc,b)||(a.Dc[b]=0);a.Dc[b]+=c}Kb.prototype.get=function(){return xa(this.Dc)};var Mb={},Nb={};function Ob(a){a=a.toString();Mb[a]||(Mb[a]=new Kb);return Mb[a]}function Pb(a,b){var c=a.toString();Nb[c]||(Nb[c]=b());return Nb[c]};function E(a,b){this.name=a;this.S=b}function Qb(a,b){return new E(a,b)};function Rb(a,b){return Sb(a.name,b.name)}function Tb(a,b){return Sb(a,b)};function Ub(a,b,c){this.type=Vb;this.source=a;this.path=b;this.Ia=c}Ub.prototype.Wc=function(a){return this.path.e()?new Ub(this.source,F,this.Ia.M(a)):new Ub(this.source,G(this.path),this.Ia)};Ub.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" overwrite: "+this.Ia.toString()+")"};function Wb(a,b){this.type=Xb;this.source=Yb;this.path=a;this.Ve=b}Wb.prototype.Wc=function(){return this.path.e()?this:new Wb(G(this.path),this.Ve)};Wb.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" ack write revert="+this.Ve+")"};function Zb(a,b){this.type=$b;this.source=a;this.path=b}Zb.prototype.Wc=function(){return this.path.e()?new Zb(this.source,F):new Zb(this.source,G(this.path))};Zb.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" listen_complete)"};function ac(a,b){this.La=a;this.xa=b?b:bc}h=ac.prototype;h.Na=function(a,b){return new ac(this.La,this.xa.Na(a,b,this.La).X(null,null,!1,null,null))};h.remove=function(a){return new ac(this.La,this.xa.remove(a,this.La).X(null,null,!1,null,null))};h.get=function(a){for(var b,c=this.xa;!c.e();){b=this.La(a,c.key);if(0===b)return c.value;0>b?c=c.left:0<b&&(c=c.right)}return null};
function cc(a,b){for(var c,d=a.xa,e=null;!d.e();){c=a.La(b,d.key);if(0===c){if(d.left.e())return e?e.key:null;for(d=d.left;!d.right.e();)d=d.right;return d.key}0>c?d=d.left:0<c&&(e=d,d=d.right)}throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?");}h.e=function(){return this.xa.e()};h.count=function(){return this.xa.count()};h.Rc=function(){return this.xa.Rc()};h.ec=function(){return this.xa.ec()};h.ha=function(a){return this.xa.ha(a)};
h.Wb=function(a){return new dc(this.xa,null,this.La,!1,a)};h.Xb=function(a,b){return new dc(this.xa,a,this.La,!1,b)};h.Zb=function(a,b){return new dc(this.xa,a,this.La,!0,b)};h.rf=function(a){return new dc(this.xa,null,this.La,!0,a)};function dc(a,b,c,d,e){this.Rd=e||null;this.Ee=d;this.Pa=[];for(e=1;!a.e();)if(e=b?c(a.key,b):1,d&&(e*=-1),0>e)a=this.Ee?a.left:a.right;else if(0===e){this.Pa.push(a);break}else this.Pa.push(a),a=this.Ee?a.right:a.left}
function H(a){if(0===a.Pa.length)return null;var b=a.Pa.pop(),c;c=a.Rd?a.Rd(b.key,b.value):{key:b.key,value:b.value};if(a.Ee)for(b=b.left;!b.e();)a.Pa.push(b),b=b.right;else for(b=b.right;!b.e();)a.Pa.push(b),b=b.left;return c}function ec(a){if(0===a.Pa.length)return null;var b;b=a.Pa;b=b[b.length-1];return a.Rd?a.Rd(b.key,b.value):{key:b.key,value:b.value}}function fc(a,b,c,d,e){this.key=a;this.value=b;this.color=null!=c?c:!0;this.left=null!=d?d:bc;this.right=null!=e?e:bc}h=fc.prototype;
h.X=function(a,b,c,d,e){return new fc(null!=a?a:this.key,null!=b?b:this.value,null!=c?c:this.color,null!=d?d:this.left,null!=e?e:this.right)};h.count=function(){return this.left.count()+1+this.right.count()};h.e=function(){return!1};h.ha=function(a){return this.left.ha(a)||a(this.key,this.value)||this.right.ha(a)};function gc(a){return a.left.e()?a:gc(a.left)}h.Rc=function(){return gc(this).key};h.ec=function(){return this.right.e()?this.key:this.right.ec()};
h.Na=function(a,b,c){var d,e;e=this;d=c(a,e.key);e=0>d?e.X(null,null,null,e.left.Na(a,b,c),null):0===d?e.X(null,b,null,null,null):e.X(null,null,null,null,e.right.Na(a,b,c));return hc(e)};function ic(a){if(a.left.e())return bc;a.left.fa()||a.left.left.fa()||(a=jc(a));a=a.X(null,null,null,ic(a.left),null);return hc(a)}
h.remove=function(a,b){var c,d;c=this;if(0>b(a,c.key))c.left.e()||c.left.fa()||c.left.left.fa()||(c=jc(c)),c=c.X(null,null,null,c.left.remove(a,b),null);else{c.left.fa()&&(c=kc(c));c.right.e()||c.right.fa()||c.right.left.fa()||(c=lc(c),c.left.left.fa()&&(c=kc(c),c=lc(c)));if(0===b(a,c.key)){if(c.right.e())return bc;d=gc(c.right);c=c.X(d.key,d.value,null,null,ic(c.right))}c=c.X(null,null,null,null,c.right.remove(a,b))}return hc(c)};h.fa=function(){return this.color};
function hc(a){a.right.fa()&&!a.left.fa()&&(a=mc(a));a.left.fa()&&a.left.left.fa()&&(a=kc(a));a.left.fa()&&a.right.fa()&&(a=lc(a));return a}function jc(a){a=lc(a);a.right.left.fa()&&(a=a.X(null,null,null,null,kc(a.right)),a=mc(a),a=lc(a));return a}function mc(a){return a.right.X(null,null,a.color,a.X(null,null,!0,null,a.right.left),null)}function kc(a){return a.left.X(null,null,a.color,null,a.X(null,null,!0,a.left.right,null))}
function lc(a){return a.X(null,null,!a.color,a.left.X(null,null,!a.left.color,null,null),a.right.X(null,null,!a.right.color,null,null))}function nc(){}h=nc.prototype;h.X=function(){return this};h.Na=function(a,b){return new fc(a,b,null)};h.remove=function(){return this};h.count=function(){return 0};h.e=function(){return!0};h.ha=function(){return!1};h.Rc=function(){return null};h.ec=function(){return null};h.fa=function(){return!1};var bc=new nc;function oc(a,b){return a&&"object"===typeof a?(J(".sv"in a,"Unexpected leaf node or priority contents"),b[a[".sv"]]):a}function pc(a,b){var c=new qc;rc(a,new K(""),function(a,e){c.mc(a,sc(e,b))});return c}function sc(a,b){var c=a.A().K(),c=oc(c,b),d;if(a.N()){var e=oc(a.Ba(),b);return e!==a.Ba()||c!==a.A().K()?new tc(e,L(c)):a}d=a;c!==a.A().K()&&(d=d.da(new tc(c)));a.U(M,function(a,c){var e=sc(c,b);e!==c&&(d=d.Q(a,e))});return d};function K(a,b){if(1==arguments.length){this.n=a.split("/");for(var c=0,d=0;d<this.n.length;d++)0<this.n[d].length&&(this.n[c]=this.n[d],c++);this.n.length=c;this.Y=0}else this.n=a,this.Y=b}function N(a,b){var c=O(a);if(null===c)return b;if(c===O(b))return N(G(a),G(b));throw Error("INTERNAL ERROR: innerPath ("+b+") is not within outerPath ("+a+")");}function O(a){return a.Y>=a.n.length?null:a.n[a.Y]}function uc(a){return a.n.length-a.Y}
function G(a){var b=a.Y;b<a.n.length&&b++;return new K(a.n,b)}function vc(a){return a.Y<a.n.length?a.n[a.n.length-1]:null}h=K.prototype;h.toString=function(){for(var a="",b=this.Y;b<this.n.length;b++)""!==this.n[b]&&(a+="/"+this.n[b]);return a||"/"};h.slice=function(a){return this.n.slice(this.Y+(a||0))};h.parent=function(){if(this.Y>=this.n.length)return null;for(var a=[],b=this.Y;b<this.n.length-1;b++)a.push(this.n[b]);return new K(a,0)};
h.w=function(a){for(var b=[],c=this.Y;c<this.n.length;c++)b.push(this.n[c]);if(a instanceof K)for(c=a.Y;c<a.n.length;c++)b.push(a.n[c]);else for(a=a.split("/"),c=0;c<a.length;c++)0<a[c].length&&b.push(a[c]);return new K(b,0)};h.e=function(){return this.Y>=this.n.length};h.Z=function(a){if(uc(this)!==uc(a))return!1;for(var b=this.Y,c=a.Y;b<=this.n.length;b++,c++)if(this.n[b]!==a.n[c])return!1;return!0};
h.contains=function(a){var b=this.Y,c=a.Y;if(uc(this)>uc(a))return!1;for(;b<this.n.length;){if(this.n[b]!==a.n[c])return!1;++b;++c}return!0};var F=new K("");function wc(a,b){this.Qa=a.slice();this.Ea=Math.max(1,this.Qa.length);this.kf=b;for(var c=0;c<this.Qa.length;c++)this.Ea+=xc(this.Qa[c]);yc(this)}wc.prototype.push=function(a){0<this.Qa.length&&(this.Ea+=1);this.Qa.push(a);this.Ea+=xc(a);yc(this)};wc.prototype.pop=function(){var a=this.Qa.pop();this.Ea-=xc(a);0<this.Qa.length&&--this.Ea};
function yc(a){if(768<a.Ea)throw Error(a.kf+"has a key path longer than 768 bytes ("+a.Ea+").");if(32<a.Qa.length)throw Error(a.kf+"path specified exceeds the maximum depth that can be written (32) or object contains a cycle "+zc(a));}function zc(a){return 0==a.Qa.length?"":"in property '"+a.Qa.join(".")+"'"};function Ac(){this.wc={}}Ac.prototype.set=function(a,b){null==b?delete this.wc[a]:this.wc[a]=b};Ac.prototype.get=function(a){return u(this.wc,a)?this.wc[a]:null};Ac.prototype.remove=function(a){delete this.wc[a]};Ac.prototype.uf=!0;function Bc(a){this.Ec=a;this.Md="firebase:"}h=Bc.prototype;h.set=function(a,b){null==b?this.Ec.removeItem(this.Md+a):this.Ec.setItem(this.Md+a,B(b))};h.get=function(a){a=this.Ec.getItem(this.Md+a);return null==a?null:mb(a)};h.remove=function(a){this.Ec.removeItem(this.Md+a)};h.uf=!1;h.toString=function(){return this.Ec.toString()};function Cc(a){try{if("undefined"!==typeof window&&"undefined"!==typeof window[a]){var b=window[a];b.setItem("firebase:sentinel","cache");b.removeItem("firebase:sentinel");return new Bc(b)}}catch(c){}return new Ac}var Dc=Cc("localStorage"),P=Cc("sessionStorage");function Ec(a,b,c,d,e){this.host=a.toLowerCase();this.domain=this.host.substr(this.host.indexOf(".")+1);this.lb=b;this.Cb=c;this.Tg=d;this.Ld=e||"";this.Oa=Dc.get("host:"+a)||this.host}function Fc(a,b){b!==a.Oa&&(a.Oa=b,"s-"===a.Oa.substr(0,2)&&Dc.set("host:"+a.host,a.Oa))}Ec.prototype.toString=function(){var a=(this.lb?"https://":"http://")+this.host;this.Ld&&(a+="<"+this.Ld+">");return a};var Gc=function(){var a=1;return function(){return a++}}();function J(a,b){if(!a)throw Hc(b);}function Hc(a){return Error("Firebase (2.2.7) INTERNAL ASSERT FAILED: "+a)}
function Ic(a){try{var b;if("undefined"!==typeof atob)b=atob(a);else{gb();for(var c=eb,d=[],e=0;e<a.length;){var f=c[a.charAt(e++)],g=e<a.length?c[a.charAt(e)]:0;++e;var k=e<a.length?c[a.charAt(e)]:64;++e;var l=e<a.length?c[a.charAt(e)]:64;++e;if(null==f||null==g||null==k||null==l)throw Error();d.push(f<<2|g>>4);64!=k&&(d.push(g<<4&240|k>>2),64!=l&&d.push(k<<6&192|l))}if(8192>d.length)b=String.fromCharCode.apply(null,d);else{a="";for(c=0;c<d.length;c+=8192)a+=String.fromCharCode.apply(null,Wa(d,c,
c+8192));b=a}}return b}catch(m){Bb("base64Decode failed: ",m)}return null}function Jc(a){var b=Kc(a);a=new La;a.update(b);var b=[],c=8*a.be;56>a.$b?a.update(a.Id,56-a.$b):a.update(a.Id,a.Wa-(a.$b-56));for(var d=a.Wa-1;56<=d;d--)a.le[d]=c&255,c/=256;Ma(a,a.le);for(d=c=0;5>d;d++)for(var e=24;0<=e;e-=8)b[c]=a.R[d]>>e&255,++c;return fb(b)}
function Lc(a){for(var b="",c=0;c<arguments.length;c++)b=fa(arguments[c])?b+Lc.apply(null,arguments[c]):"object"===typeof arguments[c]?b+B(arguments[c]):b+arguments[c],b+=" ";return b}var Ab=null,Mc=!0;function Bb(a){!0===Mc&&(Mc=!1,null===Ab&&!0===P.get("logging_enabled")&&Nc(!0));if(Ab){var b=Lc.apply(null,arguments);Ab(b)}}function Oc(a){return function(){Bb(a,arguments)}}
function Pc(a){if("undefined"!==typeof console){var b="FIREBASE INTERNAL ERROR: "+Lc.apply(null,arguments);"undefined"!==typeof console.error?console.error(b):console.log(b)}}function Qc(a){var b=Lc.apply(null,arguments);throw Error("FIREBASE FATAL ERROR: "+b);}function Q(a){if("undefined"!==typeof console){var b="FIREBASE WARNING: "+Lc.apply(null,arguments);"undefined"!==typeof console.warn?console.warn(b):console.log(b)}}
function Rc(a){var b="",c="",d="",e="",f=!0,g="https",k=443;if(p(a)){var l=a.indexOf("//");0<=l&&(g=a.substring(0,l-1),a=a.substring(l+2));l=a.indexOf("/");-1===l&&(l=a.length);b=a.substring(0,l);e="";a=a.substring(l).split("/");for(l=0;l<a.length;l++)if(0<a[l].length){var m=a[l];try{m=decodeURIComponent(m.replace(/\+/g," "))}catch(v){}e+="/"+m}a=b.split(".");3===a.length?(c=a[1],d=a[0].toLowerCase()):2===a.length&&(c=a[0]);l=b.indexOf(":");0<=l&&(f="https"===g||"wss"===g,k=b.substring(l+1),isFinite(k)&&
(k=String(k)),k=p(k)?/^\s*-?0x/i.test(k)?parseInt(k,16):parseInt(k,10):NaN)}return{host:b,port:k,domain:c,Qg:d,lb:f,scheme:g,Zc:e}}function Sc(a){return ga(a)&&(a!=a||a==Number.POSITIVE_INFINITY||a==Number.NEGATIVE_INFINITY)}
function Tc(a){if("complete"===document.readyState)a();else{var b=!1,c=function(){document.body?b||(b=!0,a()):setTimeout(c,Math.floor(10))};document.addEventListener?(document.addEventListener("DOMContentLoaded",c,!1),window.addEventListener("load",c,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&c()}),window.attachEvent("onload",c))}}
function Sb(a,b){if(a===b)return 0;if("[MIN_NAME]"===a||"[MAX_NAME]"===b)return-1;if("[MIN_NAME]"===b||"[MAX_NAME]"===a)return 1;var c=Uc(a),d=Uc(b);return null!==c?null!==d?0==c-d?a.length-b.length:c-d:-1:null!==d?1:a<b?-1:1}function Vc(a,b){if(b&&a in b)return b[a];throw Error("Missing required key ("+a+") in object: "+B(b));}
function Wc(a){if("object"!==typeof a||null===a)return B(a);var b=[],c;for(c in a)b.push(c);b.sort();c="{";for(var d=0;d<b.length;d++)0!==d&&(c+=","),c+=B(b[d]),c+=":",c+=Wc(a[b[d]]);return c+"}"}function Xc(a,b){if(a.length<=b)return[a];for(var c=[],d=0;d<a.length;d+=b)d+b>a?c.push(a.substring(d,a.length)):c.push(a.substring(d,d+b));return c}function Yc(a,b){if(ea(a))for(var c=0;c<a.length;++c)b(c,a[c]);else r(a,b)}
function Zc(a){J(!Sc(a),"Invalid JSON number");var b,c,d,e;0===a?(d=c=0,b=-Infinity===1/a?1:0):(b=0>a,a=Math.abs(a),a>=Math.pow(2,-1022)?(d=Math.min(Math.floor(Math.log(a)/Math.LN2),1023),c=d+1023,d=Math.round(a*Math.pow(2,52-d)-Math.pow(2,52))):(c=0,d=Math.round(a/Math.pow(2,-1074))));e=[];for(a=52;a;--a)e.push(d%2?1:0),d=Math.floor(d/2);for(a=11;a;--a)e.push(c%2?1:0),c=Math.floor(c/2);e.push(b?1:0);e.reverse();b=e.join("");c="";for(a=0;64>a;a+=8)d=parseInt(b.substr(a,8),2).toString(16),1===d.length&&
(d="0"+d),c+=d;return c.toLowerCase()}var $c=/^-?\d{1,10}$/;function Uc(a){return $c.test(a)&&(a=Number(a),-2147483648<=a&&2147483647>=a)?a:null}function Cb(a){try{a()}catch(b){setTimeout(function(){Q("Exception was thrown by user callback.",b.stack||"");throw b;},Math.floor(0))}}function R(a,b){if(ha(a)){var c=Array.prototype.slice.call(arguments,1).slice();Cb(function(){a.apply(null,c)})}};function Kc(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);55296<=e&&56319>=e&&(e-=55296,d++,J(d<a.length,"Surrogate pair missing trail surrogate."),e=65536+(e<<10)+(a.charCodeAt(d)-56320));128>e?b[c++]=e:(2048>e?b[c++]=e>>6|192:(65536>e?b[c++]=e>>12|224:(b[c++]=e>>18|240,b[c++]=e>>12&63|128),b[c++]=e>>6&63|128),b[c++]=e&63|128)}return b}function xc(a){for(var b=0,c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b++:2048>d?b+=2:55296<=d&&56319>=d?(b+=4,c++):b+=3}return b};function ad(a){var b={},c={},d={},e="";try{var f=a.split("."),b=mb(Ic(f[0])||""),c=mb(Ic(f[1])||""),e=f[2],d=c.d||{};delete c.d}catch(g){}return{Wg:b,Ac:c,data:d,Ng:e}}function bd(a){a=ad(a).Ac;return"object"===typeof a&&a.hasOwnProperty("iat")?w(a,"iat"):null}function cd(a){a=ad(a);var b=a.Ac;return!!a.Ng&&!!b&&"object"===typeof b&&b.hasOwnProperty("iat")};function dd(a){this.V=a;this.g=a.o.g}function ed(a,b,c,d){var e=[],f=[];Oa(b,function(b){"child_changed"===b.type&&a.g.xd(b.Je,b.Ja)&&f.push(new D("child_moved",b.Ja,b.Ya))});fd(a,e,"child_removed",b,d,c);fd(a,e,"child_added",b,d,c);fd(a,e,"child_moved",f,d,c);fd(a,e,"child_changed",b,d,c);fd(a,e,Eb,b,d,c);return e}function fd(a,b,c,d,e,f){d=Pa(d,function(a){return a.type===c});Xa(d,q(a.eg,a));Oa(d,function(c){var d=gd(a,c,f);Oa(e,function(e){e.Jf(c.type)&&b.push(e.createEvent(d,a.V))})})}
function gd(a,b,c){"value"!==b.type&&"child_removed"!==b.type&&(b.Nd=c.qf(b.Ya,b.Ja,a.g));return b}dd.prototype.eg=function(a,b){if(null==a.Ya||null==b.Ya)throw Hc("Should only compare child_ events.");return this.g.compare(new E(a.Ya,a.Ja),new E(b.Ya,b.Ja))};function hd(){this.eb={}}
function id(a,b){var c=b.type,d=b.Ya;J("child_added"==c||"child_changed"==c||"child_removed"==c,"Only child changes supported for tracking");J(".priority"!==d,"Only non-priority child changes can be tracked.");var e=w(a.eb,d);if(e){var f=e.type;if("child_added"==c&&"child_removed"==f)a.eb[d]=new D("child_changed",b.Ja,d,e.Ja);else if("child_removed"==c&&"child_added"==f)delete a.eb[d];else if("child_removed"==c&&"child_changed"==f)a.eb[d]=new D("child_removed",e.Je,d);else if("child_changed"==c&&
"child_added"==f)a.eb[d]=new D("child_added",b.Ja,d);else if("child_changed"==c&&"child_changed"==f)a.eb[d]=new D("child_changed",b.Ja,d,e.Je);else throw Hc("Illegal combination of changes: "+b+" occurred after "+e);}else a.eb[d]=b};function jd(a,b,c){this.Pb=a;this.qb=b;this.sb=c||null}h=jd.prototype;h.Jf=function(a){return"value"===a};h.createEvent=function(a,b){var c=b.o.g;return new Fb("value",this,new S(a.Ja,b.lc(),c))};h.Ub=function(a){var b=this.sb;if("cancel"===a.ye()){J(this.qb,"Raising a cancel event on a listener with no cancel callback");var c=this.qb;return function(){c.call(b,a.error)}}var d=this.Pb;return function(){d.call(b,a.Wd)}};h.ff=function(a,b){return this.qb?new Gb(this,a,b):null};
h.matches=function(a){return a instanceof jd?a.Pb&&this.Pb?a.Pb===this.Pb&&a.sb===this.sb:!0:!1};h.sf=function(){return null!==this.Pb};function kd(a,b,c){this.ga=a;this.qb=b;this.sb=c}h=kd.prototype;h.Jf=function(a){a="children_added"===a?"child_added":a;return("children_removed"===a?"child_removed":a)in this.ga};h.ff=function(a,b){return this.qb?new Gb(this,a,b):null};
h.createEvent=function(a,b){J(null!=a.Ya,"Child events should have a childName.");var c=b.lc().w(a.Ya);return new Fb(a.type,this,new S(a.Ja,c,b.o.g),a.Nd)};h.Ub=function(a){var b=this.sb;if("cancel"===a.ye()){J(this.qb,"Raising a cancel event on a listener with no cancel callback");var c=this.qb;return function(){c.call(b,a.error)}}var d=this.ga[a.rd];return function(){d.call(b,a.Wd,a.Nd)}};
h.matches=function(a){if(a instanceof kd){if(!this.ga||!a.ga)return!0;if(this.sb===a.sb){var b=pa(a.ga);if(b===pa(this.ga)){if(1===b){var b=qa(a.ga),c=qa(this.ga);return c===b&&(!a.ga[b]||!this.ga[c]||a.ga[b]===this.ga[c])}return oa(this.ga,function(b,c){return a.ga[c]===b})}}}return!1};h.sf=function(){return null!==this.ga};function ld(a){this.g=a}h=ld.prototype;h.G=function(a,b,c,d,e){J(a.Ic(this.g),"A node must be indexed if only a child is updated");d=a.M(b);if(d.Z(c))return a;null!=e&&(c.e()?a.Ha(b)?id(e,new D("child_removed",d,b)):J(a.N(),"A child remove without an old child only makes sense on a leaf node"):d.e()?id(e,new D("child_added",c,b)):id(e,new D("child_changed",c,b,d)));return a.N()&&c.e()?a:a.Q(b,c).mb(this.g)};
h.ta=function(a,b,c){null!=c&&(a.N()||a.U(M,function(a,e){b.Ha(a)||id(c,new D("child_removed",e,a))}),b.N()||b.U(M,function(b,e){if(a.Ha(b)){var f=a.M(b);f.Z(e)||id(c,new D("child_changed",e,b,f))}else id(c,new D("child_added",e,b))}));return b.mb(this.g)};h.da=function(a,b){return a.e()?C:a.da(b)};h.Ga=function(){return!1};h.Vb=function(){return this};function md(a){this.Ae=new ld(a.g);this.g=a.g;var b;a.la?(b=nd(a),b=a.g.Oc(od(a),b)):b=a.g.Sc();this.dd=b;a.na?(b=pd(a),a=a.g.Oc(qd(a),b)):a=a.g.Pc();this.Fc=a}h=md.prototype;h.matches=function(a){return 0>=this.g.compare(this.dd,a)&&0>=this.g.compare(a,this.Fc)};h.G=function(a,b,c,d,e){this.matches(new E(b,c))||(c=C);return this.Ae.G(a,b,c,d,e)};h.ta=function(a,b,c){b.N()&&(b=C);var d=b.mb(this.g),d=d.da(C),e=this;b.U(M,function(a,b){e.matches(new E(a,b))||(d=d.Q(a,C))});return this.Ae.ta(a,d,c)};
h.da=function(a){return a};h.Ga=function(){return!0};h.Vb=function(){return this.Ae};function rd(a){this.ra=new md(a);this.g=a.g;J(a.ia,"Only valid if limit has been set");this.ja=a.ja;this.Jb=!sd(a)}h=rd.prototype;h.G=function(a,b,c,d,e){this.ra.matches(new E(b,c))||(c=C);return a.M(b).Z(c)?a:a.Db()<this.ja?this.ra.Vb().G(a,b,c,d,e):td(this,a,b,c,d,e)};
h.ta=function(a,b,c){var d;if(b.N()||b.e())d=C.mb(this.g);else if(2*this.ja<b.Db()&&b.Ic(this.g)){d=C.mb(this.g);b=this.Jb?b.Zb(this.ra.Fc,this.g):b.Xb(this.ra.dd,this.g);for(var e=0;0<b.Pa.length&&e<this.ja;){var f=H(b),g;if(g=this.Jb?0>=this.g.compare(this.ra.dd,f):0>=this.g.compare(f,this.ra.Fc))d=d.Q(f.name,f.S),e++;else break}}else{d=b.mb(this.g);d=d.da(C);var k,l,m;if(this.Jb){b=d.rf(this.g);k=this.ra.Fc;l=this.ra.dd;var v=ud(this.g);m=function(a,b){return v(b,a)}}else b=d.Wb(this.g),k=this.ra.dd,
l=this.ra.Fc,m=ud(this.g);for(var e=0,y=!1;0<b.Pa.length;)f=H(b),!y&&0>=m(k,f)&&(y=!0),(g=y&&e<this.ja&&0>=m(f,l))?e++:d=d.Q(f.name,C)}return this.ra.Vb().ta(a,d,c)};h.da=function(a){return a};h.Ga=function(){return!0};h.Vb=function(){return this.ra.Vb()};
function td(a,b,c,d,e,f){var g;if(a.Jb){var k=ud(a.g);g=function(a,b){return k(b,a)}}else g=ud(a.g);J(b.Db()==a.ja,"");var l=new E(c,d),m=a.Jb?wd(b,a.g):xd(b,a.g),v=a.ra.matches(l);if(b.Ha(c)){var y=b.M(c),m=e.xe(a.g,m,a.Jb);null!=m&&m.name==c&&(m=e.xe(a.g,m,a.Jb));e=null==m?1:g(m,l);if(v&&!d.e()&&0<=e)return null!=f&&id(f,new D("child_changed",d,c,y)),b.Q(c,d);null!=f&&id(f,new D("child_removed",y,c));b=b.Q(c,C);return null!=m&&a.ra.matches(m)?(null!=f&&id(f,new D("child_added",m.S,m.name)),b.Q(m.name,
m.S)):b}return d.e()?b:v&&0<=g(m,l)?(null!=f&&(id(f,new D("child_removed",m.S,m.name)),id(f,new D("child_added",d,c))),b.Q(c,d).Q(m.name,C)):b};function yd(a,b){this.he=a;this.cg=b}function zd(a){this.I=a}
zd.prototype.bb=function(a,b,c,d){var e=new hd,f;if(b.type===Vb)b.source.ve?c=Ad(this,a,b.path,b.Ia,c,d,e):(J(b.source.of,"Unknown source."),f=b.source.af,c=Bd(this,a,b.path,b.Ia,c,d,f,e));else if(b.type===Cd)b.source.ve?c=Dd(this,a,b.path,b.children,c,d,e):(J(b.source.of,"Unknown source."),f=b.source.af,c=Ed(this,a,b.path,b.children,c,d,f,e));else if(b.type===Xb)if(b.Ve)if(f=b.path,null!=c.sc(f))c=a;else{b=new qb(c,a,d);d=a.D.j();if(f.e()||".priority"===O(f))Hb(a.u())?b=c.ua(tb(a)):(b=a.u().j(),
J(b instanceof T,"serverChildren would be complete if leaf node"),b=c.xc(b)),b=this.I.ta(d,b,e);else{f=O(f);var g=c.Xa(f,a.u());null==g&&rb(a.u(),f)&&(g=d.M(f));b=null!=g?this.I.G(d,f,g,b,e):a.D.j().Ha(f)?this.I.G(d,f,C,b,e):d;b.e()&&Hb(a.u())&&(d=c.ua(tb(a)),d.N()&&(b=this.I.ta(b,d,e)))}d=Hb(a.u())||null!=c.sc(F);c=Fd(a,b,d,this.I.Ga())}else c=Gd(this,a,b.path,c,d,e);else if(b.type===$b)d=b.path,b=a.u(),f=b.j(),g=b.$||d.e(),c=Hd(this,new Id(a.D,new sb(f,g,b.Tb)),d,c,pb,e);else throw Hc("Unknown operation type: "+
b.type);e=ra(e.eb);d=c;b=d.D;b.$&&(f=b.j().N()||b.j().e(),g=Jd(a),(0<e.length||!a.D.$||f&&!b.j().Z(g)||!b.j().A().Z(g.A()))&&e.push(Db(Jd(d))));return new yd(c,e)};
function Hd(a,b,c,d,e,f){var g=b.D;if(null!=d.sc(c))return b;var k;if(c.e())J(Hb(b.u()),"If change path is empty, we must have complete server data"),b.u().Tb?(e=tb(b),d=d.xc(e instanceof T?e:C)):d=d.ua(tb(b)),f=a.I.ta(b.D.j(),d,f);else{var l=O(c);if(".priority"==l)J(1==uc(c),"Can't have a priority with additional path components"),f=g.j(),k=b.u().j(),d=d.hd(c,f,k),f=null!=d?a.I.da(f,d):g.j();else{var m=G(c);rb(g,l)?(k=b.u().j(),d=d.hd(c,g.j(),k),d=null!=d?g.j().M(l).G(m,d):g.j().M(l)):d=d.Xa(l,b.u());
f=null!=d?a.I.G(g.j(),l,d,e,f):g.j()}}return Fd(b,f,g.$||c.e(),a.I.Ga())}function Bd(a,b,c,d,e,f,g,k){var l=b.u();g=g?a.I:a.I.Vb();if(c.e())d=g.ta(l.j(),d,null);else if(g.Ga()&&!l.Tb)d=l.j().G(c,d),d=g.ta(l.j(),d,null);else{var m=O(c);if((c.e()?!l.$||l.Tb:!rb(l,O(c)))&&1<uc(c))return b;d=l.j().M(m).G(G(c),d);d=".priority"==m?g.da(l.j(),d):g.G(l.j(),m,d,pb,null)}l=l.$||c.e();b=new Id(b.D,new sb(d,l,g.Ga()));return Hd(a,b,c,e,new qb(e,b,f),k)}
function Ad(a,b,c,d,e,f,g){var k=b.D;e=new qb(e,b,f);if(c.e())g=a.I.ta(b.D.j(),d,g),a=Fd(b,g,!0,a.I.Ga());else if(f=O(c),".priority"===f)g=a.I.da(b.D.j(),d),a=Fd(b,g,k.$,k.Tb);else{var l=G(c);c=k.j().M(f);if(!l.e()){var m=e.pf(f);d=null!=m?".priority"===vc(l)&&m.oa(l.parent()).e()?m:m.G(l,d):C}c.Z(d)?a=b:(g=a.I.G(k.j(),f,d,e,g),a=Fd(b,g,k.$,a.I.Ga()))}return a}
function Dd(a,b,c,d,e,f,g){var k=b;Kd(d,function(d,m){var v=c.w(d);rb(b.D,O(v))&&(k=Ad(a,k,v,m,e,f,g))});Kd(d,function(d,m){var v=c.w(d);rb(b.D,O(v))||(k=Ad(a,k,v,m,e,f,g))});return k}function Ld(a,b){Kd(b,function(b,d){a=a.G(b,d)});return a}
function Ed(a,b,c,d,e,f,g,k){if(b.u().j().e()&&!Hb(b.u()))return b;var l=b;c=c.e()?d:Md(Nd,c,d);var m=b.u().j();c.children.ha(function(c,d){if(m.Ha(c)){var I=b.u().j().M(c),I=Ld(I,d);l=Bd(a,l,new K(c),I,e,f,g,k)}});c.children.ha(function(c,d){var I=!Hb(b.u())&&null==d.value;m.Ha(c)||I||(I=b.u().j().M(c),I=Ld(I,d),l=Bd(a,l,new K(c),I,e,f,g,k))});return l}
function Gd(a,b,c,d,e,f){if(null!=d.sc(c))return b;var g=new qb(d,b,e),k=e=b.D.j();if(Hb(b.u())){if(c.e())e=d.ua(tb(b)),k=a.I.ta(b.D.j(),e,f);else if(".priority"===O(c)){var l=d.Xa(O(c),b.u());null==l||e.e()||e.A().Z(l)||(k=a.I.da(e,l))}else l=O(c),e=d.Xa(l,b.u()),null!=e&&(k=a.I.G(b.D.j(),l,e,g,f));e=!0}else if(b.D.$||c.e())k=e,e=b.D.j(),e.N()||e.U(M,function(c){var e=d.Xa(c,b.u());null!=e&&(k=a.I.G(k,c,e,g,f))}),e=b.D.$;else{l=O(c);if(1==uc(c)||rb(b.D,l))c=d.Xa(l,b.u()),null!=c&&(k=a.I.G(e,l,c,
g,f));e=!1}return Fd(b,k,e,a.I.Ga())};function Od(){}var Pd={};function ud(a){return q(a.compare,a)}Od.prototype.xd=function(a,b){return 0!==this.compare(new E("[MIN_NAME]",a),new E("[MIN_NAME]",b))};Od.prototype.Sc=function(){return Qd};function Rd(a){this.bc=a}ma(Rd,Od);h=Rd.prototype;h.Hc=function(a){return!a.M(this.bc).e()};h.compare=function(a,b){var c=a.S.M(this.bc),d=b.S.M(this.bc),c=c.Cc(d);return 0===c?Sb(a.name,b.name):c};h.Oc=function(a,b){var c=L(a),c=C.Q(this.bc,c);return new E(b,c)};
h.Pc=function(){var a=C.Q(this.bc,Sd);return new E("[MAX_NAME]",a)};h.toString=function(){return this.bc};function Td(){}ma(Td,Od);h=Td.prototype;h.compare=function(a,b){var c=a.S.A(),d=b.S.A(),c=c.Cc(d);return 0===c?Sb(a.name,b.name):c};h.Hc=function(a){return!a.A().e()};h.xd=function(a,b){return!a.A().Z(b.A())};h.Sc=function(){return Qd};h.Pc=function(){return new E("[MAX_NAME]",new tc("[PRIORITY-POST]",Sd))};h.Oc=function(a,b){var c=L(a);return new E(b,new tc("[PRIORITY-POST]",c))};
h.toString=function(){return".priority"};var M=new Td;function Ud(){}ma(Ud,Od);h=Ud.prototype;h.compare=function(a,b){return Sb(a.name,b.name)};h.Hc=function(){throw Hc("KeyIndex.isDefinedOn not expected to be called.");};h.xd=function(){return!1};h.Sc=function(){return Qd};h.Pc=function(){return new E("[MAX_NAME]",C)};h.Oc=function(a){J(p(a),"KeyIndex indexValue must always be a string.");return new E(a,C)};h.toString=function(){return".key"};var Vd=new Ud;function Wd(){}ma(Wd,Od);h=Wd.prototype;
h.compare=function(a,b){var c=a.S.Cc(b.S);return 0===c?Sb(a.name,b.name):c};h.Hc=function(){return!0};h.xd=function(a,b){return!a.Z(b)};h.Sc=function(){return Qd};h.Pc=function(){return Xd};h.Oc=function(a,b){var c=L(a);return new E(b,c)};h.toString=function(){return".value"};var Yd=new Wd;function Zd(){this.Rb=this.na=this.Lb=this.la=this.ia=!1;this.ja=0;this.Nb="";this.dc=null;this.xb="";this.ac=null;this.vb="";this.g=M}var $d=new Zd;function sd(a){return""===a.Nb?a.la:"l"===a.Nb}function od(a){J(a.la,"Only valid if start has been set");return a.dc}function nd(a){J(a.la,"Only valid if start has been set");return a.Lb?a.xb:"[MIN_NAME]"}function qd(a){J(a.na,"Only valid if end has been set");return a.ac}
function pd(a){J(a.na,"Only valid if end has been set");return a.Rb?a.vb:"[MAX_NAME]"}function ae(a){var b=new Zd;b.ia=a.ia;b.ja=a.ja;b.la=a.la;b.dc=a.dc;b.Lb=a.Lb;b.xb=a.xb;b.na=a.na;b.ac=a.ac;b.Rb=a.Rb;b.vb=a.vb;b.g=a.g;return b}h=Zd.prototype;h.Ge=function(a){var b=ae(this);b.ia=!0;b.ja=a;b.Nb="";return b};h.He=function(a){var b=ae(this);b.ia=!0;b.ja=a;b.Nb="l";return b};h.Ie=function(a){var b=ae(this);b.ia=!0;b.ja=a;b.Nb="r";return b};
h.Xd=function(a,b){var c=ae(this);c.la=!0;n(a)||(a=null);c.dc=a;null!=b?(c.Lb=!0,c.xb=b):(c.Lb=!1,c.xb="");return c};h.qd=function(a,b){var c=ae(this);c.na=!0;n(a)||(a=null);c.ac=a;n(b)?(c.Rb=!0,c.vb=b):(c.Yg=!1,c.vb="");return c};function be(a,b){var c=ae(a);c.g=b;return c}function ce(a){var b={};a.la&&(b.sp=a.dc,a.Lb&&(b.sn=a.xb));a.na&&(b.ep=a.ac,a.Rb&&(b.en=a.vb));if(a.ia){b.l=a.ja;var c=a.Nb;""===c&&(c=sd(a)?"l":"r");b.vf=c}a.g!==M&&(b.i=a.g.toString());return b}
function de(a){return!(a.la||a.na||a.ia)}function ee(a){var b={};if(de(a)&&a.g==M)return b;var c;a.g===M?c="$priority":a.g===Yd?c="$value":a.g===Vd?c="$key":(J(a.g instanceof Rd,"Unrecognized index type!"),c=a.g.toString());b.orderBy=B(c);a.la&&(b.startAt=B(a.dc),a.Lb&&(b.startAt+=","+B(a.xb)));a.na&&(b.endAt=B(a.ac),a.Rb&&(b.endAt+=","+B(a.vb)));a.ia&&(sd(a)?b.limitToFirst=a.ja:b.limitToLast=a.ja);return b}h.toString=function(){return B(ce(this))};function fe(a,b){this.yd=a;this.cc=b}fe.prototype.get=function(a){var b=w(this.yd,a);if(!b)throw Error("No index defined for "+a);return b===Pd?null:b};function ge(a,b,c){var d=na(a.yd,function(d,f){var g=w(a.cc,f);J(g,"Missing index implementation for "+f);if(d===Pd){if(g.Hc(b.S)){for(var k=[],l=c.Wb(Qb),m=H(l);m;)m.name!=b.name&&k.push(m),m=H(l);k.push(b);return he(k,ud(g))}return Pd}g=c.get(b.name);k=d;g&&(k=k.remove(new E(b.name,g)));return k.Na(b,b.S)});return new fe(d,a.cc)}
function ie(a,b,c){var d=na(a.yd,function(a){if(a===Pd)return a;var d=c.get(b.name);return d?a.remove(new E(b.name,d)):a});return new fe(d,a.cc)}var je=new fe({".priority":Pd},{".priority":M});function tc(a,b){this.C=a;J(n(this.C)&&null!==this.C,"LeafNode shouldn't be created with null/undefined value.");this.ba=b||C;ke(this.ba);this.Bb=null}h=tc.prototype;h.N=function(){return!0};h.A=function(){return this.ba};h.da=function(a){return new tc(this.C,a)};h.M=function(a){return".priority"===a?this.ba:C};h.oa=function(a){return a.e()?this:".priority"===O(a)?this.ba:C};h.Ha=function(){return!1};h.qf=function(){return null};
h.Q=function(a,b){return".priority"===a?this.da(b):b.e()&&".priority"!==a?this:C.Q(a,b).da(this.ba)};h.G=function(a,b){var c=O(a);if(null===c)return b;if(b.e()&&".priority"!==c)return this;J(".priority"!==c||1===uc(a),".priority must be the last token in a path");return this.Q(c,C.G(G(a),b))};h.e=function(){return!1};h.Db=function(){return 0};h.K=function(a){return a&&!this.A().e()?{".value":this.Ba(),".priority":this.A().K()}:this.Ba()};
h.hash=function(){if(null===this.Bb){var a="";this.ba.e()||(a+="priority:"+le(this.ba.K())+":");var b=typeof this.C,a=a+(b+":"),a="number"===b?a+Zc(this.C):a+this.C;this.Bb=Jc(a)}return this.Bb};h.Ba=function(){return this.C};h.Cc=function(a){if(a===C)return 1;if(a instanceof T)return-1;J(a.N(),"Unknown node type");var b=typeof a.C,c=typeof this.C,d=Na(me,b),e=Na(me,c);J(0<=d,"Unknown leaf type: "+b);J(0<=e,"Unknown leaf type: "+c);return d===e?"object"===c?0:this.C<a.C?-1:this.C===a.C?0:1:e-d};
var me=["object","boolean","number","string"];tc.prototype.mb=function(){return this};tc.prototype.Ic=function(){return!0};tc.prototype.Z=function(a){return a===this?!0:a.N()?this.C===a.C&&this.ba.Z(a.ba):!1};tc.prototype.toString=function(){return B(this.K(!0))};function T(a,b,c){this.m=a;(this.ba=b)&&ke(this.ba);a.e()&&J(!this.ba||this.ba.e(),"An empty node cannot have a priority");this.wb=c;this.Bb=null}h=T.prototype;h.N=function(){return!1};h.A=function(){return this.ba||C};h.da=function(a){return this.m.e()?this:new T(this.m,a,this.wb)};h.M=function(a){if(".priority"===a)return this.A();a=this.m.get(a);return null===a?C:a};h.oa=function(a){var b=O(a);return null===b?this:this.M(b).oa(G(a))};h.Ha=function(a){return null!==this.m.get(a)};
h.Q=function(a,b){J(b,"We should always be passing snapshot nodes");if(".priority"===a)return this.da(b);var c=new E(a,b),d,e;b.e()?(d=this.m.remove(a),c=ie(this.wb,c,this.m)):(d=this.m.Na(a,b),c=ge(this.wb,c,this.m));e=d.e()?C:this.ba;return new T(d,e,c)};h.G=function(a,b){var c=O(a);if(null===c)return b;J(".priority"!==O(a)||1===uc(a),".priority must be the last token in a path");var d=this.M(c).G(G(a),b);return this.Q(c,d)};h.e=function(){return this.m.e()};h.Db=function(){return this.m.count()};
var ne=/^(0|[1-9]\d*)$/;h=T.prototype;h.K=function(a){if(this.e())return null;var b={},c=0,d=0,e=!0;this.U(M,function(f,g){b[f]=g.K(a);c++;e&&ne.test(f)?d=Math.max(d,Number(f)):e=!1});if(!a&&e&&d<2*c){var f=[],g;for(g in b)f[g]=b[g];return f}a&&!this.A().e()&&(b[".priority"]=this.A().K());return b};h.hash=function(){if(null===this.Bb){var a="";this.A().e()||(a+="priority:"+le(this.A().K())+":");this.U(M,function(b,c){var d=c.hash();""!==d&&(a+=":"+b+":"+d)});this.Bb=""===a?"":Jc(a)}return this.Bb};
h.qf=function(a,b,c){return(c=oe(this,c))?(a=cc(c,new E(a,b)))?a.name:null:cc(this.m,a)};function wd(a,b){var c;c=(c=oe(a,b))?(c=c.Rc())&&c.name:a.m.Rc();return c?new E(c,a.m.get(c)):null}function xd(a,b){var c;c=(c=oe(a,b))?(c=c.ec())&&c.name:a.m.ec();return c?new E(c,a.m.get(c)):null}h.U=function(a,b){var c=oe(this,a);return c?c.ha(function(a){return b(a.name,a.S)}):this.m.ha(b)};h.Wb=function(a){return this.Xb(a.Sc(),a)};
h.Xb=function(a,b){var c=oe(this,b);if(c)return c.Xb(a,function(a){return a});for(var c=this.m.Xb(a.name,Qb),d=ec(c);null!=d&&0>b.compare(d,a);)H(c),d=ec(c);return c};h.rf=function(a){return this.Zb(a.Pc(),a)};h.Zb=function(a,b){var c=oe(this,b);if(c)return c.Zb(a,function(a){return a});for(var c=this.m.Zb(a.name,Qb),d=ec(c);null!=d&&0<b.compare(d,a);)H(c),d=ec(c);return c};h.Cc=function(a){return this.e()?a.e()?0:-1:a.N()||a.e()?1:a===Sd?-1:0};
h.mb=function(a){if(a===Vd||ta(this.wb.cc,a.toString()))return this;var b=this.wb,c=this.m;J(a!==Vd,"KeyIndex always exists and isn't meant to be added to the IndexMap.");for(var d=[],e=!1,c=c.Wb(Qb),f=H(c);f;)e=e||a.Hc(f.S),d.push(f),f=H(c);d=e?he(d,ud(a)):Pd;e=a.toString();c=xa(b.cc);c[e]=a;a=xa(b.yd);a[e]=d;return new T(this.m,this.ba,new fe(a,c))};h.Ic=function(a){return a===Vd||ta(this.wb.cc,a.toString())};
h.Z=function(a){if(a===this)return!0;if(a.N())return!1;if(this.A().Z(a.A())&&this.m.count()===a.m.count()){var b=this.Wb(M);a=a.Wb(M);for(var c=H(b),d=H(a);c&&d;){if(c.name!==d.name||!c.S.Z(d.S))return!1;c=H(b);d=H(a)}return null===c&&null===d}return!1};function oe(a,b){return b===Vd?null:a.wb.get(b.toString())}h.toString=function(){return B(this.K(!0))};function L(a,b){if(null===a)return C;var c=null;"object"===typeof a&&".priority"in a?c=a[".priority"]:"undefined"!==typeof b&&(c=b);J(null===c||"string"===typeof c||"number"===typeof c||"object"===typeof c&&".sv"in c,"Invalid priority type found: "+typeof c);"object"===typeof a&&".value"in a&&null!==a[".value"]&&(a=a[".value"]);if("object"!==typeof a||".sv"in a)return new tc(a,L(c));if(a instanceof Array){var d=C,e=a;r(e,function(a,b){if(u(e,b)&&"."!==b.substring(0,1)){var c=L(a);if(c.N()||!c.e())d=
d.Q(b,c)}});return d.da(L(c))}var f=[],g=!1,k=a;hb(k,function(a){if("string"!==typeof a||"."!==a.substring(0,1)){var b=L(k[a]);b.e()||(g=g||!b.A().e(),f.push(new E(a,b)))}});if(0==f.length)return C;var l=he(f,Rb,function(a){return a.name},Tb);if(g){var m=he(f,ud(M));return new T(l,L(c),new fe({".priority":m},{".priority":M}))}return new T(l,L(c),je)}var pe=Math.log(2);
function qe(a){this.count=parseInt(Math.log(a+1)/pe,10);this.hf=this.count-1;this.bg=a+1&parseInt(Array(this.count+1).join("1"),2)}function re(a){var b=!(a.bg&1<<a.hf);a.hf--;return b}
function he(a,b,c,d){function e(b,d){var f=d-b;if(0==f)return null;if(1==f){var m=a[b],v=c?c(m):m;return new fc(v,m.S,!1,null,null)}var m=parseInt(f/2,10)+b,f=e(b,m),y=e(m+1,d),m=a[m],v=c?c(m):m;return new fc(v,m.S,!1,f,y)}a.sort(b);var f=function(b){function d(b,g){var k=v-b,y=v;v-=b;var y=e(k+1,y),k=a[k],I=c?c(k):k,y=new fc(I,k.S,g,null,y);f?f.left=y:m=y;f=y}for(var f=null,m=null,v=a.length,y=0;y<b.count;++y){var I=re(b),vd=Math.pow(2,b.count-(y+1));I?d(vd,!1):(d(vd,!1),d(vd,!0))}return m}(new qe(a.length));
return null!==f?new ac(d||b,f):new ac(d||b)}function le(a){return"number"===typeof a?"number:"+Zc(a):"string:"+a}function ke(a){if(a.N()){var b=a.K();J("string"===typeof b||"number"===typeof b||"object"===typeof b&&u(b,".sv"),"Priority must be a string or number.")}else J(a===Sd||a.e(),"priority of unexpected type.");J(a===Sd||a.A().e(),"Priority nodes can't have a priority of their own.")}var C=new T(new ac(Tb),null,je);function se(){T.call(this,new ac(Tb),C,je)}ma(se,T);h=se.prototype;
h.Cc=function(a){return a===this?0:1};h.Z=function(a){return a===this};h.A=function(){return this};h.M=function(){return C};h.e=function(){return!1};var Sd=new se,Qd=new E("[MIN_NAME]",C),Xd=new E("[MAX_NAME]",Sd);function Id(a,b){this.D=a;this.Ud=b}function Fd(a,b,c,d){return new Id(new sb(b,c,d),a.Ud)}function Jd(a){return a.D.$?a.D.j():null}Id.prototype.u=function(){return this.Ud};function tb(a){return a.Ud.$?a.Ud.j():null};function te(a,b){this.V=a;var c=a.o,d=new ld(c.g),c=de(c)?new ld(c.g):c.ia?new rd(c):new md(c);this.Gf=new zd(c);var e=b.u(),f=b.D,g=d.ta(C,e.j(),null),k=c.ta(C,f.j(),null);this.Ka=new Id(new sb(k,f.$,c.Ga()),new sb(g,e.$,d.Ga()));this.Za=[];this.ig=new dd(a)}function ue(a){return a.V}h=te.prototype;h.u=function(){return this.Ka.u().j()};h.hb=function(a){var b=tb(this.Ka);return b&&(de(this.V.o)||!a.e()&&!b.M(O(a)).e())?b.oa(a):null};h.e=function(){return 0===this.Za.length};h.Ob=function(a){this.Za.push(a)};
h.kb=function(a,b){var c=[];if(b){J(null==a,"A cancel should cancel all event registrations.");var d=this.V.path;Oa(this.Za,function(a){(a=a.ff(b,d))&&c.push(a)})}if(a){for(var e=[],f=0;f<this.Za.length;++f){var g=this.Za[f];if(!g.matches(a))e.push(g);else if(a.sf()){e=e.concat(this.Za.slice(f+1));break}}this.Za=e}else this.Za=[];return c};
h.bb=function(a,b,c){a.type===Cd&&null!==a.source.Ib&&(J(tb(this.Ka),"We should always have a full cache before handling merges"),J(Jd(this.Ka),"Missing event cache, even though we have a server cache"));var d=this.Ka;a=this.Gf.bb(d,a,b,c);b=this.Gf;c=a.he;J(c.D.j().Ic(b.I.g),"Event snap not indexed");J(c.u().j().Ic(b.I.g),"Server snap not indexed");J(Hb(a.he.u())||!Hb(d.u()),"Once a server snap is complete, it should never go back");this.Ka=a.he;return ve(this,a.cg,a.he.D.j(),null)};
function we(a,b){var c=a.Ka.D,d=[];c.j().N()||c.j().U(M,function(a,b){d.push(new D("child_added",b,a))});c.$&&d.push(Db(c.j()));return ve(a,d,c.j(),b)}function ve(a,b,c,d){return ed(a.ig,b,c,d?[d]:a.Za)};function xe(a,b,c){this.type=Cd;this.source=a;this.path=b;this.children=c}xe.prototype.Wc=function(a){if(this.path.e())return a=this.children.subtree(new K(a)),a.e()?null:a.value?new Ub(this.source,F,a.value):new xe(this.source,F,a);J(O(this.path)===a,"Can't get a merge for a child not on the path of the operation");return new xe(this.source,G(this.path),this.children)};xe.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"};var Vb=0,Cd=1,Xb=2,$b=3;function ye(a,b,c,d){this.ve=a;this.of=b;this.Ib=c;this.af=d;J(!d||b,"Tagged queries must be from server.")}var Yb=new ye(!0,!1,null,!1),ze=new ye(!1,!0,null,!1);ye.prototype.toString=function(){return this.ve?"user":this.af?"server(queryID="+this.Ib+")":"server"};function Ae(a,b){this.f=Oc("p:rest:");this.H=a;this.Gb=b;this.Fa=null;this.aa={}}function Be(a,b){if(n(b))return"tag$"+b;var c=a.o;J(de(c)&&c.g==M,"should have a tag if it's not a default query.");return a.path.toString()}h=Ae.prototype;
h.xf=function(a,b,c,d){var e=a.path.toString();this.f("Listen called for "+e+" "+a.wa());var f=Be(a,c),g={};this.aa[f]=g;a=ee(a.o);var k=this;Ce(this,e+".json",a,function(a,b){var v=b;404===a&&(a=v=null);null===a&&k.Gb(e,v,!1,c);w(k.aa,f)===g&&d(a?401==a?"permission_denied":"rest_error:"+a:"ok",null)})};h.Of=function(a,b){var c=Be(a,b);delete this.aa[c]};h.P=function(a,b){this.Fa=a;var c=ad(a),d=c.data,c=c.Ac&&c.Ac.exp;b&&b("ok",{auth:d,expires:c})};h.ee=function(a){this.Fa=null;a("ok",null)};
h.Le=function(){};h.Bf=function(){};h.Gd=function(){};h.put=function(){};h.yf=function(){};h.Te=function(){};
function Ce(a,b,c,d){c=c||{};c.format="export";a.Fa&&(c.auth=a.Fa);var e=(a.H.lb?"https://":"http://")+a.H.host+b+"?"+jb(c);a.f("Sending REST request for "+e);var f=new XMLHttpRequest;f.onreadystatechange=function(){if(d&&4===f.readyState){a.f("REST Response for "+e+" received. status:",f.status,"response:",f.responseText);var b=null;if(200<=f.status&&300>f.status){try{b=mb(f.responseText)}catch(c){Q("Failed to parse JSON response for "+e+": "+f.responseText)}d(null,b)}else 401!==f.status&&404!==
f.status&&Q("Got unsuccessful REST response for "+e+" Status: "+f.status),d(f.status);d=null}};f.open("GET",e,!0);f.send()};function De(a,b){this.value=a;this.children=b||Ee}var Ee=new ac(function(a,b){return a===b?0:a<b?-1:1});function Fe(a){var b=Nd;r(a,function(a,d){b=b.set(new K(d),a)});return b}h=De.prototype;h.e=function(){return null===this.value&&this.children.e()};function Ge(a,b,c){if(null!=a.value&&c(a.value))return{path:F,value:a.value};if(b.e())return null;var d=O(b);a=a.children.get(d);return null!==a?(b=Ge(a,G(b),c),null!=b?{path:(new K(d)).w(b.path),value:b.value}:null):null}
function He(a,b){return Ge(a,b,function(){return!0})}h.subtree=function(a){if(a.e())return this;var b=this.children.get(O(a));return null!==b?b.subtree(G(a)):Nd};h.set=function(a,b){if(a.e())return new De(b,this.children);var c=O(a),d=(this.children.get(c)||Nd).set(G(a),b),c=this.children.Na(c,d);return new De(this.value,c)};
h.remove=function(a){if(a.e())return this.children.e()?Nd:new De(null,this.children);var b=O(a),c=this.children.get(b);return c?(a=c.remove(G(a)),b=a.e()?this.children.remove(b):this.children.Na(b,a),null===this.value&&b.e()?Nd:new De(this.value,b)):this};h.get=function(a){if(a.e())return this.value;var b=this.children.get(O(a));return b?b.get(G(a)):null};
function Md(a,b,c){if(b.e())return c;var d=O(b);b=Md(a.children.get(d)||Nd,G(b),c);d=b.e()?a.children.remove(d):a.children.Na(d,b);return new De(a.value,d)}function Ie(a,b){return Je(a,F,b)}function Je(a,b,c){var d={};a.children.ha(function(a,f){d[a]=Je(f,b.w(a),c)});return c(b,a.value,d)}function Ke(a,b,c){return Le(a,b,F,c)}function Le(a,b,c,d){var e=a.value?d(c,a.value):!1;if(e)return e;if(b.e())return null;e=O(b);return(a=a.children.get(e))?Le(a,G(b),c.w(e),d):null}
function Me(a,b,c){var d=F;if(!b.e()){var e=!0;a.value&&(e=c(d,a.value));!0===e&&(e=O(b),(a=a.children.get(e))&&Ne(a,G(b),d.w(e),c))}}function Ne(a,b,c,d){if(b.e())return a;a.value&&d(c,a.value);var e=O(b);return(a=a.children.get(e))?Ne(a,G(b),c.w(e),d):Nd}function Kd(a,b){Oe(a,F,b)}function Oe(a,b,c){a.children.ha(function(a,e){Oe(e,b.w(a),c)});a.value&&c(b,a.value)}function Pe(a,b){a.children.ha(function(a,d){d.value&&b(a,d.value)})}var Nd=new De(null);
De.prototype.toString=function(){var a={};Kd(this,function(b,c){a[b.toString()]=c.toString()});return B(a)};function Qe(a){this.W=a}var Re=new Qe(new De(null));function Se(a,b,c){if(b.e())return new Qe(new De(c));var d=He(a.W,b);if(null!=d){var e=d.path,d=d.value;b=N(e,b);d=d.G(b,c);return new Qe(a.W.set(e,d))}a=Md(a.W,b,new De(c));return new Qe(a)}function Te(a,b,c){var d=a;hb(c,function(a,c){d=Se(d,b.w(a),c)});return d}Qe.prototype.Od=function(a){if(a.e())return Re;a=Md(this.W,a,Nd);return new Qe(a)};function Ue(a,b){var c=He(a.W,b);return null!=c?a.W.get(c.path).oa(N(c.path,b)):null}
function Ve(a){var b=[],c=a.W.value;null!=c?c.N()||c.U(M,function(a,c){b.push(new E(a,c))}):a.W.children.ha(function(a,c){null!=c.value&&b.push(new E(a,c.value))});return b}function We(a,b){if(b.e())return a;var c=Ue(a,b);return null!=c?new Qe(new De(c)):new Qe(a.W.subtree(b))}Qe.prototype.e=function(){return this.W.e()};Qe.prototype.apply=function(a){return Xe(F,this.W,a)};
function Xe(a,b,c){if(null!=b.value)return c.G(a,b.value);var d=null;b.children.ha(function(b,f){".priority"===b?(J(null!==f.value,"Priority writes must always be leaf nodes"),d=f.value):c=Xe(a.w(b),f,c)});c.oa(a).e()||null===d||(c=c.G(a.w(".priority"),d));return c};function Ye(){this.T=Re;this.za=[];this.Lc=-1}h=Ye.prototype;
h.Od=function(a){var b=Ua(this.za,function(b){return b.ie===a});J(0<=b,"removeWrite called with nonexistent writeId.");var c=this.za[b];this.za.splice(b,1);for(var d=c.visible,e=!1,f=this.za.length-1;d&&0<=f;){var g=this.za[f];g.visible&&(f>=b&&Ze(g,c.path)?d=!1:c.path.contains(g.path)&&(e=!0));f--}if(d){if(e)this.T=$e(this.za,af,F),this.Lc=0<this.za.length?this.za[this.za.length-1].ie:-1;else if(c.Ia)this.T=this.T.Od(c.path);else{var k=this;r(c.children,function(a,b){k.T=k.T.Od(c.path.w(b))})}return c.path}return null};
h.ua=function(a,b,c,d){if(c||d){var e=We(this.T,a);return!d&&e.e()?b:d||null!=b||null!=Ue(e,F)?(e=$e(this.za,function(b){return(b.visible||d)&&(!c||!(0<=Na(c,b.ie)))&&(b.path.contains(a)||a.contains(b.path))},a),b=b||C,e.apply(b)):null}e=Ue(this.T,a);if(null!=e)return e;e=We(this.T,a);return e.e()?b:null!=b||null!=Ue(e,F)?(b=b||C,e.apply(b)):null};
h.xc=function(a,b){var c=C,d=Ue(this.T,a);if(d)d.N()||d.U(M,function(a,b){c=c.Q(a,b)});else if(b){var e=We(this.T,a);b.U(M,function(a,b){var d=We(e,new K(a)).apply(b);c=c.Q(a,d)});Oa(Ve(e),function(a){c=c.Q(a.name,a.S)})}else e=We(this.T,a),Oa(Ve(e),function(a){c=c.Q(a.name,a.S)});return c};h.hd=function(a,b,c,d){J(c||d,"Either existingEventSnap or existingServerSnap must exist");a=a.w(b);if(null!=Ue(this.T,a))return null;a=We(this.T,a);return a.e()?d.oa(b):a.apply(d.oa(b))};
h.Xa=function(a,b,c){a=a.w(b);var d=Ue(this.T,a);return null!=d?d:rb(c,b)?We(this.T,a).apply(c.j().M(b)):null};h.sc=function(a){return Ue(this.T,a)};h.me=function(a,b,c,d,e,f){var g;a=We(this.T,a);g=Ue(a,F);if(null==g)if(null!=b)g=a.apply(b);else return[];g=g.mb(f);if(g.e()||g.N())return[];b=[];a=ud(f);e=e?g.Zb(c,f):g.Xb(c,f);for(f=H(e);f&&b.length<d;)0!==a(f,c)&&b.push(f),f=H(e);return b};
function Ze(a,b){return a.Ia?a.path.contains(b):!!ua(a.children,function(c,d){return a.path.w(d).contains(b)})}function af(a){return a.visible}
function $e(a,b,c){for(var d=Re,e=0;e<a.length;++e){var f=a[e];if(b(f)){var g=f.path;if(f.Ia)c.contains(g)?(g=N(c,g),d=Se(d,g,f.Ia)):g.contains(c)&&(g=N(g,c),d=Se(d,F,f.Ia.oa(g)));else if(f.children)if(c.contains(g))g=N(c,g),d=Te(d,g,f.children);else{if(g.contains(c))if(g=N(g,c),g.e())d=Te(d,F,f.children);else if(f=w(f.children,O(g)))f=f.oa(G(g)),d=Se(d,F,f)}else throw Hc("WriteRecord should have .snap or .children");}}return d}function bf(a,b){this.Mb=a;this.W=b}h=bf.prototype;
h.ua=function(a,b,c){return this.W.ua(this.Mb,a,b,c)};h.xc=function(a){return this.W.xc(this.Mb,a)};h.hd=function(a,b,c){return this.W.hd(this.Mb,a,b,c)};h.sc=function(a){return this.W.sc(this.Mb.w(a))};h.me=function(a,b,c,d,e){return this.W.me(this.Mb,a,b,c,d,e)};h.Xa=function(a,b){return this.W.Xa(this.Mb,a,b)};h.w=function(a){return new bf(this.Mb.w(a),this.W)};function cf(){this.ya={}}h=cf.prototype;h.e=function(){return wa(this.ya)};h.bb=function(a,b,c){var d=a.source.Ib;if(null!==d)return d=w(this.ya,d),J(null!=d,"SyncTree gave us an op for an invalid query."),d.bb(a,b,c);var e=[];r(this.ya,function(d){e=e.concat(d.bb(a,b,c))});return e};h.Ob=function(a,b,c,d,e){var f=a.wa(),g=w(this.ya,f);if(!g){var g=c.ua(e?d:null),k=!1;g?k=!0:(g=d instanceof T?c.xc(d):C,k=!1);g=new te(a,new Id(new sb(g,k,!1),new sb(d,e,!1)));this.ya[f]=g}g.Ob(b);return we(g,b)};
h.kb=function(a,b,c){var d=a.wa(),e=[],f=[],g=null!=df(this);if("default"===d){var k=this;r(this.ya,function(a,d){f=f.concat(a.kb(b,c));a.e()&&(delete k.ya[d],de(a.V.o)||e.push(a.V))})}else{var l=w(this.ya,d);l&&(f=f.concat(l.kb(b,c)),l.e()&&(delete this.ya[d],de(l.V.o)||e.push(l.V)))}g&&null==df(this)&&e.push(new U(a.k,a.path));return{Hg:e,jg:f}};function ef(a){return Pa(ra(a.ya),function(a){return!de(a.V.o)})}h.hb=function(a){var b=null;r(this.ya,function(c){b=b||c.hb(a)});return b};
function ff(a,b){if(de(b.o))return df(a);var c=b.wa();return w(a.ya,c)}function df(a){return va(a.ya,function(a){return de(a.V.o)})||null};function gf(a){this.sa=Nd;this.Hb=new Ye;this.$e={};this.kc={};this.Mc=a}function hf(a,b,c,d,e){var f=a.Hb,g=e;J(d>f.Lc,"Stacking an older write on top of newer ones");n(g)||(g=!0);f.za.push({path:b,Ia:c,ie:d,visible:g});g&&(f.T=Se(f.T,b,c));f.Lc=d;return e?jf(a,new Ub(Yb,b,c)):[]}function kf(a,b,c,d){var e=a.Hb;J(d>e.Lc,"Stacking an older merge on top of newer ones");e.za.push({path:b,children:c,ie:d,visible:!0});e.T=Te(e.T,b,c);e.Lc=d;c=Fe(c);return jf(a,new xe(Yb,b,c))}
function lf(a,b,c){c=c||!1;b=a.Hb.Od(b);return null==b?[]:jf(a,new Wb(b,c))}function mf(a,b,c){c=Fe(c);return jf(a,new xe(ze,b,c))}function nf(a,b,c,d){d=of(a,d);if(null!=d){var e=pf(d);d=e.path;e=e.Ib;b=N(d,b);c=new Ub(new ye(!1,!0,e,!0),b,c);return qf(a,d,c)}return[]}function rf(a,b,c,d){if(d=of(a,d)){var e=pf(d);d=e.path;e=e.Ib;b=N(d,b);c=Fe(c);c=new xe(new ye(!1,!0,e,!0),b,c);return qf(a,d,c)}return[]}
gf.prototype.Ob=function(a,b){var c=a.path,d=null,e=!1;Me(this.sa,c,function(a,b){var f=N(a,c);d=b.hb(f);e=e||null!=df(b);return!d});var f=this.sa.get(c);f?(e=e||null!=df(f),d=d||f.hb(F)):(f=new cf,this.sa=this.sa.set(c,f));var g;null!=d?g=!0:(g=!1,d=C,Pe(this.sa.subtree(c),function(a,b){var c=b.hb(F);c&&(d=d.Q(a,c))}));var k=null!=ff(f,a);if(!k&&!de(a.o)){var l=sf(a);J(!(l in this.kc),"View does not exist, but we have a tag");var m=tf++;this.kc[l]=m;this.$e["_"+m]=l}g=f.Ob(a,b,new bf(c,this.Hb),
d,g);k||e||(f=ff(f,a),g=g.concat(uf(this,a,f)));return g};
gf.prototype.kb=function(a,b,c){var d=a.path,e=this.sa.get(d),f=[];if(e&&("default"===a.wa()||null!=ff(e,a))){f=e.kb(a,b,c);e.e()&&(this.sa=this.sa.remove(d));e=f.Hg;f=f.jg;b=-1!==Ua(e,function(a){return de(a.o)});var g=Ke(this.sa,d,function(a,b){return null!=df(b)});if(b&&!g&&(d=this.sa.subtree(d),!d.e()))for(var d=vf(d),k=0;k<d.length;++k){var l=d[k],m=l.V,l=wf(this,l);this.Mc.Xe(m,xf(this,m),l.ud,l.J)}if(!g&&0<e.length&&!c)if(b)this.Mc.Zd(a,null);else{var v=this;Oa(e,function(a){a.wa();var b=v.kc[sf(a)];
v.Mc.Zd(a,b)})}yf(this,e)}return f};gf.prototype.ua=function(a,b){var c=this.Hb,d=Ke(this.sa,a,function(b,c){var d=N(b,a);if(d=c.hb(d))return d});return c.ua(a,d,b,!0)};function vf(a){return Ie(a,function(a,c,d){if(c&&null!=df(c))return[df(c)];var e=[];c&&(e=ef(c));r(d,function(a){e=e.concat(a)});return e})}function yf(a,b){for(var c=0;c<b.length;++c){var d=b[c];if(!de(d.o)){var d=sf(d),e=a.kc[d];delete a.kc[d];delete a.$e["_"+e]}}}
function uf(a,b,c){var d=b.path,e=xf(a,b);c=wf(a,c);b=a.Mc.Xe(b,e,c.ud,c.J);d=a.sa.subtree(d);if(e)J(null==df(d.value),"If we're adding a query, it shouldn't be shadowed");else for(e=Ie(d,function(a,b,c){if(!a.e()&&b&&null!=df(b))return[ue(df(b))];var d=[];b&&(d=d.concat(Qa(ef(b),function(a){return a.V})));r(c,function(a){d=d.concat(a)});return d}),d=0;d<e.length;++d)c=e[d],a.Mc.Zd(c,xf(a,c));return b}
function wf(a,b){var c=b.V,d=xf(a,c);return{ud:function(){return(b.u()||C).hash()},J:function(b){if("ok"===b){if(d){var f=c.path;if(b=of(a,d)){var g=pf(b);b=g.path;g=g.Ib;f=N(b,f);f=new Zb(new ye(!1,!0,g,!0),f);b=qf(a,b,f)}else b=[]}else b=jf(a,new Zb(ze,c.path));return b}f="Unknown Error";"too_big"===b?f="The data requested exceeds the maximum size that can be accessed with a single request.":"permission_denied"==b?f="Client doesn't have permission to access the desired data.":"unavailable"==b&&
(f="The service is unavailable");f=Error(b+": "+f);f.code=b.toUpperCase();return a.kb(c,null,f)}}}function sf(a){return a.path.toString()+"$"+a.wa()}function pf(a){var b=a.indexOf("$");J(-1!==b&&b<a.length-1,"Bad queryKey.");return{Ib:a.substr(b+1),path:new K(a.substr(0,b))}}function of(a,b){var c=a.$e,d="_"+b;return d in c?c[d]:void 0}function xf(a,b){var c=sf(b);return w(a.kc,c)}var tf=1;
function qf(a,b,c){var d=a.sa.get(b);J(d,"Missing sync point for query tag that we're tracking");return d.bb(c,new bf(b,a.Hb),null)}function jf(a,b){return zf(a,b,a.sa,null,new bf(F,a.Hb))}function zf(a,b,c,d,e){if(b.path.e())return Af(a,b,c,d,e);var f=c.get(F);null==d&&null!=f&&(d=f.hb(F));var g=[],k=O(b.path),l=b.Wc(k);if((c=c.children.get(k))&&l)var m=d?d.M(k):null,k=e.w(k),g=g.concat(zf(a,l,c,m,k));f&&(g=g.concat(f.bb(b,e,d)));return g}
function Af(a,b,c,d,e){var f=c.get(F);null==d&&null!=f&&(d=f.hb(F));var g=[];c.children.ha(function(c,f){var m=d?d.M(c):null,v=e.w(c),y=b.Wc(c);y&&(g=g.concat(Af(a,y,f,m,v)))});f&&(g=g.concat(f.bb(b,e,d)));return g};function Bf(){this.children={};this.kd=0;this.value=null}function Cf(a,b,c){this.Dd=a?a:"";this.Yc=b?b:null;this.B=c?c:new Bf}function Df(a,b){for(var c=b instanceof K?b:new K(b),d=a,e;null!==(e=O(c));)d=new Cf(e,d,w(d.B.children,e)||new Bf),c=G(c);return d}h=Cf.prototype;h.Ba=function(){return this.B.value};function Ef(a,b){J("undefined"!==typeof b,"Cannot set value to undefined");a.B.value=b;Ff(a)}h.clear=function(){this.B.value=null;this.B.children={};this.B.kd=0;Ff(this)};
h.td=function(){return 0<this.B.kd};h.e=function(){return null===this.Ba()&&!this.td()};h.U=function(a){var b=this;r(this.B.children,function(c,d){a(new Cf(d,b,c))})};function Gf(a,b,c,d){c&&!d&&b(a);a.U(function(a){Gf(a,b,!0,d)});c&&d&&b(a)}function Hf(a,b){for(var c=a.parent();null!==c&&!b(c);)c=c.parent()}h.path=function(){return new K(null===this.Yc?this.Dd:this.Yc.path()+"/"+this.Dd)};h.name=function(){return this.Dd};h.parent=function(){return this.Yc};
function Ff(a){if(null!==a.Yc){var b=a.Yc,c=a.Dd,d=a.e(),e=u(b.B.children,c);d&&e?(delete b.B.children[c],b.B.kd--,Ff(b)):d||e||(b.B.children[c]=a.B,b.B.kd++,Ff(b))}};function If(a){J(ea(a)&&0<a.length,"Requires a non-empty array");this.Uf=a;this.Nc={}}If.prototype.de=function(a,b){for(var c=this.Nc[a]||[],d=0;d<c.length;d++)c[d].yc.apply(c[d].Ma,Array.prototype.slice.call(arguments,1))};If.prototype.Eb=function(a,b,c){Jf(this,a);this.Nc[a]=this.Nc[a]||[];this.Nc[a].push({yc:b,Ma:c});(a=this.ze(a))&&b.apply(c,a)};If.prototype.gc=function(a,b,c){Jf(this,a);a=this.Nc[a]||[];for(var d=0;d<a.length;d++)if(a[d].yc===b&&(!c||c===a[d].Ma)){a.splice(d,1);break}};
function Jf(a,b){J(Ta(a.Uf,function(a){return a===b}),"Unknown event: "+b)};var Kf=function(){var a=0,b=[];return function(c){var d=c===a;a=c;for(var e=Array(8),f=7;0<=f;f--)e[f]="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c%64),c=Math.floor(c/64);J(0===c,"Cannot push at time == 0");c=e.join("");if(d){for(f=11;0<=f&&63===b[f];f--)b[f]=0;b[f]++}else for(f=0;12>f;f++)b[f]=Math.floor(64*Math.random());for(f=0;12>f;f++)c+="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);J(20===c.length,"nextPushId: Length should be 20.");
return c}}();function Lf(){If.call(this,["online"]);this.ic=!0;if("undefined"!==typeof window&&"undefined"!==typeof window.addEventListener){var a=this;window.addEventListener("online",function(){a.ic||(a.ic=!0,a.de("online",!0))},!1);window.addEventListener("offline",function(){a.ic&&(a.ic=!1,a.de("online",!1))},!1)}}ma(Lf,If);Lf.prototype.ze=function(a){J("online"===a,"Unknown event type: "+a);return[this.ic]};ca(Lf);function Mf(){If.call(this,["visible"]);var a,b;"undefined"!==typeof document&&"undefined"!==typeof document.addEventListener&&("undefined"!==typeof document.hidden?(b="visibilitychange",a="hidden"):"undefined"!==typeof document.mozHidden?(b="mozvisibilitychange",a="mozHidden"):"undefined"!==typeof document.msHidden?(b="msvisibilitychange",a="msHidden"):"undefined"!==typeof document.webkitHidden&&(b="webkitvisibilitychange",a="webkitHidden"));this.uc=!0;if(b){var c=this;document.addEventListener(b,
function(){var b=!document[a];b!==c.uc&&(c.uc=b,c.de("visible",b))},!1)}}ma(Mf,If);Mf.prototype.ze=function(a){J("visible"===a,"Unknown event type: "+a);return[this.uc]};ca(Mf);var Nf=/[\[\].#$\/\u0000-\u001F\u007F]/,Of=/[\[\].#$\u0000-\u001F\u007F]/,Pf=/^[a-zA-Z][a-zA-Z._\-+]+$/;function Qf(a){return p(a)&&0!==a.length&&!Nf.test(a)}function Rf(a){return null===a||p(a)||ga(a)&&!Sc(a)||ia(a)&&u(a,".sv")}function Sf(a,b,c,d){d&&!n(b)||Tf(z(a,1,d),b,c)}
function Tf(a,b,c){c instanceof K&&(c=new wc(c,a));if(!n(b))throw Error(a+"contains undefined "+zc(c));if(ha(b))throw Error(a+"contains a function "+zc(c)+" with contents: "+b.toString());if(Sc(b))throw Error(a+"contains "+b.toString()+" "+zc(c));if(p(b)&&b.length>10485760/3&&10485760<xc(b))throw Error(a+"contains a string greater than 10485760 utf8 bytes "+zc(c)+" ('"+b.substring(0,50)+"...')");if(ia(b)){var d=!1,e=!1;hb(b,function(b,g){if(".value"===b)d=!0;else if(".priority"!==b&&".sv"!==b&&(e=
!0,!Qf(b)))throw Error(a+" contains an invalid key ("+b+") "+zc(c)+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');c.push(b);Tf(a,g,c);c.pop()});if(d&&e)throw Error(a+' contains ".value" child '+zc(c)+" in addition to actual children.");}}
function Uf(a,b,c){if(!ia(b)||ea(b))throw Error(z(a,1,!1)+" must be an Object containing the children to replace.");if(u(b,".value"))throw Error(z(a,1,!1)+' must not contain ".value".  To overwrite with a leaf value, just use .set() instead.');Sf(a,b,c,!1)}
function Vf(a,b,c){if(Sc(c))throw Error(z(a,b,!1)+"is "+c.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!Rf(c))throw Error(z(a,b,!1)+"must be a valid Firebase priority (a string, finite number, server value, or null).");}
function Wf(a,b,c){if(!c||n(b))switch(b){case "value":case "child_added":case "child_removed":case "child_changed":case "child_moved":break;default:throw Error(z(a,1,c)+'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".');}}function Xf(a,b,c,d){if((!d||n(c))&&!Qf(c))throw Error(z(a,b,d)+'was an invalid key: "'+c+'".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").');}
function Yf(a,b){if(!p(b)||0===b.length||Of.test(b))throw Error(z(a,1,!1)+'was an invalid path: "'+b+'". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');}function Zf(a,b){if(".info"===O(b))throw Error(a+" failed: Can't modify data under /.info/");}function $f(a,b){if(!p(b))throw Error(z(a,1,!1)+"must be a valid credential (a string).");}function ag(a,b,c){if(!p(c))throw Error(z(a,b,!1)+"must be a valid string.");}
function bg(a,b){ag(a,1,b);if(!Pf.test(b))throw Error(z(a,1,!1)+"'"+b+"' is not a valid authentication provider.");}function cg(a,b,c,d){if(!d||n(c))if(!ia(c)||null===c)throw Error(z(a,b,d)+"must be a valid object.");}function dg(a,b,c){if(!ia(b)||!u(b,c))throw Error(z(a,1,!1)+'must contain the key "'+c+'"');if(!p(w(b,c)))throw Error(z(a,1,!1)+'must contain the key "'+c+'" with type "string"');};function eg(){this.set={}}h=eg.prototype;h.add=function(a,b){this.set[a]=null!==b?b:!0};h.contains=function(a){return u(this.set,a)};h.get=function(a){return this.contains(a)?this.set[a]:void 0};h.remove=function(a){delete this.set[a]};h.clear=function(){this.set={}};h.e=function(){return wa(this.set)};h.count=function(){return pa(this.set)};function fg(a,b){r(a.set,function(a,d){b(d,a)})}h.keys=function(){var a=[];r(this.set,function(b,c){a.push(c)});return a};function qc(){this.m=this.C=null}qc.prototype.find=function(a){if(null!=this.C)return this.C.oa(a);if(a.e()||null==this.m)return null;var b=O(a);a=G(a);return this.m.contains(b)?this.m.get(b).find(a):null};qc.prototype.mc=function(a,b){if(a.e())this.C=b,this.m=null;else if(null!==this.C)this.C=this.C.G(a,b);else{null==this.m&&(this.m=new eg);var c=O(a);this.m.contains(c)||this.m.add(c,new qc);c=this.m.get(c);a=G(a);c.mc(a,b)}};
function gg(a,b){if(b.e())return a.C=null,a.m=null,!0;if(null!==a.C){if(a.C.N())return!1;var c=a.C;a.C=null;c.U(M,function(b,c){a.mc(new K(b),c)});return gg(a,b)}return null!==a.m?(c=O(b),b=G(b),a.m.contains(c)&&gg(a.m.get(c),b)&&a.m.remove(c),a.m.e()?(a.m=null,!0):!1):!0}function rc(a,b,c){null!==a.C?c(b,a.C):a.U(function(a,e){var f=new K(b.toString()+"/"+a);rc(e,f,c)})}qc.prototype.U=function(a){null!==this.m&&fg(this.m,function(b,c){a(b,c)})};var hg="auth.firebase.com";function ig(a,b,c){this.ld=a||{};this.ce=b||{};this.ab=c||{};this.ld.remember||(this.ld.remember="default")}var jg=["remember","redirectTo"];function kg(a){var b={},c={};hb(a||{},function(a,e){0<=Na(jg,a)?b[a]=e:c[a]=e});return new ig(b,{},c)};function lg(a,b){this.Pe=["session",a.Ld,a.Cb].join(":");this.$d=b}lg.prototype.set=function(a,b){if(!b)if(this.$d.length)b=this.$d[0];else throw Error("fb.login.SessionManager : No storage options available!");b.set(this.Pe,a)};lg.prototype.get=function(){var a=Qa(this.$d,q(this.ng,this)),a=Pa(a,function(a){return null!==a});Xa(a,function(a,c){return bd(c.token)-bd(a.token)});return 0<a.length?a.shift():null};lg.prototype.ng=function(a){try{var b=a.get(this.Pe);if(b&&b.token)return b}catch(c){}return null};
lg.prototype.clear=function(){var a=this;Oa(this.$d,function(b){b.remove(a.Pe)})};function mg(){return"undefined"!==typeof navigator&&"string"===typeof navigator.userAgent?navigator.userAgent:""}function ng(){return"undefined"!==typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(mg())}function og(){return"undefined"!==typeof location&&/^file:\//.test(location.href)}
function pg(a){var b=mg();if(""===b)return!1;if("Microsoft Internet Explorer"===navigator.appName){if((b=b.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/))&&1<b.length)return parseFloat(b[1])>=a}else if(-1<b.indexOf("Trident")&&(b=b.match(/rv:([0-9]{2,2}[\.0-9]{0,})/))&&1<b.length)return parseFloat(b[1])>=a;return!1};function qg(){var a=window.opener.frames,b;for(b=a.length-1;0<=b;b--)try{if(a[b].location.protocol===window.location.protocol&&a[b].location.host===window.location.host&&"__winchan_relay_frame"===a[b].name)return a[b]}catch(c){}return null}function rg(a,b,c){a.attachEvent?a.attachEvent("on"+b,c):a.addEventListener&&a.addEventListener(b,c,!1)}function sg(a,b,c){a.detachEvent?a.detachEvent("on"+b,c):a.removeEventListener&&a.removeEventListener(b,c,!1)}
function tg(a){/^https?:\/\//.test(a)||(a=window.location.href);var b=/^(https?:\/\/[\-_a-zA-Z\.0-9:]+)/.exec(a);return b?b[1]:a}function ug(a){var b="";try{a=a.replace("#","");var c=kb(a);c&&u(c,"__firebase_request_key")&&(b=w(c,"__firebase_request_key"))}catch(d){}return b}function vg(){var a=Rc(hg);return a.scheme+"://"+a.host+"/v2"}function wg(a){return vg()+"/"+a+"/auth/channel"};function xg(a){var b=this;this.zc=a;this.ae="*";pg(8)?this.Qc=this.wd=qg():(this.Qc=window.opener,this.wd=window);if(!b.Qc)throw"Unable to find relay frame";rg(this.wd,"message",q(this.hc,this));rg(this.wd,"message",q(this.Af,this));try{yg(this,{a:"ready"})}catch(c){rg(this.Qc,"load",function(){yg(b,{a:"ready"})})}rg(window,"unload",q(this.yg,this))}function yg(a,b){b=B(b);pg(8)?a.Qc.doPost(b,a.ae):a.Qc.postMessage(b,a.ae)}
xg.prototype.hc=function(a){var b=this,c;try{c=mb(a.data)}catch(d){}c&&"request"===c.a&&(sg(window,"message",this.hc),this.ae=a.origin,this.zc&&setTimeout(function(){b.zc(b.ae,c.d,function(a,c){b.ag=!c;b.zc=void 0;yg(b,{a:"response",d:a,forceKeepWindowOpen:c})})},0))};xg.prototype.yg=function(){try{sg(this.wd,"message",this.Af)}catch(a){}this.zc&&(yg(this,{a:"error",d:"unknown closed window"}),this.zc=void 0);try{window.close()}catch(b){}};xg.prototype.Af=function(a){if(this.ag&&"die"===a.data)try{window.close()}catch(b){}};function zg(a){this.oc=Ga()+Ga()+Ga();this.Df=a}zg.prototype.open=function(a,b){P.set("redirect_request_id",this.oc);P.set("redirect_request_id",this.oc);b.requestId=this.oc;b.redirectTo=b.redirectTo||window.location.href;a+=(/\?/.test(a)?"":"?")+jb(b);window.location=a};zg.isAvailable=function(){return!og()&&!ng()};zg.prototype.Bc=function(){return"redirect"};var Ag={NETWORK_ERROR:"Unable to contact the Firebase server.",SERVER_ERROR:"An unknown server error occurred.",TRANSPORT_UNAVAILABLE:"There are no login transports available for the requested method.",REQUEST_INTERRUPTED:"The browser redirected the page before the login request could complete.",USER_CANCELLED:"The user cancelled authentication."};function Bg(a){var b=Error(w(Ag,a),a);b.code=a;return b};function Cg(a){var b;(b=!a.window_features)||(b=mg(),b=-1!==b.indexOf("Fennec/")||-1!==b.indexOf("Firefox/")&&-1!==b.indexOf("Android"));b&&(a.window_features=void 0);a.window_name||(a.window_name="_blank");this.options=a}
Cg.prototype.open=function(a,b,c){function d(a){g&&(document.body.removeChild(g),g=void 0);v&&(v=clearInterval(v));sg(window,"message",e);sg(window,"unload",d);if(m&&!a)try{m.close()}catch(b){k.postMessage("die",l)}m=k=void 0}function e(a){if(a.origin===l)try{var b=mb(a.data);"ready"===b.a?k.postMessage(y,l):"error"===b.a?(d(!1),c&&(c(b.d),c=null)):"response"===b.a&&(d(b.forceKeepWindowOpen),c&&(c(null,b.d),c=null))}catch(e){}}var f=pg(8),g,k;if(!this.options.relay_url)return c(Error("invalid arguments: origin of url and relay_url must match"));
var l=tg(a);if(l!==tg(this.options.relay_url))c&&setTimeout(function(){c(Error("invalid arguments: origin of url and relay_url must match"))},0);else{f&&(g=document.createElement("iframe"),g.setAttribute("src",this.options.relay_url),g.style.display="none",g.setAttribute("name","__winchan_relay_frame"),document.body.appendChild(g),k=g.contentWindow);a+=(/\?/.test(a)?"":"?")+jb(b);var m=window.open(a,this.options.window_name,this.options.window_features);k||(k=m);var v=setInterval(function(){m&&m.closed&&
(d(!1),c&&(c(Bg("USER_CANCELLED")),c=null))},500),y=B({a:"request",d:b});rg(window,"unload",d);rg(window,"message",e)}};
Cg.isAvailable=function(){var a;if(a="postMessage"in window&&!og())(a=ng()||"undefined"!==typeof navigator&&(!!mg().match(/Windows Phone/)||!!window.Windows&&/^ms-appx:/.test(location.href)))||(a=mg(),a="undefined"!==typeof navigator&&"undefined"!==typeof window&&!!(a.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i)||a.match(/CriOS/)||a.match(/Twitter for iPhone/)||a.match(/FBAN\/FBIOS/)||window.navigator.standalone)),a=!a;return a&&!mg().match(/PhantomJS/)};Cg.prototype.Bc=function(){return"popup"};function Dg(a){a.method||(a.method="GET");a.headers||(a.headers={});a.headers.content_type||(a.headers.content_type="application/json");a.headers.content_type=a.headers.content_type.toLowerCase();this.options=a}
Dg.prototype.open=function(a,b,c){function d(){c&&(c(Bg("REQUEST_INTERRUPTED")),c=null)}var e=new XMLHttpRequest,f=this.options.method.toUpperCase(),g;rg(window,"beforeunload",d);e.onreadystatechange=function(){if(c&&4===e.readyState){var a;if(200<=e.status&&300>e.status){try{a=mb(e.responseText)}catch(b){}c(null,a)}else 500<=e.status&&600>e.status?c(Bg("SERVER_ERROR")):c(Bg("NETWORK_ERROR"));c=null;sg(window,"beforeunload",d)}};if("GET"===f)a+=(/\?/.test(a)?"":"?")+jb(b),g=null;else{var k=this.options.headers.content_type;
"application/json"===k&&(g=B(b));"application/x-www-form-urlencoded"===k&&(g=jb(b))}e.open(f,a,!0);a={"X-Requested-With":"XMLHttpRequest",Accept:"application/json;text/plain"};za(a,this.options.headers);for(var l in a)e.setRequestHeader(l,a[l]);e.send(g)};Dg.isAvailable=function(){var a;if(a=!!window.XMLHttpRequest)a=mg(),a=!(a.match(/MSIE/)||a.match(/Trident/))||pg(10);return a};Dg.prototype.Bc=function(){return"json"};function Eg(a){this.oc=Ga()+Ga()+Ga();this.Df=a}
Eg.prototype.open=function(a,b,c){function d(){c&&(c(Bg("USER_CANCELLED")),c=null)}var e=this,f=Rc(hg),g;b.requestId=this.oc;b.redirectTo=f.scheme+"://"+f.host+"/blank/page.html";a+=/\?/.test(a)?"":"?";a+=jb(b);(g=window.open(a,"_blank","location=no"))&&ha(g.addEventListener)?(g.addEventListener("loadstart",function(a){var b;if(b=a&&a.url)a:{try{var m=document.createElement("a");m.href=a.url;b=m.host===f.host&&"/blank/page.html"===m.pathname;break a}catch(v){}b=!1}b&&(a=ug(a.url),g.removeEventListener("exit",
d),g.close(),a=new ig(null,null,{requestId:e.oc,requestKey:a}),e.Df.requestWithCredential("/auth/session",a,c),c=null)}),g.addEventListener("exit",d)):c(Bg("TRANSPORT_UNAVAILABLE"))};Eg.isAvailable=function(){return ng()};Eg.prototype.Bc=function(){return"redirect"};function Fg(a){a.callback_parameter||(a.callback_parameter="callback");this.options=a;window.__firebase_auth_jsonp=window.__firebase_auth_jsonp||{}}
Fg.prototype.open=function(a,b,c){function d(){c&&(c(Bg("REQUEST_INTERRUPTED")),c=null)}function e(){setTimeout(function(){window.__firebase_auth_jsonp[f]=void 0;wa(window.__firebase_auth_jsonp)&&(window.__firebase_auth_jsonp=void 0);try{var a=document.getElementById(f);a&&a.parentNode.removeChild(a)}catch(b){}},1);sg(window,"beforeunload",d)}var f="fn"+(new Date).getTime()+Math.floor(99999*Math.random());b[this.options.callback_parameter]="__firebase_auth_jsonp."+f;a+=(/\?/.test(a)?"":"?")+jb(b);
rg(window,"beforeunload",d);window.__firebase_auth_jsonp[f]=function(a){c&&(c(null,a),c=null);e()};Gg(f,a,c)};
function Gg(a,b,c){setTimeout(function(){try{var d=document.createElement("script");d.type="text/javascript";d.id=a;d.async=!0;d.src=b;d.onerror=function(){var b=document.getElementById(a);null!==b&&b.parentNode.removeChild(b);c&&c(Bg("NETWORK_ERROR"))};var e=document.getElementsByTagName("head");(e&&0!=e.length?e[0]:document.documentElement).appendChild(d)}catch(f){c&&c(Bg("NETWORK_ERROR"))}},0)}Fg.isAvailable=function(){return"undefined"!==typeof document&&null!=document.createElement};
Fg.prototype.Bc=function(){return"json"};function Hg(a,b,c,d){If.call(this,["auth_status"]);this.H=a;this.df=b;this.Sg=c;this.Ke=d;this.rc=new lg(a,[Dc,P]);this.nb=null;this.Re=!1;Ig(this)}ma(Hg,If);h=Hg.prototype;h.we=function(){return this.nb||null};function Ig(a){P.get("redirect_request_id")&&Jg(a);var b=a.rc.get();b&&b.token?(Kg(a,b),a.df(b.token,function(c,d){Lg(a,c,d,!1,b.token,b)},function(b,d){Mg(a,"resumeSession()",b,d)})):Kg(a,null)}
function Ng(a,b,c,d,e,f){"firebaseio-demo.com"===a.H.domain&&Q("Firebase authentication is not supported on demo Firebases (*.firebaseio-demo.com). To secure your Firebase, create a production Firebase at https://www.firebase.com.");a.df(b,function(f,k){Lg(a,f,k,!0,b,c,d||{},e)},function(b,c){Mg(a,"auth()",b,c,f)})}function Og(a,b){a.rc.clear();Kg(a,null);a.Sg(function(a,d){if("ok"===a)R(b,null);else{var e=(a||"error").toUpperCase(),f=e;d&&(f+=": "+d);f=Error(f);f.code=e;R(b,f)}})}
function Lg(a,b,c,d,e,f,g,k){"ok"===b?(d&&(b=c.auth,f.auth=b,f.expires=c.expires,f.token=cd(e)?e:"",c=null,b&&u(b,"uid")?c=w(b,"uid"):u(f,"uid")&&(c=w(f,"uid")),f.uid=c,c="custom",b&&u(b,"provider")?c=w(b,"provider"):u(f,"provider")&&(c=w(f,"provider")),f.provider=c,a.rc.clear(),cd(e)&&(g=g||{},c=Dc,"sessionOnly"===g.remember&&(c=P),"none"!==g.remember&&a.rc.set(f,c)),Kg(a,f)),R(k,null,f)):(a.rc.clear(),Kg(a,null),f=a=(b||"error").toUpperCase(),c&&(f+=": "+c),f=Error(f),f.code=a,R(k,f))}
function Mg(a,b,c,d,e){Q(b+" was canceled: "+d);a.rc.clear();Kg(a,null);a=Error(d);a.code=c.toUpperCase();R(e,a)}function Pg(a,b,c,d,e){Qg(a);c=new ig(d||{},{},c||{});Rg(a,[Dg,Fg],"/auth/"+b,c,e)}
function Sg(a,b,c,d){Qg(a);var e=[Cg,Eg];c=kg(c);"anonymous"===b||"password"===b?setTimeout(function(){R(d,Bg("TRANSPORT_UNAVAILABLE"))},0):(c.ce.window_features="menubar=yes,modal=yes,alwaysRaised=yeslocation=yes,resizable=yes,scrollbars=yes,status=yes,height=625,width=625,top="+("object"===typeof screen?.5*(screen.height-625):0)+",left="+("object"===typeof screen?.5*(screen.width-625):0),c.ce.relay_url=wg(a.H.Cb),c.ce.requestWithCredential=q(a.pc,a),Rg(a,e,"/auth/"+b,c,d))}
function Jg(a){var b=P.get("redirect_request_id");if(b){var c=P.get("redirect_client_options");P.remove("redirect_request_id");P.remove("redirect_client_options");var d=[Dg,Fg],b={requestId:b,requestKey:ug(document.location.hash)},c=new ig(c,{},b);a.Re=!0;try{document.location.hash=document.location.hash.replace(/&__firebase_request_key=([a-zA-z0-9]*)/,"")}catch(e){}Rg(a,d,"/auth/session",c,function(){this.Re=!1}.bind(a))}}
h.re=function(a,b){Qg(this);var c=kg(a);c.ab._method="POST";this.pc("/users",c,function(a,c){a?R(b,a):R(b,a,c)})};h.Se=function(a,b){var c=this;Qg(this);var d="/users/"+encodeURIComponent(a.email),e=kg(a);e.ab._method="DELETE";this.pc(d,e,function(a,d){!a&&d&&d.uid&&c.nb&&c.nb.uid&&c.nb.uid===d.uid&&Og(c);R(b,a)})};h.oe=function(a,b){Qg(this);var c="/users/"+encodeURIComponent(a.email)+"/password",d=kg(a);d.ab._method="PUT";d.ab.password=a.newPassword;this.pc(c,d,function(a){R(b,a)})};
h.ne=function(a,b){Qg(this);var c="/users/"+encodeURIComponent(a.oldEmail)+"/email",d=kg(a);d.ab._method="PUT";d.ab.email=a.newEmail;d.ab.password=a.password;this.pc(c,d,function(a){R(b,a)})};h.Ue=function(a,b){Qg(this);var c="/users/"+encodeURIComponent(a.email)+"/password",d=kg(a);d.ab._method="POST";this.pc(c,d,function(a){R(b,a)})};h.pc=function(a,b,c){Tg(this,[Dg,Fg],a,b,c)};
function Rg(a,b,c,d,e){Tg(a,b,c,d,function(b,c){!b&&c&&c.token&&c.uid?Ng(a,c.token,c,d.ld,function(a,b){a?R(e,a):R(e,null,b)}):R(e,b||Bg("UNKNOWN_ERROR"))})}
function Tg(a,b,c,d,e){b=Pa(b,function(a){return"function"===typeof a.isAvailable&&a.isAvailable()});0===b.length?setTimeout(function(){R(e,Bg("TRANSPORT_UNAVAILABLE"))},0):(b=new (b.shift())(d.ce),d=ib(d.ab),d.v="js-2.2.7",d.transport=b.Bc(),d.suppress_status_codes=!0,a=vg()+"/"+a.H.Cb+c,b.open(a,d,function(a,b){if(a)R(e,a);else if(b&&b.error){var c=Error(b.error.message);c.code=b.error.code;c.details=b.error.details;R(e,c)}else R(e,null,b)}))}
function Kg(a,b){var c=null!==a.nb||null!==b;a.nb=b;c&&a.de("auth_status",b);a.Ke(null!==b)}h.ze=function(a){J("auth_status"===a,'initial event must be of type "auth_status"');return this.Re?null:[this.nb]};function Qg(a){var b=a.H;if("firebaseio.com"!==b.domain&&"firebaseio-demo.com"!==b.domain&&"auth.firebase.com"===hg)throw Error("This custom Firebase server ('"+a.H.domain+"') does not support delegated login.");};function Ug(a){this.hc=a;this.Kd=[];this.Qb=0;this.pe=-1;this.Fb=null}function Vg(a,b,c){a.pe=b;a.Fb=c;a.pe<a.Qb&&(a.Fb(),a.Fb=null)}function Wg(a,b,c){for(a.Kd[b]=c;a.Kd[a.Qb];){var d=a.Kd[a.Qb];delete a.Kd[a.Qb];for(var e=0;e<d.length;++e)if(d[e]){var f=a;Cb(function(){f.hc(d[e])})}if(a.Qb===a.pe){a.Fb&&(clearTimeout(a.Fb),a.Fb(),a.Fb=null);break}a.Qb++}};function Xg(a,b,c){this.qe=a;this.f=Oc(a);this.ob=this.pb=0;this.Va=Ob(b);this.Vd=c;this.Gc=!1;this.gd=function(a){b.host!==b.Oa&&(a.ns=b.Cb);var c=[],f;for(f in a)a.hasOwnProperty(f)&&c.push(f+"="+a[f]);return(b.lb?"https://":"http://")+b.Oa+"/.lp?"+c.join("&")}}var Yg,Zg;
Xg.prototype.open=function(a,b){this.gf=0;this.ka=b;this.zf=new Ug(a);this.zb=!1;var c=this;this.rb=setTimeout(function(){c.f("Timed out trying to connect.");c.ib();c.rb=null},Math.floor(3E4));Tc(function(){if(!c.zb){c.Ta=new $g(function(a,b,d,k,l){ah(c,arguments);if(c.Ta)if(c.rb&&(clearTimeout(c.rb),c.rb=null),c.Gc=!0,"start"==a)c.id=b,c.Ff=d;else if("close"===a)b?(c.Ta.Td=!1,Vg(c.zf,b,function(){c.ib()})):c.ib();else throw Error("Unrecognized command received: "+a);},function(a,b){ah(c,arguments);
Wg(c.zf,a,b)},function(){c.ib()},c.gd);var a={start:"t"};a.ser=Math.floor(1E8*Math.random());c.Ta.fe&&(a.cb=c.Ta.fe);a.v="5";c.Vd&&(a.s=c.Vd);"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(a.r="f");a=c.gd(a);c.f("Connecting via long-poll to "+a);bh(c.Ta,a,function(){})}})};
Xg.prototype.start=function(){var a=this.Ta,b=this.Ff;a.rg=this.id;a.sg=b;for(a.ke=!0;ch(a););a=this.id;b=this.Ff;this.fc=document.createElement("iframe");var c={dframe:"t"};c.id=a;c.pw=b;this.fc.src=this.gd(c);this.fc.style.display="none";document.body.appendChild(this.fc)};
Xg.isAvailable=function(){return Yg||!Zg&&"undefined"!==typeof document&&null!=document.createElement&&!("object"===typeof window&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))&&!("object"===typeof Windows&&"object"===typeof Windows.Ug)};h=Xg.prototype;h.Bd=function(){};h.cd=function(){this.zb=!0;this.Ta&&(this.Ta.close(),this.Ta=null);this.fc&&(document.body.removeChild(this.fc),this.fc=null);this.rb&&(clearTimeout(this.rb),this.rb=null)};
h.ib=function(){this.zb||(this.f("Longpoll is closing itself"),this.cd(),this.ka&&(this.ka(this.Gc),this.ka=null))};h.close=function(){this.zb||(this.f("Longpoll is being closed."),this.cd())};h.send=function(a){a=B(a);this.pb+=a.length;Lb(this.Va,"bytes_sent",a.length);a=Kc(a);a=fb(a,!0);a=Xc(a,1840);for(var b=0;b<a.length;b++){var c=this.Ta;c.$c.push({Jg:this.gf,Rg:a.length,jf:a[b]});c.ke&&ch(c);this.gf++}};function ah(a,b){var c=B(b).length;a.ob+=c;Lb(a.Va,"bytes_received",c)}
function $g(a,b,c,d){this.gd=d;this.jb=c;this.Oe=new eg;this.$c=[];this.se=Math.floor(1E8*Math.random());this.Td=!0;this.fe=Gc();window["pLPCommand"+this.fe]=a;window["pRTLPCB"+this.fe]=b;a=document.createElement("iframe");a.style.display="none";if(document.body){document.body.appendChild(a);try{a.contentWindow.document||Bb("No IE domain setting required")}catch(e){a.src="javascript:void((function(){document.open();document.domain='"+document.domain+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
a.contentDocument?a.gb=a.contentDocument:a.contentWindow?a.gb=a.contentWindow.document:a.document&&(a.gb=a.document);this.Ca=a;a="";this.Ca.src&&"javascript:"===this.Ca.src.substr(0,11)&&(a='<script>document.domain="'+document.domain+'";\x3c/script>');a="<html><body>"+a+"</body></html>";try{this.Ca.gb.open(),this.Ca.gb.write(a),this.Ca.gb.close()}catch(f){Bb("frame writing exception"),f.stack&&Bb(f.stack),Bb(f)}}
$g.prototype.close=function(){this.ke=!1;if(this.Ca){this.Ca.gb.body.innerHTML="";var a=this;setTimeout(function(){null!==a.Ca&&(document.body.removeChild(a.Ca),a.Ca=null)},Math.floor(0))}var b=this.jb;b&&(this.jb=null,b())};
function ch(a){if(a.ke&&a.Td&&a.Oe.count()<(0<a.$c.length?2:1)){a.se++;var b={};b.id=a.rg;b.pw=a.sg;b.ser=a.se;for(var b=a.gd(b),c="",d=0;0<a.$c.length;)if(1870>=a.$c[0].jf.length+30+c.length){var e=a.$c.shift(),c=c+"&seg"+d+"="+e.Jg+"&ts"+d+"="+e.Rg+"&d"+d+"="+e.jf;d++}else break;dh(a,b+c,a.se);return!0}return!1}function dh(a,b,c){function d(){a.Oe.remove(c);ch(a)}a.Oe.add(c,1);var e=setTimeout(d,Math.floor(25E3));bh(a,b,function(){clearTimeout(e);d()})}
function bh(a,b,c){setTimeout(function(){try{if(a.Td){var d=a.Ca.gb.createElement("script");d.type="text/javascript";d.async=!0;d.src=b;d.onload=d.onreadystatechange=function(){var a=d.readyState;a&&"loaded"!==a&&"complete"!==a||(d.onload=d.onreadystatechange=null,d.parentNode&&d.parentNode.removeChild(d),c())};d.onerror=function(){Bb("Long-poll script failed to load: "+b);a.Td=!1;a.close()};a.Ca.gb.body.appendChild(d)}}catch(e){}},Math.floor(1))};var eh=null;"undefined"!==typeof MozWebSocket?eh=MozWebSocket:"undefined"!==typeof WebSocket&&(eh=WebSocket);function fh(a,b,c){this.qe=a;this.f=Oc(this.qe);this.frames=this.Jc=null;this.ob=this.pb=this.bf=0;this.Va=Ob(b);this.fb=(b.lb?"wss://":"ws://")+b.Oa+"/.ws?v=5";"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(this.fb+="&r=f");b.host!==b.Oa&&(this.fb=this.fb+"&ns="+b.Cb);c&&(this.fb=this.fb+"&s="+c)}var gh;
fh.prototype.open=function(a,b){this.jb=b;this.wg=a;this.f("Websocket connecting to "+this.fb);this.Gc=!1;Dc.set("previous_websocket_failure",!0);try{this.va=new eh(this.fb)}catch(c){this.f("Error instantiating WebSocket.");var d=c.message||c.data;d&&this.f(d);this.ib();return}var e=this;this.va.onopen=function(){e.f("Websocket connected.");e.Gc=!0};this.va.onclose=function(){e.f("Websocket connection was disconnected.");e.va=null;e.ib()};this.va.onmessage=function(a){if(null!==e.va)if(a=a.data,e.ob+=
a.length,Lb(e.Va,"bytes_received",a.length),hh(e),null!==e.frames)ih(e,a);else{a:{J(null===e.frames,"We already have a frame buffer");if(6>=a.length){var b=Number(a);if(!isNaN(b)){e.bf=b;e.frames=[];a=null;break a}}e.bf=1;e.frames=[]}null!==a&&ih(e,a)}};this.va.onerror=function(a){e.f("WebSocket error.  Closing connection.");(a=a.message||a.data)&&e.f(a);e.ib()}};fh.prototype.start=function(){};
fh.isAvailable=function(){var a=!1;if("undefined"!==typeof navigator&&navigator.userAgent){var b=navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);b&&1<b.length&&4.4>parseFloat(b[1])&&(a=!0)}return!a&&null!==eh&&!gh};fh.responsesRequiredToBeHealthy=2;fh.healthyTimeout=3E4;h=fh.prototype;h.Bd=function(){Dc.remove("previous_websocket_failure")};function ih(a,b){a.frames.push(b);if(a.frames.length==a.bf){var c=a.frames.join("");a.frames=null;c=mb(c);a.wg(c)}}
h.send=function(a){hh(this);a=B(a);this.pb+=a.length;Lb(this.Va,"bytes_sent",a.length);a=Xc(a,16384);1<a.length&&this.va.send(String(a.length));for(var b=0;b<a.length;b++)this.va.send(a[b])};h.cd=function(){this.zb=!0;this.Jc&&(clearInterval(this.Jc),this.Jc=null);this.va&&(this.va.close(),this.va=null)};h.ib=function(){this.zb||(this.f("WebSocket is closing itself"),this.cd(),this.jb&&(this.jb(this.Gc),this.jb=null))};h.close=function(){this.zb||(this.f("WebSocket is being closed"),this.cd())};
function hh(a){clearInterval(a.Jc);a.Jc=setInterval(function(){a.va&&a.va.send("0");hh(a)},Math.floor(45E3))};function jh(a){kh(this,a)}var lh=[Xg,fh];function kh(a,b){var c=fh&&fh.isAvailable(),d=c&&!(Dc.uf||!0===Dc.get("previous_websocket_failure"));b.Tg&&(c||Q("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),d=!0);if(d)a.ed=[fh];else{var e=a.ed=[];Yc(lh,function(a,b){b&&b.isAvailable()&&e.push(b)})}}function mh(a){if(0<a.ed.length)return a.ed[0];throw Error("No transports available");};function nh(a,b,c,d,e,f){this.id=a;this.f=Oc("c:"+this.id+":");this.hc=c;this.Vc=d;this.ka=e;this.Me=f;this.H=b;this.Jd=[];this.ef=0;this.Nf=new jh(b);this.Ua=0;this.f("Connection created");oh(this)}
function oh(a){var b=mh(a.Nf);a.L=new b("c:"+a.id+":"+a.ef++,a.H);a.Qe=b.responsesRequiredToBeHealthy||0;var c=ph(a,a.L),d=qh(a,a.L);a.fd=a.L;a.bd=a.L;a.F=null;a.Ab=!1;setTimeout(function(){a.L&&a.L.open(c,d)},Math.floor(0));b=b.healthyTimeout||0;0<b&&(a.vd=setTimeout(function(){a.vd=null;a.Ab||(a.L&&102400<a.L.ob?(a.f("Connection exceeded healthy timeout but has received "+a.L.ob+" bytes.  Marking connection healthy."),a.Ab=!0,a.L.Bd()):a.L&&10240<a.L.pb?a.f("Connection exceeded healthy timeout but has sent "+
a.L.pb+" bytes.  Leaving connection alive."):(a.f("Closing unhealthy connection after timeout."),a.close()))},Math.floor(b)))}function qh(a,b){return function(c){b===a.L?(a.L=null,c||0!==a.Ua?1===a.Ua&&a.f("Realtime connection lost."):(a.f("Realtime connection failed."),"s-"===a.H.Oa.substr(0,2)&&(Dc.remove("host:"+a.H.host),a.H.Oa=a.H.host)),a.close()):b===a.F?(a.f("Secondary connection lost."),c=a.F,a.F=null,a.fd!==c&&a.bd!==c||a.close()):a.f("closing an old connection")}}
function ph(a,b){return function(c){if(2!=a.Ua)if(b===a.bd){var d=Vc("t",c);c=Vc("d",c);if("c"==d){if(d=Vc("t",c),"d"in c)if(c=c.d,"h"===d){var d=c.ts,e=c.v,f=c.h;a.Vd=c.s;Fc(a.H,f);0==a.Ua&&(a.L.start(),rh(a,a.L,d),"5"!==e&&Q("Protocol version mismatch detected"),c=a.Nf,(c=1<c.ed.length?c.ed[1]:null)&&sh(a,c))}else if("n"===d){a.f("recvd end transmission on primary");a.bd=a.F;for(c=0;c<a.Jd.length;++c)a.Fd(a.Jd[c]);a.Jd=[];th(a)}else"s"===d?(a.f("Connection shutdown command received. Shutting down..."),
a.Me&&(a.Me(c),a.Me=null),a.ka=null,a.close()):"r"===d?(a.f("Reset packet received.  New host: "+c),Fc(a.H,c),1===a.Ua?a.close():(uh(a),oh(a))):"e"===d?Pc("Server Error: "+c):"o"===d?(a.f("got pong on primary."),vh(a),wh(a)):Pc("Unknown control packet command: "+d)}else"d"==d&&a.Fd(c)}else if(b===a.F)if(d=Vc("t",c),c=Vc("d",c),"c"==d)"t"in c&&(c=c.t,"a"===c?xh(a):"r"===c?(a.f("Got a reset on secondary, closing it"),a.F.close(),a.fd!==a.F&&a.bd!==a.F||a.close()):"o"===c&&(a.f("got pong on secondary."),
a.Lf--,xh(a)));else if("d"==d)a.Jd.push(c);else throw Error("Unknown protocol layer: "+d);else a.f("message on old connection")}}nh.prototype.Da=function(a){yh(this,{t:"d",d:a})};function th(a){a.fd===a.F&&a.bd===a.F&&(a.f("cleaning up and promoting a connection: "+a.F.qe),a.L=a.F,a.F=null)}
function xh(a){0>=a.Lf?(a.f("Secondary connection is healthy."),a.Ab=!0,a.F.Bd(),a.F.start(),a.f("sending client ack on secondary"),a.F.send({t:"c",d:{t:"a",d:{}}}),a.f("Ending transmission on primary"),a.L.send({t:"c",d:{t:"n",d:{}}}),a.fd=a.F,th(a)):(a.f("sending ping on secondary."),a.F.send({t:"c",d:{t:"p",d:{}}}))}nh.prototype.Fd=function(a){vh(this);this.hc(a)};function vh(a){a.Ab||(a.Qe--,0>=a.Qe&&(a.f("Primary connection is healthy."),a.Ab=!0,a.L.Bd()))}
function sh(a,b){a.F=new b("c:"+a.id+":"+a.ef++,a.H,a.Vd);a.Lf=b.responsesRequiredToBeHealthy||0;a.F.open(ph(a,a.F),qh(a,a.F));setTimeout(function(){a.F&&(a.f("Timed out trying to upgrade."),a.F.close())},Math.floor(6E4))}function rh(a,b,c){a.f("Realtime connection established.");a.L=b;a.Ua=1;a.Vc&&(a.Vc(c),a.Vc=null);0===a.Qe?(a.f("Primary connection is healthy."),a.Ab=!0):setTimeout(function(){wh(a)},Math.floor(5E3))}
function wh(a){a.Ab||1!==a.Ua||(a.f("sending ping on primary."),yh(a,{t:"c",d:{t:"p",d:{}}}))}function yh(a,b){if(1!==a.Ua)throw"Connection is not connected";a.fd.send(b)}nh.prototype.close=function(){2!==this.Ua&&(this.f("Closing realtime connection."),this.Ua=2,uh(this),this.ka&&(this.ka(),this.ka=null))};function uh(a){a.f("Shutting down all connections");a.L&&(a.L.close(),a.L=null);a.F&&(a.F.close(),a.F=null);a.vd&&(clearTimeout(a.vd),a.vd=null)};function zh(a,b,c,d){this.id=Ah++;this.f=Oc("p:"+this.id+":");this.wf=this.De=!1;this.aa={};this.pa=[];this.Xc=0;this.Uc=[];this.ma=!1;this.$a=1E3;this.Cd=3E5;this.Gb=b;this.Tc=c;this.Ne=d;this.H=a;this.We=null;this.Qd={};this.Ig=0;this.mf=!0;this.Kc=this.Fe=null;Bh(this,0);Mf.ub().Eb("visible",this.zg,this);-1===a.host.indexOf("fblocal")&&Lf.ub().Eb("online",this.xg,this)}var Ah=0,Ch=0;h=zh.prototype;
h.Da=function(a,b,c){var d=++this.Ig;a={r:d,a:a,b:b};this.f(B(a));J(this.ma,"sendRequest call when we're not connected not allowed.");this.Sa.Da(a);c&&(this.Qd[d]=c)};h.xf=function(a,b,c,d){var e=a.wa(),f=a.path.toString();this.f("Listen called for "+f+" "+e);this.aa[f]=this.aa[f]||{};J(!this.aa[f][e],"listen() called twice for same path/queryId.");a={J:d,ud:b,Fg:a,tag:c};this.aa[f][e]=a;this.ma&&Dh(this,a)};
function Dh(a,b){var c=b.Fg,d=c.path.toString(),e=c.wa();a.f("Listen on "+d+" for "+e);var f={p:d};b.tag&&(f.q=ce(c.o),f.t=b.tag);f.h=b.ud();a.Da("q",f,function(f){var k=f.d,l=f.s;if(k&&"object"===typeof k&&u(k,"w")){var m=w(k,"w");ea(m)&&0<=Na(m,"no_index")&&Q("Using an unspecified index. Consider adding "+('".indexOn": "'+c.o.g.toString()+'"')+" at "+c.path.toString()+" to your security rules for better performance")}(a.aa[d]&&a.aa[d][e])===b&&(a.f("listen response",f),"ok"!==l&&Eh(a,d,e),b.J&&
b.J(l,k))})}h.P=function(a,b,c){this.Fa={fg:a,nf:!1,yc:b,jd:c};this.f("Authenticating using credential: "+a);Fh(this);(b=40==a.length)||(a=ad(a).Ac,b="object"===typeof a&&!0===w(a,"admin"));b&&(this.f("Admin auth credential detected.  Reducing max reconnect time."),this.Cd=3E4)};h.ee=function(a){delete this.Fa;this.ma&&this.Da("unauth",{},function(b){a(b.s,b.d)})};
function Fh(a){var b=a.Fa;a.ma&&b&&a.Da("auth",{cred:b.fg},function(c){var d=c.s;c=c.d||"error";"ok"!==d&&a.Fa===b&&delete a.Fa;b.nf?"ok"!==d&&b.jd&&b.jd(d,c):(b.nf=!0,b.yc&&b.yc(d,c))})}h.Of=function(a,b){var c=a.path.toString(),d=a.wa();this.f("Unlisten called for "+c+" "+d);if(Eh(this,c,d)&&this.ma){var e=ce(a.o);this.f("Unlisten on "+c+" for "+d);c={p:c};b&&(c.q=e,c.t=b);this.Da("n",c)}};h.Le=function(a,b,c){this.ma?Gh(this,"o",a,b,c):this.Uc.push({Zc:a,action:"o",data:b,J:c})};
h.Bf=function(a,b,c){this.ma?Gh(this,"om",a,b,c):this.Uc.push({Zc:a,action:"om",data:b,J:c})};h.Gd=function(a,b){this.ma?Gh(this,"oc",a,null,b):this.Uc.push({Zc:a,action:"oc",data:null,J:b})};function Gh(a,b,c,d,e){c={p:c,d:d};a.f("onDisconnect "+b,c);a.Da(b,c,function(a){e&&setTimeout(function(){e(a.s,a.d)},Math.floor(0))})}h.put=function(a,b,c,d){Hh(this,"p",a,b,c,d)};h.yf=function(a,b,c,d){Hh(this,"m",a,b,c,d)};
function Hh(a,b,c,d,e,f){d={p:c,d:d};n(f)&&(d.h=f);a.pa.push({action:b,If:d,J:e});a.Xc++;b=a.pa.length-1;a.ma?Ih(a,b):a.f("Buffering put: "+c)}function Ih(a,b){var c=a.pa[b].action,d=a.pa[b].If,e=a.pa[b].J;a.pa[b].Gg=a.ma;a.Da(c,d,function(d){a.f(c+" response",d);delete a.pa[b];a.Xc--;0===a.Xc&&(a.pa=[]);e&&e(d.s,d.d)})}h.Te=function(a){this.ma&&(a={c:a},this.f("reportStats",a),this.Da("s",a,function(a){"ok"!==a.s&&this.f("reportStats","Error sending stats: "+a.d)}))};
h.Fd=function(a){if("r"in a){this.f("from server: "+B(a));var b=a.r,c=this.Qd[b];c&&(delete this.Qd[b],c(a.b))}else{if("error"in a)throw"A server-side error has occurred: "+a.error;"a"in a&&(b=a.a,c=a.b,this.f("handleServerMessage",b,c),"d"===b?this.Gb(c.p,c.d,!1,c.t):"m"===b?this.Gb(c.p,c.d,!0,c.t):"c"===b?Jh(this,c.p,c.q):"ac"===b?(a=c.s,b=c.d,c=this.Fa,delete this.Fa,c&&c.jd&&c.jd(a,b)):"sd"===b?this.We?this.We(c):"msg"in c&&"undefined"!==typeof console&&console.log("FIREBASE: "+c.msg.replace("\n",
"\nFIREBASE: ")):Pc("Unrecognized action received from server: "+B(b)+"\nAre you using the latest client?"))}};h.Vc=function(a){this.f("connection ready");this.ma=!0;this.Kc=(new Date).getTime();this.Ne({serverTimeOffset:a-(new Date).getTime()});this.mf&&(a={},a["sdk.js."+"2.2.7".replace(/\./g,"-")]=1,ng()&&(a["framework.cordova"]=1),this.Te(a));Kh(this);this.mf=!1;this.Tc(!0)};
function Bh(a,b){J(!a.Sa,"Scheduling a connect when we're already connected/ing?");a.Sb&&clearTimeout(a.Sb);a.Sb=setTimeout(function(){a.Sb=null;Lh(a)},Math.floor(b))}h.zg=function(a){a&&!this.uc&&this.$a===this.Cd&&(this.f("Window became visible.  Reducing delay."),this.$a=1E3,this.Sa||Bh(this,0));this.uc=a};h.xg=function(a){a?(this.f("Browser went online."),this.$a=1E3,this.Sa||Bh(this,0)):(this.f("Browser went offline.  Killing connection."),this.Sa&&this.Sa.close())};
h.Cf=function(){this.f("data client disconnected");this.ma=!1;this.Sa=null;for(var a=0;a<this.pa.length;a++){var b=this.pa[a];b&&"h"in b.If&&b.Gg&&(b.J&&b.J("disconnect"),delete this.pa[a],this.Xc--)}0===this.Xc&&(this.pa=[]);this.Qd={};Mh(this)&&(this.uc?this.Kc&&(3E4<(new Date).getTime()-this.Kc&&(this.$a=1E3),this.Kc=null):(this.f("Window isn't visible.  Delaying reconnect."),this.$a=this.Cd,this.Fe=(new Date).getTime()),a=Math.max(0,this.$a-((new Date).getTime()-this.Fe)),a*=Math.random(),this.f("Trying to reconnect in "+
a+"ms"),Bh(this,a),this.$a=Math.min(this.Cd,1.3*this.$a));this.Tc(!1)};function Lh(a){if(Mh(a)){a.f("Making a connection attempt");a.Fe=(new Date).getTime();a.Kc=null;var b=q(a.Fd,a),c=q(a.Vc,a),d=q(a.Cf,a),e=a.id+":"+Ch++;a.Sa=new nh(e,a.H,b,c,d,function(b){Q(b+" ("+a.H.toString()+")");a.wf=!0})}}h.yb=function(){this.De=!0;this.Sa?this.Sa.close():(this.Sb&&(clearTimeout(this.Sb),this.Sb=null),this.ma&&this.Cf())};h.qc=function(){this.De=!1;this.$a=1E3;this.Sa||Bh(this,0)};
function Jh(a,b,c){c=c?Qa(c,function(a){return Wc(a)}).join("$"):"default";(a=Eh(a,b,c))&&a.J&&a.J("permission_denied")}function Eh(a,b,c){b=(new K(b)).toString();var d;n(a.aa[b])?(d=a.aa[b][c],delete a.aa[b][c],0===pa(a.aa[b])&&delete a.aa[b]):d=void 0;return d}function Kh(a){Fh(a);r(a.aa,function(b){r(b,function(b){Dh(a,b)})});for(var b=0;b<a.pa.length;b++)a.pa[b]&&Ih(a,b);for(;a.Uc.length;)b=a.Uc.shift(),Gh(a,b.action,b.Zc,b.data,b.J)}function Mh(a){var b;b=Lf.ub().ic;return!a.wf&&!a.De&&b};var V={lg:function(){Yg=gh=!0}};V.forceLongPolling=V.lg;V.mg=function(){Zg=!0};V.forceWebSockets=V.mg;V.Mg=function(a,b){a.k.Ra.We=b};V.setSecurityDebugCallback=V.Mg;V.Ye=function(a,b){a.k.Ye(b)};V.stats=V.Ye;V.Ze=function(a,b){a.k.Ze(b)};V.statsIncrementCounter=V.Ze;V.pd=function(a){return a.k.pd};V.dataUpdateCount=V.pd;V.pg=function(a,b){a.k.Ce=b};V.interceptServerData=V.pg;V.vg=function(a){new xg(a)};V.onPopupOpen=V.vg;V.Kg=function(a){hg=a};V.setAuthenticationServer=V.Kg;function S(a,b,c){this.B=a;this.V=b;this.g=c}S.prototype.K=function(){x("Firebase.DataSnapshot.val",0,0,arguments.length);return this.B.K()};S.prototype.val=S.prototype.K;S.prototype.lf=function(){x("Firebase.DataSnapshot.exportVal",0,0,arguments.length);return this.B.K(!0)};S.prototype.exportVal=S.prototype.lf;S.prototype.kg=function(){x("Firebase.DataSnapshot.exists",0,0,arguments.length);return!this.B.e()};S.prototype.exists=S.prototype.kg;
S.prototype.w=function(a){x("Firebase.DataSnapshot.child",0,1,arguments.length);ga(a)&&(a=String(a));Yf("Firebase.DataSnapshot.child",a);var b=new K(a),c=this.V.w(b);return new S(this.B.oa(b),c,M)};S.prototype.child=S.prototype.w;S.prototype.Ha=function(a){x("Firebase.DataSnapshot.hasChild",1,1,arguments.length);Yf("Firebase.DataSnapshot.hasChild",a);var b=new K(a);return!this.B.oa(b).e()};S.prototype.hasChild=S.prototype.Ha;
S.prototype.A=function(){x("Firebase.DataSnapshot.getPriority",0,0,arguments.length);return this.B.A().K()};S.prototype.getPriority=S.prototype.A;S.prototype.forEach=function(a){x("Firebase.DataSnapshot.forEach",1,1,arguments.length);A("Firebase.DataSnapshot.forEach",1,a,!1);if(this.B.N())return!1;var b=this;return!!this.B.U(this.g,function(c,d){return a(new S(d,b.V.w(c),M))})};S.prototype.forEach=S.prototype.forEach;
S.prototype.td=function(){x("Firebase.DataSnapshot.hasChildren",0,0,arguments.length);return this.B.N()?!1:!this.B.e()};S.prototype.hasChildren=S.prototype.td;S.prototype.name=function(){Q("Firebase.DataSnapshot.name() being deprecated. Please use Firebase.DataSnapshot.key() instead.");x("Firebase.DataSnapshot.name",0,0,arguments.length);return this.key()};S.prototype.name=S.prototype.name;S.prototype.key=function(){x("Firebase.DataSnapshot.key",0,0,arguments.length);return this.V.key()};
S.prototype.key=S.prototype.key;S.prototype.Db=function(){x("Firebase.DataSnapshot.numChildren",0,0,arguments.length);return this.B.Db()};S.prototype.numChildren=S.prototype.Db;S.prototype.lc=function(){x("Firebase.DataSnapshot.ref",0,0,arguments.length);return this.V};S.prototype.ref=S.prototype.lc;function Nh(a,b){this.H=a;this.Va=Ob(a);this.ea=new ub;this.Ed=1;this.Ra=null;b||0<=("object"===typeof window&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)?(this.ca=new Ae(this.H,q(this.Gb,this)),setTimeout(q(this.Tc,this,!0),0)):this.ca=this.Ra=new zh(this.H,q(this.Gb,this),q(this.Tc,this),q(this.Ne,this));this.Pg=Pb(a,q(function(){return new Jb(this.Va,this.ca)},this));this.tc=new Cf;this.Be=
new nb;var c=this;this.zd=new gf({Xe:function(a,b,f,g){b=[];f=c.Be.j(a.path);f.e()||(b=jf(c.zd,new Ub(ze,a.path,f)),setTimeout(function(){g("ok")},0));return b},Zd:ba});Oh(this,"connected",!1);this.ka=new qc;this.P=new Hg(a,q(this.ca.P,this.ca),q(this.ca.ee,this.ca),q(this.Ke,this));this.pd=0;this.Ce=null;this.O=new gf({Xe:function(a,b,f,g){c.ca.xf(a,f,b,function(b,e){var f=g(b,e);zb(c.ea,a.path,f)});return[]},Zd:function(a,b){c.ca.Of(a,b)}})}h=Nh.prototype;
h.toString=function(){return(this.H.lb?"https://":"http://")+this.H.host};h.name=function(){return this.H.Cb};function Ph(a){a=a.Be.j(new K(".info/serverTimeOffset")).K()||0;return(new Date).getTime()+a}function Qh(a){a=a={timestamp:Ph(a)};a.timestamp=a.timestamp||(new Date).getTime();return a}
h.Gb=function(a,b,c,d){this.pd++;var e=new K(a);b=this.Ce?this.Ce(a,b):b;a=[];d?c?(b=na(b,function(a){return L(a)}),a=rf(this.O,e,b,d)):(b=L(b),a=nf(this.O,e,b,d)):c?(d=na(b,function(a){return L(a)}),a=mf(this.O,e,d)):(d=L(b),a=jf(this.O,new Ub(ze,e,d)));d=e;0<a.length&&(d=Rh(this,e));zb(this.ea,d,a)};h.Tc=function(a){Oh(this,"connected",a);!1===a&&Sh(this)};h.Ne=function(a){var b=this;Yc(a,function(a,d){Oh(b,d,a)})};h.Ke=function(a){Oh(this,"authenticated",a)};
function Oh(a,b,c){b=new K("/.info/"+b);c=L(c);var d=a.Be;d.Sd=d.Sd.G(b,c);c=jf(a.zd,new Ub(ze,b,c));zb(a.ea,b,c)}h.Kb=function(a,b,c,d){this.f("set",{path:a.toString(),value:b,Xg:c});var e=Qh(this);b=L(b,c);var e=sc(b,e),f=this.Ed++,e=hf(this.O,a,e,f,!0);vb(this.ea,e);var g=this;this.ca.put(a.toString(),b.K(!0),function(b,c){var e="ok"===b;e||Q("set at "+a+" failed: "+b);e=lf(g.O,f,!e);zb(g.ea,a,e);Th(d,b,c)});e=Uh(this,a);Rh(this,e);zb(this.ea,e,[])};
h.update=function(a,b,c){this.f("update",{path:a.toString(),value:b});var d=!0,e=Qh(this),f={};r(b,function(a,b){d=!1;var c=L(a);f[b]=sc(c,e)});if(d)Bb("update() called with empty data.  Don't do anything."),Th(c,"ok");else{var g=this.Ed++,k=kf(this.O,a,f,g);vb(this.ea,k);var l=this;this.ca.yf(a.toString(),b,function(b,d){var e="ok"===b;e||Q("update at "+a+" failed: "+b);var e=lf(l.O,g,!e),f=a;0<e.length&&(f=Rh(l,a));zb(l.ea,f,e);Th(c,b,d)});b=Uh(this,a);Rh(this,b);zb(this.ea,a,[])}};
function Sh(a){a.f("onDisconnectEvents");var b=Qh(a),c=[];rc(pc(a.ka,b),F,function(b,e){c=c.concat(jf(a.O,new Ub(ze,b,e)));var f=Uh(a,b);Rh(a,f)});a.ka=new qc;zb(a.ea,F,c)}h.Gd=function(a,b){var c=this;this.ca.Gd(a.toString(),function(d,e){"ok"===d&&gg(c.ka,a);Th(b,d,e)})};function Vh(a,b,c,d){var e=L(c);a.ca.Le(b.toString(),e.K(!0),function(c,g){"ok"===c&&a.ka.mc(b,e);Th(d,c,g)})}function Wh(a,b,c,d,e){var f=L(c,d);a.ca.Le(b.toString(),f.K(!0),function(c,d){"ok"===c&&a.ka.mc(b,f);Th(e,c,d)})}
function Xh(a,b,c,d){var e=!0,f;for(f in c)e=!1;e?(Bb("onDisconnect().update() called with empty data.  Don't do anything."),Th(d,"ok")):a.ca.Bf(b.toString(),c,function(e,f){if("ok"===e)for(var l in c){var m=L(c[l]);a.ka.mc(b.w(l),m)}Th(d,e,f)})}function Yh(a,b,c){c=".info"===O(b.path)?a.zd.Ob(b,c):a.O.Ob(b,c);xb(a.ea,b.path,c)}h.yb=function(){this.Ra&&this.Ra.yb()};h.qc=function(){this.Ra&&this.Ra.qc()};
h.Ye=function(a){if("undefined"!==typeof console){a?(this.Yd||(this.Yd=new Ib(this.Va)),a=this.Yd.get()):a=this.Va.get();var b=Ra(sa(a),function(a,b){return Math.max(b.length,a)},0),c;for(c in a){for(var d=a[c],e=c.length;e<b+2;e++)c+=" ";console.log(c+d)}}};h.Ze=function(a){Lb(this.Va,a);this.Pg.Mf[a]=!0};h.f=function(a){var b="";this.Ra&&(b=this.Ra.id+":");Bb(b,arguments)};
function Th(a,b,c){a&&Cb(function(){if("ok"==b)a(null);else{var d=(b||"error").toUpperCase(),e=d;c&&(e+=": "+c);e=Error(e);e.code=d;a(e)}})};function Zh(a,b,c,d,e){function f(){}a.f("transaction on "+b);var g=new U(a,b);g.Eb("value",f);c={path:b,update:c,J:d,status:null,Ef:Gc(),cf:e,Kf:0,ge:function(){g.gc("value",f)},je:null,Aa:null,md:null,nd:null,od:null};d=a.O.ua(b,void 0)||C;c.md=d;d=c.update(d.K());if(n(d)){Tf("transaction failed: Data returned ",d,c.path);c.status=1;e=Df(a.tc,b);var k=e.Ba()||[];k.push(c);Ef(e,k);"object"===typeof d&&null!==d&&u(d,".priority")?(k=w(d,".priority"),J(Rf(k),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):
k=(a.O.ua(b)||C).A().K();e=Qh(a);d=L(d,k);e=sc(d,e);c.nd=d;c.od=e;c.Aa=a.Ed++;c=hf(a.O,b,e,c.Aa,c.cf);zb(a.ea,b,c);$h(a)}else c.ge(),c.nd=null,c.od=null,c.J&&(a=new S(c.md,new U(a,c.path),M),c.J(null,!1,a))}function $h(a,b){var c=b||a.tc;b||ai(a,c);if(null!==c.Ba()){var d=bi(a,c);J(0<d.length,"Sending zero length transaction queue");Sa(d,function(a){return 1===a.status})&&ci(a,c.path(),d)}else c.td()&&c.U(function(b){$h(a,b)})}
function ci(a,b,c){for(var d=Qa(c,function(a){return a.Aa}),e=a.O.ua(b,d)||C,d=e,e=e.hash(),f=0;f<c.length;f++){var g=c[f];J(1===g.status,"tryToSendTransactionQueue_: items in queue should all be run.");g.status=2;g.Kf++;var k=N(b,g.path),d=d.G(k,g.nd)}d=d.K(!0);a.ca.put(b.toString(),d,function(d){a.f("transaction put response",{path:b.toString(),status:d});var e=[];if("ok"===d){d=[];for(f=0;f<c.length;f++){c[f].status=3;e=e.concat(lf(a.O,c[f].Aa));if(c[f].J){var g=c[f].od,k=new U(a,c[f].path);d.push(q(c[f].J,
null,null,!0,new S(g,k,M)))}c[f].ge()}ai(a,Df(a.tc,b));$h(a);zb(a.ea,b,e);for(f=0;f<d.length;f++)Cb(d[f])}else{if("datastale"===d)for(f=0;f<c.length;f++)c[f].status=4===c[f].status?5:1;else for(Q("transaction at "+b.toString()+" failed: "+d),f=0;f<c.length;f++)c[f].status=5,c[f].je=d;Rh(a,b)}},e)}function Rh(a,b){var c=di(a,b),d=c.path(),c=bi(a,c);ei(a,c,d);return d}
function ei(a,b,c){if(0!==b.length){for(var d=[],e=[],f=Qa(b,function(a){return a.Aa}),g=0;g<b.length;g++){var k=b[g],l=N(c,k.path),m=!1,v;J(null!==l,"rerunTransactionsUnderNode_: relativePath should not be null.");if(5===k.status)m=!0,v=k.je,e=e.concat(lf(a.O,k.Aa,!0));else if(1===k.status)if(25<=k.Kf)m=!0,v="maxretry",e=e.concat(lf(a.O,k.Aa,!0));else{var y=a.O.ua(k.path,f)||C;k.md=y;var I=b[g].update(y.K());n(I)?(Tf("transaction failed: Data returned ",I,k.path),l=L(I),"object"===typeof I&&null!=
I&&u(I,".priority")||(l=l.da(y.A())),y=k.Aa,I=Qh(a),I=sc(l,I),k.nd=l,k.od=I,k.Aa=a.Ed++,Va(f,y),e=e.concat(hf(a.O,k.path,I,k.Aa,k.cf)),e=e.concat(lf(a.O,y,!0))):(m=!0,v="nodata",e=e.concat(lf(a.O,k.Aa,!0)))}zb(a.ea,c,e);e=[];m&&(b[g].status=3,setTimeout(b[g].ge,Math.floor(0)),b[g].J&&("nodata"===v?(k=new U(a,b[g].path),d.push(q(b[g].J,null,null,!1,new S(b[g].md,k,M)))):d.push(q(b[g].J,null,Error(v),!1,null))))}ai(a,a.tc);for(g=0;g<d.length;g++)Cb(d[g]);$h(a)}}
function di(a,b){for(var c,d=a.tc;null!==(c=O(b))&&null===d.Ba();)d=Df(d,c),b=G(b);return d}function bi(a,b){var c=[];fi(a,b,c);c.sort(function(a,b){return a.Ef-b.Ef});return c}function fi(a,b,c){var d=b.Ba();if(null!==d)for(var e=0;e<d.length;e++)c.push(d[e]);b.U(function(b){fi(a,b,c)})}function ai(a,b){var c=b.Ba();if(c){for(var d=0,e=0;e<c.length;e++)3!==c[e].status&&(c[d]=c[e],d++);c.length=d;Ef(b,0<c.length?c:null)}b.U(function(b){ai(a,b)})}
function Uh(a,b){var c=di(a,b).path(),d=Df(a.tc,b);Hf(d,function(b){gi(a,b)});gi(a,d);Gf(d,function(b){gi(a,b)});return c}
function gi(a,b){var c=b.Ba();if(null!==c){for(var d=[],e=[],f=-1,g=0;g<c.length;g++)4!==c[g].status&&(2===c[g].status?(J(f===g-1,"All SENT items should be at beginning of queue."),f=g,c[g].status=4,c[g].je="set"):(J(1===c[g].status,"Unexpected transaction status in abort"),c[g].ge(),e=e.concat(lf(a.O,c[g].Aa,!0)),c[g].J&&d.push(q(c[g].J,null,Error("set"),!1,null))));-1===f?Ef(b,null):c.length=f+1;zb(a.ea,b.path(),e);for(g=0;g<d.length;g++)Cb(d[g])}};function W(){this.nc={};this.Pf=!1}ca(W);W.prototype.yb=function(){for(var a in this.nc)this.nc[a].yb()};W.prototype.interrupt=W.prototype.yb;W.prototype.qc=function(){for(var a in this.nc)this.nc[a].qc()};W.prototype.resume=W.prototype.qc;W.prototype.ue=function(){this.Pf=!0};function X(a,b){this.ad=a;this.qa=b}X.prototype.cancel=function(a){x("Firebase.onDisconnect().cancel",0,1,arguments.length);A("Firebase.onDisconnect().cancel",1,a,!0);this.ad.Gd(this.qa,a||null)};X.prototype.cancel=X.prototype.cancel;X.prototype.remove=function(a){x("Firebase.onDisconnect().remove",0,1,arguments.length);Zf("Firebase.onDisconnect().remove",this.qa);A("Firebase.onDisconnect().remove",1,a,!0);Vh(this.ad,this.qa,null,a)};X.prototype.remove=X.prototype.remove;
X.prototype.set=function(a,b){x("Firebase.onDisconnect().set",1,2,arguments.length);Zf("Firebase.onDisconnect().set",this.qa);Sf("Firebase.onDisconnect().set",a,this.qa,!1);A("Firebase.onDisconnect().set",2,b,!0);Vh(this.ad,this.qa,a,b)};X.prototype.set=X.prototype.set;
X.prototype.Kb=function(a,b,c){x("Firebase.onDisconnect().setWithPriority",2,3,arguments.length);Zf("Firebase.onDisconnect().setWithPriority",this.qa);Sf("Firebase.onDisconnect().setWithPriority",a,this.qa,!1);Vf("Firebase.onDisconnect().setWithPriority",2,b);A("Firebase.onDisconnect().setWithPriority",3,c,!0);Wh(this.ad,this.qa,a,b,c)};X.prototype.setWithPriority=X.prototype.Kb;
X.prototype.update=function(a,b){x("Firebase.onDisconnect().update",1,2,arguments.length);Zf("Firebase.onDisconnect().update",this.qa);if(ea(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;Q("Passing an Array to Firebase.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}Uf("Firebase.onDisconnect().update",a,this.qa);A("Firebase.onDisconnect().update",2,b,!0);
Xh(this.ad,this.qa,a,b)};X.prototype.update=X.prototype.update;function Y(a,b,c,d){this.k=a;this.path=b;this.o=c;this.jc=d}
function hi(a){var b=null,c=null;a.la&&(b=od(a));a.na&&(c=qd(a));if(a.g===Vd){if(a.la){if("[MIN_NAME]"!=nd(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==typeof b)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}if(a.na){if("[MAX_NAME]"!=pd(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==
typeof c)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}}else if(a.g===M){if(null!=b&&!Rf(b)||null!=c&&!Rf(c))throw Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).");}else if(J(a.g instanceof Rd||a.g===Yd,"unknown index type."),null!=b&&"object"===typeof b||null!=c&&"object"===typeof c)throw Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.");
}function ii(a){if(a.la&&a.na&&a.ia&&(!a.ia||""===a.Nb))throw Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.");}function ji(a,b){if(!0===a.jc)throw Error(b+": You can't combine multiple orderBy calls.");}Y.prototype.lc=function(){x("Query.ref",0,0,arguments.length);return new U(this.k,this.path)};Y.prototype.ref=Y.prototype.lc;
Y.prototype.Eb=function(a,b,c,d){x("Query.on",2,4,arguments.length);Wf("Query.on",a,!1);A("Query.on",2,b,!1);var e=ki("Query.on",c,d);if("value"===a)Yh(this.k,this,new jd(b,e.cancel||null,e.Ma||null));else{var f={};f[a]=b;Yh(this.k,this,new kd(f,e.cancel,e.Ma))}return b};Y.prototype.on=Y.prototype.Eb;
Y.prototype.gc=function(a,b,c){x("Query.off",0,3,arguments.length);Wf("Query.off",a,!0);A("Query.off",2,b,!0);lb("Query.off",3,c);var d=null,e=null;"value"===a?d=new jd(b||null,null,c||null):a&&(b&&(e={},e[a]=b),d=new kd(e,null,c||null));e=this.k;d=".info"===O(this.path)?e.zd.kb(this,d):e.O.kb(this,d);xb(e.ea,this.path,d)};Y.prototype.off=Y.prototype.gc;
Y.prototype.Ag=function(a,b){function c(g){f&&(f=!1,e.gc(a,c),b.call(d.Ma,g))}x("Query.once",2,4,arguments.length);Wf("Query.once",a,!1);A("Query.once",2,b,!1);var d=ki("Query.once",arguments[2],arguments[3]),e=this,f=!0;this.Eb(a,c,function(b){e.gc(a,c);d.cancel&&d.cancel.call(d.Ma,b)})};Y.prototype.once=Y.prototype.Ag;
Y.prototype.Ge=function(a){Q("Query.limit() being deprecated. Please use Query.limitToFirst() or Query.limitToLast() instead.");x("Query.limit",1,1,arguments.length);if(!ga(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limit: First argument must be a positive integer.");if(this.o.ia)throw Error("Query.limit: Limit was already set (by another call to limit, limitToFirst, orlimitToLast.");var b=this.o.Ge(a);ii(b);return new Y(this.k,this.path,b,this.jc)};Y.prototype.limit=Y.prototype.Ge;
Y.prototype.He=function(a){x("Query.limitToFirst",1,1,arguments.length);if(!ga(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToFirst: First argument must be a positive integer.");if(this.o.ia)throw Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new Y(this.k,this.path,this.o.He(a),this.jc)};Y.prototype.limitToFirst=Y.prototype.He;
Y.prototype.Ie=function(a){x("Query.limitToLast",1,1,arguments.length);if(!ga(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToLast: First argument must be a positive integer.");if(this.o.ia)throw Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new Y(this.k,this.path,this.o.Ie(a),this.jc)};Y.prototype.limitToLast=Y.prototype.Ie;
Y.prototype.Bg=function(a){x("Query.orderByChild",1,1,arguments.length);if("$key"===a)throw Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');if("$priority"===a)throw Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');if("$value"===a)throw Error('Query.orderByChild: "$value" is invalid.  Use Query.orderByValue() instead.');Xf("Query.orderByChild",1,a,!1);ji(this,"Query.orderByChild");var b=be(this.o,new Rd(a));hi(b);return new Y(this.k,
this.path,b,!0)};Y.prototype.orderByChild=Y.prototype.Bg;Y.prototype.Cg=function(){x("Query.orderByKey",0,0,arguments.length);ji(this,"Query.orderByKey");var a=be(this.o,Vd);hi(a);return new Y(this.k,this.path,a,!0)};Y.prototype.orderByKey=Y.prototype.Cg;Y.prototype.Dg=function(){x("Query.orderByPriority",0,0,arguments.length);ji(this,"Query.orderByPriority");var a=be(this.o,M);hi(a);return new Y(this.k,this.path,a,!0)};Y.prototype.orderByPriority=Y.prototype.Dg;
Y.prototype.Eg=function(){x("Query.orderByValue",0,0,arguments.length);ji(this,"Query.orderByValue");var a=be(this.o,Yd);hi(a);return new Y(this.k,this.path,a,!0)};Y.prototype.orderByValue=Y.prototype.Eg;
Y.prototype.Xd=function(a,b){x("Query.startAt",0,2,arguments.length);Sf("Query.startAt",a,this.path,!0);Xf("Query.startAt",2,b,!0);var c=this.o.Xd(a,b);ii(c);hi(c);if(this.o.la)throw Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");n(a)||(b=a=null);return new Y(this.k,this.path,c,this.jc)};Y.prototype.startAt=Y.prototype.Xd;
Y.prototype.qd=function(a,b){x("Query.endAt",0,2,arguments.length);Sf("Query.endAt",a,this.path,!0);Xf("Query.endAt",2,b,!0);var c=this.o.qd(a,b);ii(c);hi(c);if(this.o.na)throw Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");return new Y(this.k,this.path,c,this.jc)};Y.prototype.endAt=Y.prototype.qd;
Y.prototype.hg=function(a,b){x("Query.equalTo",1,2,arguments.length);Sf("Query.equalTo",a,this.path,!1);Xf("Query.equalTo",2,b,!0);if(this.o.la)throw Error("Query.equalTo: Starting point was already set (by another call to endAt or equalTo).");if(this.o.na)throw Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");return this.Xd(a,b).qd(a,b)};Y.prototype.equalTo=Y.prototype.hg;
Y.prototype.toString=function(){x("Query.toString",0,0,arguments.length);for(var a=this.path,b="",c=a.Y;c<a.n.length;c++)""!==a.n[c]&&(b+="/"+encodeURIComponent(String(a.n[c])));return this.k.toString()+(b||"/")};Y.prototype.toString=Y.prototype.toString;Y.prototype.wa=function(){var a=Wc(ce(this.o));return"{}"===a?"default":a};
function ki(a,b,c){var d={cancel:null,Ma:null};if(b&&c)d.cancel=b,A(a,3,d.cancel,!0),d.Ma=c,lb(a,4,d.Ma);else if(b)if("object"===typeof b&&null!==b)d.Ma=b;else if("function"===typeof b)d.cancel=b;else throw Error(z(a,3,!0)+" must either be a cancel callback or a context object.");return d};var Z={};Z.vc=zh;Z.DataConnection=Z.vc;zh.prototype.Og=function(a,b){this.Da("q",{p:a},b)};Z.vc.prototype.simpleListen=Z.vc.prototype.Og;zh.prototype.gg=function(a,b){this.Da("echo",{d:a},b)};Z.vc.prototype.echo=Z.vc.prototype.gg;zh.prototype.interrupt=zh.prototype.yb;Z.Sf=nh;Z.RealTimeConnection=Z.Sf;nh.prototype.sendRequest=nh.prototype.Da;nh.prototype.close=nh.prototype.close;
Z.og=function(a){var b=zh.prototype.put;zh.prototype.put=function(c,d,e,f){n(f)&&(f=a());b.call(this,c,d,e,f)};return function(){zh.prototype.put=b}};Z.hijackHash=Z.og;Z.Rf=Ec;Z.ConnectionTarget=Z.Rf;Z.wa=function(a){return a.wa()};Z.queryIdentifier=Z.wa;Z.qg=function(a){return a.k.Ra.aa};Z.listens=Z.qg;Z.ue=function(a){a.ue()};Z.forceRestClient=Z.ue;function U(a,b){var c,d,e;if(a instanceof Nh)c=a,d=b;else{x("new Firebase",1,2,arguments.length);d=Rc(arguments[0]);c=d.Qg;"firebase"===d.domain&&Qc(d.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead");c&&"undefined"!=c||Qc("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com");d.lb||"undefined"!==typeof window&&window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:")&&Q("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");
c=new Ec(d.host,d.lb,c,"ws"===d.scheme||"wss"===d.scheme);d=new K(d.Zc);e=d.toString();var f;!(f=!p(c.host)||0===c.host.length||!Qf(c.Cb))&&(f=0!==e.length)&&(e&&(e=e.replace(/^\/*\.info(\/|$)/,"/")),f=!(p(e)&&0!==e.length&&!Of.test(e)));if(f)throw Error(z("new Firebase",1,!1)+'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".');if(b)if(b instanceof W)e=b;else if(p(b))e=W.ub(),c.Ld=b;else throw Error("Expected a valid Firebase.Context for second argument to new Firebase()");
else e=W.ub();f=c.toString();var g=w(e.nc,f);g||(g=new Nh(c,e.Pf),e.nc[f]=g);c=g}Y.call(this,c,d,$d,!1)}ma(U,Y);var li=U,mi=["Firebase"],ni=aa;mi[0]in ni||!ni.execScript||ni.execScript("var "+mi[0]);for(var oi;mi.length&&(oi=mi.shift());)!mi.length&&n(li)?ni[oi]=li:ni=ni[oi]?ni[oi]:ni[oi]={};U.prototype.name=function(){Q("Firebase.name() being deprecated. Please use Firebase.key() instead.");x("Firebase.name",0,0,arguments.length);return this.key()};U.prototype.name=U.prototype.name;
U.prototype.key=function(){x("Firebase.key",0,0,arguments.length);return this.path.e()?null:vc(this.path)};U.prototype.key=U.prototype.key;U.prototype.w=function(a){x("Firebase.child",1,1,arguments.length);if(ga(a))a=String(a);else if(!(a instanceof K))if(null===O(this.path)){var b=a;b&&(b=b.replace(/^\/*\.info(\/|$)/,"/"));Yf("Firebase.child",b)}else Yf("Firebase.child",a);return new U(this.k,this.path.w(a))};U.prototype.child=U.prototype.w;
U.prototype.parent=function(){x("Firebase.parent",0,0,arguments.length);var a=this.path.parent();return null===a?null:new U(this.k,a)};U.prototype.parent=U.prototype.parent;U.prototype.root=function(){x("Firebase.ref",0,0,arguments.length);for(var a=this;null!==a.parent();)a=a.parent();return a};U.prototype.root=U.prototype.root;
U.prototype.set=function(a,b){x("Firebase.set",1,2,arguments.length);Zf("Firebase.set",this.path);Sf("Firebase.set",a,this.path,!1);A("Firebase.set",2,b,!0);this.k.Kb(this.path,a,null,b||null)};U.prototype.set=U.prototype.set;
U.prototype.update=function(a,b){x("Firebase.update",1,2,arguments.length);Zf("Firebase.update",this.path);if(ea(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;Q("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}Uf("Firebase.update",a,this.path);A("Firebase.update",2,b,!0);this.k.update(this.path,a,b||null)};U.prototype.update=U.prototype.update;
U.prototype.Kb=function(a,b,c){x("Firebase.setWithPriority",2,3,arguments.length);Zf("Firebase.setWithPriority",this.path);Sf("Firebase.setWithPriority",a,this.path,!1);Vf("Firebase.setWithPriority",2,b);A("Firebase.setWithPriority",3,c,!0);if(".length"===this.key()||".keys"===this.key())throw"Firebase.setWithPriority failed: "+this.key()+" is a read-only object.";this.k.Kb(this.path,a,b,c||null)};U.prototype.setWithPriority=U.prototype.Kb;
U.prototype.remove=function(a){x("Firebase.remove",0,1,arguments.length);Zf("Firebase.remove",this.path);A("Firebase.remove",1,a,!0);this.set(null,a)};U.prototype.remove=U.prototype.remove;
U.prototype.transaction=function(a,b,c){x("Firebase.transaction",1,3,arguments.length);Zf("Firebase.transaction",this.path);A("Firebase.transaction",1,a,!1);A("Firebase.transaction",2,b,!0);if(n(c)&&"boolean"!=typeof c)throw Error(z("Firebase.transaction",3,!0)+"must be a boolean.");if(".length"===this.key()||".keys"===this.key())throw"Firebase.transaction failed: "+this.key()+" is a read-only object.";"undefined"===typeof c&&(c=!0);Zh(this.k,this.path,a,b||null,c)};U.prototype.transaction=U.prototype.transaction;
U.prototype.Lg=function(a,b){x("Firebase.setPriority",1,2,arguments.length);Zf("Firebase.setPriority",this.path);Vf("Firebase.setPriority",1,a);A("Firebase.setPriority",2,b,!0);this.k.Kb(this.path.w(".priority"),a,null,b)};U.prototype.setPriority=U.prototype.Lg;
U.prototype.push=function(a,b){x("Firebase.push",0,2,arguments.length);Zf("Firebase.push",this.path);Sf("Firebase.push",a,this.path,!0);A("Firebase.push",2,b,!0);var c=Ph(this.k),c=Kf(c),c=this.w(c);"undefined"!==typeof a&&null!==a&&c.set(a,b);return c};U.prototype.push=U.prototype.push;U.prototype.jb=function(){Zf("Firebase.onDisconnect",this.path);return new X(this.k,this.path)};U.prototype.onDisconnect=U.prototype.jb;
U.prototype.P=function(a,b,c){Q("FirebaseRef.auth() being deprecated. Please use FirebaseRef.authWithCustomToken() instead.");x("Firebase.auth",1,3,arguments.length);$f("Firebase.auth",a);A("Firebase.auth",2,b,!0);A("Firebase.auth",3,b,!0);Ng(this.k.P,a,{},{remember:"none"},b,c)};U.prototype.auth=U.prototype.P;U.prototype.ee=function(a){x("Firebase.unauth",0,1,arguments.length);A("Firebase.unauth",1,a,!0);Og(this.k.P,a)};U.prototype.unauth=U.prototype.ee;
U.prototype.we=function(){x("Firebase.getAuth",0,0,arguments.length);return this.k.P.we()};U.prototype.getAuth=U.prototype.we;U.prototype.ug=function(a,b){x("Firebase.onAuth",1,2,arguments.length);A("Firebase.onAuth",1,a,!1);lb("Firebase.onAuth",2,b);this.k.P.Eb("auth_status",a,b)};U.prototype.onAuth=U.prototype.ug;U.prototype.tg=function(a,b){x("Firebase.offAuth",1,2,arguments.length);A("Firebase.offAuth",1,a,!1);lb("Firebase.offAuth",2,b);this.k.P.gc("auth_status",a,b)};U.prototype.offAuth=U.prototype.tg;
U.prototype.Wf=function(a,b,c){x("Firebase.authWithCustomToken",2,3,arguments.length);$f("Firebase.authWithCustomToken",a);A("Firebase.authWithCustomToken",2,b,!1);cg("Firebase.authWithCustomToken",3,c,!0);Ng(this.k.P,a,{},c||{},b)};U.prototype.authWithCustomToken=U.prototype.Wf;U.prototype.Xf=function(a,b,c){x("Firebase.authWithOAuthPopup",2,3,arguments.length);bg("Firebase.authWithOAuthPopup",a);A("Firebase.authWithOAuthPopup",2,b,!1);cg("Firebase.authWithOAuthPopup",3,c,!0);Sg(this.k.P,a,c,b)};
U.prototype.authWithOAuthPopup=U.prototype.Xf;U.prototype.Yf=function(a,b,c){x("Firebase.authWithOAuthRedirect",2,3,arguments.length);bg("Firebase.authWithOAuthRedirect",a);A("Firebase.authWithOAuthRedirect",2,b,!1);cg("Firebase.authWithOAuthRedirect",3,c,!0);var d=this.k.P;Qg(d);var e=[zg],f=kg(c);"anonymous"===a||"firebase"===a?R(b,Bg("TRANSPORT_UNAVAILABLE")):(P.set("redirect_client_options",f.ld),Rg(d,e,"/auth/"+a,f,b))};U.prototype.authWithOAuthRedirect=U.prototype.Yf;
U.prototype.Zf=function(a,b,c,d){x("Firebase.authWithOAuthToken",3,4,arguments.length);bg("Firebase.authWithOAuthToken",a);A("Firebase.authWithOAuthToken",3,c,!1);cg("Firebase.authWithOAuthToken",4,d,!0);p(b)?(ag("Firebase.authWithOAuthToken",2,b),Pg(this.k.P,a+"/token",{access_token:b},d,c)):(cg("Firebase.authWithOAuthToken",2,b,!1),Pg(this.k.P,a+"/token",b,d,c))};U.prototype.authWithOAuthToken=U.prototype.Zf;
U.prototype.Vf=function(a,b){x("Firebase.authAnonymously",1,2,arguments.length);A("Firebase.authAnonymously",1,a,!1);cg("Firebase.authAnonymously",2,b,!0);Pg(this.k.P,"anonymous",{},b,a)};U.prototype.authAnonymously=U.prototype.Vf;
U.prototype.$f=function(a,b,c){x("Firebase.authWithPassword",2,3,arguments.length);cg("Firebase.authWithPassword",1,a,!1);dg("Firebase.authWithPassword",a,"email");dg("Firebase.authWithPassword",a,"password");A("Firebase.authWithPassword",2,b,!1);cg("Firebase.authWithPassword",3,c,!0);Pg(this.k.P,"password",a,c,b)};U.prototype.authWithPassword=U.prototype.$f;
U.prototype.re=function(a,b){x("Firebase.createUser",2,2,arguments.length);cg("Firebase.createUser",1,a,!1);dg("Firebase.createUser",a,"email");dg("Firebase.createUser",a,"password");A("Firebase.createUser",2,b,!1);this.k.P.re(a,b)};U.prototype.createUser=U.prototype.re;U.prototype.Se=function(a,b){x("Firebase.removeUser",2,2,arguments.length);cg("Firebase.removeUser",1,a,!1);dg("Firebase.removeUser",a,"email");dg("Firebase.removeUser",a,"password");A("Firebase.removeUser",2,b,!1);this.k.P.Se(a,b)};
U.prototype.removeUser=U.prototype.Se;U.prototype.oe=function(a,b){x("Firebase.changePassword",2,2,arguments.length);cg("Firebase.changePassword",1,a,!1);dg("Firebase.changePassword",a,"email");dg("Firebase.changePassword",a,"oldPassword");dg("Firebase.changePassword",a,"newPassword");A("Firebase.changePassword",2,b,!1);this.k.P.oe(a,b)};U.prototype.changePassword=U.prototype.oe;
U.prototype.ne=function(a,b){x("Firebase.changeEmail",2,2,arguments.length);cg("Firebase.changeEmail",1,a,!1);dg("Firebase.changeEmail",a,"oldEmail");dg("Firebase.changeEmail",a,"newEmail");dg("Firebase.changeEmail",a,"password");A("Firebase.changeEmail",2,b,!1);this.k.P.ne(a,b)};U.prototype.changeEmail=U.prototype.ne;
U.prototype.Ue=function(a,b){x("Firebase.resetPassword",2,2,arguments.length);cg("Firebase.resetPassword",1,a,!1);dg("Firebase.resetPassword",a,"email");A("Firebase.resetPassword",2,b,!1);this.k.P.Ue(a,b)};U.prototype.resetPassword=U.prototype.Ue;U.goOffline=function(){x("Firebase.goOffline",0,0,arguments.length);W.ub().yb()};U.goOnline=function(){x("Firebase.goOnline",0,0,arguments.length);W.ub().qc()};
function Nc(a,b){J(!b||!0===a||!1===a,"Can't turn on custom loggers persistently.");!0===a?("undefined"!==typeof console&&("function"===typeof console.log?Ab=q(console.log,console):"object"===typeof console.log&&(Ab=function(a){console.log(a)})),b&&P.set("logging_enabled",!0)):a?Ab=a:(Ab=null,P.remove("logging_enabled"))}U.enableLogging=Nc;U.ServerValue={TIMESTAMP:{".sv":"timestamp"}};U.SDK_VERSION="2.2.7";U.INTERNAL=V;U.Context=W;U.TEST_ACCESS=Z;})();


/*!
 * AngularFire is the officially supported AngularJS binding for Firebase. Firebase
 * is a full backend so you don't need servers to build your Angular app. AngularFire
 * provides you with the $firebase service which allows you to easily keep your $scope
 * variables in sync with your Firebase backend.
 *
 * AngularFire 1.1.2
 * https://github.com/firebase/angularfire/
 * Date: 06/25/2015
 * License: MIT
 */
!function(a){"use strict";angular.module("firebase",[]).value("Firebase",a.Firebase)}(window),function(){"use strict";angular.module("firebase").factory("$firebaseArray",["$log","$firebaseUtils","$q",function(a,b,c){function d(a){if(!(this instanceof d))return new d(a);var c=this;return this._observers=[],this.$list=[],this._ref=a,this._sync=new e(this),b.assertValidRef(a,"Must pass a valid Firebase reference to $firebaseArray (not a string or URL)"),this._indexCache={},b.getPublicMethods(c,function(a,b){c.$list[b]=a.bind(c)}),this._sync.init(this.$list),this.$list}function e(d){function e(a){if(!r.isDestroyed){r.isDestroyed=!0;var b=d.$ref();b.off("child_added",j),b.off("child_moved",l),b.off("child_changed",k),b.off("child_removed",m),d=null,q(a||"destroyed")}}function f(b){var c=d.$ref();c.on("child_added",j,p),c.on("child_moved",l,p),c.on("child_changed",k,p),c.on("child_removed",m,p),c.once("value",function(c){angular.isArray(c.val())&&a.warn("Storing data using array indices in Firebase can result in unexpected behavior. See https://www.firebase.com/docs/web/guide/understanding-data.html#section-arrays-in-firebase for more information."),q(null,b)},q)}function g(a,b){o||(o=!0,a?i.reject(a):i.resolve(b))}function h(a,b){var d=c.when(a);d.then(function(a){a&&b(a)}),o||n.push(d)}var i=b.defer(),j=function(a,b){h(d.$$added(a,b),function(a){d.$$process("child_added",a,b)})},k=function(a){var c=d.$getRecord(b.getKey(a));c&&h(d.$$updated(a),function(){d.$$process("child_changed",c)})},l=function(a,c){var e=d.$getRecord(b.getKey(a));e&&h(d.$$moved(a,c),function(){d.$$process("child_moved",e,c)})},m=function(a){var c=d.$getRecord(b.getKey(a));c&&h(d.$$removed(a),function(){d.$$process("child_removed",c)})},n=[],o=!1,p=b.batch(function(a){g(a),d&&d.$$error(a)}),q=b.batch(g),r={destroy:e,isDestroyed:!1,init:f,ready:function(){return i.promise.then(function(a){return c.all(n).then(function(){return a})})}};return r}return d.prototype={$add:function(a){this._assertNotDestroyed("$add");var c=b.defer(),d=this.$ref().ref().push();return d.set(b.toJSON(a),b.makeNodeResolver(c)),c.promise.then(function(){return d})},$save:function(a){this._assertNotDestroyed("$save");var c=this,d=c._resolveItem(a),e=c.$keyAt(d);if(null!==e){var f=c.$ref().ref().child(e),g=b.toJSON(d);return b.doSet(f,g).then(function(){return c.$$notify("child_changed",e),f})}return b.reject("Invalid record; could determine key for "+a)},$remove:function(a){this._assertNotDestroyed("$remove");var c=this.$keyAt(a);if(null!==c){var d=this.$ref().ref().child(c);return b.doRemove(d).then(function(){return d})}return b.reject("Invalid record; could not determine key for "+a)},$keyAt:function(a){var b=this._resolveItem(a);return this.$$getKey(b)},$indexFor:function(a){var b=this,c=b._indexCache;if(!c.hasOwnProperty(a)||b.$keyAt(c[a])!==a){var d=b.$list.findIndex(function(c){return b.$$getKey(c)===a});-1!==d&&(c[a]=d)}return c.hasOwnProperty(a)?c[a]:-1},$loaded:function(a,b){var c=this._sync.ready();return arguments.length&&(c=c.then.call(c,a,b)),c},$ref:function(){return this._ref},$watch:function(a,b){var c=this._observers;return c.push([a,b]),function(){var d=c.findIndex(function(c){return c[0]===a&&c[1]===b});d>-1&&c.splice(d,1)}},$destroy:function(a){this._isDestroyed||(this._isDestroyed=!0,this._sync.destroy(a),this.$list.length=0)},$getRecord:function(a){var b=this.$indexFor(a);return b>-1?this.$list[b]:null},$$added:function(a){var c=this.$indexFor(b.getKey(a));if(-1===c){var d=a.val();return angular.isObject(d)||(d={$value:d}),d.$id=b.getKey(a),d.$priority=a.getPriority(),b.applyDefaults(d,this.$$defaults),d}return!1},$$removed:function(a){return this.$indexFor(b.getKey(a))>-1},$$updated:function(a){var c=!1,d=this.$getRecord(b.getKey(a));return angular.isObject(d)&&(c=b.updateRec(d,a),b.applyDefaults(d,this.$$defaults)),c},$$moved:function(a){var c=this.$getRecord(b.getKey(a));return angular.isObject(c)?(c.$priority=a.getPriority(),!0):!1},$$error:function(b){a.error(b),this.$destroy(b)},$$getKey:function(a){return angular.isObject(a)?a.$id:null},$$process:function(a,b,c){var d,e=this.$$getKey(b),f=!1;switch(a){case"child_added":d=this.$indexFor(e);break;case"child_moved":d=this.$indexFor(e),this._spliceOut(e);break;case"child_removed":f=null!==this._spliceOut(e);break;case"child_changed":f=!0;break;default:throw new Error("Invalid event type: "+a)}return angular.isDefined(d)&&(f=this._addAfter(b,c)!==d),f&&this.$$notify(a,e,c),f},$$notify:function(a,b,c){var d={event:a,key:b};angular.isDefined(c)&&(d.prevChild=c),angular.forEach(this._observers,function(a){a[0].call(a[1],d)})},_addAfter:function(a,b){var c;return null===b?c=0:(c=this.$indexFor(b)+1,0===c&&(c=this.$list.length)),this.$list.splice(c,0,a),this._indexCache[this.$$getKey(a)]=c,c},_spliceOut:function(a){var b=this.$indexFor(a);return b>-1?(delete this._indexCache[a],this.$list.splice(b,1)[0]):null},_resolveItem:function(a){var b=this.$list;if(angular.isNumber(a)&&a>=0&&b.length>=a)return b[a];if(angular.isObject(a)){var c=this.$$getKey(a),d=this.$getRecord(c);return d===a?d:null}return null},_assertNotDestroyed:function(a){if(this._isDestroyed)throw new Error("Cannot call "+a+" method on a destroyed $firebaseArray object")}},d.$extend=function(a,c){return 1===arguments.length&&angular.isObject(a)&&(c=a,a=function(b){return this instanceof a?(d.apply(this,arguments),this.$list):new a(b)}),b.inherit(a,d,c)},d}]),angular.module("firebase").factory("$FirebaseArray",["$log","$firebaseArray",function(a,b){return function(){return a.warn("$FirebaseArray has been renamed. Use $firebaseArray instead."),b.apply(null,arguments)}}])}(),function(){"use strict";var a;angular.module("firebase").factory("$firebaseAuth",["$q","$firebaseUtils",function(b,c){return function(d){var e=new a(b,c,d);return e.construct()}}]),a=function(a,b,c){if(this._q=a,this._utils=b,"string"==typeof c)throw new Error("Please provide a Firebase reference instead of a URL when creating a `$firebaseAuth` object.");this._ref=c,this._initialAuthResolver=this._initAuthResolver()},a.prototype={construct:function(){return this._object={$authWithCustomToken:this.authWithCustomToken.bind(this),$authAnonymously:this.authAnonymously.bind(this),$authWithPassword:this.authWithPassword.bind(this),$authWithOAuthPopup:this.authWithOAuthPopup.bind(this),$authWithOAuthRedirect:this.authWithOAuthRedirect.bind(this),$authWithOAuthToken:this.authWithOAuthToken.bind(this),$unauth:this.unauth.bind(this),$onAuth:this.onAuth.bind(this),$getAuth:this.getAuth.bind(this),$requireAuth:this.requireAuth.bind(this),$waitForAuth:this.waitForAuth.bind(this),$createUser:this.createUser.bind(this),$changePassword:this.changePassword.bind(this),$changeEmail:this.changeEmail.bind(this),$removeUser:this.removeUser.bind(this),$resetPassword:this.resetPassword.bind(this)},this._object},authWithCustomToken:function(a,b){var c=this._q.defer();try{this._ref.authWithCustomToken(a,this._utils.makeNodeResolver(c),b)}catch(d){c.reject(d)}return c.promise},authAnonymously:function(a){var b=this._q.defer();try{this._ref.authAnonymously(this._utils.makeNodeResolver(b),a)}catch(c){b.reject(c)}return b.promise},authWithPassword:function(a,b){var c=this._q.defer();try{this._ref.authWithPassword(a,this._utils.makeNodeResolver(c),b)}catch(d){c.reject(d)}return c.promise},authWithOAuthPopup:function(a,b){var c=this._q.defer();try{this._ref.authWithOAuthPopup(a,this._utils.makeNodeResolver(c),b)}catch(d){c.reject(d)}return c.promise},authWithOAuthRedirect:function(a,b){var c=this._q.defer();try{this._ref.authWithOAuthRedirect(a,this._utils.makeNodeResolver(c),b)}catch(d){c.reject(d)}return c.promise},authWithOAuthToken:function(a,b,c){var d=this._q.defer();try{this._ref.authWithOAuthToken(a,b,this._utils.makeNodeResolver(d),c)}catch(e){d.reject(e)}return d.promise},unauth:function(){null!==this.getAuth()&&this._ref.unauth()},onAuth:function(a,b){var c=this,d=this._utils.debounce(a,b,0);return this._ref.onAuth(d),function(){c._ref.offAuth(d)}},getAuth:function(){return this._ref.getAuth()},_routerMethodOnAuthPromise:function(a){var b=this._ref,c=this._utils;return this._initialAuthResolver.then(function(){var d=b.getAuth(),e=null;return e=a&&null===d?c.reject("AUTH_REQUIRED"):c.resolve(d)})},_initAuthResolver:function(){var a=this._ref;return this._utils.promise(function(b){function c(){a.offAuth(c),b()}a.onAuth(c)})},requireAuth:function(){return this._routerMethodOnAuthPromise(!0)},waitForAuth:function(){return this._routerMethodOnAuthPromise(!1)},createUser:function(a){var b=this._q.defer();if("string"==typeof a)throw new Error("$createUser() expects an object containing 'email' and 'password', but got a string.");try{this._ref.createUser(a,this._utils.makeNodeResolver(b))}catch(c){b.reject(c)}return b.promise},changePassword:function(a){var b=this._q.defer();if("string"==typeof a)throw new Error("$changePassword() expects an object containing 'email', 'oldPassword', and 'newPassword', but got a string.");try{this._ref.changePassword(a,this._utils.makeNodeResolver(b))}catch(c){b.reject(c)}return b.promise},changeEmail:function(a){var b=this._q.defer();if("function"!=typeof this._ref.changeEmail)throw new Error("$firebaseAuth.$changeEmail() requires Firebase version 2.1.0 or greater.");if("string"==typeof a)throw new Error("$changeEmail() expects an object containing 'oldEmail', 'newEmail', and 'password', but got a string.");try{this._ref.changeEmail(a,this._utils.makeNodeResolver(b))}catch(c){b.reject(c)}return b.promise},removeUser:function(a){var b=this._q.defer();if("string"==typeof a)throw new Error("$removeUser() expects an object containing 'email' and 'password', but got a string.");try{this._ref.removeUser(a,this._utils.makeNodeResolver(b))}catch(c){b.reject(c)}return b.promise},resetPassword:function(a){var b=this._q.defer();if("string"==typeof a)throw new Error("$resetPassword() expects an object containing 'email', but got a string.");try{this._ref.resetPassword(a,this._utils.makeNodeResolver(b))}catch(c){b.reject(c)}return b.promise}}}(),function(){"use strict";angular.module("firebase").factory("$firebaseObject",["$parse","$firebaseUtils","$log",function(a,b,c){function d(a){return this instanceof d?(this.$$conf={sync:new f(this,a),ref:a,binding:new e(this),listeners:[]},Object.defineProperty(this,"$$conf",{value:this.$$conf}),this.$id=b.getKey(a.ref()),this.$priority=null,b.applyDefaults(this,this.$$defaults),void this.$$conf.sync.init()):new d(a)}function e(a){this.subs=[],this.scope=null,this.key=null,this.rec=a}function f(a,d){function e(b){m.isDestroyed||(m.isDestroyed=!0,d.off("value",j),a=null,l(b||"destroyed"))}function f(){d.on("value",j,k),d.once("value",function(a){angular.isArray(a.val())&&c.warn("Storing data using array indices in Firebase can result in unexpected behavior. See https://www.firebase.com/docs/web/guide/understanding-data.html#section-arrays-in-firebase for more information. Also note that you probably wanted $firebaseArray and not $firebaseObject."),l(null)},l)}function g(b){h||(h=!0,b?i.reject(b):i.resolve(a))}var h=!1,i=b.defer(),j=b.batch(function(b){var c=a.$$updated(b);c&&a.$$notify()}),k=b.batch(function(b){g(b),a&&a.$$error(b)}),l=b.batch(g),m={isDestroyed:!1,destroy:e,init:f,ready:function(){return i.promise}};return m}return d.prototype={$save:function(){var a=this,c=a.$ref(),d=b.toJSON(a);return b.doSet(c,d).then(function(){return a.$$notify(),a.$ref()})},$remove:function(){var a=this;return b.trimKeys(a,{}),a.$value=null,b.doRemove(a.$ref()).then(function(){return a.$$notify(),a.$ref()})},$loaded:function(a,b){var c=this.$$conf.sync.ready();return arguments.length&&(c=c.then.call(c,a,b)),c},$ref:function(){return this.$$conf.ref},$bindTo:function(a,b){var c=this;return c.$loaded().then(function(){return c.$$conf.binding.bindTo(a,b)})},$watch:function(a,b){var c=this.$$conf.listeners;return c.push([a,b]),function(){var d=c.findIndex(function(c){return c[0]===a&&c[1]===b});d>-1&&c.splice(d,1)}},$destroy:function(a){var c=this;c.$isDestroyed||(c.$isDestroyed=!0,c.$$conf.sync.destroy(a),c.$$conf.binding.destroy(),b.each(c,function(a,b){delete c[b]}))},$$updated:function(a){var c=b.updateRec(this,a);return b.applyDefaults(this,this.$$defaults),c},$$error:function(a){c.error(a),this.$destroy(a)},$$scopeUpdated:function(a){var c=b.defer();return this.$ref().set(b.toJSON(a),b.makeNodeResolver(c)),c.promise},$$notify:function(){var a=this,b=this.$$conf.listeners.slice();angular.forEach(b,function(b){b[0].call(b[1],{event:"value",key:a.$id})})},forEach:function(a,c){return b.each(this,a,c)}},d.$extend=function(a,c){return 1===arguments.length&&angular.isObject(a)&&(c=a,a=function(b){return this instanceof a?void d.apply(this,arguments):new a(b)}),b.inherit(a,d,c)},e.prototype={assertNotBound:function(a){if(this.scope){var d="Cannot bind to "+a+" because this instance is already bound to "+this.key+"; one binding per instance (call unbind method or create another FirebaseObject instance)";return c.error(d),b.reject(d)}},bindTo:function(c,d){function e(e){function f(a){return angular.equals(a,k)&&a.$priority===k.$priority&&a.$value===k.$value}function g(a){j.assign(c,b.scopeData(a))}function h(){var a=j(c);return[a,a.$priority,a.$value]}var i=!1,j=a(d),k=e.rec;e.scope=c,e.varName=d;var l=b.debounce(function(a){var d=b.scopeData(a);k.$$scopeUpdated(d)["finally"](function(){i=!1,d.hasOwnProperty("$value")||(delete k.$value,delete j(c).$value)})},50,500),m=function(a){a=a[0],f(a)||(i=!0,l(a))},n=function(){i||f(j(c))||g(k)};return g(k),e.subs.push(c.$on("$destroy",e.unbind.bind(e))),e.subs.push(c.$watch(h,m,!0)),e.subs.push(k.$watch(n)),e.unbind.bind(e)}return this.assertNotBound(d)||e(this)},unbind:function(){this.scope&&(angular.forEach(this.subs,function(a){a()}),this.subs=[],this.scope=null,this.key=null)},destroy:function(){this.unbind(),this.rec=null}},d}]),angular.module("firebase").factory("$FirebaseObject",["$log","$firebaseObject",function(a,b){return function(){return a.warn("$FirebaseObject has been renamed. Use $firebaseObject instead."),b.apply(null,arguments)}}])}(),function(){"use strict";angular.module("firebase").factory("$firebase",function(){return function(){throw new Error("$firebase has been removed. You may instantiate $firebaseArray and $firebaseObject directly now. For simple write operations, just use the Firebase ref directly. See the AngularFire 1.0.0 changelog for details: https://www.firebase.com/docs/web/libraries/angular/changelog.html")}})}(),Array.prototype.indexOf||(Array.prototype.indexOf=function(a,b){if(void 0===this||null===this)throw new TypeError("'this' is null or not defined");var c=this.length>>>0;for(b=+b||0,Math.abs(b)===1/0&&(b=0),0>b&&(b+=c,0>b&&(b=0));c>b;b++)if(this[b]===a)return b;return-1}),Function.prototype.bind||(Function.prototype.bind=function(a){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var b=Array.prototype.slice.call(arguments,1),c=this,d=function(){},e=function(){return c.apply(this instanceof d&&a?this:a,b.concat(Array.prototype.slice.call(arguments)))};return d.prototype=this.prototype,e.prototype=new d,e}),Array.prototype.findIndex||Object.defineProperty(Array.prototype,"findIndex",{enumerable:!1,configurable:!0,writable:!0,value:function(a){if(null==this)throw new TypeError("Array.prototype.find called on null or undefined");if("function"!=typeof a)throw new TypeError("predicate must be a function");for(var b,c=Object(this),d=c.length>>>0,e=arguments[1],f=0;d>f;f++)if(f in c&&(b=c[f],a.call(e,b,f,c)))return f;return-1}}),"function"!=typeof Object.create&&!function(){var a=function(){};Object.create=function(b){if(arguments.length>1)throw new Error("Second argument not supported");if(null===b)throw new Error("Cannot set a null [[Prototype]]");if("object"!=typeof b)throw new TypeError("Argument must be an object");return a.prototype=b,new a}}(),Object.keys||(Object.keys=function(){"use strict";var a=Object.prototype.hasOwnProperty,b=!{toString:null}.propertyIsEnumerable("toString"),c=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],d=c.length;return function(e){if("object"!=typeof e&&("function"!=typeof e||null===e))throw new TypeError("Object.keys called on non-object");var f,g,h=[];for(f in e)a.call(e,f)&&h.push(f);if(b)for(g=0;d>g;g++)a.call(e,c[g])&&h.push(c[g]);return h}}()),"function"!=typeof Object.getPrototypeOf&&("object"==typeof"test".__proto__?Object.getPrototypeOf=function(a){return a.__proto__}:Object.getPrototypeOf=function(a){return a.constructor.prototype}),function(){"use strict";function a(b){if(!angular.isObject(b))return b;var c=angular.isArray(b)?[]:{};return angular.forEach(b,function(b,d){("string"!=typeof d||"$"!==d.charAt(0))&&(c[d]=a(b))}),c}angular.module("firebase").factory("$firebaseConfig",["$firebaseArray","$firebaseObject","$injector",function(a,b,c){return function(d){var e=angular.extend({},d);return"string"==typeof e.objectFactory&&(e.objectFactory=c.get(e.objectFactory)),"string"==typeof e.arrayFactory&&(e.arrayFactory=c.get(e.arrayFactory)),angular.extend({arrayFactory:a,objectFactory:b},e)}}]).factory("$firebaseUtils",["$q","$timeout","$rootScope",function(b,c,d){function e(a){function c(a){e.resolve(a)}function d(a){e.reject(a)}if(!angular.isFunction(a))throw new Error("missing resolver function");var e=b.defer();return a(c,d),e.promise}var f={batch:function(a,b){return function(){var c=Array.prototype.slice.call(arguments,0);f.compile(function(){a.apply(b,c)})}},debounce:function(a,b,c,d){function e(){j&&(j(),j=null),i&&Date.now()-i>d?l||(l=!0,f.compile(g)):(i||(i=Date.now()),j=f.wait(g,c))}function g(){j=null,i=null,l=!1,a.apply(b,k)}function h(){k=Array.prototype.slice.call(arguments,0),e()}var i,j,k,l;if("number"==typeof b&&(d=c,c=b,b=null),"number"!=typeof c)throw new Error("Must provide a valid integer for wait. Try 0 for a default");if("function"!=typeof a)throw new Error("Must provide a valid function to debounce");return d||(d=10*c||100),h.running=function(){return i>0},h},assertValidRef:function(a,b){if(!angular.isObject(a)||"function"!=typeof a.ref||"function"!=typeof a.ref().transaction)throw new Error(b||"Invalid Firebase reference")},inherit:function(a,b,c){var d=a.prototype;return a.prototype=Object.create(b.prototype),a.prototype.constructor=a,angular.forEach(Object.keys(d),function(b){a.prototype[b]=d[b]}),angular.isObject(c)&&angular.extend(a.prototype,c),a},getPrototypeMethods:function(a,b,c){for(var d={},e=Object.getPrototypeOf({}),f=angular.isFunction(a)&&angular.isObject(a.prototype)?a.prototype:Object.getPrototypeOf(a);f&&f!==e;){for(var g in f)f.hasOwnProperty(g)&&!d.hasOwnProperty(g)&&(d[g]=!0,b.call(c,f[g],g,f));f=Object.getPrototypeOf(f)}},getPublicMethods:function(a,b,c){f.getPrototypeMethods(a,function(a,d){"function"==typeof a&&"_"!==d.charAt(0)&&b.call(c,a,d)})},defer:b.defer,reject:b.reject,resolve:b.when,promise:angular.isFunction(b)?b:e,makeNodeResolver:function(a){return function(b,c){null===b?(arguments.length>2&&(c=Array.prototype.slice.call(arguments,1)),a.resolve(c)):a.reject(b)}},wait:function(a,b){var d=c(a,b||0);return function(){d&&(c.cancel(d),d=null)}},compile:function(a){return d.$evalAsync(a||function(){})},deepCopy:function(a){if(!angular.isObject(a))return a;var b=angular.isArray(a)?a.slice():angular.extend({},a);for(var c in b)b.hasOwnProperty(c)&&angular.isObject(b[c])&&(b[c]=f.deepCopy(b[c]));return b},trimKeys:function(a,b){f.each(a,function(c,d){b.hasOwnProperty(d)||delete a[d]})},scopeData:function(a){var b={$id:a.$id,$priority:a.$priority},c=!1;return f.each(a,function(a,d){c=!0,b[d]=f.deepCopy(a)}),!c&&a.hasOwnProperty("$value")&&(b.$value=a.$value),b},updateRec:function(a,b){var c=b.val(),d=angular.extend({},a);return angular.isObject(c)?delete a.$value:(a.$value=c,c={}),f.trimKeys(a,c),angular.extend(a,c),a.$priority=b.getPriority(),!angular.equals(d,a)||d.$value!==a.$value||d.$priority!==a.$priority},applyDefaults:function(a,b){return angular.isObject(b)&&angular.forEach(b,function(b,c){a.hasOwnProperty(c)||(a[c]=b)}),a},dataKeys:function(a){var b=[];return f.each(a,function(a,c){b.push(c)}),b},each:function(a,b,c){if(angular.isObject(a)){for(var d in a)if(a.hasOwnProperty(d)){var e=d.charAt(0);"_"!==e&&"$"!==e&&"."!==e&&b.call(c,a[d],d,a)}}else if(angular.isArray(a))for(var f=0,g=a.length;g>f;f++)b.call(c,a[f],f,a);return a},getKey:function(a){return"function"==typeof a.key?a.key():a.name()},toJSON:function(b){var c;return angular.isObject(b)||(b={$value:b}),angular.isFunction(b.toJSON)?c=b.toJSON():(c={},f.each(b,function(b,d){c[d]=a(b)})),angular.isDefined(b.$value)&&0===Object.keys(c).length&&null!==b.$value&&(c[".value"]=b.$value),angular.isDefined(b.$priority)&&Object.keys(c).length>0&&null!==b.$priority&&(c[".priority"]=b.$priority),angular.forEach(c,function(a,b){if(b.match(/[.$\[\]#\/]/)&&".value"!==b&&".priority"!==b)throw new Error("Invalid key "+b+" (cannot contain .$[]#)");if(angular.isUndefined(a))throw new Error("Key "+b+" was undefined. Cannot pass undefined in JSON. Use null instead.")}),c},doSet:function(a,b){var c=f.defer();if(angular.isFunction(a.set)||!angular.isObject(b))a.set(b,f.makeNodeResolver(c));else{var d=angular.extend({},b);a.once("value",function(b){b.forEach(function(a){d.hasOwnProperty(f.getKey(a))||(d[f.getKey(a)]=null)}),a.ref().update(d,f.makeNodeResolver(c))},function(a){c.reject(a)})}return c.promise},doRemove:function(a){var b=f.defer();return angular.isFunction(a.remove)?a.remove(f.makeNodeResolver(b)):a.once("value",function(c){var d=[];c.forEach(function(a){var c=f.defer();d.push(c.promise),a.ref().remove(f.makeNodeResolver(b))}),f.allPromises(d).then(function(){b.resolve(a)},function(a){b.reject(a)})},function(a){b.reject(a)}),b.promise},VERSION:"1.1.2",allPromises:b.all.bind(b)};return f}])}();
/*
 AngularJS v1.4.1
 (c) 2010-2015 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(A,h,B){'use strict';function v(h){return["$animate",function(q){return{restrict:"AE",transclude:"element",terminal:!0,require:"^^ngMessages",link:function(m,e,a,g,k){var c=e[0],n,l=a.ngMessage||a.when;a=a.ngMessageExp||a.whenExp;var p=function(d){n=d?w(d)?d:d.split(/[\s,]+/):null;g.reRender()};a?(p(m.$eval(a)),m.$watchCollection(a,p)):p(l);var f,r;g.register(c,r={test:function(d){var b=n;d=b?w(b)?0<=b.indexOf(d):b.hasOwnProperty(d):void 0;return d},attach:function(){f||k(m,function(d){q.enter(d,
null,e);f=d;f.on("$destroy",function(){f&&(g.deregister(c),r.detach())})})},detach:function(){if(f){var d=f;f=null;q.leave(d)}}})}}}]}var w=h.isArray,x=h.forEach,y=h.isString,z=h.element;h.module("ngMessages",[]).directive("ngMessages",["$animate",function(h){function q(e,a){return y(a)&&0===a.length||m(e.$eval(a))}function m(e){return y(e)?e.length:!!e}return{require:"ngMessages",restrict:"AE",controller:["$element","$scope","$attrs",function(e,a,g){function k(a,d){for(var b=d,e=[];b&&b!==a;){var c=
b.$$ngMessageNode;if(c&&c.length)return l[c];b.childNodes.length&&-1==e.indexOf(b)?(e.push(b),b=b.childNodes[b.childNodes.length-1]):b=b.previousSibling||b.parentNode}}var c=this,n=0,l=this.messages={},p,f;this.render=function(r){r=r||{};p=!1;f=r;for(var d=q(a,g.ngMessagesMultiple)||q(a,g.multiple),b=[],n={},s=c.head,k=!1,l=0;null!=s;){l++;var t=s.message,u=!1;k||x(r,function(b,a){!u&&m(b)&&t.test(a)&&!n[a]&&(u=n[a]=!0,t.attach())});u?k=!d:b.push(t);s=s.next}x(b,function(b){b.detach()});b.length!==
l?h.setClass(e,"ng-active","ng-inactive"):h.setClass(e,"ng-inactive","ng-active")};a.$watchCollection(g.ngMessages||g["for"],c.render);this.reRender=function(){p||(p=!0,a.$evalAsync(function(){p&&f&&c.render(f)}))};this.register=function(a,d){var b=n.toString();l[b]={message:d};var g=e[0],f=l[b];c.head?(g=k(g,a))?(f.next=g.next,g.next=f):(f.next=c.head,c.head=f):c.head=f;a.$$ngMessageNode=b;n++;c.reRender()};this.deregister=function(a){var d=a.$$ngMessageNode;delete a.$$ngMessageNode;var b=l[d];(a=
k(e[0],a))?a.next=b.next:c.head=b.next;delete l[d];c.reRender()}}]}}]).directive("ngMessagesInclude",["$templateRequest","$document","$compile",function(h,q,m){return{restrict:"AE",require:"^^ngMessages",link:function(e,a,g){var k=g.ngMessagesInclude||g.src;h(k).then(function(c){m(c)(e,function(c){a.after(c);c=z(q[0].createComment(" ngMessagesInclude: "+k+" "));a.after(c);a.remove()})})}}}]).directive("ngMessage",v("AE")).directive("ngMessageExp",v("A"))})(window,window.angular);
//# sourceMappingURL=angular-messages.min.js.map

/**
 * Swiper 3.0.8
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * 
 * http://www.idangero.us/swiper/
 * 
 * Copyright 2015, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: June 14, 2015
 */
!function(){"use strict";function e(e){e.fn.swiper=function(t){var r;return e(this).each(function(){var e=new a(this,t);r||(r=e)}),r}}var a=function(e,r){function s(){return"horizontal"===g.params.direction}function i(){g.autoplayTimeoutId=setTimeout(function(){g.params.loop?(g.fixLoop(),g._slideNext()):g.isEnd?r.autoplayStopOnLast?g.stopAutoplay():g._slideTo(0):g._slideNext()},g.params.autoplay)}function n(e,a){var t=v(e.target);if(!t.is(a))if("string"==typeof a)t=t.parents(a);else if(a.nodeType){var r;return t.parents().each(function(e,t){t===a&&(r=a)}),r?a:void 0}return 0===t.length?void 0:t[0]}function o(e,a){a=a||{};var t=window.MutationObserver||window.WebkitMutationObserver,r=new t(function(e){e.forEach(function(e){g.onResize(!0),g.emit("onObserverUpdate",g,e)})});r.observe(e,{attributes:"undefined"==typeof a.attributes?!0:a.attributes,childList:"undefined"==typeof a.childList?!0:a.childList,characterData:"undefined"==typeof a.characterData?!0:a.characterData}),g.observers.push(r)}function l(e){e.originalEvent&&(e=e.originalEvent);var a=e.keyCode||e.charCode;if(!g.params.allowSwipeToNext&&(s()&&39===a||!s()&&40===a))return!1;if(!g.params.allowSwipeToPrev&&(s()&&37===a||!s()&&38===a))return!1;if(!(e.shiftKey||e.altKey||e.ctrlKey||e.metaKey||document.activeElement&&document.activeElement.nodeName&&("input"===document.activeElement.nodeName.toLowerCase()||"textarea"===document.activeElement.nodeName.toLowerCase()))){if(37===a||39===a||38===a||40===a){var t=!1;if(g.container.parents(".swiper-slide").length>0&&0===g.container.parents(".swiper-slide-active").length)return;var r={left:window.pageXOffset,top:window.pageYOffset},i=window.innerWidth,n=window.innerHeight,o=g.container.offset();g.rtl&&(o.left=o.left-g.container[0].scrollLeft);for(var l=[[o.left,o.top],[o.left+g.width,o.top],[o.left,o.top+g.height],[o.left+g.width,o.top+g.height]],d=0;d<l.length;d++){var p=l[d];p[0]>=r.left&&p[0]<=r.left+i&&p[1]>=r.top&&p[1]<=r.top+n&&(t=!0)}if(!t)return}s()?((37===a||39===a)&&(e.preventDefault?e.preventDefault():e.returnValue=!1),(39===a&&!g.rtl||37===a&&g.rtl)&&g.slideNext(),(37===a&&!g.rtl||39===a&&g.rtl)&&g.slidePrev()):((38===a||40===a)&&(e.preventDefault?e.preventDefault():e.returnValue=!1),40===a&&g.slideNext(),38===a&&g.slidePrev())}}function d(e){e.originalEvent&&(e=e.originalEvent);var a=g.mousewheel.event,t=0;if(e.detail)t=-e.detail;else if("mousewheel"===a)if(g.params.mousewheelForceToAxis)if(s()){if(!(Math.abs(e.wheelDeltaX)>Math.abs(e.wheelDeltaY)))return;t=e.wheelDeltaX}else{if(!(Math.abs(e.wheelDeltaY)>Math.abs(e.wheelDeltaX)))return;t=e.wheelDeltaY}else t=e.wheelDelta;else if("DOMMouseScroll"===a)t=-e.detail;else if("wheel"===a)if(g.params.mousewheelForceToAxis)if(s()){if(!(Math.abs(e.deltaX)>Math.abs(e.deltaY)))return;t=-e.deltaX}else{if(!(Math.abs(e.deltaY)>Math.abs(e.deltaX)))return;t=-e.deltaY}else t=Math.abs(e.deltaX)>Math.abs(e.deltaY)?-e.deltaX:-e.deltaY;if(g.params.mousewheelInvert&&(t=-t),g.params.freeMode){var r=g.getWrapperTranslate()+t;if(r>0&&(r=0),r<g.maxTranslate()&&(r=g.maxTranslate()),g.setWrapperTransition(0),g.setWrapperTranslate(r),g.updateProgress(),g.updateActiveIndex(),g.params.freeModeSticky&&(clearTimeout(g.mousewheel.timeout),g.mousewheel.timeout=setTimeout(function(){g.slideReset()},300)),0===r||r===g.maxTranslate())return}else{if((new window.Date).getTime()-g.mousewheel.lastScrollTime>60)if(0>t)if(g.isEnd){if(g.params.mousewheelReleaseOnEdges)return!0}else g.slideNext();else if(g.isBeginning){if(g.params.mousewheelReleaseOnEdges)return!0}else g.slidePrev();g.mousewheel.lastScrollTime=(new window.Date).getTime()}return g.params.autoplay&&g.stopAutoplay(),e.preventDefault?e.preventDefault():e.returnValue=!1,!1}function p(e,a){e=v(e);var t,r,i;t=e.attr("data-swiper-parallax")||"0",r=e.attr("data-swiper-parallax-x"),i=e.attr("data-swiper-parallax-y"),r||i?(r=r||"0",i=i||"0"):s()?(r=t,i="0"):(i=t,r="0"),r=r.indexOf("%")>=0?parseInt(r,10)*a+"%":r*a+"px",i=i.indexOf("%")>=0?parseInt(i,10)*a+"%":i*a+"px",e.transform("translate3d("+r+", "+i+",0px)")}function u(e){return 0!==e.indexOf("on")&&(e=e[0]!==e[0].toUpperCase()?"on"+e[0].toUpperCase()+e.substring(1):"on"+e),e}if(!(this instanceof a))return new a(e,r);var c={direction:"horizontal",touchEventsTarget:"container",initialSlide:0,speed:300,autoplay:!1,autoplayDisableOnInteraction:!0,freeMode:!1,freeModeMomentum:!0,freeModeMomentumRatio:1,freeModeMomentumBounce:!0,freeModeMomentumBounceRatio:1,freeModeSticky:!1,setWrapperSize:!1,virtualTranslate:!1,effect:"slide",coverflow:{rotate:50,stretch:0,depth:100,modifier:1,slideShadows:!0},cube:{slideShadows:!0,shadow:!0,shadowOffset:20,shadowScale:.94},fade:{crossFade:!1},parallax:!1,scrollbar:null,scrollbarHide:!0,keyboardControl:!1,mousewheelControl:!1,mousewheelReleaseOnEdges:!1,mousewheelInvert:!1,mousewheelForceToAxis:!1,hashnav:!1,spaceBetween:0,slidesPerView:1,slidesPerColumn:1,slidesPerColumnFill:"column",slidesPerGroup:1,centeredSlides:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,onlyExternal:!1,threshold:0,touchMoveStopPropagation:!0,pagination:null,paginationClickable:!1,paginationHide:!1,paginationBulletRender:null,resistance:!0,resistanceRatio:.85,nextButton:null,prevButton:null,watchSlidesProgress:!1,watchSlidesVisibility:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,lazyLoading:!1,lazyLoadingInPrevNext:!1,lazyLoadingOnTransitionStart:!1,preloadImages:!0,updateOnImagesReady:!0,loop:!1,loopAdditionalSlides:0,loopedSlides:null,control:void 0,controlInverse:!1,allowSwipeToPrev:!0,allowSwipeToNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",slideClass:"swiper-slide",slideActiveClass:"swiper-slide-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",slideNextClass:"swiper-slide-next",slidePrevClass:"swiper-slide-prev",wrapperClass:"swiper-wrapper",bulletClass:"swiper-pagination-bullet",bulletActiveClass:"swiper-pagination-bullet-active",buttonDisabledClass:"swiper-button-disabled",paginationHiddenClass:"swiper-pagination-hidden",observer:!1,observeParents:!1,a11y:!1,prevSlideMessage:"Previous slide",nextSlideMessage:"Next slide",firstSlideMessage:"This is the first slide",lastSlideMessage:"This is the last slide",runCallbacksOnInit:!0},m=r&&r.virtualTranslate;r=r||{};for(var f in c)if("undefined"==typeof r[f])r[f]=c[f];else if("object"==typeof r[f])for(var h in c[f])"undefined"==typeof r[f][h]&&(r[f][h]=c[f][h]);var g=this;g.version="3.0.8",g.params=r,g.classNames=[];var v;if(v="undefined"==typeof t?window.Dom7||window.Zepto||window.jQuery:t,v&&(g.$=v,g.container=v(e),0!==g.container.length)){if(g.container.length>1)return void g.container.each(function(){new a(this,r)});g.container[0].swiper=g,g.container.data("swiper",g),g.classNames.push("swiper-container-"+g.params.direction),g.params.freeMode&&g.classNames.push("swiper-container-free-mode"),g.support.flexbox||(g.classNames.push("swiper-container-no-flexbox"),g.params.slidesPerColumn=1),(g.params.parallax||g.params.watchSlidesVisibility)&&(g.params.watchSlidesProgress=!0),["cube","coverflow"].indexOf(g.params.effect)>=0&&(g.support.transforms3d?(g.params.watchSlidesProgress=!0,g.classNames.push("swiper-container-3d")):g.params.effect="slide"),"slide"!==g.params.effect&&g.classNames.push("swiper-container-"+g.params.effect),"cube"===g.params.effect&&(g.params.resistanceRatio=0,g.params.slidesPerView=1,g.params.slidesPerColumn=1,g.params.slidesPerGroup=1,g.params.centeredSlides=!1,g.params.spaceBetween=0,g.params.virtualTranslate=!0,g.params.setWrapperSize=!1),"fade"===g.params.effect&&(g.params.slidesPerView=1,g.params.slidesPerColumn=1,g.params.slidesPerGroup=1,g.params.watchSlidesProgress=!0,g.params.spaceBetween=0,"undefined"==typeof m&&(g.params.virtualTranslate=!0)),g.params.grabCursor&&g.support.touch&&(g.params.grabCursor=!1),g.wrapper=g.container.children("."+g.params.wrapperClass),g.params.pagination&&(g.paginationContainer=v(g.params.pagination),g.params.paginationClickable&&g.paginationContainer.addClass("swiper-pagination-clickable")),g.rtl=s()&&("rtl"===g.container[0].dir.toLowerCase()||"rtl"===g.container.css("direction")),g.rtl&&g.classNames.push("swiper-container-rtl"),g.rtl&&(g.wrongRTL="-webkit-box"===g.wrapper.css("display")),g.params.slidesPerColumn>1&&g.classNames.push("swiper-container-multirow"),g.device.android&&g.classNames.push("swiper-container-android"),g.container.addClass(g.classNames.join(" ")),g.translate=0,g.progress=0,g.velocity=0,g.lockSwipeToNext=function(){g.params.allowSwipeToNext=!1},g.lockSwipeToPrev=function(){g.params.allowSwipeToPrev=!1},g.lockSwipes=function(){g.params.allowSwipeToNext=g.params.allowSwipeToPrev=!1},g.unlockSwipeToNext=function(){g.params.allowSwipeToNext=!0},g.unlockSwipeToPrev=function(){g.params.allowSwipeToPrev=!0},g.unlockSwipes=function(){g.params.allowSwipeToNext=g.params.allowSwipeToPrev=!0},g.params.grabCursor&&(g.container[0].style.cursor="move",g.container[0].style.cursor="-webkit-grab",g.container[0].style.cursor="-moz-grab",g.container[0].style.cursor="grab"),g.imagesToLoad=[],g.imagesLoaded=0,g.loadImage=function(e,a,t,r){function s(){r&&r()}var i;e.complete&&t?s():a?(i=new window.Image,i.onload=s,i.onerror=s,i.src=a):s()},g.preloadImages=function(){function e(){"undefined"!=typeof g&&null!==g&&(void 0!==g.imagesLoaded&&g.imagesLoaded++,g.imagesLoaded===g.imagesToLoad.length&&(g.params.updateOnImagesReady&&g.update(),g.emit("onImagesReady",g)))}g.imagesToLoad=g.container.find("img");for(var a=0;a<g.imagesToLoad.length;a++)g.loadImage(g.imagesToLoad[a],g.imagesToLoad[a].currentSrc||g.imagesToLoad[a].getAttribute("src"),!0,e)},g.autoplayTimeoutId=void 0,g.autoplaying=!1,g.autoplayPaused=!1,g.startAutoplay=function(){return"undefined"!=typeof g.autoplayTimeoutId?!1:g.params.autoplay?g.autoplaying?!1:(g.autoplaying=!0,g.emit("onAutoplayStart",g),void i()):!1},g.stopAutoplay=function(e){g.autoplayTimeoutId&&(g.autoplayTimeoutId&&clearTimeout(g.autoplayTimeoutId),g.autoplaying=!1,g.autoplayTimeoutId=void 0,g.emit("onAutoplayStop",g))},g.pauseAutoplay=function(e){g.autoplayPaused||(g.autoplayTimeoutId&&clearTimeout(g.autoplayTimeoutId),g.autoplayPaused=!0,0===e?(g.autoplayPaused=!1,i()):g.wrapper.transitionEnd(function(){g&&(g.autoplayPaused=!1,g.autoplaying?i():g.stopAutoplay())}))},g.minTranslate=function(){return-g.snapGrid[0]},g.maxTranslate=function(){return-g.snapGrid[g.snapGrid.length-1]},g.updateContainerSize=function(){var e,a;e="undefined"!=typeof g.params.width?g.params.width:g.container[0].clientWidth,a="undefined"!=typeof g.params.height?g.params.height:g.container[0].clientHeight,0===e&&s()||0===a&&!s()||(g.width=e,g.height=a,g.size=s()?g.width:g.height)},g.updateSlidesSize=function(){g.slides=g.wrapper.children("."+g.params.slideClass),g.snapGrid=[],g.slidesGrid=[],g.slidesSizesGrid=[];var e,a=g.params.spaceBetween,t=0,r=0,i=0;"string"==typeof a&&a.indexOf("%")>=0&&(a=parseFloat(a.replace("%",""))/100*g.size),g.virtualSize=-a,g.slides.css(g.rtl?{marginLeft:"",marginTop:""}:{marginRight:"",marginBottom:""});var n;g.params.slidesPerColumn>1&&(n=Math.floor(g.slides.length/g.params.slidesPerColumn)===g.slides.length/g.params.slidesPerColumn?g.slides.length:Math.ceil(g.slides.length/g.params.slidesPerColumn)*g.params.slidesPerColumn);var o,l=g.params.slidesPerColumn,d=n/l,p=d-(g.params.slidesPerColumn*d-g.slides.length);for(e=0;e<g.slides.length;e++){o=0;var u=g.slides.eq(e);if(g.params.slidesPerColumn>1){var c,m,f;"column"===g.params.slidesPerColumnFill?(m=Math.floor(e/l),f=e-m*l,(m>p||m===p&&f===l-1)&&++f>=l&&(f=0,m++),c=m+f*n/l,u.css({"-webkit-box-ordinal-group":c,"-moz-box-ordinal-group":c,"-ms-flex-order":c,"-webkit-order":c,order:c})):(f=Math.floor(e/d),m=e-f*d),u.css({"margin-top":0!==f&&g.params.spaceBetween&&g.params.spaceBetween+"px"}).attr("data-swiper-column",m).attr("data-swiper-row",f)}"none"!==u.css("display")&&("auto"===g.params.slidesPerView?o=s()?u.outerWidth(!0):u.outerHeight(!0):(o=(g.size-(g.params.slidesPerView-1)*a)/g.params.slidesPerView,s()?g.slides[e].style.width=o+"px":g.slides[e].style.height=o+"px"),g.slides[e].swiperSlideSize=o,g.slidesSizesGrid.push(o),g.params.centeredSlides?(t=t+o/2+r/2+a,0===e&&(t=t-g.size/2-a),Math.abs(t)<.001&&(t=0),i%g.params.slidesPerGroup===0&&g.snapGrid.push(t),g.slidesGrid.push(t)):(i%g.params.slidesPerGroup===0&&g.snapGrid.push(t),g.slidesGrid.push(t),t=t+o+a),g.virtualSize+=o+a,r=o,i++)}g.virtualSize=Math.max(g.virtualSize,g.size);var h;if(g.rtl&&g.wrongRTL&&("slide"===g.params.effect||"coverflow"===g.params.effect)&&g.wrapper.css({width:g.virtualSize+g.params.spaceBetween+"px"}),(!g.support.flexbox||g.params.setWrapperSize)&&g.wrapper.css(s()?{width:g.virtualSize+g.params.spaceBetween+"px"}:{height:g.virtualSize+g.params.spaceBetween+"px"}),g.params.slidesPerColumn>1&&(g.virtualSize=(o+g.params.spaceBetween)*n,g.virtualSize=Math.ceil(g.virtualSize/g.params.slidesPerColumn)-g.params.spaceBetween,g.wrapper.css({width:g.virtualSize+g.params.spaceBetween+"px"}),g.params.centeredSlides)){for(h=[],e=0;e<g.snapGrid.length;e++)g.snapGrid[e]<g.virtualSize+g.snapGrid[0]&&h.push(g.snapGrid[e]);g.snapGrid=h}if(!g.params.centeredSlides){for(h=[],e=0;e<g.snapGrid.length;e++)g.snapGrid[e]<=g.virtualSize-g.size&&h.push(g.snapGrid[e]);g.snapGrid=h,Math.floor(g.virtualSize-g.size)>Math.floor(g.snapGrid[g.snapGrid.length-1])&&g.snapGrid.push(g.virtualSize-g.size)}0===g.snapGrid.length&&(g.snapGrid=[0]),0!==g.params.spaceBetween&&g.slides.css(s()?g.rtl?{marginLeft:a+"px"}:{marginRight:a+"px"}:{marginBottom:a+"px"}),g.params.watchSlidesProgress&&g.updateSlidesOffset()},g.updateSlidesOffset=function(){for(var e=0;e<g.slides.length;e++)g.slides[e].swiperSlideOffset=s()?g.slides[e].offsetLeft:g.slides[e].offsetTop},g.updateSlidesProgress=function(e){if("undefined"==typeof e&&(e=g.translate||0),0!==g.slides.length){"undefined"==typeof g.slides[0].swiperSlideOffset&&g.updateSlidesOffset();var a=g.params.centeredSlides?-e+g.size/2:-e;g.rtl&&(a=g.params.centeredSlides?e-g.size/2:e);{g.container[0].getBoundingClientRect(),s()?"left":"top",s()?"right":"bottom"}g.slides.removeClass(g.params.slideVisibleClass);for(var t=0;t<g.slides.length;t++){var r=g.slides[t],i=g.params.centeredSlides===!0?r.swiperSlideSize/2:0,n=(a-r.swiperSlideOffset-i)/(r.swiperSlideSize+g.params.spaceBetween);if(g.params.watchSlidesVisibility){var o=-(a-r.swiperSlideOffset-i),l=o+g.slidesSizesGrid[t],d=o>=0&&o<g.size||l>0&&l<=g.size||0>=o&&l>=g.size;d&&g.slides.eq(t).addClass(g.params.slideVisibleClass)}r.progress=g.rtl?-n:n}}},g.updateProgress=function(e){"undefined"==typeof e&&(e=g.translate||0);var a=g.maxTranslate()-g.minTranslate();0===a?(g.progress=0,g.isBeginning=g.isEnd=!0):(g.progress=(e-g.minTranslate())/a,g.isBeginning=g.progress<=0,g.isEnd=g.progress>=1),g.isBeginning&&g.emit("onReachBeginning",g),g.isEnd&&g.emit("onReachEnd",g),g.params.watchSlidesProgress&&g.updateSlidesProgress(e),g.emit("onProgress",g,g.progress)},g.updateActiveIndex=function(){var e,a,t,r=g.rtl?g.translate:-g.translate;for(a=0;a<g.slidesGrid.length;a++)"undefined"!=typeof g.slidesGrid[a+1]?r>=g.slidesGrid[a]&&r<g.slidesGrid[a+1]-(g.slidesGrid[a+1]-g.slidesGrid[a])/2?e=a:r>=g.slidesGrid[a]&&r<g.slidesGrid[a+1]&&(e=a+1):r>=g.slidesGrid[a]&&(e=a);(0>e||"undefined"==typeof e)&&(e=0),t=Math.floor(e/g.params.slidesPerGroup),t>=g.snapGrid.length&&(t=g.snapGrid.length-1),e!==g.activeIndex&&(g.snapIndex=t,g.previousIndex=g.activeIndex,g.activeIndex=e,g.updateClasses())},g.updateClasses=function(){g.slides.removeClass(g.params.slideActiveClass+" "+g.params.slideNextClass+" "+g.params.slidePrevClass);var e=g.slides.eq(g.activeIndex);if(e.addClass(g.params.slideActiveClass),e.next("."+g.params.slideClass).addClass(g.params.slideNextClass),e.prev("."+g.params.slideClass).addClass(g.params.slidePrevClass),g.bullets&&g.bullets.length>0){g.bullets.removeClass(g.params.bulletActiveClass);var a;g.params.loop?(a=Math.ceil(g.activeIndex-g.loopedSlides)/g.params.slidesPerGroup,a>g.slides.length-1-2*g.loopedSlides&&(a-=g.slides.length-2*g.loopedSlides),a>g.bullets.length-1&&(a-=g.bullets.length)):a="undefined"!=typeof g.snapIndex?g.snapIndex:g.activeIndex||0,g.paginationContainer.length>1?g.bullets.each(function(){v(this).index()===a&&v(this).addClass(g.params.bulletActiveClass)}):g.bullets.eq(a).addClass(g.params.bulletActiveClass)}g.params.loop||(g.params.prevButton&&(g.isBeginning?(v(g.params.prevButton).addClass(g.params.buttonDisabledClass),g.params.a11y&&g.a11y&&g.a11y.disable(v(g.params.prevButton))):(v(g.params.prevButton).removeClass(g.params.buttonDisabledClass),g.params.a11y&&g.a11y&&g.a11y.enable(v(g.params.prevButton)))),g.params.nextButton&&(g.isEnd?(v(g.params.nextButton).addClass(g.params.buttonDisabledClass),g.params.a11y&&g.a11y&&g.a11y.disable(v(g.params.nextButton))):(v(g.params.nextButton).removeClass(g.params.buttonDisabledClass),g.params.a11y&&g.a11y&&g.a11y.enable(v(g.params.nextButton)))))},g.updatePagination=function(){if(g.params.pagination&&g.paginationContainer&&g.paginationContainer.length>0){for(var e="",a=g.params.loop?Math.ceil((g.slides.length-2*g.loopedSlides)/g.params.slidesPerGroup):g.snapGrid.length,t=0;a>t;t++)e+=g.params.paginationBulletRender?g.params.paginationBulletRender(t,g.params.bulletClass):'<span class="'+g.params.bulletClass+'"></span>';g.paginationContainer.html(e),g.bullets=g.paginationContainer.find("."+g.params.bulletClass)}},g.update=function(e){function a(){r=Math.min(Math.max(g.translate,g.maxTranslate()),g.minTranslate()),g.setWrapperTranslate(r),g.updateActiveIndex(),g.updateClasses()}if(g.updateContainerSize(),g.updateSlidesSize(),g.updateProgress(),g.updatePagination(),g.updateClasses(),g.params.scrollbar&&g.scrollbar&&g.scrollbar.set(),e){var t,r;g.params.freeMode?a():(t="auto"===g.params.slidesPerView&&g.isEnd&&!g.params.centeredSlides?g.slideTo(g.slides.length-1,0,!1,!0):g.slideTo(g.activeIndex,0,!1,!0),t||a())}},g.onResize=function(e){if(g.updateContainerSize(),g.updateSlidesSize(),g.updateProgress(),("auto"===g.params.slidesPerView||g.params.freeMode||e)&&g.updatePagination(),g.params.scrollbar&&g.scrollbar&&g.scrollbar.set(),g.params.freeMode){var a=Math.min(Math.max(g.translate,g.maxTranslate()),g.minTranslate());g.setWrapperTranslate(a),g.updateActiveIndex(),g.updateClasses()}else g.updateClasses(),"auto"===g.params.slidesPerView&&g.isEnd&&!g.params.centeredSlides?g.slideTo(g.slides.length-1,0,!1,!0):g.slideTo(g.activeIndex,0,!1,!0)};var w=["mousedown","mousemove","mouseup"];window.navigator.pointerEnabled?w=["pointerdown","pointermove","pointerup"]:window.navigator.msPointerEnabled&&(w=["MSPointerDown","MSPointerMove","MSPointerUp"]),g.touchEvents={start:g.support.touch||!g.params.simulateTouch?"touchstart":w[0],move:g.support.touch||!g.params.simulateTouch?"touchmove":w[1],end:g.support.touch||!g.params.simulateTouch?"touchend":w[2]},(window.navigator.pointerEnabled||window.navigator.msPointerEnabled)&&("container"===g.params.touchEventsTarget?g.container:g.wrapper).addClass("swiper-wp8-"+g.params.direction),g.initEvents=function(e){var a=e?"off":"on",t=e?"removeEventListener":"addEventListener",s="container"===g.params.touchEventsTarget?g.container[0]:g.wrapper[0],i=g.support.touch?s:document,n=g.params.nested?!0:!1;g.browser.ie?(s[t](g.touchEvents.start,g.onTouchStart,!1),i[t](g.touchEvents.move,g.onTouchMove,n),i[t](g.touchEvents.end,g.onTouchEnd,!1)):(g.support.touch&&(s[t](g.touchEvents.start,g.onTouchStart,!1),s[t](g.touchEvents.move,g.onTouchMove,n),s[t](g.touchEvents.end,g.onTouchEnd,!1)),!r.simulateTouch||g.device.ios||g.device.android||(s[t]("mousedown",g.onTouchStart,!1),document[t]("mousemove",g.onTouchMove,n),document[t]("mouseup",g.onTouchEnd,!1))),window[t]("resize",g.onResize),g.params.nextButton&&(v(g.params.nextButton)[a]("click",g.onClickNext),g.params.a11y&&g.a11y&&v(g.params.nextButton)[a]("keydown",g.a11y.onEnterKey)),g.params.prevButton&&(v(g.params.prevButton)[a]("click",g.onClickPrev),g.params.a11y&&g.a11y&&v(g.params.prevButton)[a]("keydown",g.a11y.onEnterKey)),g.params.pagination&&g.params.paginationClickable&&v(g.paginationContainer)[a]("click","."+g.params.bulletClass,g.onClickIndex),(g.params.preventClicks||g.params.preventClicksPropagation)&&s[t]("click",g.preventClicks,!0)},g.attachEvents=function(e){g.initEvents()},g.detachEvents=function(){g.initEvents(!0)},g.allowClick=!0,g.preventClicks=function(e){g.allowClick||(g.params.preventClicks&&e.preventDefault(),g.params.preventClicksPropagation&&g.animating&&(e.stopPropagation(),e.stopImmediatePropagation()))},g.onClickNext=function(e){e.preventDefault(),g.slideNext()},g.onClickPrev=function(e){e.preventDefault(),g.slidePrev()},g.onClickIndex=function(e){e.preventDefault();var a=v(this).index()*g.params.slidesPerGroup;g.params.loop&&(a+=g.loopedSlides),g.slideTo(a)},g.updateClickedSlide=function(e){var a=n(e,"."+g.params.slideClass),t=!1;if(a)for(var r=0;r<g.slides.length;r++)g.slides[r]===a&&(t=!0);if(!a||!t)return g.clickedSlide=void 0,void(g.clickedIndex=void 0);if(g.clickedSlide=a,g.clickedIndex=v(a).index(),g.params.slideToClickedSlide&&void 0!==g.clickedIndex&&g.clickedIndex!==g.activeIndex){var s,i=g.clickedIndex;if(g.params.loop)if(s=v(g.clickedSlide).attr("data-swiper-slide-index"),i>g.slides.length-g.params.slidesPerView)g.fixLoop(),i=g.wrapper.children("."+g.params.slideClass+'[data-swiper-slide-index="'+s+'"]').eq(0).index(),setTimeout(function(){g.slideTo(i)},0);else if(i<g.params.slidesPerView-1){g.fixLoop();var o=g.wrapper.children("."+g.params.slideClass+'[data-swiper-slide-index="'+s+'"]');i=o.eq(o.length-1).index(),setTimeout(function(){g.slideTo(i)},0)}else g.slideTo(i);else g.slideTo(i)}};var y,b,x,T,S,C,M,E,z,P="input, select, textarea, button",I=Date.now(),k=[];g.animating=!1,g.touches={startX:0,startY:0,currentX:0,currentY:0,diff:0};var L,D;if(g.onTouchStart=function(e){if(e.originalEvent&&(e=e.originalEvent),L="touchstart"===e.type,L||!("which"in e)||3!==e.which){if(g.params.noSwiping&&n(e,"."+g.params.noSwipingClass))return void(g.allowClick=!0);if(!g.params.swipeHandler||n(e,g.params.swipeHandler)){if(y=!0,b=!1,T=void 0,D=void 0,g.touches.startX=g.touches.currentX="touchstart"===e.type?e.targetTouches[0].pageX:e.pageX,g.touches.startY=g.touches.currentY="touchstart"===e.type?e.targetTouches[0].pageY:e.pageY,x=Date.now(),g.allowClick=!0,g.updateContainerSize(),g.swipeDirection=void 0,g.params.threshold>0&&(M=!1),"touchstart"!==e.type){var a=!0;v(e.target).is(P)&&(a=!1),document.activeElement&&v(document.activeElement).is(P)&&document.activeElement.blur(),a&&e.preventDefault()}g.emit("onTouchStart",g,e)}}},g.onTouchMove=function(e){if(e.originalEvent&&(e=e.originalEvent),!(L&&"mousemove"===e.type||e.preventedByNestedSwiper)){if(g.params.onlyExternal)return b=!0,void(g.allowClick=!1);if(L&&document.activeElement&&e.target===document.activeElement&&v(e.target).is(P))return b=!0,void(g.allowClick=!1);if(g.emit("onTouchMove",g,e),!(e.targetTouches&&e.targetTouches.length>1)){if(g.touches.currentX="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,g.touches.currentY="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY,"undefined"==typeof T){var a=180*Math.atan2(Math.abs(g.touches.currentY-g.touches.startY),Math.abs(g.touches.currentX-g.touches.startX))/Math.PI;T=s()?a>g.params.touchAngle:90-a>g.params.touchAngle}if(T&&g.emit("onTouchMoveOpposite",g,e),"undefined"==typeof D&&g.browser.ieTouch&&(g.touches.currentX!==g.touches.startX||g.touches.currentY!==g.touches.startY)&&(D=!0),y){if(T)return void(y=!1);if(D||!g.browser.ieTouch){g.allowClick=!1,g.emit("onSliderMove",g,e),e.preventDefault(),g.params.touchMoveStopPropagation&&!g.params.nested&&e.stopPropagation(),b||(r.loop&&g.fixLoop(),C=g.getWrapperTranslate(),g.setWrapperTransition(0),g.animating&&g.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"),g.params.autoplay&&g.autoplaying&&(g.params.autoplayDisableOnInteraction?g.stopAutoplay():g.pauseAutoplay()),z=!1,g.params.grabCursor&&(g.container[0].style.cursor="move",g.container[0].style.cursor="-webkit-grabbing",g.container[0].style.cursor="-moz-grabbin",g.container[0].style.cursor="grabbing")),b=!0;var t=g.touches.diff=s()?g.touches.currentX-g.touches.startX:g.touches.currentY-g.touches.startY;t*=g.params.touchRatio,g.rtl&&(t=-t),g.swipeDirection=t>0?"prev":"next",S=t+C;var i=!0;if(t>0&&S>g.minTranslate()?(i=!1,g.params.resistance&&(S=g.minTranslate()-1+Math.pow(-g.minTranslate()+C+t,g.params.resistanceRatio))):0>t&&S<g.maxTranslate()&&(i=!1,g.params.resistance&&(S=g.maxTranslate()+1-Math.pow(g.maxTranslate()-C-t,g.params.resistanceRatio))),i&&(e.preventedByNestedSwiper=!0),!g.params.allowSwipeToNext&&"next"===g.swipeDirection&&C>S&&(S=C),!g.params.allowSwipeToPrev&&"prev"===g.swipeDirection&&S>C&&(S=C),g.params.followFinger){if(g.params.threshold>0){if(!(Math.abs(t)>g.params.threshold||M))return void(S=C);if(!M)return M=!0,g.touches.startX=g.touches.currentX,g.touches.startY=g.touches.currentY,S=C,void(g.touches.diff=s()?g.touches.currentX-g.touches.startX:g.touches.currentY-g.touches.startY)}(g.params.freeMode||g.params.watchSlidesProgress)&&g.updateActiveIndex(),g.params.freeMode&&(0===k.length&&k.push({position:g.touches[s()?"startX":"startY"],time:x}),k.push({position:g.touches[s()?"currentX":"currentY"],time:(new window.Date).getTime()})),g.updateProgress(S),g.setWrapperTranslate(S)}}}}}},g.onTouchEnd=function(e){if(e.originalEvent&&(e=e.originalEvent),g.emit("onTouchEnd",g,e),y){g.params.grabCursor&&b&&y&&(g.container[0].style.cursor="move",g.container[0].style.cursor="-webkit-grab",g.container[0].style.cursor="-moz-grab",g.container[0].style.cursor="grab");var a=Date.now(),t=a-x;if(g.allowClick&&(g.updateClickedSlide(e),g.emit("onTap",g,e),300>t&&a-I>300&&(E&&clearTimeout(E),E=setTimeout(function(){g&&(g.params.paginationHide&&g.paginationContainer.length>0&&!v(e.target).hasClass(g.params.bulletClass)&&g.paginationContainer.toggleClass(g.params.paginationHiddenClass),g.emit("onClick",g,e))},300)),300>t&&300>a-I&&(E&&clearTimeout(E),g.emit("onDoubleTap",g,e))),I=Date.now(),setTimeout(function(){g&&(g.allowClick=!0)},0),!y||!b||!g.swipeDirection||0===g.touches.diff||S===C)return void(y=b=!1);y=b=!1;var r;if(r=g.params.followFinger?g.rtl?g.translate:-g.translate:-S,g.params.freeMode){if(r<-g.minTranslate())return void g.slideTo(g.activeIndex);if(r>-g.maxTranslate())return void g.slideTo(g.slides.length<g.snapGrid.length?g.snapGrid.length-1:g.slides.length-1);if(g.params.freeModeMomentum){if(k.length>1){var s=k.pop(),i=k.pop(),n=s.position-i.position,o=s.time-i.time;g.velocity=n/o,g.velocity=g.velocity/2,Math.abs(g.velocity)<.02&&(g.velocity=0),(o>150||(new window.Date).getTime()-s.time>300)&&(g.velocity=0)}else g.velocity=0;k.length=0;var l=1e3*g.params.freeModeMomentumRatio,d=g.velocity*l,p=g.translate+d;g.rtl&&(p=-p);var u,c=!1,m=20*Math.abs(g.velocity)*g.params.freeModeMomentumBounceRatio;if(p<g.maxTranslate())g.params.freeModeMomentumBounce?(p+g.maxTranslate()<-m&&(p=g.maxTranslate()-m),u=g.maxTranslate(),c=!0,z=!0):p=g.maxTranslate();else if(p>g.minTranslate())g.params.freeModeMomentumBounce?(p-g.minTranslate()>m&&(p=g.minTranslate()+m),u=g.minTranslate(),c=!0,z=!0):p=g.minTranslate();else if(g.params.freeModeSticky){var f,h=0;for(h=0;h<g.snapGrid.length;h+=1)if(g.snapGrid[h]>-p){f=h;break}p=Math.abs(g.snapGrid[f]-p)<Math.abs(g.snapGrid[f-1]-p)||"next"===g.swipeDirection?g.snapGrid[f]:g.snapGrid[f-1],g.rtl||(p=-p)}if(0!==g.velocity)l=Math.abs(g.rtl?(-p-g.translate)/g.velocity:(p-g.translate)/g.velocity);else if(g.params.freeModeSticky)return void g.slideReset();g.params.freeModeMomentumBounce&&c?(g.updateProgress(u),g.setWrapperTransition(l),g.setWrapperTranslate(p),g.onTransitionStart(),g.animating=!0,g.wrapper.transitionEnd(function(){g&&z&&(g.emit("onMomentumBounce",g),g.setWrapperTransition(g.params.speed),g.setWrapperTranslate(u),g.wrapper.transitionEnd(function(){g&&g.onTransitionEnd()}))})):g.velocity?(g.updateProgress(p),g.setWrapperTransition(l),g.setWrapperTranslate(p),g.onTransitionStart(),g.animating||(g.animating=!0,g.wrapper.transitionEnd(function(){g&&g.onTransitionEnd()}))):g.updateProgress(p),g.updateActiveIndex()}return void((!g.params.freeModeMomentum||t>=g.params.longSwipesMs)&&(g.updateProgress(),g.updateActiveIndex()))}var w,T=0,M=g.slidesSizesGrid[0];for(w=0;w<g.slidesGrid.length;w+=g.params.slidesPerGroup)"undefined"!=typeof g.slidesGrid[w+g.params.slidesPerGroup]?r>=g.slidesGrid[w]&&r<g.slidesGrid[w+g.params.slidesPerGroup]&&(T=w,M=g.slidesGrid[w+g.params.slidesPerGroup]-g.slidesGrid[w]):r>=g.slidesGrid[w]&&(T=w,M=g.slidesGrid[g.slidesGrid.length-1]-g.slidesGrid[g.slidesGrid.length-2]);var P=(r-g.slidesGrid[T])/M;if(t>g.params.longSwipesMs){if(!g.params.longSwipes)return void g.slideTo(g.activeIndex);"next"===g.swipeDirection&&g.slideTo(P>=g.params.longSwipesRatio?T+g.params.slidesPerGroup:T),"prev"===g.swipeDirection&&g.slideTo(P>1-g.params.longSwipesRatio?T+g.params.slidesPerGroup:T)}else{if(!g.params.shortSwipes)return void g.slideTo(g.activeIndex);"next"===g.swipeDirection&&g.slideTo(T+g.params.slidesPerGroup),"prev"===g.swipeDirection&&g.slideTo(T)}}},g._slideTo=function(e,a){return g.slideTo(e,a,!0,!0)},g.slideTo=function(e,a,t,r){"undefined"==typeof t&&(t=!0),"undefined"==typeof e&&(e=0),0>e&&(e=0),g.snapIndex=Math.floor(e/g.params.slidesPerGroup),g.snapIndex>=g.snapGrid.length&&(g.snapIndex=g.snapGrid.length-1);var i=-g.snapGrid[g.snapIndex];if(!g.params.allowSwipeToNext&&i<g.translate&&i<g.minTranslate())return!1;if(!g.params.allowSwipeToPrev&&i>g.translate&&i>g.maxTranslate())return!1;g.params.autoplay&&g.autoplaying&&(r||!g.params.autoplayDisableOnInteraction?g.pauseAutoplay(a):g.stopAutoplay()),g.updateProgress(i);for(var n=0;n<g.slidesGrid.length;n++)-i>=g.slidesGrid[n]&&(e=n);if("undefined"==typeof a&&(a=g.params.speed),g.previousIndex=g.activeIndex||0,g.activeIndex=e,i===g.translate)return g.updateClasses(),!1;g.updateClasses(),g.onTransitionStart(t);s()?i:0,s()?0:i;return 0===a?(g.setWrapperTransition(0),g.setWrapperTranslate(i),g.onTransitionEnd(t)):(g.setWrapperTransition(a),g.setWrapperTranslate(i),g.animating||(g.animating=!0,g.wrapper.transitionEnd(function(){g&&g.onTransitionEnd(t)}))),!0},g.onTransitionStart=function(e){"undefined"==typeof e&&(e=!0),g.lazy&&g.lazy.onTransitionStart(),e&&(g.emit("onTransitionStart",g),g.activeIndex!==g.previousIndex&&g.emit("onSlideChangeStart",g))},g.onTransitionEnd=function(e){g.animating=!1,g.setWrapperTransition(0),"undefined"==typeof e&&(e=!0),g.lazy&&g.lazy.onTransitionEnd(),e&&(g.emit("onTransitionEnd",g),g.activeIndex!==g.previousIndex&&g.emit("onSlideChangeEnd",g)),g.params.hashnav&&g.hashnav&&g.hashnav.setHash()},g.slideNext=function(e,a,t){if(g.params.loop){if(g.animating)return!1;g.fixLoop();{g.container[0].clientLeft}return g.slideTo(g.activeIndex+g.params.slidesPerGroup,a,e,t)}return g.slideTo(g.activeIndex+g.params.slidesPerGroup,a,e,t)},g._slideNext=function(e){return g.slideNext(!0,e,!0)},g.slidePrev=function(e,a,t){if(g.params.loop){if(g.animating)return!1;g.fixLoop();{g.container[0].clientLeft}return g.slideTo(g.activeIndex-1,a,e,t)}return g.slideTo(g.activeIndex-1,a,e,t)},g._slidePrev=function(e){return g.slidePrev(!0,e,!0)},g.slideReset=function(e,a,t){return g.slideTo(g.activeIndex,a,e)},g.setWrapperTransition=function(e,a){g.wrapper.transition(e),"slide"!==g.params.effect&&g.effects[g.params.effect]&&g.effects[g.params.effect].setTransition(e),g.params.parallax&&g.parallax&&g.parallax.setTransition(e),g.params.scrollbar&&g.scrollbar&&g.scrollbar.setTransition(e),g.params.control&&g.controller&&g.controller.setTransition(e,a),g.emit("onSetTransition",g,e)},g.setWrapperTranslate=function(e,a,t){var r=0,i=0,n=0;s()?r=g.rtl?-e:e:i=e,g.params.virtualTranslate||g.wrapper.transform(g.support.transforms3d?"translate3d("+r+"px, "+i+"px, "+n+"px)":"translate("+r+"px, "+i+"px)"),
g.translate=s()?r:i,a&&g.updateActiveIndex(),"slide"!==g.params.effect&&g.effects[g.params.effect]&&g.effects[g.params.effect].setTranslate(g.translate),g.params.parallax&&g.parallax&&g.parallax.setTranslate(g.translate),g.params.scrollbar&&g.scrollbar&&g.scrollbar.setTranslate(g.translate),g.params.control&&g.controller&&g.controller.setTranslate(g.translate,t),g.emit("onSetTranslate",g,g.translate)},g.getTranslate=function(e,a){var t,r,s,i;return"undefined"==typeof a&&(a="x"),g.params.virtualTranslate?g.rtl?-g.translate:g.translate:(s=window.getComputedStyle(e,null),window.WebKitCSSMatrix?i=new window.WebKitCSSMatrix("none"===s.webkitTransform?"":s.webkitTransform):(i=s.MozTransform||s.OTransform||s.MsTransform||s.msTransform||s.transform||s.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),t=i.toString().split(",")),"x"===a&&(r=window.WebKitCSSMatrix?i.m41:parseFloat(16===t.length?t[12]:t[4])),"y"===a&&(r=window.WebKitCSSMatrix?i.m42:parseFloat(16===t.length?t[13]:t[5])),g.rtl&&r&&(r=-r),r||0)},g.getWrapperTranslate=function(e){return"undefined"==typeof e&&(e=s()?"x":"y"),g.getTranslate(g.wrapper[0],e)},g.observers=[],g.initObservers=function(){if(g.params.observeParents)for(var e=g.container.parents(),a=0;a<e.length;a++)o(e[a]);o(g.container[0],{childList:!1}),o(g.wrapper[0],{attributes:!1})},g.disconnectObservers=function(){for(var e=0;e<g.observers.length;e++)g.observers[e].disconnect();g.observers=[]},g.createLoop=function(){g.wrapper.children("."+g.params.slideClass+"."+g.params.slideDuplicateClass).remove();var e=g.wrapper.children("."+g.params.slideClass);g.loopedSlides=parseInt(g.params.loopedSlides||g.params.slidesPerView,10),g.loopedSlides=g.loopedSlides+g.params.loopAdditionalSlides,g.loopedSlides>e.length&&(g.loopedSlides=e.length);var a,t=[],r=[];for(e.each(function(a,s){var i=v(this);a<g.loopedSlides&&r.push(s),a<e.length&&a>=e.length-g.loopedSlides&&t.push(s),i.attr("data-swiper-slide-index",a)}),a=0;a<r.length;a++)g.wrapper.append(v(r[a].cloneNode(!0)).addClass(g.params.slideDuplicateClass));for(a=t.length-1;a>=0;a--)g.wrapper.prepend(v(t[a].cloneNode(!0)).addClass(g.params.slideDuplicateClass))},g.destroyLoop=function(){g.wrapper.children("."+g.params.slideClass+"."+g.params.slideDuplicateClass).remove(),g.slides.removeAttr("data-swiper-slide-index")},g.fixLoop=function(){var e;g.activeIndex<g.loopedSlides?(e=g.slides.length-3*g.loopedSlides+g.activeIndex,e+=g.loopedSlides,g.slideTo(e,0,!1,!0)):("auto"===g.params.slidesPerView&&g.activeIndex>=2*g.loopedSlides||g.activeIndex>g.slides.length-2*g.params.slidesPerView)&&(e=-g.slides.length+g.activeIndex+g.loopedSlides,e+=g.loopedSlides,g.slideTo(e,0,!1,!0))},g.appendSlide=function(e){if(g.params.loop&&g.destroyLoop(),"object"==typeof e&&e.length)for(var a=0;a<e.length;a++)e[a]&&g.wrapper.append(e[a]);else g.wrapper.append(e);g.params.loop&&g.createLoop(),g.params.observer&&g.support.observer||g.update(!0)},g.prependSlide=function(e){g.params.loop&&g.destroyLoop();var a=g.activeIndex+1;if("object"==typeof e&&e.length){for(var t=0;t<e.length;t++)e[t]&&g.wrapper.prepend(e[t]);a=g.activeIndex+e.length}else g.wrapper.prepend(e);g.params.loop&&g.createLoop(),g.params.observer&&g.support.observer||g.update(!0),g.slideTo(a,0,!1)},g.removeSlide=function(e){g.params.loop&&(g.destroyLoop(),g.slides=g.wrapper.children("."+g.params.slideClass));var a,t=g.activeIndex;if("object"==typeof e&&e.length){for(var r=0;r<e.length;r++)a=e[r],g.slides[a]&&g.slides.eq(a).remove(),t>a&&t--;t=Math.max(t,0)}else a=e,g.slides[a]&&g.slides.eq(a).remove(),t>a&&t--,t=Math.max(t,0);g.params.loop&&g.createLoop(),g.params.observer&&g.support.observer||g.update(!0),g.params.loop?g.slideTo(t+g.loopedSlides,0,!1):g.slideTo(t,0,!1)},g.removeAllSlides=function(){for(var e=[],a=0;a<g.slides.length;a++)e.push(a);g.removeSlide(e)},g.effects={fade:{setTranslate:function(){for(var e=0;e<g.slides.length;e++){var a=g.slides.eq(e),t=a[0].swiperSlideOffset,r=-t;g.params.virtualTranslate||(r-=g.translate);var i=0;s()||(i=r,r=0);var n=g.params.fade.crossFade?Math.max(1-Math.abs(a[0].progress),0):1+Math.min(Math.max(a[0].progress,-1),0);a.css({opacity:n}).transform("translate3d("+r+"px, "+i+"px, 0px)")}},setTransition:function(e){if(g.slides.transition(e),g.params.virtualTranslate&&0!==e){var a=!1;g.slides.transitionEnd(function(){if(!a&&g){a=!0,g.animating=!1;for(var e=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],t=0;t<e.length;t++)g.wrapper.trigger(e[t])}})}}},cube:{setTranslate:function(){var e,a=0;g.params.cube.shadow&&(s()?(e=g.wrapper.find(".swiper-cube-shadow"),0===e.length&&(e=v('<div class="swiper-cube-shadow"></div>'),g.wrapper.append(e)),e.css({height:g.width+"px"})):(e=g.container.find(".swiper-cube-shadow"),0===e.length&&(e=v('<div class="swiper-cube-shadow"></div>'),g.container.append(e))));for(var t=0;t<g.slides.length;t++){var r=g.slides.eq(t),i=90*t,n=Math.floor(i/360);g.rtl&&(i=-i,n=Math.floor(-i/360));var o=Math.max(Math.min(r[0].progress,1),-1),l=0,d=0,p=0;t%4===0?(l=4*-n*g.size,p=0):(t-1)%4===0?(l=0,p=4*-n*g.size):(t-2)%4===0?(l=g.size+4*n*g.size,p=g.size):(t-3)%4===0&&(l=-g.size,p=3*g.size+4*g.size*n),g.rtl&&(l=-l),s()||(d=l,l=0);var u="rotateX("+(s()?0:-i)+"deg) rotateY("+(s()?i:0)+"deg) translate3d("+l+"px, "+d+"px, "+p+"px)";if(1>=o&&o>-1&&(a=90*t+90*o,g.rtl&&(a=90*-t-90*o)),r.transform(u),g.params.cube.slideShadows){var c=r.find(s()?".swiper-slide-shadow-left":".swiper-slide-shadow-top"),m=r.find(s()?".swiper-slide-shadow-right":".swiper-slide-shadow-bottom");0===c.length&&(c=v('<div class="swiper-slide-shadow-'+(s()?"left":"top")+'"></div>'),r.append(c)),0===m.length&&(m=v('<div class="swiper-slide-shadow-'+(s()?"right":"bottom")+'"></div>'),r.append(m));{r[0].progress}c.length&&(c[0].style.opacity=-r[0].progress),m.length&&(m[0].style.opacity=r[0].progress)}}if(g.wrapper.css({"-webkit-transform-origin":"50% 50% -"+g.size/2+"px","-moz-transform-origin":"50% 50% -"+g.size/2+"px","-ms-transform-origin":"50% 50% -"+g.size/2+"px","transform-origin":"50% 50% -"+g.size/2+"px"}),g.params.cube.shadow)if(s())e.transform("translate3d(0px, "+(g.width/2+g.params.cube.shadowOffset)+"px, "+-g.width/2+"px) rotateX(90deg) rotateZ(0deg) scale("+g.params.cube.shadowScale+")");else{var f=Math.abs(a)-90*Math.floor(Math.abs(a)/90),h=1.5-(Math.sin(2*f*Math.PI/360)/2+Math.cos(2*f*Math.PI/360)/2),w=g.params.cube.shadowScale,y=g.params.cube.shadowScale/h,b=g.params.cube.shadowOffset;e.transform("scale3d("+w+", 1, "+y+") translate3d(0px, "+(g.height/2+b)+"px, "+-g.height/2/y+"px) rotateX(-90deg)")}var x=g.isSafari||g.isUiWebView?-g.size/2:0;g.wrapper.transform("translate3d(0px,0,"+x+"px) rotateX("+(s()?0:a)+"deg) rotateY("+(s()?-a:0)+"deg)")},setTransition:function(e){g.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),g.params.cube.shadow&&!s()&&g.container.find(".swiper-cube-shadow").transition(e)}},coverflow:{setTranslate:function(){for(var e=g.translate,a=s()?-e+g.width/2:-e+g.height/2,t=s()?g.params.coverflow.rotate:-g.params.coverflow.rotate,r=g.params.coverflow.depth,i=0,n=g.slides.length;n>i;i++){var o=g.slides.eq(i),l=g.slidesSizesGrid[i],d=o[0].swiperSlideOffset,p=(a-d-l/2)/l*g.params.coverflow.modifier,u=s()?t*p:0,c=s()?0:t*p,m=-r*Math.abs(p),f=s()?0:g.params.coverflow.stretch*p,h=s()?g.params.coverflow.stretch*p:0;Math.abs(h)<.001&&(h=0),Math.abs(f)<.001&&(f=0),Math.abs(m)<.001&&(m=0),Math.abs(u)<.001&&(u=0),Math.abs(c)<.001&&(c=0);var w="translate3d("+h+"px,"+f+"px,"+m+"px)  rotateX("+c+"deg) rotateY("+u+"deg)";if(o.transform(w),o[0].style.zIndex=-Math.abs(Math.round(p))+1,g.params.coverflow.slideShadows){var y=o.find(s()?".swiper-slide-shadow-left":".swiper-slide-shadow-top"),b=o.find(s()?".swiper-slide-shadow-right":".swiper-slide-shadow-bottom");0===y.length&&(y=v('<div class="swiper-slide-shadow-'+(s()?"left":"top")+'"></div>'),o.append(y)),0===b.length&&(b=v('<div class="swiper-slide-shadow-'+(s()?"right":"bottom")+'"></div>'),o.append(b)),y.length&&(y[0].style.opacity=p>0?p:0),b.length&&(b[0].style.opacity=-p>0?-p:0)}}if(g.browser.ie){var x=g.wrapper[0].style;x.perspectiveOrigin=a+"px 50%"}},setTransition:function(e){g.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)}}},g.lazy={initialImageLoaded:!1,loadImageInSlide:function(e,a){if("undefined"!=typeof e&&("undefined"==typeof a&&(a=!0),0!==g.slides.length)){var t=g.slides.eq(e),r=t.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");!t.hasClass("swiper-lazy")||t.hasClass("swiper-lazy-loaded")||t.hasClass("swiper-lazy-loading")||r.add(t[0]),0!==r.length&&r.each(function(){var e=v(this);e.addClass("swiper-lazy-loading");var r=e.attr("data-background"),s=e.attr("data-src");g.loadImage(e[0],s||r,!1,function(){if(r?(e.css("background-image","url("+r+")"),e.removeAttr("data-background")):(e.attr("src",s),e.removeAttr("data-src")),e.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"),t.find(".swiper-lazy-preloader, .preloader").remove(),g.params.loop&&a){var i=t.attr("data-swiper-slide-index");if(t.hasClass(g.params.slideDuplicateClass)){var n=g.wrapper.children('[data-swiper-slide-index="'+i+'"]:not(.'+g.params.slideDuplicateClass+")");g.lazy.loadImageInSlide(n.index(),!1)}else{var o=g.wrapper.children("."+g.params.slideDuplicateClass+'[data-swiper-slide-index="'+i+'"]');g.lazy.loadImageInSlide(o.index(),!1)}}g.emit("onLazyImageReady",g,t[0],e[0])}),g.emit("onLazyImageLoad",g,t[0],e[0])})}},load:function(){var e;if(g.params.watchSlidesVisibility)g.wrapper.children("."+g.params.slideVisibleClass).each(function(){g.lazy.loadImageInSlide(v(this).index())});else if(g.params.slidesPerView>1)for(e=g.activeIndex;e<g.activeIndex+g.params.slidesPerView;e++)g.slides[e]&&g.lazy.loadImageInSlide(e);else g.lazy.loadImageInSlide(g.activeIndex);if(g.params.lazyLoadingInPrevNext)if(g.params.slidesPerView>1){for(e=g.activeIndex+g.params.slidesPerView;e<g.activeIndex+g.params.slidesPerView+g.params.slidesPerView;e++)g.slides[e]&&g.lazy.loadImageInSlide(e);for(e=g.activeIndex-g.params.slidesPerView;e<g.activeIndex;e++)g.slides[e]&&g.lazy.loadImageInSlide(e)}else{var a=g.wrapper.children("."+g.params.slideNextClass);a.length>0&&g.lazy.loadImageInSlide(a.index());var t=g.wrapper.children("."+g.params.slidePrevClass);t.length>0&&g.lazy.loadImageInSlide(t.index())}},onTransitionStart:function(){g.params.lazyLoading&&(g.params.lazyLoadingOnTransitionStart||!g.params.lazyLoadingOnTransitionStart&&!g.lazy.initialImageLoaded)&&g.lazy.load()},onTransitionEnd:function(){g.params.lazyLoading&&!g.params.lazyLoadingOnTransitionStart&&g.lazy.load()}},g.scrollbar={set:function(){if(g.params.scrollbar){var e=g.scrollbar;e.track=v(g.params.scrollbar),e.drag=e.track.find(".swiper-scrollbar-drag"),0===e.drag.length&&(e.drag=v('<div class="swiper-scrollbar-drag"></div>'),e.track.append(e.drag)),e.drag[0].style.width="",e.drag[0].style.height="",e.trackSize=s()?e.track[0].offsetWidth:e.track[0].offsetHeight,e.divider=g.size/g.virtualSize,e.moveDivider=e.divider*(e.trackSize/g.size),e.dragSize=e.trackSize*e.divider,s()?e.drag[0].style.width=e.dragSize+"px":e.drag[0].style.height=e.dragSize+"px",e.track[0].style.display=e.divider>=1?"none":"",g.params.scrollbarHide&&(e.track[0].style.opacity=0)}},setTranslate:function(){if(g.params.scrollbar){var e,a=g.scrollbar,t=(g.translate||0,a.dragSize);e=(a.trackSize-a.dragSize)*g.progress,g.rtl&&s()?(e=-e,e>0?(t=a.dragSize-e,e=0):-e+a.dragSize>a.trackSize&&(t=a.trackSize+e)):0>e?(t=a.dragSize+e,e=0):e+a.dragSize>a.trackSize&&(t=a.trackSize-e),s()?(a.drag.transform(g.support.transforms3d?"translate3d("+e+"px, 0, 0)":"translateX("+e+"px)"),a.drag[0].style.width=t+"px"):(a.drag.transform(g.support.transforms3d?"translate3d(0px, "+e+"px, 0)":"translateY("+e+"px)"),a.drag[0].style.height=t+"px"),g.params.scrollbarHide&&(clearTimeout(a.timeout),a.track[0].style.opacity=1,a.timeout=setTimeout(function(){a.track[0].style.opacity=0,a.track.transition(400)},1e3))}},setTransition:function(e){g.params.scrollbar&&g.scrollbar.drag.transition(e)}},g.controller={setTranslate:function(e,t){function r(a){e=a.rtl&&"horizontal"===a.params.direction?-g.translate:g.translate,s=(a.maxTranslate()-a.minTranslate())/(g.maxTranslate()-g.minTranslate()),i=(e-g.minTranslate())*s+a.minTranslate(),g.params.controlInverse&&(i=a.maxTranslate()-i),a.updateProgress(i),a.setWrapperTranslate(i,!1,g),a.updateActiveIndex()}var s,i,n=g.params.control;if(g.isArray(n))for(var o=0;o<n.length;o++)n[o]!==t&&n[o]instanceof a&&r(n[o]);else n instanceof a&&t!==n&&r(n)},setTransition:function(e,t){function r(a){a.setWrapperTransition(e,g),0!==e&&(a.onTransitionStart(),a.wrapper.transitionEnd(function(){i&&a.onTransitionEnd()}))}var s,i=g.params.control;if(g.isArray(i))for(s=0;s<i.length;s++)i[s]!==t&&i[s]instanceof a&&r(i[s]);else i instanceof a&&t!==i&&r(i)}},g.hashnav={init:function(){if(g.params.hashnav){g.hashnav.initialized=!0;var e=document.location.hash.replace("#","");if(e)for(var a=0,t=0,r=g.slides.length;r>t;t++){var s=g.slides.eq(t),i=s.attr("data-hash");if(i===e&&!s.hasClass(g.params.slideDuplicateClass)){var n=s.index();g.slideTo(n,a,g.params.runCallbacksOnInit,!0)}}}},setHash:function(){g.hashnav.initialized&&g.params.hashnav&&(document.location.hash=g.slides.eq(g.activeIndex).attr("data-hash")||"")}},g.disableKeyboardControl=function(){v(document).off("keydown",l)},g.enableKeyboardControl=function(){v(document).on("keydown",l)},g.mousewheel={event:!1,lastScrollTime:(new window.Date).getTime()},g.params.mousewheelControl){if(void 0!==document.onmousewheel&&(g.mousewheel.event="mousewheel"),!g.mousewheel.event)try{new window.WheelEvent("wheel"),g.mousewheel.event="wheel"}catch(G){}g.mousewheel.event||(g.mousewheel.event="DOMMouseScroll")}g.disableMousewheelControl=function(){return g.mousewheel.event?(g.container.off(g.mousewheel.event,d),!0):!1},g.enableMousewheelControl=function(){return g.mousewheel.event?(g.container.on(g.mousewheel.event,d),!0):!1},g.parallax={setTranslate:function(){g.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){p(this,g.progress)}),g.slides.each(function(){var e=v(this);e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){var a=Math.min(Math.max(e[0].progress,-1),1);p(this,a)})})},setTransition:function(e){"undefined"==typeof e&&(e=g.params.speed),g.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){var a=v(this),t=parseInt(a.attr("data-swiper-parallax-duration"),10)||e;0===e&&(t=0),a.transition(t)})}},g._plugins=[];for(var B in g.plugins){var A=g.plugins[B](g,g.params[B]);A&&g._plugins.push(A)}return g.callPlugins=function(e){for(var a=0;a<g._plugins.length;a++)e in g._plugins[a]&&g._plugins[a][e](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},g.emitterEventListeners={},g.emit=function(e){g.params[e]&&g.params[e](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);var a;if(g.emitterEventListeners[e])for(a=0;a<g.emitterEventListeners[e].length;a++)g.emitterEventListeners[e][a](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);g.callPlugins&&g.callPlugins(e,arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},g.on=function(e,a){return e=u(e),g.emitterEventListeners[e]||(g.emitterEventListeners[e]=[]),g.emitterEventListeners[e].push(a),g},g.off=function(e,a){var t;if(e=u(e),"undefined"==typeof a)return g.emitterEventListeners[e]=[],g;if(g.emitterEventListeners[e]&&0!==g.emitterEventListeners[e].length){for(t=0;t<g.emitterEventListeners[e].length;t++)g.emitterEventListeners[e][t]===a&&g.emitterEventListeners[e].splice(t,1);return g}},g.once=function(e,a){e=u(e);var t=function(){a(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]),g.off(e,t)};return g.on(e,t),g},g.a11y={makeFocusable:function(e){return e[0].tabIndex="0",e},addRole:function(e,a){return e.attr("role",a),e},addLabel:function(e,a){return e.attr("aria-label",a),e},disable:function(e){return e.attr("aria-disabled",!0),e},enable:function(e){return e.attr("aria-disabled",!1),e},onEnterKey:function(e){13===e.keyCode&&(v(e.target).is(g.params.nextButton)?(g.onClickNext(e),g.a11y.notify(g.isEnd?g.params.lastSlideMsg:g.params.nextSlideMsg)):v(e.target).is(g.params.prevButton)&&(g.onClickPrev(e),g.a11y.notify(g.isBeginning?g.params.firstSlideMsg:g.params.prevSlideMsg)))},liveRegion:v('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),notify:function(e){var a=g.a11y.liveRegion;0!==a.length&&(a.html(""),a.html(e))},init:function(){if(g.params.nextButton){var e=v(g.params.nextButton);g.a11y.makeFocusable(e),g.a11y.addRole(e,"button"),g.a11y.addLabel(e,g.params.nextSlideMsg)}if(g.params.prevButton){var a=v(g.params.prevButton);g.a11y.makeFocusable(a),g.a11y.addRole(a,"button"),g.a11y.addLabel(a,g.params.prevSlideMsg)}v(g.container).append(g.a11y.liveRegion)},destroy:function(){g.a11y.liveRegion&&g.a11y.liveRegion.length>0&&g.a11y.liveRegion.remove()}},g.init=function(){g.params.loop&&g.createLoop(),g.updateContainerSize(),g.updateSlidesSize(),g.updatePagination(),g.params.scrollbar&&g.scrollbar&&g.scrollbar.set(),"slide"!==g.params.effect&&g.effects[g.params.effect]&&(g.params.loop||g.updateProgress(),g.effects[g.params.effect].setTranslate()),g.params.loop?g.slideTo(g.params.initialSlide+g.loopedSlides,0,g.params.runCallbacksOnInit):(g.slideTo(g.params.initialSlide,0,g.params.runCallbacksOnInit),0===g.params.initialSlide&&(g.parallax&&g.params.parallax&&g.parallax.setTranslate(),g.lazy&&g.params.lazyLoading&&(g.lazy.load(),g.lazy.initialImageLoaded=!0))),g.attachEvents(),g.params.observer&&g.support.observer&&g.initObservers(),g.params.preloadImages&&!g.params.lazyLoading&&g.preloadImages(),g.params.autoplay&&g.startAutoplay(),g.params.keyboardControl&&g.enableKeyboardControl&&g.enableKeyboardControl(),g.params.mousewheelControl&&g.enableMousewheelControl&&g.enableMousewheelControl(),g.params.hashnav&&g.hashnav&&g.hashnav.init(),g.params.a11y&&g.a11y&&g.a11y.init(),g.emit("onInit",g)},g.cleanupStyles=function(){g.container.removeClass(g.classNames.join(" ")).removeAttr("style"),g.wrapper.removeAttr("style"),g.slides&&g.slides.length&&g.slides.removeClass([g.params.slideVisibleClass,g.params.slideActiveClass,g.params.slideNextClass,g.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"),g.paginationContainer&&g.paginationContainer.length&&g.paginationContainer.removeClass(g.params.paginationHiddenClass),g.bullets&&g.bullets.length&&g.bullets.removeClass(g.params.bulletActiveClass),g.params.prevButton&&v(g.params.prevButton).removeClass(g.params.buttonDisabledClass),g.params.nextButton&&v(g.params.nextButton).removeClass(g.params.buttonDisabledClass),g.params.scrollbar&&g.scrollbar&&(g.scrollbar.track&&g.scrollbar.track.length&&g.scrollbar.track.removeAttr("style"),g.scrollbar.drag&&g.scrollbar.drag.length&&g.scrollbar.drag.removeAttr("style"))},g.destroy=function(e,a){g.detachEvents(),g.stopAutoplay(),g.params.loop&&g.destroyLoop(),a&&g.cleanupStyles(),g.disconnectObservers(),g.params.keyboardControl&&g.disableKeyboardControl&&g.disableKeyboardControl(),g.params.mousewheelControl&&g.disableMousewheelControl&&g.disableMousewheelControl(),g.params.a11y&&g.a11y&&g.a11y.destroy(),g.emit("onDestroy"),e!==!1&&(g=null)},g.init(),g}};a.prototype={isSafari:function(){var e=navigator.userAgent.toLowerCase();return e.indexOf("safari")>=0&&e.indexOf("chrome")<0&&e.indexOf("android")<0}(),isUiWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),isArray:function(e){return"[object Array]"===Object.prototype.toString.apply(e)},browser:{ie:window.navigator.pointerEnabled||window.navigator.msPointerEnabled,ieTouch:window.navigator.msPointerEnabled&&window.navigator.msMaxTouchPoints>1||window.navigator.pointerEnabled&&window.navigator.maxTouchPoints>1},device:function(){var e=navigator.userAgent,a=e.match(/(Android);?[\s\/]+([\d.]+)?/),t=e.match(/(iPad).*OS\s([\d_]+)/),r=(e.match(/(iPod)(.*OS\s([\d_]+))?/),!t&&e.match(/(iPhone\sOS)\s([\d_]+)/));return{ios:t||r||t,android:a}}(),support:{touch:window.Modernizr&&Modernizr.touch===!0||function(){return!!("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch)}(),transforms3d:window.Modernizr&&Modernizr.csstransforms3d===!0||function(){var e=document.createElement("div").style;return"webkitPerspective"in e||"MozPerspective"in e||"OPerspective"in e||"MsPerspective"in e||"perspective"in e}(),flexbox:function(){for(var e=document.createElement("div").style,a="alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "),t=0;t<a.length;t++)if(a[t]in e)return!0}(),observer:function(){return"MutationObserver"in window||"WebkitMutationObserver"in window}()},plugins:{}};for(var t=(function(){var e=function(e){var a=this,t=0;for(t=0;t<e.length;t++)a[t]=e[t];return a.length=e.length,this},a=function(a,t){var r=[],s=0;if(a&&!t&&a instanceof e)return a;if(a)if("string"==typeof a){var i,n,o=a.trim();if(o.indexOf("<")>=0&&o.indexOf(">")>=0){var l="div";for(0===o.indexOf("<li")&&(l="ul"),0===o.indexOf("<tr")&&(l="tbody"),(0===o.indexOf("<td")||0===o.indexOf("<th"))&&(l="tr"),0===o.indexOf("<tbody")&&(l="table"),0===o.indexOf("<option")&&(l="select"),n=document.createElement(l),n.innerHTML=a,s=0;s<n.childNodes.length;s++)r.push(n.childNodes[s])}else for(i=t||"#"!==a[0]||a.match(/[ .<>:~]/)?(t||document).querySelectorAll(a):[document.getElementById(a.split("#")[1])],s=0;s<i.length;s++)i[s]&&r.push(i[s])}else if(a.nodeType||a===window||a===document)r.push(a);else if(a.length>0&&a[0].nodeType)for(s=0;s<a.length;s++)r.push(a[s]);return new e(r)};return e.prototype={addClass:function(e){if("undefined"==typeof e)return this;for(var a=e.split(" "),t=0;t<a.length;t++)for(var r=0;r<this.length;r++)this[r].classList.add(a[t]);return this},removeClass:function(e){for(var a=e.split(" "),t=0;t<a.length;t++)for(var r=0;r<this.length;r++)this[r].classList.remove(a[t]);return this},hasClass:function(e){return this[0]?this[0].classList.contains(e):!1},toggleClass:function(e){for(var a=e.split(" "),t=0;t<a.length;t++)for(var r=0;r<this.length;r++)this[r].classList.toggle(a[t]);return this},attr:function(e,a){if(1===arguments.length&&"string"==typeof e)return this[0]?this[0].getAttribute(e):void 0;for(var t=0;t<this.length;t++)if(2===arguments.length)this[t].setAttribute(e,a);else for(var r in e)this[t][r]=e[r],this[t].setAttribute(r,e[r]);return this},removeAttr:function(e){for(var a=0;a<this.length;a++)this[a].removeAttribute(e);return this},data:function(e,a){if("undefined"==typeof a){if(this[0]){var t=this[0].getAttribute("data-"+e);return t?t:this[0].dom7ElementDataStorage&&e in this[0].dom7ElementDataStorage?this[0].dom7ElementDataStorage[e]:void 0}return void 0}for(var r=0;r<this.length;r++){var s=this[r];s.dom7ElementDataStorage||(s.dom7ElementDataStorage={}),s.dom7ElementDataStorage[e]=a}return this},transform:function(e){for(var a=0;a<this.length;a++){var t=this[a].style;t.webkitTransform=t.MsTransform=t.msTransform=t.MozTransform=t.OTransform=t.transform=e}return this},transition:function(e){"string"!=typeof e&&(e+="ms");for(var a=0;a<this.length;a++){var t=this[a].style;t.webkitTransitionDuration=t.MsTransitionDuration=t.msTransitionDuration=t.MozTransitionDuration=t.OTransitionDuration=t.transitionDuration=e}return this},on:function(e,t,r,s){function i(e){var s=e.target;if(a(s).is(t))r.call(s,e);else for(var i=a(s).parents(),n=0;n<i.length;n++)a(i[n]).is(t)&&r.call(i[n],e)}var n,o,l=e.split(" ");for(n=0;n<this.length;n++)if("function"==typeof t||t===!1)for("function"==typeof t&&(r=arguments[1],s=arguments[2]||!1),o=0;o<l.length;o++)this[n].addEventListener(l[o],r,s);else for(o=0;o<l.length;o++)this[n].dom7LiveListeners||(this[n].dom7LiveListeners=[]),this[n].dom7LiveListeners.push({listener:r,liveListener:i}),this[n].addEventListener(l[o],i,s);return this},off:function(e,a,t,r){for(var s=e.split(" "),i=0;i<s.length;i++)for(var n=0;n<this.length;n++)if("function"==typeof a||a===!1)"function"==typeof a&&(t=arguments[1],r=arguments[2]||!1),this[n].removeEventListener(s[i],t,r);else if(this[n].dom7LiveListeners)for(var o=0;o<this[n].dom7LiveListeners.length;o++)this[n].dom7LiveListeners[o].listener===t&&this[n].removeEventListener(s[i],this[n].dom7LiveListeners[o].liveListener,r);return this},once:function(e,a,t,r){function s(n){t(n),i.off(e,a,s,r)}var i=this;"function"==typeof a&&(a=!1,t=arguments[1],r=arguments[2]),i.on(e,a,s,r)},trigger:function(e,a){for(var t=0;t<this.length;t++){var r;try{r=new window.CustomEvent(e,{detail:a,bubbles:!0,cancelable:!0})}catch(s){r=document.createEvent("Event"),r.initEvent(e,!0,!0),r.detail=a}this[t].dispatchEvent(r)}return this},transitionEnd:function(e){function a(i){if(i.target===this)for(e.call(this,i),t=0;t<r.length;t++)s.off(r[t],a)}var t,r=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],s=this;if(e)for(t=0;t<r.length;t++)s.on(r[t],a);return this},width:function(){return this[0]===window?window.innerWidth:this.length>0?parseFloat(this.css("width")):null},outerWidth:function(e){return this.length>0?e?this[0].offsetWidth+parseFloat(this.css("margin-right"))+parseFloat(this.css("margin-left")):this[0].offsetWidth:null},height:function(){return this[0]===window?window.innerHeight:this.length>0?parseFloat(this.css("height")):null},outerHeight:function(e){return this.length>0?e?this[0].offsetHeight+parseFloat(this.css("margin-top"))+parseFloat(this.css("margin-bottom")):this[0].offsetHeight:null},offset:function(){if(this.length>0){var e=this[0],a=e.getBoundingClientRect(),t=document.body,r=e.clientTop||t.clientTop||0,s=e.clientLeft||t.clientLeft||0,i=window.pageYOffset||e.scrollTop,n=window.pageXOffset||e.scrollLeft;return{top:a.top+i-r,left:a.left+n-s}}return null},css:function(e,a){var t;if(1===arguments.length){if("string"!=typeof e){for(t=0;t<this.length;t++)for(var r in e)this[t].style[r]=e[r];return this}if(this[0])return window.getComputedStyle(this[0],null).getPropertyValue(e)}if(2===arguments.length&&"string"==typeof e){for(t=0;t<this.length;t++)this[t].style[e]=a;return this}return this},each:function(e){for(var a=0;a<this.length;a++)e.call(this[a],a,this[a]);return this},html:function(e){if("undefined"==typeof e)return this[0]?this[0].innerHTML:void 0;for(var a=0;a<this.length;a++)this[a].innerHTML=e;return this},is:function(t){if(!this[0])return!1;var r,s;if("string"==typeof t){var i=this[0];if(i===document)return t===document;if(i===window)return t===window;if(i.matches)return i.matches(t);if(i.webkitMatchesSelector)return i.webkitMatchesSelector(t);if(i.mozMatchesSelector)return i.mozMatchesSelector(t);if(i.msMatchesSelector)return i.msMatchesSelector(t);for(r=a(t),s=0;s<r.length;s++)if(r[s]===this[0])return!0;return!1}if(t===document)return this[0]===document;if(t===window)return this[0]===window;if(t.nodeType||t instanceof e){for(r=t.nodeType?[t]:t,s=0;s<r.length;s++)if(r[s]===this[0])return!0;return!1}return!1},index:function(){if(this[0]){for(var e=this[0],a=0;null!==(e=e.previousSibling);)1===e.nodeType&&a++;return a}return void 0},eq:function(a){if("undefined"==typeof a)return this;var t,r=this.length;return a>r-1?new e([]):0>a?(t=r+a,new e(0>t?[]:[this[t]])):new e([this[a]])},append:function(a){var t,r;for(t=0;t<this.length;t++)if("string"==typeof a){var s=document.createElement("div");for(s.innerHTML=a;s.firstChild;)this[t].appendChild(s.firstChild)}else if(a instanceof e)for(r=0;r<a.length;r++)this[t].appendChild(a[r]);else this[t].appendChild(a);return this},prepend:function(a){var t,r;for(t=0;t<this.length;t++)if("string"==typeof a){var s=document.createElement("div");for(s.innerHTML=a,r=s.childNodes.length-1;r>=0;r--)this[t].insertBefore(s.childNodes[r],this[t].childNodes[0])}else if(a instanceof e)for(r=0;r<a.length;r++)this[t].insertBefore(a[r],this[t].childNodes[0]);else this[t].insertBefore(a,this[t].childNodes[0]);return this},insertBefore:function(e){for(var t=a(e),r=0;r<this.length;r++)if(1===t.length)t[0].parentNode.insertBefore(this[r],t[0]);else if(t.length>1)for(var s=0;s<t.length;s++)t[s].parentNode.insertBefore(this[r].cloneNode(!0),t[s])},insertAfter:function(e){for(var t=a(e),r=0;r<this.length;r++)if(1===t.length)t[0].parentNode.insertBefore(this[r],t[0].nextSibling);else if(t.length>1)for(var s=0;s<t.length;s++)t[s].parentNode.insertBefore(this[r].cloneNode(!0),t[s].nextSibling)},next:function(t){return new e(this.length>0?t?this[0].nextElementSibling&&a(this[0].nextElementSibling).is(t)?[this[0].nextElementSibling]:[]:this[0].nextElementSibling?[this[0].nextElementSibling]:[]:[])},nextAll:function(t){var r=[],s=this[0];if(!s)return new e([]);for(;s.nextElementSibling;){var i=s.nextElementSibling;t?a(i).is(t)&&r.push(i):r.push(i),s=i}return new e(r)},prev:function(t){return new e(this.length>0?t?this[0].previousElementSibling&&a(this[0].previousElementSibling).is(t)?[this[0].previousElementSibling]:[]:this[0].previousElementSibling?[this[0].previousElementSibling]:[]:[])},prevAll:function(t){var r=[],s=this[0];if(!s)return new e([]);for(;s.previousElementSibling;){var i=s.previousElementSibling;t?a(i).is(t)&&r.push(i):r.push(i),s=i}return new e(r)},parent:function(e){for(var t=[],r=0;r<this.length;r++)e?a(this[r].parentNode).is(e)&&t.push(this[r].parentNode):t.push(this[r].parentNode);return a(a.unique(t))},parents:function(e){for(var t=[],r=0;r<this.length;r++)for(var s=this[r].parentNode;s;)e?a(s).is(e)&&t.push(s):t.push(s),s=s.parentNode;return a(a.unique(t))},find:function(a){for(var t=[],r=0;r<this.length;r++)for(var s=this[r].querySelectorAll(a),i=0;i<s.length;i++)t.push(s[i]);return new e(t)},children:function(t){for(var r=[],s=0;s<this.length;s++)for(var i=this[s].childNodes,n=0;n<i.length;n++)t?1===i[n].nodeType&&a(i[n]).is(t)&&r.push(i[n]):1===i[n].nodeType&&r.push(i[n]);return new e(a.unique(r))},remove:function(){for(var e=0;e<this.length;e++)this[e].parentNode&&this[e].parentNode.removeChild(this[e]);return this},add:function(){var e,t,r=this;for(e=0;e<arguments.length;e++){var s=a(arguments[e]);for(t=0;t<s.length;t++)r[r.length]=s[t],r.length++}return r}},a.fn=e.prototype,a.unique=function(e){for(var a=[],t=0;t<e.length;t++)-1===a.indexOf(e[t])&&a.push(e[t]);return a},a}()),r=["jQuery","Zepto","Dom7"],s=0;s<r.length;s++)window[r[s]]&&e(window[r[s]]);var i;i="undefined"==typeof t?window.Dom7||window.Zepto||window.jQuery:t,i&&("transitionEnd"in i.fn||(i.fn.transitionEnd=function(e){function a(i){if(i.target===this)for(e.call(this,i),t=0;t<r.length;t++)s.off(r[t],a)}var t,r=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],s=this;if(e)for(t=0;t<r.length;t++)s.on(r[t],a);return this}),"transform"in i.fn||(i.fn.transform=function(e){for(var a=0;a<this.length;a++){var t=this[a].style;t.webkitTransform=t.MsTransform=t.msTransform=t.MozTransform=t.OTransform=t.transform=e}return this}),"transition"in i.fn||(i.fn.transition=function(e){"string"!=typeof e&&(e+="ms");for(var a=0;a<this.length;a++){var t=this[a].style;t.webkitTransitionDuration=t.MsTransitionDuration=t.msTransitionDuration=t.MozTransitionDuration=t.OTransitionDuration=t.transitionDuration=e}return this})),window.Swiper=a}(),"undefined"!=typeof module?module.exports=window.Swiper:"function"==typeof define&&define.amd&&define([],function(){"use strict";return window.Swiper});
//# sourceMappingURL=maps/swiper.min.js.map
!function(e,i,t){"use strict";function n(){for(var e=[],i="0123456789abcdef",t=0;36>t;t++)e[t]=i.substr(Math.floor(16*Math.random()),1);e[14]="4",e[19]=i.substr(3&e[19]|8,1),e[8]=e[13]=e[18]=e[23]="-";var n=e.join("");return n}function r(e){return{restrict:"E",transclude:!0,scope:{onReady:"&",slidesPerView:"=",slidesPerColumn:"=",spaceBetween:"=",parallax:"=",parallaxTransition:"@",paginationIsActive:"=",paginationClickable:"=",showNavButtons:"=",loop:"=",autoplay:"=",initialSlide:"=",containerCls:"@",paginationCls:"@",slideCls:"@",direction:"@",swiper:"=",overrideParameters:"="},controller:["$scope","$element",function(e,n){this.buildSwiper=function(){var r={slidesPerView:e.slidesPerView||1,slidesPerColumn:e.slidesPerColumn||1,spaceBetween:e.spaceBetween||0,direction:e.direction||"horizontal",loop:e.loop||!1,initialSlide:e.initialSlide||0,showNavButtons:!1};e.autoplay===!0&&(r=i.extend({},r,{autoplay:!0})),e.paginationIsActive===!0&&(r=i.extend({},r,{paginationClickable:e.paginationClickable||!0,pagination:"#paginator-"+e.swiper_uuid})),e.showNavButtons===!0&&(r.nextButton="#nextButton-"+e.swiper_uuid,r.prevButton="#prevButton-"+e.swiper_uuid),e.overrideParameters&&(r=i.extend({},r,e.overrideParameters));{var a;e.containerCls||""}i.isObject(e.swiper)?(e.swiper=new Swiper(n[0].firstChild,r),a=e.swiper):a=new Swiper(n[0].firstChild,r),e.onReady!==t&&e.onReady({swiper:a})}}],link:function(e,t,r){var a=n();e.swiper_uuid=a;var s="paginator-"+a,o="prevButton-"+a,l="nextButton-"+a;i.element(t[0].querySelector(".swiper-pagination")).attr("id",s),i.element(t[0].querySelector(".swiper-button-next")).attr("id",l),i.element(t[0].querySelector(".swiper-button-prev")).attr("id",o)},template:'<div class="swiper-container {{containerCls}}"><div class="parallax-bg" data-swiper-parallax="{{parallaxTransition}}" ng-show="parallax"></div><div class="swiper-wrapper" ng-transclude></div><div class="swiper-pagination {{paginationCls}}"></div><div class="swiper-button-next" ng-show="showNavButtons"></div><div class="swiper-button-prev" ng-show="showNavButtons"></div></div>'}}function a(e){return{restrict:"E",require:"^ksSwiperContainer",transclude:!0,template:"<div ng-transclude></div>",replace:!0,link:function(i,t,n,r){i.$last===!0&&e(function(){r.buildSwiper()},0)}}}i.module("ksSwiper",[]).directive("ksSwiperContainer",r).directive("ksSwiperSlide",a),r.$inject=["$log"],a.$inject=["$timeout"]}(window,angular,void 0);
angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("dish-cook/dish-cook.html","<div ng-controller=\"dishCookController\">\n  <!--<div class=\"nav-icon left profile-icon\" ng-click=\"toProfile()\"></div>-->\n	<div class=\"title\">Cook</div>\n  <div class=\"nav-icon right food-icon\" ng-click=\"toFood()\"></div>\n	<ion-scroll class=\"cards\" direction=\"x\" scrollbar-x=\"false\" paging=\"true\" on-scroll=\"onScroll()\">\n    <div class=\"card-holder\" collection-repeat=\"recipe in recipes\" item-width=\"getCardWidth(recipe, $index)\" item-height=\"getCardHeight(recipe, $index)\">\n      <div class=\"card\">\n        <dish-photo class=\"card-image\" ng-model=\"recipe.photo\"></dish-photo>\n        <dish-input class=\"input-first\" ng-model=\"recipe.name\" placeholder=\"Name\"></dish-input>\n        <dish-input class=\"input-second\" ng-model=\"recipe.ingredients\" placeholder=\"Ingredients\"></dish-input>\n        <dish-input class=\"input-third half\" ng-model=\"recipe.portions\" placeholder=\"Portions\"></dish-input>\n        <dish-input class=\"input-third half\" ng-model=\"recipe.price\" placeholder=\"Price\"></dish-input>\n        <dish-button text=\"Post Meal\"></dish-button>\n      </div>\n    </div>\n  </ion-scroll>\n</div>");
$templateCache.put("dish-favorites/dish-favorites.html","<div class=\"favorites\" ng-controller=\"dishFavoritesController\">\n	<div class=\"nav-icon left food-icon\" ng-click=\"toFood()\"></div>\n	<div class=\"title\">{{currentUser.profile.username}}</div>\n	<!--<div class=\"nav-icon right cook-icon\" ng-click=\"toCook()\"></div>-->\n  <ion-scroll class=\"cards\" direction=\"x\" scrollbar-x=\"false\" paging=\"true\" on-scroll=\"onScroll()\">\n  	<div collection-repeat=\"favorite in favorites\" item-width=\"getCardWidth(favorite, $index)\" item-height=\"getCardHeight(favorite, $index)\">\n  		<div ng-if=\"$index === 0\" class=\"card-holder profile\">\n  			<ng-include src=\"&apos;dish-profile/dish-profile.html&apos;\"></ng-include>\n  		</div>\n  		<div class=\"card-holder favorite\">\n				<div class=\"card\">\n					<div class=\"card-image\" style=\"background-image:url({{favorite.photo}});\"></div>\n	        <dish-input class=\"input-first\" ng-model=\"favorite.name\" placeholder=\"Name\" readonly=\"true\"></dish-input>\n	        <dish-input class=\"input-second\" ng-model=\"favorite.ingredients\" placeholder=\"Ingredients\" readonly=\"true\"></dish-input>\n	        <dish-input class=\"input-third half\" ng-model=\"favorite.portions\" placeholder=\"Portions\" readonly=\"true\"></dish-input>\n	        <dish-input class=\"input-third half\" ng-model=\"favorite.price\" placeholder=\"Price\" readonly=\"true\"></dish-input>\n	        <dish-button text=\"Request Meal\"></dish-button>\n				</div>\n			</div>\n  	</div>\n	</ion-scroll>\n</div>\n");
$templateCache.put("dish-food/dish-food.html","<div ng-controller=\"dishFoodController\">\n  <div class=\"nav-icon left cook-icon\" ng-click=\"toCook()\"></div>\n	<div class=\"title\">Eat</div>\n  <div class=\"nav-icon right profile-icon\" ng-click=\"toProfile()\"></div>\n	<ion-scroll class=\"cards\" direction=\"x\" scrollbar-x=\"false\" paging=\"true\" on-scroll=\"onScroll()\">\n    <div class=\"card-holder food\" collection-repeat=\"food in foods\" item-width=\"getCardWidth(food, $index)\" item-height=\"getCardHeight(food, $index)\">\n      <div class=\"card\">\n      	<div class=\"card-image\" style=\"background-image:url({{food.photo}});\"></div>\n        <dish-input class=\"input-first\" ng-model=\"food.name\" placeholder=\"Name\" readonly=\"true\"></dish-input>\n        <dish-input class=\"input-second\" ng-model=\"food.ingredients\" placeholder=\"Ingredients\" readonly=\"true\"></dish-input>\n        <dish-input class=\"input-third half\" ng-model=\"food.portions\" placeholder=\"Portions\" readonly=\"true\"></dish-input>\n        <dish-input class=\"input-third half\" ng-model=\"food.price\" placeholder=\"Price\" readonly=\"true\"></dish-input>\n        <dish-button text=\"Buy Meal\"></dish-button>\n      </div>\n    </div>\n  </ion-scroll>\n</div>");
$templateCache.put("dish-forgot/dish-forgot.html","<div ng-controller=\"dishForgotController\">\n	<form novalidate class=\"forgotForm\" name=\"forgotForm\" novalidate ng-submit=\"forgotForm.$valid && resetPassword(forgotData.user)\">\n	  <div class=\"list list-inset\">\n	    <label class=\"item item-input\">\n	      <input type=\"text\" ng-model=\"forgotData.user.email\" placeholder=\"Enter Your Email\">\n	    </label>\n	  </div>\n	  <button class=\"button button-block form-button\" type=\"submit\">Recover Password</button>\n	  <div class=\"button button-full button-clear button-light\" ng-click=\"toLogin()\">\n	    Back to Login\n	  </div>\n	</form>\n</div>");
$templateCache.put("dish-help/dish-help-modal.html","<ion-modal-view class=\"modal help-modal\" ng-controller=\"dishHelpController\">\n	<div class=\"nav-icon left close-icon\" ng-click=\"closeModal()\"></div>\n  <div class=\"title\">How Can We Help?</div>\n  <ion-scroll class=\"cards\" direction=\"y\" scrollbar-y=\"false\" on-scroll=\"onScroll()\">\n  	<div class=\"card-holder-title\">Issue With Your Meal</div>\n	  <div class=\"card-holder first\">\n	  	<div class=\"card\">\n	  		Something\n	  	</div>\n	  </div>\n  </ion-scroll>\n</ion-modal-view>");
$templateCache.put("dish-home/dish-home.html","<div class=\"home\" ng-controller=\"dishHomeController\">\n	<ks-swiper-container swiper=\"swiper\" on-ready=\"onSwiperReady(swiper)\" class=\"overlays\" initial-slide=\"1\" loop=\"false\" show-nav-buttons=\"false\" slides-per-view=\"1\" pagination-clickable=\"false\" direction=\"vertical\" long-swipes-ms=\"0\">\n    <ks-swiper-slide class=\"swiper-slide overlay\" ng-repeat=\"screen in screens\">\n    	<ng-include src=\"screen.template\"></ng-include>\n    </ks-swiper-slide>\n	</ks-swiper-container>\n</div>");
$templateCache.put("dish-login/dish-login.html","<div ng-controller=\"dishLoginController\">\n  <form novalidate class=\"loginForm\" name=\"loginForm\" ng-submit=\"loginForm.$valid && login(loginData.user)\">\n    <div class=\"list list-inset\">\n      <label class=\"item item-input\">\n        <input type=\"text\" ng-model=\"loginData.user.email\" placeholder=\"Email\">\n      </label>\n      <label class=\"item item-input\">\n        <input type=\"password\" ng-model=\"loginData.user.password\" placeholder=\"Password\">\n      </label>\n    </div>\n    <button class=\"button button-block form-button\" type=\"submit\">Log in</button>\n    <div class=\"button button-full button-clear button-light\" ng-click=\"toSignup()\">\n      Signup\n    </div>\n  </form>\n  <div class=\"button button-clear button-light forgotLink\" ng-click=\"toForgot()\">Forgot Password?</div>\n</div>");
$templateCache.put("dish-payment/dish-payment-modal.html","<ion-modal-view class=\"modal payment-modal\" ng-controller=\"dishPaymentController\">\n	<div class=\"nav-icon left close-icon\" ng-click=\"closeModal()\"></div>\n	<div class=\"title\" ng-click=\"payment()\">Payment</div>\n	<ion-scroll class=\"cards\" direction=\"y\" scrollbar-y=\"false\" on-scroll=\"onScroll()\">\n  	<div collection-repeat=\"payment in payments\" item-width=\"getCardWidth(payment, $index)\" item-height=\"getCardHeight(payment, $index)\">\n  		<div class=\"card-holder payment {{$index === 0 ? \'first\' : \'\'}}\">\n				<div class=\"card\">\n	        <dish-input ng-model=\"payment.name\" placeholder=\"Name\" readonly=\"true\"></dish-input>\n	        <dish-input ng-model=\"payment.creditcard\" placeholder=\"Card No.\" readonly=\"true\"></dish-input>\n	        <dish-input class=\"half\" ng-model=\"payment.exp\" placeholder=\"Expiration\" readonly=\"true\"></dish-input>\n	        <dish-input class=\"half\" ng-model=\"payment.ccv\" placeholder=\"CCV\" readonly=\"true\"></dish-input>\n	        <dish-button ng-if=\"payment.type === \'delete\'\" type=\"assertive\" text=\"Delete Credit Card\" ng-click=\"delete()\"></dish-button>\n	        <dish-button ng-if=\"payment.type === \'add\'\" text=\"Add Credit Card\" ng-click=\"add()\"></dish-button>\n				</div>\n			</div>\n  	</div>\n	</ion-scroll>\n</ion-modal-view>");
$templateCache.put("dish-profile/dish-profile.html","<div class=\"card profile\" ng-controller=\"dishProfileController\">\n	<dish-photo class=\"card-image\" ng-model=\"currentUser.profile.photo\"></dish-photo>\n	<div class=\"card-options\">\n		<div class=\"dish-input\" ng-click=\"openModal(\'transactions\')\">History</div>\n		<div class=\"dish-input\" ng-click=\"openModal(\'promotions\')\">Free Meals</div>\n		<div class=\"dish-input\" ng-click=\"openModal(\'payment\')\">Payment</div>\n		<div class=\"dish-input\" ng-click=\"openModal(\'help\')\">Help</div>\n		<div class=\"dish-input\" ng-click=\"openModal(\'settings\')\">Settings</div>\n	</div>\n	<dish-button text=\"Recommend Dish\"></dish-button>\n</div>");
$templateCache.put("dish-promotions/dish-promotions-modal.html","<ion-modal-view class=\"modal promotions-modal\" ng-controller=\"dishPromotionsController\">\n	<div class=\"nav-icon left close-icon\" ng-click=\"closeModal()\"></div>\n	<div class=\"title\">Promotions</div>\n	<ion-scroll class=\"cards\" direction=\"y\" scrollbar-y=\"false\" on-scroll=\"onScroll()\">\n  	<div collection-repeat=\"promotion in promotions\" item-width=\"getCardWidth(promotion, $index)\" item-height=\"getCardHeight(promotion, $index)\">\n  		<div class=\"card-holder promotion {{$index === 0 ? \'first\' : \'\'}}\">\n				<div class=\"card\" ng-click=\"promotion.command()\">\n	        <dish-button ng-bind-html=\"promotion.button\"></dish-button>\n	        <div class=\"card-icon icon {{promotion.icon}}\"></div>\n				</div>\n			</div>\n  	</div>\n	</ion-scroll>\n</ion-modal-view>");
$templateCache.put("dish-settings/dish-settings-modal.html","<ion-modal-view class=\"modal settings\" ng-controller=\"dishSettingsController\">\n	<div class=\"nav-icon left close-icon\" ng-click=\"closeModal()\"></div>\n	<div class=\"title\">Settings</div>\n	<dish-button type=\"assertive\" text=\"Logout\" ng-click=\"logout()\"></dish-button>\n</ion-modal-view>");
$templateCache.put("dish-signup/dish-signup-modal.html","<ion-modal-view class=\"modal signup\">\n  <dish-slider>\n    <dish-slide template=\"dish-signup/dish-signup.html\"></dish-slide>\n    <dish-slide template=\"dish-login/dish-login.html\"></dish-slide>\n    <dish-slide template=\"dish-forgot/dish-forgot.html\"></dish-slide>\n  </dish-slider>\n  <div class=\"logo\"></div>\n</ion-modal-view>");
$templateCache.put("dish-signup/dish-signup.html","<div ng-controller=\"dishSignupController\">\n  <form class=\"signupForm\" name=\"signupForm\" novalidate ng-submit=\"signupForm.$valid && signup(signupData.user)\">\n    <div class=\"list list-inset\">\n      <label class=\"item item-input\">\n        <input type=\"text\" ng-model=\"signupData.user.username\" placeholder=\"Full Name\">\n      </label>\n      <label class=\"item item-input\">\n        <input type=\"text\" ng-model=\"signupData.user.email\" placeholder=\"Email\">\n      </label>\n      <label class=\"item item-input\">\n        <input type=\"password\" ng-model=\"signupData.user.password\" placeholder=\"Password\">\n      </label>\n    </div>\n    <button class=\"button button-block form-button\" type=\"submit\">Signup</button>\n    <div class=\"button button-full button-clear button-light\" ng-click=\"toLogin()\">\n      Login\n    </div>\n  </form>\n</div>");
$templateCache.put("dish-transactions/dish-transactions-modal.html","<ion-modal-view class=\"modal transactions\" ng-controller=\"dishTransactionsController\">\n	<div class=\"nav-icon left close-icon\" ng-click=\"closeModal()\"></div>\n	<div class=\"title\">History</div>\n  <ion-scroll class=\"cards\" direction=\"x\" scrollbar-x=\"false\" paging=\"true\" on-scroll=\"onScroll()\">\n  	<div collection-repeat=\"transaction in transactions\" item-width=\"getCardWidth(transaction, $index)\" item-height=\"getCardHeight(transaction, $index)\">\n  		<div class=\"card-holder transaction\">\n				<div class=\"card\">\n					<div class=\"card-image\" style=\"background-image:url({{transaction.photo}});\"></div>\n	        <dish-input class=\"input-first\" ng-model=\"transaction.name\" placeholder=\"Name\" readonly=\"true\"></dish-input>\n	        <dish-input class=\"input-second\" ng-model=\"transaction.ingredients\" placeholder=\"Ingredients\" readonly=\"true\"></dish-input>\n	        <dish-input class=\"input-third half\" ng-model=\"transaction.portions\" placeholder=\"Portions\" readonly=\"true\"></dish-input>\n	        <dish-input class=\"input-third half\" ng-model=\"transaction.price\" placeholder=\"Price\" readonly=\"true\"></dish-input>\n	        <dish-button text=\"View Meal\"></dish-button>\n				</div>\n			</div>\n  	</div>\n	</ion-scroll>\n</ion-modal-view>");}]);