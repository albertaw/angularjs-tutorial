(function() {
	angular
		.module('app.books')
		.directive('bookInfo', bookInfo);
 
	function bookInfo() {
		let directive = {
	    restrict: 'EA',
	    templateUrl: 'app/books/book-info.html',
	    scope: {
	      data: '='
	    },
	    controller: 'BookController',
	    controllerAs: 'bookCtrl',
		};
		 
	  return directive;

	}
})();