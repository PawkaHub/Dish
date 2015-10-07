(function() {
	'use strict';

	var ONE_PX_TRANSPARENT_IMG_SRC = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
	var WIDTH_HEIGHT_REGEX = /height:.*?px;\s*width:.*?px/;
	var DEFAULT_RENDER_BUFFER = 3;
	var DEFAULT_SCALE = 0.8;
	var DEFAULT_GROWTH_FACTOR = 0.02;
	var DEFAULT_CARD_WIDTH = window.innerWidth - 20;
	var DEFAULT_CARD_HEIGHT = window.innerHeight - 20;
	var DEFAULT_X_MARGIN = 60;
	var DEFAULT_Y_MARGIN = 70;
	// (left) space between apps
	var DEFAULT_LEFT_GAP = 4;
	// (right) space after apps are moved
	var DEFAULT_RIGHT_GAP = DEFAULT_CARD_WIDTH * 0.1;

	CardRepeatDirective.$inject = ['$window', '$parse', '$$rAF', '$rootScope', '$log'];

	function CardRepeatDirective($window, $parse, $$rAF, $rootScope, $log) {
		var invalid;
		return {
			restrict: 'A',
			replace: true,
			transclude: 'element',
			link: postLink
		};

		function postLink(scope, element, attr, ctrl, transclude) {
			var node = element[0];
			var repeatExpr = attr.cardRepeat;
			var match = repeatExpr.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
			if (!match) {
				throw new Error("card-repeat expected expression in form of '_item_ in " +
					"_collection_[ track by _id_]' but got '" + attr.cardRepeat + "'.");
			}
			var keyExpr = match[1];
			var listExpr = match[2];
			var listGetter = $parse(listExpr);
			var data = [];
			var repeatManager;
			var forceRefreshImages = attr.forceRefreshImages;

			//Render Buffer
			var renderBufferExpr = attr.renderBuffer;
			var renderBuffer = angular.isDefined(renderBufferExpr) ?
				parseInt(renderBufferExpr) :
				DEFAULT_RENDER_BUFFER;

			var PRIMARY = 'PRIMARY';
			var SECONDARY = 'SECONDARY';
			var TRANSLATE_TEMPLATE_STR = 'translate3d(PRIMARYpx,SECONDARYpx,0)';
			var WIDTH_HEIGHT_TEMPLATE_STR = 'height: SECONDARYpx; width: PRIMARYpx;';

			var estimatedHeight;
			var estimatedWidth;

			var repeaterBeforeSize = 0;
			var repeaterAfterSize = 0;

			var renderStartIndex = -1;
			var renderEndIndex = -1;
			var renderAfterBoundary = -1;
			var renderBeforeBoundary = -1;

			var itemsPool = [];
			var itemsLeaving = [];
			var itemsEntering = [];
			var itemsShownMap = {};
			var nextItemId = 0;
			var isLayoutReady = false;

			//Card Motion Settings
			var context = new MotionContext();
			var solver = context.solver();
			var lastCard = null;
			var cards = [];
			var CARD_WIDTH = DEFAULT_CARD_WIDTH * DEFAULT_SCALE;
			var CARD_HEIGHT = DEFAULT_CARD_HEIGHT * DEFAULT_SCALE;

			//Watch the collection for new values
			scope.$watchCollection(listGetter, function(newValue) {
				data = newValue || (newValue = []);
				if (!angular.isArray(newValue)) {
					throw new Error("card-repeat expected an array for '" + listExpr + "', " +
						"but got a " + typeof value);
				}
				// Wait for this digest to end before refreshing everything.
				scope.$$postDigest(function() {
					$log.log('data', data);
					RefreshLayout();
				});
			});

			function RefreshLayout() {
				$log.log('RefreshLayout');
				// Create the pool of items for reuse, setting the size to (estimatedItemsOnScreen) * 2,
				// plus the size of the renderBuffer.
				if (!isLayoutReady) {
					//var poolSize = Math.max(5, renderBuffer * 3);
					var poolSize = Math.max(5);
					$log.log('poolSize', poolSize);
					for (var i = 0; i < poolSize; i++) {
						itemsPool.push(new RepeatItem(i));
					}
					// Modify CSS properties to maintain a clear view of the cards
					for (var i = 0; i < cards.length - 1; i++) {
						attachObserver(cards[i], cards[i + 1]);
					};

					var handler = new Manipulator(lastCard.x, node.parentNode, "x");
					context.addManipulator(handler);
				}

				isLayoutReady = true;
			}

			function render(forceRerender) {
				if (render.destroyed) return;
				var i;
				var ii;
				var item;
				var dim;
				var scope;
				//var scrollValue = view.getScrollValue();
				//var scrollValueEnd = scrollValue + view.scrollPrimarySize;

				//view.updateRenderRange(scrollValue, scrollValueEnd);

				renderStartIndex = Math.max(0, renderStartIndex - renderBuffer);
				renderEndIndex = Math.min(data.length - 1, renderEndIndex + renderBuffer);

				for (i in itemsShownMap) {
					if (i < renderStartIndex || i > renderEndIndex) {
						item = itemsShownMap[i];
						delete itemsShownMap[i];
						itemsLeaving.push(item);
						item.isShown = false;
					}
				}

				// Render indicies that aren't shown yet
				//
				// NOTE(ajoslin): this may sound crazy, but calling any other functions during this render
				// loop will often push the render time over the edge from less than one frame to over
				// one frame, causing visible jank.
				// DON'T call any other functions inside this loop unless it's vital.
				for (i = renderStartIndex; i <= renderEndIndex; i++) {
					// We only go forward with render if the index is in data, the item isn't already shown,
					// or forceRerender is on.
					if (i >= data.length || (itemsShownMap[i] && !forceRerender)) continue;

					item = itemsShownMap[i] || (itemsShownMap[i] = itemsLeaving.length ? itemsLeaving.pop() :
						itemsPool.length ? itemsPool.shift() :
						new RepeatItem());
					itemsEntering.push(item);
					item.isShown = true;

					scope = item.scope;
					scope.$index = i;
					scope[keyExpression] = data[i];
					scope.$first = (i === 0);
					scope.$last = (i === (data.length - 1));
					scope.$middle = !(scope.$first || scope.$last);
					scope.$odd = !(scope.$even = (i & 1) === 0);

					if (scope.$$disconnected) ionic.Utils.reconnectScope(item.scope);

					/*dim = view.getDimensions(i);
					if (item.secondaryPos !== dim.secondaryPos || item.primaryPos !== dim.primaryPos) {
						item.node.style[ionic.CSS.TRANSFORM] = TRANSLATE_TEMPLATE_STR
							.replace(PRIMARY, (item.primaryPos = dim.primaryPos))
							.replace(SECONDARY, (item.secondaryPos = dim.secondaryPos));
					}
					if (item.secondarySize !== dim.secondarySize || item.primarySize !== dim.primarySize) {
						item.node.style.cssText = item.node.style.cssText
							.replace(WIDTH_HEIGHT_REGEX, WIDTH_HEIGHT_TEMPLATE_STR
								//TODO fix item.primarySize + 1 hack
								.replace(PRIMARY, (item.primarySize = dim.primarySize) + 1)
								.replace(SECONDARY, (item.secondarySize = dim.secondarySize))
							);
					}*/

				}

				// If we reach the end of the list, render the afterItemsNode - this contains all the
				// elements the developer placed after the collection-repeat
				/*if (renderEndIndex === data.length - 1) {
					dim = view.getDimensions(data.length - 1) || EMPTY_DIMENSION;
					afterItemsNode.style[ionic.CSS.TRANSFORM] = TRANSLATE_TEMPLATE_STR
						.replace(PRIMARY, dim.primaryPos + dim.primarySize)
						.replace(SECONDARY, 0);
				}*/

				while (itemsLeaving.length) {
					item = itemsLeaving.pop();
					item.scope.$broadcast('$collectionRepeatLeave');
					ionic.Utils.disconnectScope(item.scope);
					itemsPool.push(item);
					item.node.style[ionic.CSS.TRANSFORM] = 'translate3d(-9999px,-9999px,0)';
					item.primaryPos = item.secondaryPos = null;
				}

				if (forceRefreshImages) {
					for (i = 0, ii = itemsEntering.length; i < ii && (item = itemsEntering[i]); i++) {
						if (!item.images) continue;
						for (var j = 0, jj = item.images.length, img; j < jj && (img = item.images[j]); j++) {
							var src = img.src;
							img.src = ONE_PX_TRANSPARENT_IMG_SRC;
							img.src = src;
						}
					}
				}
				if (forceRerender) {
					var rootScopePhase = $rootScope.$$phase;
					while (itemsEntering.length) {
						item = itemsEntering.pop();
						if (!rootScopePhase) item.scope.$digest();
					}
				} else {
					digestEnteringItems();
				}
			}

			render();

			function digestEnteringItems() {
				var item;
				if (digestEnteringItems.running) return;
				digestEnteringItems.running = true;

				$$rAF(function process() {
					var rootScopePhase = $rootScope.$$phase;
					while (itemsEntering.length) {
						item = itemsEntering.pop();
						if (item.isShown) {
							if (!rootScopePhase) item.scope.$digest();
						}
					}
					digestEnteringItems.running = false;
				});
			}

			function RepeatItem(i) {
				var self = this;
				this.scope = scope.$new();
				//this.id = 'item' + (nextItemId++);
				transclude(this.scope, function(clone) {
					self.element = clone;
					self.element.data('$$cardRepeatItem', self);
					// TODO destroy
					self.node = clone[0];
					var card = new Box(self.node),
						growthFactor = i * DEFAULT_GROWTH_FACTOR,
						h = CARD_HEIGHT * (growthFactor / 2),
						w = CARD_WIDTH * growthFactor;

					// Create the constraints for the cards
					card.x = new c.Variable({
						name: "card-" + i + "-x"
					});
					card.right = new c.Variable({
						name: "card-" + i + "-right"
					});
					card.edge = new c.Variable({
						name: "card-" + i + "-right-edge"
					});
					card.y = DEFAULT_Y_MARGIN - h;
					card.bottom = CARD_HEIGHT + h;

					// App's width
					solver.add(eq(card.right, c.plus(card.x, CARD_WIDTH + w), medium));

					// App's right gap
					solver.add(eq(card.edge, c.plus(card.right, DEFAULT_RIGHT_GAP), medium));

					$log.log('card', CARD_HEIGHT);

					// Pin the first card to 0, and add a motion constraint
					if (i === 0) {
						solver.add(eq(card.x, 0, weak, 100));
						context.addMotionConstraint(new MotionConstraint(card.x, ">=", 0));
						context.addMotionConstraint(new MotionConstraint(card.x, "<=", DEFAULT_X_MARGIN));
					} else {
						// The card mustn't reveal any space between it and the previous card.
						solver.add(leq(card.x, cards[i - 1].edge, medium, 0));

						// Make the card tend toward the left (zero). Use a lower priority than
						// the first card so the solver will prefer for the first card to be
						// zero than any of the additional cards.
						solver.add(eq(card.x, 0, weak, 0));

						// The card must be to the right of the previous card's left edge, plus the left gap
						solver.add(geq(card.x, c.plus(cards[i - 1].x, DEFAULT_LEFT_GAP), medium, 0));
					}

					cards.push(card);
					context.addBox(card);

					lastCard = card;

					// Batch style setting to lower repaints
					//self.node.style[ionic.CSS.TRANSFORM] = 'translate3d(-9999px,-9999px,0)';
					//self.node.style.cssText += ' height: 0px; width: 0px;';
					//ionic.Utils.disconnectScope(self.scope);
					node.parentNode.appendChild(self.node);
					self.images = clone[0].getElementsByTagName('img');
				});
			}

			function attachObserver(current, next) {
				"use strict";

				var offset = 100,
					$current = current.element(),
					$next = next.element(),
					observer = new MutationObserver(function(mutations) {
						var mutation = mutations[mutations.length - 1];
						if (mutation.attributeName === "style") {

							// e.g., translate3d(4px, 64px, 0px)
							var transform = mutation.target.style.transform,
								values = transform
								.replace(/translate3d\(|\s|\)/g, "")
								.split(","),
								distance = next.x.value - current.x.value,
								factor = (distance / offset);

							factor = factor > 1 ? 1 : factor;

							var opacity = factor,
								blur = "blur(" + ((1 - factor) * 10) + "px)";

							/*$current.style["-webkit-filter"] = blur;
							$current.style["-moz-filter"] = blur;
							$current.style["-o-filter"] = blur;
							$current.style.filter = blur;*/

							$current.style.opacity = opacity;
						}
					});

				observer.observe($next, {
					attributes: true,
					childList: false,
					characterData: false
				});
			};
		}
	}

	angular.module('dish.cards')
		.directive('cardRepeat', CardRepeatDirective);
})();