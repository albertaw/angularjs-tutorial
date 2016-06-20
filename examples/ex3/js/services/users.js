//https://github.com/tastejs/todomvc/blob/gh-pages/examples/angularjs/js/services/todoStorage.js
//https://scotch.io/tutorials/node-and-angular-to-do-app-controllers-and-services
app.factory('Users', ['$http',function($http){
	store = {
		data: [],
		get: function() {
			//why does Users.json have to be capitalized?
			return $http.get('js/services/Users.json')
				.then(function(response){
					return response;
			});
		},
		create: function(user) {
			store.data.push(user);
		},
		update: function(user, index) {
			store.data[index] = user;
		},
		del: function(user) {
			store.data.splice(store.data.indexOf(user), 1);
			console.log("deleted user", user.firstname);
		} 
	}
	//initialize list of users
	store.get().then(function(response){
		store.data = response.data.users;
		//console.log(store.data);
	});

	return store;

}]);
	