app.factory('users', function($http){
	return $http.get('js/services/users.json');
});
	