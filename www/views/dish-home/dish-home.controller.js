(function() {
	'use strict';

	function DishHomeController($scope, $log, $timeout, $firebaseObject, $firebaseArray, FURL, Auth, dishKeyboardService, dishModalService, dishGalleryService, dishCardsService) {
		var vm = this;
		var url = FURL + '/profile';
		var ref = new Firebase(url);
		vm.cooks = $firebaseArray(ref);

		vm.now = moment();
		vm.hour = vm.now.hours();

		vm.location = 'Current Location';

		vm.timeActive = false;
		vm.cooksLoaded = false;

		vm.cooks.$loaded().then(function(cooks) {
			$log.log('loaded', cooks);
			vm.cooksLoaded = true;
		}).catch(function(error) {
			$log.log('error', error)
		});

		vm.viewCook = function(cook) {
			if (!cook) return;
			vm.activeCard = cook.$id;
			dishCardsService.setActiveCard(true);
			dishCardsService.disable();
			//Populate some stub data with firebase for this user
			stubData(cook);
		};

		vm.closeCook = function() {
			vm.activeCard = null;
			dishCardsService.setActiveCard(false);
			dishCardsService.enable();
		};

		vm.viewMeal = function(meal) {
			if (!meal) return;
			$log.log('viewMeal', meal);
		};

		vm.decreaseOrder = function(meal) {
			if (!meal) return;
			$log.log('decreaseOrder', meal);
		};

		vm.increaseOrder = function(meal) {
			if (!meal) return;
			$log.log('increaseOrder', meal);
		}

		vm.viewDescription = function() {
			$log.log('viewDescription');
		};

		vm.viewReviews = function() {
			$log.log('viewReviews');
		}

		vm.becomeCook = function() {
			$log.log('becomeCook');
		};

		vm.viewCart = function() {
			$log.log('viewCart');
		};

		var stubData = function(cook) {
			//var cookUrl = FURL + '/profile/' + cookId;
			//var cookRef = new Firebase(cookUrl);
			var cookPhotos = [
				'http://expresskitchenindy.com/wp/wp-content/images/gallery/kitchen-remodel-projects/kitchen_contemporary3.jpg',
				'http://autovim.com/wp-content/uploads/2015/11/Best-Kitchen-Island-Designs-Modern-With-Photo-Of-Interior-For-Fresh-On-Images.jpg',
				'https://lh4.ggpht.com/eWXdc61Wo__Am8rLUKwQD-x_PC5ru9dE6ayoS_r1FH4YRk-ji4OzFM23VrFdihZQhg=h900',
				'https://lh6.ggpht.com/BnDGDfI0tHGiRPBQnTb3GkD1W8B7zmQfosDVrMVK0lJDUU1Upa988qCv4l_0OvzZkJM=h900',
				'https://33.media.tumblr.com/tumblr_m3rhjx9dtN1qh6qsx.jpg'
			];

			//Cook and Kitchen Photos
			cook.cookPhotos = cookPhotos;

			//Cook Metadata
			cook.verified = true;
			cook.phone = '780-934-5426';
			cook.address = '11432 78 Ave NW';

			//Cook Delivery Options
			cook.delivery = {
				enabled: true,
				price: '$2'
			};

			cook.pickup = {
				enabled: true
			};

			cook.dineIn = {
				enabled: true,
				price: '$5',
				seats: 20
			}

			var schedule = [{
				day: 'Monday',
				startTime: '9:00',
				endTime: '20:00'
			}, {
				day: 'Tuesday',
				startTime: '9:00',
				endTime: '20:00'
			}, {
				day: 'Wednesday',
				startTime: '9:00',
				endTime: '20:00'
			}, {
				day: 'Thursday',
				startTime: '9:00',
				endTime: '20:00'
			}, {
				day: 'Friday',
				startTime: '9:00',
				endTime: '20:00'
			}, {
				day: 'Saturday',
				startTime: '9:00',
				endTime: '20:00'
			}, {
				day: 'Sunday',
				startTime: '9:00',
				endTime: '3:00'
			}];

			//Cook Schedule (This isn't shown to the user on the f/e)
			cook.schedule = schedule;

			var exceptions = [{
				startDate: '03/11/2016', //DD/MM/YYYY
				endDate: '05/11/2016'
			}, {
				startDate: '12/12/2016',
				endDate: '12/30/2016'
			}];

			//Exceptions Schedule (This isn't shown to the user on the f/e)
			cook.exceptions = exceptions;

			//Cook Description
			cook.description = 'I am passionate about wholesome and thoughtful cooking.  My cooking style is meant to be an exploration of diverse textures and flavours in a way that delivers a nutritious and satisfying meal.  Growing up in Canada, I’ ve never felt limited to stick with the culture of my birth - country(Iran).  Because of this multiculturalism, along with the wide variety of food available all the time, I take a higher - level approach to buying ingredients and making food.  This way, I focus on health, quality, and experience rather than attempting to follow a custom.  The skill that sets me apart in my cooking is the ability to accurately predict whether a diverse combination of ingredients will result in a delicious and well - balanced meal.  For example, it’ s[sometimes] possible to combine ingredients that are typically served sweet in a dish that is savoury and have it turn out amazing(such as in my vanilla parmesan chicken).  Therefore, when you taste my food, I want to pleasantly surprise you and expand your imagination about the combinations of ingredients that are possible while you take each bite and say“ SO GOOD”.  In regards to health, I have thoroughly studied safe food - handling procedures and the transfer mechanisms of foodborne illnesses, in addition to having been formally trained in aseptic technique and preparation for sterile surgeries in a laboratory setting.  I only buy and use fresh ingredients but I’ m also additionally incentivized to do this because when I cook for you, I’ m cooking for myself too.  For fun, I like to design and write.  In Edmonton I’ ve designed approximately 25 homes(which have been built / are being built) and I maintain a blog of ideas about improving life in the future.  I also love to be outdoors.  Whenever I have the chance, I like to go to the rocky mountains for camping and hiking.';

			var meals = [{
				name: 'Vegan Stir Fry',
				image: 'http://graphics8.nytimes.com/images/2011/11/08/health/well_veggie_stir2/well_veggie_stir2-blog480.jpg',
				description: 'Featuring a wholesome vegan stir fry that\'s balanced with roasted veggies, nuts, and sauciness. The stir fry will include celery, mushrooms, carrots (organic), chopped almonds, pumpkin seeds, bell peppers, ginger, spicy hummus (for sauciness that\'s vegan), rice noodles, fried in extra virgin olive oil, and extra virgin organic coconut oil (makes the carrots super-yummy).',
				price: '$5.00', //If the customerId's rating is low, we'll raise the prices on the server end so that the customer has to pay more
				ingredients: [
					'celery',
					'mushrooms',
					'organic carrots',
					'chopped almonds',
					'pumpkin seeds',
					'bell peppers',
					'ginger',
					'spicy hummus',
					'rice noodles',
					'extra virgin olive oil',
					'organic extra virgin coconut oil'
				]
			}, {
				name: 'Parmesan Chicken',
				image: 'http://www.missouriwomenbloggers.com/wp-content/uploads/2014/10/Nicole-Foodie-Friday-Post-finished.jpg',
				description: 'Featuring parmesan chicken, served with linguini in a mushroom alfredo sauce. Ingredients are chicken breast (hormone-free, free-range), bread crumbs, extra-virgin olive oil, parmesan cheese, a very small amount of vanilla (the authentic mexican kind), linguine, mushrooms, garlic (fried), and parsley (on the side). A gluten-free version is also available that substitutes the linguine for a baked potato and no bread-crumbs on the chicken breast.',
				price: '$8.00',
				ingredients: [
					'parmesan cheese',
					'chicken breast',
					'linguine',
					'mushrooms',
					'alfredo',
					'olive oil',
					'fried garlic',
					'parsley',
					'vanilla'
				]
			}, {
				name: 'Pizza',
				image: 'http://static5.businessinsider.com/image/53908351ecad04ca746ba577-480/pizza-hut-cmo-sp.jpg',
				description: 'So good you won\'t know what to do with yourself.',
				price: '$10.00',
				ingredients: [
					'cheese',
					'pepperoni',
					'ham',
					'whole wheat crust',
					'pasta sauce'
				]
			}, {
				name: 'Lasagna',
				image: 'http://static.food2fork.com/29439_vegan_lasagna_2_620c9bf.jpg',
				description: 'If Garfield approves of our Lasagna, you will too!',
				price: '$15.00',
				ingredients: [
					'layered noodles',
					'ricotta cheese',
					'cheddar',
					'pasta sauce',
					'spinach'
				]
			}, {
				name: 'Dragon Roll',
				image: 'https://sparkpeo.hs.llnwd.net/e4/nw/8/7/l873222782.jpg',
				description: 'So good, you\'ll think we were Japanese. Even though we\'re not.',
				price: '$5.00',
				ingredients: [
					'rice',
					'seaweed',
					'lobster',
					'crab',
					'special sauce'
				]
			}];

			//Cook Meals
			cook.meals = meals;

			var reviews = [{
				rating: 5,
				description: 'Love the Parmesan Chicken!',
				reviewer: 'otherUserId'
			}, {
				rating: 5,
				description: 'The Vegan Stir Fry is to die for!',
				reviewer: 'otherUserId'
			}, {
				rating: 4,
				description: 'Great food, would love some more meat options!',
				reviewer: 'otherUserId'
			}, {
				rating: 4,
				description: 'Incredible!',
				reviewer: 'otherUserId'
			}, {
				rating: 1,
				description: 'I hate everything',
				reviewer: 'otherUserId'
			}];

			//Cook Reviews
			cook.reviews = reviews;

			//Cook Orders (This is for any incoming orders the cook may currently have coming in)
			var orders = [{
				meals: [{
					mealId: 'mealId',
					name: 'Parmesan Chicken',
					price: '$10.00',
					quantity: 5 //Customer cannot order more of a quantity than the cook has, and quantity can't be 0
				}, {
					mealId: 'otherMealId',
					name: 'Vegan Stir Fry',
					price: '$10.00',
					quantity: 3
				}],
				date: '02/11/2015 5:00PM',
				delivery: 'delivery', //If it's a delivery, deliveryInfo is required
				deliveryInfo: 'Address is #8128 102 Street NW Edmonton, AB, please call 780.265.3416 upon arrival',
				customer: 'otherUserId', //We can use the customerId to display a customer rating to the cook so they can make an informed decision on whether to accept the order or not
				subtotal: '$53.00',
				deliveryCharges: '$10.00',
				customerModifier: '-$1.00', //If a customer is a good customer and is high rated, they can receive discounts on meals they purchase automatically. Alternatively, if they're low rated, they'll be charged more. This is all calculated server side.
				promotionCode: null,
				promotionModifier: null,
				dishFee: '$10.00',
				taxes: '$5.00',
				orderStatus: 'pending', //Can be either pending, approved, or rejected. If rejected, a rejectionReason must be provided.
				rejectionReason: null
			}, {
				meals: [{
					mealId: 'mealId',
					name: 'Parmesan Chicken',
					price: '$10.00',
					quantity: 1
				}],
				date: '02/11/2015 1:00PM',
				delivery: 'pickup',
				customer: 'otherUserId',
				subtotal: '$13.00',
				deliveryCharges: '$0.00',
				customerModifier: null, //This customer is in neutral standing
				promotionCode: null,
				promotionModifier: null,
				dishFee: '$1.00',
				taxes: '$0.50',
				orderStatus: 'approved', //Once approved, the cook's address is shown to the customer
				rejectionReason: null
			}, {
				meals: [{
					mealId: 'mealId',
					name: 'Vegan Stir Fry',
					price: '$10.00',
					quantity: 2
				}],
				date: '02/10/2015 5:00PM',
				delivery: 'dineIn', //Can be delivery,pickup,or dineIn
				reservationTime: '02/11/2015 9:00PM', //If the customer picks dineIn, they must choose a reservationTime
				reservationSeats: 2, //How many seats they need
				remainingReservationSeats: 1, //How many seats the cook currently has available at that time. The cook can set how many seats they have available if they've picked the dineIn option, and we can automatically catch this on the front end if the reservation won't work, but we'll do this logic on the server as well anyways
				customer: 'otherUserId', //We can use the customerId to display a customer rating to the cook so they can make an informed decision on whether to accept the order or not
				subtotal: '$23.00',
				deliveryCharges: '$15.00',
				customerModifier: '$2.00',
				promotionCode: null,
				promotionModifier: null,
				dishFee: '$6.00',
				taxes: '$3.00',
				orderStatus: 'rejected', //Can be either pending, approved, or rejected. If rejected, a rejectionReason must be provided.
				rejectionReason: 'Sorry, but we are all booked up for the night'
			}];

			cook.orders = orders;

			//Transactions History (Meals the cook has ordered from Dish), even the one they just entered miliseconds ago.
			var transactions = [{
				meals: [{
					mealId: 'mealId',
					name: 'Big Ben Burger',
					price: '$10.00',
					quantity: 3
				}],
				date: '02/16/2015 4:00PM',
				delivery: 'pickup',
				customer: 'myProfileId',
				cookId: 'cookId',
				subtotal: '$43.00',
				deliveryCharges: '0.00',
				customerModifier: '-$2.00', //If a customer is a good customer and is high rated, they can receive discounts on meals they purchase automatically. Alternatively, if they're low rated, they'll be charged more.
				promotionCode: 'WELCOME',
				promotionModifier: '-$10.50', //If it's for a free meal, the promotionModifier can never discount more than the total of the meal.
				dishFee: '$12.00',
				taxes: '$5.50',
				orderStatus: 'approved', //Once approved, the cook's address is shown to the customer
				rejectionReason: null
			}, {
				meals: [{
					mealId: 'mealId',
					name: 'Pizza For Days',
					price: '$10.00',
					quantity: 1
				}],
				date: '01/10/2015 1:00PM',
				delivery: 'delivery',
				deliveryInfo: 'Address is #8128 102 Street NW Edmonton, AB, please call 780.265.3416 upon arrival',
				customer: 'myProfileId',
				cookId: 'cookId',
				subtotal: '$8.00',
				deliveryCharges: '$2.00',
				customerModifier: '-$2.00',
				promotionCode: 'FREE',
				promotionModifier: '-$10.50',
				dishFee: '$1.00',
				taxes: '$0.50',
				orderStatus: 'approved', //Once approved, the cook's address is shown to the customer
				rejectionReason: null
			}];

			cook.transactions = transactions;

			//Promotions (Promotions that either Dish has given to the user or the user has earned) All the Promotions that Dish has will be available in the Promotions Firebase section (That will eventually be utilized with the Promotions creator)
			var promotions = [{
				promotionId: 'promotionId',
				name: 'Welcome to Dish',
				code: 'WELCOME',
				description: 'Thanks for joining Dish! Have a free meal on us.'
			}, {
				promotionId: 'promotionId',
				name: 'One of Us',
				code: 'COOK',
				description: 'Thanks for contributing to Dish by posting a meal! Your next one\'s on us.'
			}, {
				promotionId: 'promotionId',
				name: 'We are legion',
				code: 'ASSIMILATE',
				description: 'Thanks for helping Dish grow by inviting one of your friends! We hope both of you enjoy a free meal of your choosing on the house!'
			}, {
				promotionId: 'promotionId',
				name: 'Get Better Soon',
				code: 'SORRY',
				description: 'We\'re sorry to hear that you got sick using Dish, so please let us make it up to you by offering you this free meal.'
			}];

			cook.promotions = promotions;

			//Nested value test
			var nested = [{
				name: 'Hi'
			}];

			cook.nested = nested;

			vm.cooks.$save(cook);
		}

		//Handle animating out any model changes that may have occurred
		vm.changed = function(cook, key) {
			if (!cook) return false;
			if (!cook.animating) return false;
			if (!vm.cooksLoaded) return false;
			var animating = cook.animating;
			var valueIsChanged = _.contains(animating, key);
			//$log.log('valueIsChanged', animating, valueIsChanged);
			return valueIsChanged;
		};

		vm.cardIsActive = function(cook) {
			if (!cook) return;
			if (cook.$id === vm.activeCard) {
				return true;
			}
			return false;
		};

		vm.selectTime = function() {
			if (vm.timeActive) {
				vm.timeActive = false;
			} else {
				vm.timeActive = true;
			}
		};
	}

	DishHomeController.$inject = ['$scope', '$log', '$timeout', '$firebaseObject', '$firebaseArray', 'FURL', 'Auth', 'dishKeyboardService', 'dishModalService', 'dishGalleryService', 'dishCardsService'];

	angular.module('dish.home')
		.controller('dishHomeController', DishHomeController);
})();