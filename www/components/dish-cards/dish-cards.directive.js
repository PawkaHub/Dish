(function() {
	'use strict';

	var ONE_PX_TRANSPARENT_IMG_SRC = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
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

			var cardsLeaving = [];
			var cardsEntering = [];
			var cardsShownMap = {};
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
					//$log.log('data', data);
					RefreshLayout();
				});
			});

			function RefreshLayout() {
				// Create the pool of items for reuse, setting the size to (estimatedItemsOnScreen) * 2,
				// plus the size of the renderBuffer.
				if (!isLayoutReady) {
					//$log.log('RefreshLayout');
					//var poolSize = Math.max(5, renderBuffer * 3);
					var poolSize = Math.max(5);
					//$log.log('poolSize', poolSize);
					for (var i = 0; i < poolSize; i++) {
						cards.push(new RepeatCard(i));
					}
					// Modify CSS properties to maintain a clear view of the cards
					for (var i = 0; i < cards.length - 1; i++) {
						attachObserver(cards[i], cards[i + 1]);
					};

					//Once we've finished attaching observers and converting our cards into a stack we can manipulate, reverse the stack so that we show the data at the top of the card stack, not the bottom.
					cards.reverse();

					var handler = new Manipulator(lastCard.x, node.parentNode, 'x');
					$log.log('handler', handler, node.parentNode);
					context.addManipulator(handler);

					isLayoutReady = true;
				}
				forceRerender(true);
			}

			function forceRerender() {
				return render(true);
			}

			function render(forceRerender) {
				var card;
				var i;
				var currentScope;
				for (i = 0; i < data.length; i++) {
					card = cards[i];
					currentScope = card.scope;
					currentScope.$index = i;
					currentScope[keyExpr] = data[i];
					currentScope.$first = (i === 0);
					currentScope.$last = (i === (data.length - 1));
					currentScope.$middle = !(currentScope.$first || currentScope.$last);
					currentScope.$odd = !(currentScope.$even = (i & 1) === 0);

					//$log.log('card', currentScope);

					cardsEntering.push(card);

					if (scope.$$disconnected) ionic.Utils.reconnectScope(card.scope);
				}

				if (forceRerender) {
					var rootScopePhase = $rootScope.$$phase;
					while (cardsEntering.length) {
						card = cardsEntering.pop();
						if (!rootScopePhase) card.scope.$digest();
					}
				} else {
					digestEnteringItems();
				}
			}

			function digestEnteringItems() {
				var card;
				if (digestEnteringItems.running) return;
				digestEnteringItems.running = true;

				$$rAF(function process() {
					var rootScopePhase = $rootScope.$$phase;
					while (cardsEntering.length) {
						card = cardsEntering.pop();
						//$log.log('digest card', card.scope);
						if (!rootScopePhase) card.scope.$digest();
					}
					digestEnteringItems.running = false;
				});
			}

			function RepeatCard(i) {
				var self = this;
				self.scope = scope.$new();
				transclude(self.scope, function(clone) {
					self.element = clone;
					self.element.data('$$cardRepeatItem', self);
					// TODO destroy
					self.node = clone[0];

					self.card = new Box(self.node);
					var card = self.card;
					var growthFactor = DEFAULT_GROWTH_FACTOR;
					var h = CARD_HEIGHT * growthFactor;
					var w = CARD_WIDTH * growthFactor;

					/*h = CARD_HEIGHT * (growthFactor / 2),
					w = CARD_WIDTH * growthFactor;*/

					$log.log('card', cards, self, CARD_HEIGHT, h, CARD_WIDTH, w, growthFactor);

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

					// Pin the first card to 0, and add a motion constraint
					if (i === 0) {
						solver.add(eq(card.x, 0, weak, 100));
						context.addMotionConstraint(new MotionConstraint(card.x, ">=", 0));
						context.addMotionConstraint(new MotionConstraint(card.x, "<=", DEFAULT_X_MARGIN));
					} else {
						// The card mustn't reveal any space between it and the previous card.
						solver.add(leq(card.x, cards[i - 1].card.edge, medium, 0));

						// Make the card tend toward the left (zero). Use a lower priority than
						// the first card so the solver will prefer for the first card to be
						// zero than any of the additional cards.
						solver.add(eq(card.x, 0, weak, 0));

						// The card must be to the right of the previous card's left edge, plus the left gap
						solver.add(geq(card.x, c.plus(cards[i - 1].card.x, DEFAULT_LEFT_GAP), medium, 0));
					}

					context.addBox(card);

					lastCard = card;

					// Batch style setting to lower repaints
					//self.node.style[ionic.CSS.TRANSFORM] = 'translate3d(-9999px,-9999px,0)';
					//self.node.style.cssText += ' height: 0px; width: 0px;';
					//$log.log('self', self, self.scope);
					ionic.Utils.disconnectScope(self.scope);
					node.parentNode.appendChild(self.node);
					self.images = clone[0].getElementsByTagName('img');
				});
			}

			function attachObserver(current, next) {
				var offset = 100;
				var currentCard = current.card;
				var nextCard = next.card;
				var $current = currentCard.element();
				var $next = nextCard.element();
				var observer = new MutationObserver(function(mutations) {
					var mutation = mutations[mutations.length - 1];
					if (mutation.attributeName === "style") {

						// e.g., translate3d(4px, 64px, 0px)
						var transform = mutation.target.style.transform,
							values = transform
							.replace(/translate3d\(|\s|\)/g, "")
							.split(","),
							distance = nextCard.x.value - currentCard.x.value,
							factor = (distance / offset);

						factor = factor > 1 ? 1 : factor;

						var opacity = factor,
							blur = "blur(" + ((1 - factor) * 10) + "px)";

						//$log.log('styles', transform, distance, factor, opacity);

						render();

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