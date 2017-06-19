describe('Book Controller', function() {
 
  let bookCtrl;
 
  beforeEach(function () {
    //load the module
    module('app.books');
 
    //load the controller
    inject(function ($controller) {
          bookCtrl = $controller('BookController');
      });
  });
 
  it('should have two books', function() {
    expect(bookCtrl.books.length).toEqual(2); 
  });
  
});
