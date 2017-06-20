(function(){

  angular
    .module('app.books')
    .factory('Books', bookService);
   
  bookService.$inject = ['$http'];

  function bookService($http) {
    let service = {
      get: getBook,
      create: createBook,
      update: updateBook,
      del: deleteBook
    };
   
    return service;
   
    function getBook() {
      return $http.get('/app/books/books.json');
    }

    function createBook() { }
    function updateBook() { }
    function deleteBook() { }
  }

})();
