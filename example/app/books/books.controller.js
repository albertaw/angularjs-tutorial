(function() {

	angular
		.module('app.books')
		.controller('BookController', BookController);
	 
	BookController.$inject = ['Books'];

	function BookController(Books){
		let vm = this;

		Books.get().then(function(response) {
	  	vm.books = response.data;
	  }, function(error){
	  	console.log(error);
	  });

	}

})();