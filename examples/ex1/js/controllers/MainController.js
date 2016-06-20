app.controller('MainController', function($scope, users){
	
	$scope.users;
	
	users.then(function(response){
		$scope.users = response.data;
	}, function(error){
		console.log(error);
	});

});