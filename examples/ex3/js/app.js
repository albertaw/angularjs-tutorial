var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', '$compileProvider', function($routeProvider, $compileProvider){
	$compileProvider.debugInfoEnabled(false);
	
	$routeProvider
	.when('/', {
		controller: 'MainController',
		templateUrl: 'views/main.html'
	})
	.when('/add', {
		controller: 'UserController',
		templateUrl: 'views/addUser.html'
	})
	.when('/:id', {
		controller: 'UserController',
		templateUrl: 'views/editUser.html'
	})
	.otherwise({
		redirectTo: '/'
	});
}]);