(function() {

	angular
		.module('app.books')
		.controller('BookController', BookController);
	 
	BookController.$inject = ['Books', '$routeParams'];

	function BookController(Books, $routeParams){
		let vm = this;

		Books.get().then(function(response) {
	  	vm.books = response.data;
	  	vm.book = vm.books[$routeParams.bookId];
	  }, function(error){
	  	console.log(error);
	  });
	}

})();