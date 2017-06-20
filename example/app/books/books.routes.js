(function() {
	angular
		.module('app.books')
		.config(config);
	 
	config.$inject = ['$routeProvider'];
 
	function config($routeProvider){
		$routeProvider
  	 	.when('/books', {
	 			templateUrl: 'app/books/books.html',
	    	controller: 'BookController',
	    	controllerAs: 'bookCtrl'
		  })
		  .when('/books/:bookId', {
		  	templateUrl: 'app/books/book-detail.html',
		  	controller: 'BookController',
	    	controllerAs: 'bookCtrl'
		  });
	};

})();