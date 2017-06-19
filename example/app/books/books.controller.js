(function() {
angular
	.module("app.books")
	.controller('BookController', BookController);
 
function BookController() {
  this.books = [
    {title: "Oliver Twist", author: "Charles Dickens", isbn: 1234},
    {title: "Tale of Two Cities", author: "Charles Dickens", isbn: 5678}
  ];
}
})();