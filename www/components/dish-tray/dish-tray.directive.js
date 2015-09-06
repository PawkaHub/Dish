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