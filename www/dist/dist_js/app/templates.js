angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("dish-cook/dish-cook.html","<div ng-controller=\"dishCookController\">\n  <!--<div class=\"nav-icon left profile-icon\" ng-click=\"toProfile()\"></div>-->\n	<div class=\"title\">Cook</div>\n  <div class=\"nav-icon right food-icon\" ng-click=\"toFood()\"></div>\n	<ion-scroll class=\"cards\" direction=\"x\" scrollbar-x=\"false\" paging=\"true\" on-scroll=\"onScroll()\">\n    <div class=\"card-holder\" collection-repeat=\"recipe in recipes\" item-width=\"getCardWidth(recipe, $index)\" item-height=\"getCardHeight(recipe, $index)\">\n      <div class=\"card\">\n        <dish-photo class=\"card-image\" ng-model=\"recipe.photo\"></dish-photo>\n        <dish-input ng-model=\"recipe.name\" placeholder=\"Name\"></dish-input>\n        <dish-input ng-model=\"recipe.ingredients\" placeholder=\"Ingredients\"></dish-input>\n        <dish-input class=\"half\" ng-model=\"recipe.portions\" placeholder=\"Portions\"></dish-input>\n        <dish-input class=\"half\" ng-model=\"recipe.price\" placeholder=\"Price\"></dish-input>\n        <dish-button text=\"Post Meal\"></dish-button>\n      </div>\n    </div>\n  </ion-scroll>\n</div>");
$templateCache.put("dish-favorites/dish-favorites.html","<div class=\"favorites\" ng-controller=\"dishFavoritesController\">\n	<div class=\"nav-icon left food-icon\" ng-click=\"toFood()\"></div>\n	<div class=\"title\">{{currentUser.profile.username}}</div>\n	<!--<div class=\"nav-icon right cook-icon\" ng-click=\"toCook()\"></div>-->\n  <ion-scroll class=\"cards\" direction=\"x\" scrollbar-x=\"false\" paging=\"true\" on-scroll=\"onScroll()\">\n  	<div collection-repeat=\"favorite in favorites\" item-width=\"getCardWidth(favorite, $index)\" item-height=\"getCardHeight(favorite, $index)\">\n  		<div ng-if=\"$index === 0\" class=\"card-holder profile\">\n  			<ng-include src=\"&apos;dish-profile/dish-profile.html&apos;\"></ng-include>\n  		</div>\n  		<div class=\"card-holder favorite\">\n				<div class=\"card\">\n					<div class=\"card-image\" style=\"background-image:url({{favorite.photo}});\"></div>\n	        <dish-input ng-model=\"favorite.name\" placeholder=\"Name\" readonly=\"true\"></dish-input>\n	        <dish-input ng-model=\"favorite.ingredients\" placeholder=\"Ingredients\" readonly=\"true\"></dish-input>\n	        <dish-input class=\"half\" ng-model=\"favorite.portions\" placeholder=\"Portions\" readonly=\"true\"></dish-input>\n	        <dish-input class=\"half\" ng-model=\"favorite.price\" placeholder=\"Price\" readonly=\"true\"></dish-input>\n	        <dish-button text=\"View Meal\"></dish-button>\n				</div>\n			</div>\n  	</div>\n	</ion-scroll>\n</div>\n");
$templateCache.put("dish-food/dish-food.html","<div ng-controller=\"dishFoodController\">\n  <div class=\"nav-icon left cook-icon\" ng-click=\"toCook()\"></div>\n	<div class=\"title\">Eat</div>\n  <div class=\"nav-icon right profile-icon\" ng-click=\"toProfile()\"></div>\n	<ion-scroll class=\"cards\" direction=\"x\" scrollbar-x=\"false\" paging=\"true\" on-scroll=\"onScroll()\">\n    <div class=\"card-holder food\" collection-repeat=\"food in foods\" item-width=\"getCardWidth(food, $index)\" item-height=\"getCardHeight(food, $index)\">\n      <div class=\"card\">\n      	<div class=\"card-image\" style=\"background-image:url({{food.photo}});\"></div>\n        <dish-input ng-model=\"food.name\" placeholder=\"Name\" readonly=\"true\"></dish-input>\n        <dish-input ng-model=\"food.ingredients\" placeholder=\"Ingredients\" readonly=\"true\"></dish-input>\n        <dish-input class=\"half\" ng-model=\"food.portions\" placeholder=\"Portions\" readonly=\"true\"></dish-input>\n        <dish-input class=\"half\" ng-model=\"food.price\" placeholder=\"Price\" readonly=\"true\"></dish-input>\n        <dish-button text=\"Buy Meal\"></dish-button>\n      </div>\n    </div>\n  </ion-scroll>\n</div>");
$templateCache.put("dish-forgot/dish-forgot.html","<div ng-controller=\"dishForgotController\">\n	<form novalidate class=\"forgotForm\" name=\"forgotForm\" novalidate ng-submit=\"forgotForm.$valid && resetPassword(forgotData.user)\">\n	  <div class=\"list list-inset\">\n	    <label class=\"item item-input\">\n	      <input type=\"text\" ng-model=\"forgotData.user.email\" placeholder=\"Enter Your Email\">\n	    </label>\n	  </div>\n	  <button class=\"button button-block form-button\" type=\"submit\">Recover Password</button>\n	  <div class=\"button button-full button-clear button-light\" ng-click=\"toLogin()\">\n	    Back to Login\n	  </div>\n	</form>\n</div>");
$templateCache.put("dish-help/dish-help-modal.html","<ion-modal-view class=\"modal help\" ng-controller=\"dishHelpController\">\n  <div class=\"title\">Help</div>\n	<div class=\"nav-icon right close-icon\" ng-click=\"closeModal()\"></div>\n  <div ng-click=\"help()\">Help!</div>\n</ion-modal-view>");
$templateCache.put("dish-home/dish-home.html","<div class=\"home\" ng-controller=\"dishHomeController\">\n	<ks-swiper-container swiper=\"swiper\" on-ready=\"onSwiperReady(swiper)\" class=\"overlays\" initial-slide=\"1\" loop=\"false\" show-nav-buttons=\"false\" slides-per-view=\"1\" pagination-clickable=\"false\" direction=\"vertical\">\n    <ks-swiper-slide class=\"swiper-slide overlay\" ng-repeat=\"screen in screens\">\n    	<ng-include src=\"screen.template\"></ng-include>\n    </ks-swiper-slide>\n	</ks-swiper-container>\n</div>");
$templateCache.put("dish-login/dish-login.html","<div ng-controller=\"dishLoginController\">\n  <form novalidate class=\"loginForm\" name=\"loginForm\" ng-submit=\"loginForm.$valid && login(loginData.user)\">\n    <div class=\"list list-inset\">\n      <label class=\"item item-input\">\n        <input type=\"text\" ng-model=\"loginData.user.email\" placeholder=\"Email\">\n      </label>\n      <label class=\"item item-input\">\n        <input type=\"password\" ng-model=\"loginData.user.password\" placeholder=\"Password\">\n      </label>\n    </div>\n    <button class=\"button button-block form-button\" type=\"submit\">Log in</button>\n    <div class=\"button button-full button-clear button-light\" ng-click=\"toSignup()\">\n      Signup\n    </div>\n  </form>\n  <div class=\"button button-clear button-light forgotLink\" ng-click=\"toForgot()\">Forgot Password?</div>\n</div>");
$templateCache.put("dish-payment/dish-payment-modal.html","<ion-modal-view class=\"modal payment-modal\" ng-controller=\"dishPaymentController\">\n	<div class=\"title\" ng-click=\"payment()\">Payment</div>\n	<div class=\"nav-icon right close-icon\" ng-click=\"closeModal()\"></div>\n	<ion-scroll class=\"cards\" direction=\"y\" scrollbar-y=\"false\" on-scroll=\"onScroll()\">\n  	<div collection-repeat=\"payment in payments\" item-width=\"getCardWidth(payment, $index)\" item-height=\"getCardHeight(payment, $index)\">\n  		<div class=\"card-holder payment {{$index === 0 ? \'first\' : \'\'}}\">\n				<div class=\"card\">\n	        <dish-input ng-model=\"payment.name\" placeholder=\"Name\" readonly=\"true\"></dish-input>\n	        <dish-input ng-model=\"payment.creditcard\" placeholder=\"Card No.\" readonly=\"true\"></dish-input>\n	        <dish-input class=\"half\" ng-model=\"payment.exp\" placeholder=\"Expiration\" readonly=\"true\"></dish-input>\n	        <dish-input class=\"half\" ng-model=\"payment.ccv\" placeholder=\"CCV\" readonly=\"true\"></dish-input>\n	        <dish-button type=\"assertive\" text=\"Delete Credit Card\"></dish-button>\n				</div>\n			</div>\n  	</div>\n	</ion-scroll>\n</ion-modal-view>");
$templateCache.put("dish-profile/dish-profile.html","<div class=\"card\" ng-controller=\"dishProfileController\">\n	<dish-photo class=\"card-image\" ng-model=\"currentUser.profile.photo\"></dish-photo>\n	<div class=\"card-options\">\n		<div class=\"dish-input\" ng-click=\"openModal(\'payment\')\">Payment</div>\n		<div class=\"dish-input\" ng-click=\"openModal(\'transactions\')\">History</div>\n		<div class=\"dish-input\" ng-click=\"openModal(\'promotions\')\">Free Meals</div>\n		<div class=\"dish-input\" ng-click=\"openModal(\'help\')\">Help</div>\n		<div class=\"dish-input\" ng-click=\"openModal(\'settings\')\">Settings</div>\n		<dish-button text=\"Recommend Dish\"></dish-button>\n	</div>\n</div>");
$templateCache.put("dish-promotions/dish-promotions-modal.html","<ion-modal-view class=\"modal promotions\" ng-controller=\"dishPromotionsController\">\n	<div class=\"title\">Promotions</div>\n	<div class=\"nav-icon right close-icon\" ng-click=\"closeModal()\"></div>\n</ion-modal-view>");
$templateCache.put("dish-settings/dish-settings-modal.html","<ion-modal-view class=\"modal settings\" ng-controller=\"dishSettingsController\">\n	<div class=\"title\">Settings</div>\n	<div class=\"nav-icon right close-icon\" ng-click=\"closeModal()\"></div>\n	<dish-button type=\"assertive\" text=\"Logout\" ng-click=\"logout()\"></dish-button>\n</ion-modal-view>");
$templateCache.put("dish-signup/dish-signup-modal.html","<ion-modal-view class=\"modal signup\">\n  <dish-slider>\n    <dish-slide template=\"dish-signup/dish-signup.html\"></dish-slide>\n    <dish-slide template=\"dish-login/dish-login.html\"></dish-slide>\n    <dish-slide template=\"dish-forgot/dish-forgot.html\"></dish-slide>\n  </dish-slider>\n  <div class=\"logo\"></div>\n</ion-modal-view>");
$templateCache.put("dish-signup/dish-signup.html","<div ng-controller=\"dishSignupController\">\n  <form class=\"signupForm\" name=\"signupForm\" novalidate ng-submit=\"signupForm.$valid && signup(signupData.user)\">\n    <div class=\"list list-inset\">\n      <label class=\"item item-input\">\n        <input type=\"text\" ng-model=\"signupData.user.username\" placeholder=\"Full Name\">\n      </label>\n      <label class=\"item item-input\">\n        <input type=\"text\" ng-model=\"signupData.user.email\" placeholder=\"Email\">\n      </label>\n      <label class=\"item item-input\">\n        <input type=\"password\" ng-model=\"signupData.user.password\" placeholder=\"Password\">\n      </label>\n    </div>\n    <button class=\"button button-block form-button\" type=\"submit\">Signup</button>\n    <div class=\"button button-full button-clear button-light\" ng-click=\"toLogin()\">\n      Login\n    </div>\n  </form>\n</div>");
$templateCache.put("dish-transactions/dish-transactions-modal.html","<ion-modal-view class=\"modal transactions\" ng-controller=\"dishTransactionsController\">\n	<div class=\"title\">History</div>\n	<div class=\"nav-icon right close-icon\" ng-click=\"closeModal()\"></div>\n  <ion-scroll class=\"cards\" direction=\"x\" scrollbar-x=\"false\" paging=\"true\" on-scroll=\"onScroll()\">\n  	<div collection-repeat=\"transaction in transactions\" item-width=\"getCardWidth(transaction, $index)\" item-height=\"getCardHeight(transaction, $index)\">\n  		<div class=\"card-holder transaction\">\n				<div class=\"card\">\n					<div class=\"card-image\" style=\"background-image:url({{transaction.photo}});\"></div>\n	        <dish-input ng-model=\"transaction.name\" placeholder=\"Name\" readonly=\"true\"></dish-input>\n	        <dish-input ng-model=\"transaction.ingredients\" placeholder=\"Ingredients\" readonly=\"true\"></dish-input>\n	        <dish-input class=\"half\" ng-model=\"transaction.portions\" placeholder=\"Portions\" readonly=\"true\"></dish-input>\n	        <dish-input class=\"half\" ng-model=\"transaction.price\" placeholder=\"Price\" readonly=\"true\"></dish-input>\n	        <dish-button text=\"View Meal\"></dish-button>\n				</div>\n			</div>\n  	</div>\n	</ion-scroll>\n</ion-modal-view>");}]);