app.controller('MainController', ['$scope', 'Users', function($scope, Users){
	
	$scope.users;
	//$scope.users = Users.data;
	Users.get().then(function(response){
		//console.log(response.data.users);
		$scope.users = Users.data;
		console.log($scope.users);
	}, function(response){
		console.log(response.statusText);
	});
	
}]);