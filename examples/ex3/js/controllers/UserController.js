app.controller('UserController', ['$scope', '$routeParams', 'Users', function($scope, $routeParams, Users){
	
	$scope.users = Users.data;
	$scope.user = $scope.users[$routeParams.id];
	$scope.form = {};
	
	$scope.create = function() {
		if (!jQuery.isEmptyObject($scope.form)) {
			//set user id
			$scope.form.id = Users.data.length;
			console.log($scope.form);
			//add new user
			Users.create($scope.form);
			//update this list of users
			$scope.users = Users.data;
			//clear the form
			$scope.form = {};
			$('.form-control').val(null);	
		} else {
			console.error("No user information given.");
		}
	};
		
	$scope.update = function(user) {
		Users.update(user, user.id);
	};

	$scope.del = function(user) {
		Users.del(user);
	};

}]);
