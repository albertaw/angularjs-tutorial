describe('Book service', function() {
 
  let bookService;
  let books;

  beforeEach(function () {
    //load the module
    module('app.books');
 
    //load the service
    inject(function(_Books_) {
      bookService = _Books_;
    });
  });
 
  it('should get books', function() {
    bookService.get().then(function(response){
      books = response.data;
      expect(books.length).toEqual(2); 
    });
    
    
  });
  
});
