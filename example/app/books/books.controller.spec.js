describe('Book Controller', function() {
 
  let bookCtrl;
  let bookService;
  let books;

  beforeEach(function (done) {
    //load the module
    module('app.books');
 
    //load the controller
    inject(function ($controller) {
      bookCtrl = $controller('BookController');
    });

    //load the service
    inject(function(_Books_) {
      bookService = _Books_;
    });

    
    done();
  });
 
  it('should have two books', function(done) {
    
    bookService.get().then(function(response) {
      expect(bookCtrl.books.length).toEqual(2); 
    });
    
    done();
  });
  
});
