Angular
====== 
 
Are you building a web applications with pages that need to be created dynamically? Do you need to write logic in your HTML?  Are your pages interactive and use JavaScript? If your are building a non trivial website that uses more than HTML and CSS, you will more than likely benefit from using a front end framework like Angular. Angular allows you to organize your code and give it structure plus it is capable of solving the aforementioned problems and then some.  This tutorial will walk you through building a web app for a bookstore using Angular.  You should already have an understanding of JavaScript.
 
Table of Contents
------------------------
 
- [Getting Started](#getting-started)
- [Controllers](#controllers)
- [Services and Factories](#services-and-factories)
- [Routing](#routing)
- [Directives](#directives)
- [Automating Browser Tests with Protractor](#automating-browser-tests-with-protractor)
- [Resources](#resources)
 
Getting started
--------------------

Our first task will be to build a "hello world" application. It will contain a single web page that displays the text "hello world." The purpose is to get our project set up so that we can continue building upon it.  This is how we will organize our files for our project:
 
```
project/
|-- index.html
|-- assets/  
|-- styles/
|-- views/
|-- lib/
|_ app/
  |-- app.module.js
  |-- app.config.js
  |-- app.routes.js
  |-- core/
  |   |--constants.js
  |   |--filters.js
  |_ feature/
     |-- feature.module.js
     |-- feature.controller.js
     |-- feature.controller.spec.js
     |-- feature.directive.js
     |-- feature.directive.spec.js
     |-- feature.html
     |-- feature.service.js
     |-- feature.service.spec.js
     |-- feature.routes.js
     |-- feature.css
```
 
This directory structure groups our code by feature.  This setup is preferable because it is more scalable and maintainable. It modularizes our code allowing us to encapsulate related functionality.  And it is easier to read because developers know where to find related files.  The `index.html` file is the base view for our application. This is where other views will be included.  Here is an example file:
 
```html
<!Doctype html>
<html>
  <head>
    <!-- meta tags -->
    <!-- stylesheets -->
    <!-- angular libraries -->
  </head>
  <body>
    <div>
      <!-- view injection -->
    </div>
    <!-- vendor libraries-->
    <!-- modules -->
    <!-- routes -->
    <!-- controllers -->
    <!-- directives -->
    <!-- services -->
  </body>
</html>
```
 
To get started, create an `index.html` file. Create a lib folder and save a copy of the Angular library to it.  You can download Angular from here: [https://angularjs.org/]. Or you can include this script in the head of your file:

```html
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.1/angular.min.js"></script>
```

Next, create an `app` folder with an `app.module.js` file inside.  This file will define our Angular app and be responsible for tying together all other modules. A module is a container for our application code. It is a good practice to define modules in a file of their own.  In the following example a module named `app` is created. 
 
```javascript
//app.module.js
 
angular.module("app", []);
```
The `[]` is used to inject dependencies into your app such as other modules.  Add the link to `app.module.js` to your index file.  In the view we initialize our Angular application using the `ng-app` directive and assigning it the name of our main module.
 
```html
<html ng-app="app">
```
 
You can now open your app in a browser.  To check for errors we can inspect the browser’s console.  Right now there isn’t anything interesting to see.  So let’s make Angular do something.  We will now show the words hello world on the page.  Add the following inside your `div` tag:
 
```html
<div ng-init="greeting='hello world'">
```
 
This creates a variable for us named "greeting" that has the value "hello world." To use the variable we can put it inside of an expression.  The expression should be nested inside of the element that the variable was initialized in.  Expressions in Angular use double curly braces like this:
 
```html
{{ greeting }}
```
 
 An expression is something that will result in a value. When we refresh our browser we will see the value of `greeting` which is "hello world."

 
**[Back to top](#table-of-contents)**
 
Controllers
---------------

The glue that connects the model to our view is the controller. The controller can be thought of as a class for your application. It will hold the logic to control your data. For our online bookstore we want to show our users what books we have.  We will keep this information in a books module.  Inside our app folder create a folder named `books` with a file named `books.module.js`.  Define the books module in this file.
 
```javascript
//books.module.js
 
angular.module("app.books", []);
```
 
Inject the books module as a dependency of the app module.
 
```javascript
//app.module.js
 
angular.module("app", ["app.books"]);
```
 
Include the script in your index file.  Next create a file named `books.controller.js` in your books directory.  Our controller will just contain a list of books.
 
```javascript
//books.controller.js
 
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
```
 
Include the book controller in your index file. Notice that the code is wrapped in an immediately invoked function expression (IIFE).  This is done to ensure there are no name collisions with the variables we create.  Next, inside our view we will loop through the books array and display each book's title and author. Add the controller to the view:
 
```html
<body ng-controller="BookController as bookCtrl">
```
 
 This setup is known as controllerAs syntax.  The format is *controller_name* as *object_name*.  This allows us to use our book controller like a javascript object.  To loop through the books we will need the `ng-repeat` directive. The syntax is `ng-repeat="item in list"` where `list` is the name of the array and `item` is a variable that represents the current element. Remove the old directive inside our `div` and the expression.  Replace it with this:
 
```html
<div ng-repeat="book in bookCtrl.books">
   <h4>{{ book.title }} by {{ book.author }}<h4>
 </div>
```
 
When we refresh our web browser, we should see **Oliver Twist by Charles Dickens** and **Tale of Two Cities by Charles Dickens**.
 
What makes Angular special is a feature called two-way binding. This means that changes to our model will update our view and changes made in our view can update our model.  This is very useful if you are building an application with a rich user interface. If we want to link data in our view to our controller, we can use the `ng-model` directive.  This can be used on input fields, select elements, or any other form element. Add the following element inside your `div`:
 
```html
<input type="text" ng-model="book.title">
```
 
An input field should show beneath each book. When data is entered into this input field, it will change the value of its respective book’s title. 
 
 
**[Back to top](#table-of-contents)**
 
 
Services and factories
------------------------------

Services and factories let you share code across your app. The benefit is you can use functions independent of any controller.  The difference between a service and a factory is how they are implemented.  A service uses the `this` keyword to define public properties and a factory returns an object. An example service is angular’s $http service. Currently, we are storing our books inside of an array in our controller. Instead, we will use a service to get the list of books from a json file.  This is to mimic getting data from an API. 
 
Create a file named books.json and save it to the `books` folder.
 
```
//books.json
 
[
  {
    "title": "Oliver Twist",
    "author": "Charles Dickens",
    "isbn": 1234
  },
  {
    "title": "Tale of Two Cities",
    "author": "Charles Dickens",
    "isbn": 5678
  }
]
```
 
Create a file named `books.service.js` and save it to the `books` folder.  Put the following in the file:
 
```js
//books.service.js
 
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
```
 
Include the file in your `index`   page.  Change the controller to look like this:
 
```js
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
```

In our controller we used `BookController.$inject = ['Books']` so that we could make our Books service available for use in the controller.  Then we passed `Books` inside of the `BookController` function  so that we could access its methods.   Notice how we cached the value of `this` by assigning it to a variable.  This ensures that `this` refers to our Book controller. 


**[Back to top](#table-of-contents)**
  

Routing
-----------
 
If you want to make an app with multiple views, you can use Angular's `ngRoute` module. Routing lets us map URLs to views. Currently, we have one page that shows all of the books.   We will turn this into a view that is injected into our index page when a request is made to `/books`.  To get started, add the `ngRoute` library to the head of your html file.  You can download the library and save it to your lib folder or use can use the following script:
 
```html
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.1/angular-route.js"></script>
```
 
Next, add the `ngRoute` module as a dependency to your books module:
 
```js
//books.module.js
 
angular.module('app.books', ['ngRoute']);
```
 
Now, we will remove the html in our index page that displays the books and put it into its own view.  Create a file named `books.html` and save it to the books folder. Put this inside of it:
 
```html
<div ng-repeat="book in bookCtrl.books">
   <h4>{{ book.title }} by {{ book.author }}<h4>
   <input type="text" ng-model="book.title">
</div>
```
 
Remove the controller from the index page and add the `ng-view` directive.  Your index page should now look like this:
 
```html
<body>
    <div>
        <ng-view></ng-view>
    </div>
```
 
 
On to configuring our routes.  Create a file named `books.routes.js` and save it to the books folder.  Put the following code inside the file:
 
```javascript
//books.routes..js
 
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
    });
  };
 
})();
```
 
Include the routes file in your index page. To view the books route, navigate your browser to the path `/#!/books`.  Angular adds `/#!` to the URL. There are ways to remove it.  Now let’s create a view for each individual book. The first thing we will do is configure the route.  Add the following code to the end of the current route:
 
```javascript
//books.routes.js
 
.when('/books/:bookId', {
  templateUrl: 'app/books/book-detail.html',
  controller: 'BookController',
  controllerAs: 'bookCtrl'
 });
```
 
The part of the path that contains `:bookId` is a parameter.  For this app, we will use the book’s index in the array to represent it’s ID.  Next, we need to update our controller to handle getting a book.  
 
```javascript
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
```
 
First, we inject `$routeParams` into the controller so that we can get the value of the parameter. Then we create a book variable to store the object located at the particular ID.  Finally, we create the html.
 
```html
<!-- book-detail.html -->
 
<h4>{{ bookCtrl.book.title }} by {{ bookCtrl.book.author }}<h4>
```
 
When you navigate your browser to the path `/#!/books/0` you should see the text **Oliver Twist by Charles Dickens**.  And if you navigate to `/#!/books/1` you should see **Tale of Two Cities by Charles Dickens**.
 

**[Back to top](#table-of-contents)**

Directives
--------------
 
**[Back to top](#table-of-contents)**

 
Automating Browser Tests with Protractor
--------------------------------------------------------
 
**[Back to top](#table-of-contents)**
 
Resources
---------------
 
- [Codecademy AngularJS tutorial](https://www.codecademy.com/learn/learn-angularjs)
- [Angular style guide](https://github.com/johnpapa/angular-styleguide)
- [Jasmine testing framework](http://jasmine.github.io)
- [Karma test runner](http://karma-runner.github.io/1.0/index.html)
- [Protractor: end to end testing for AngularJS](http://www.protractortest.org)
- [BrowserStack cross-browser testing tool](https://www.browserstack.com)
- [SauceLabs automated browser testing](http://saucelabs.com)
 
 **[Back to top](#table-of-contents)**
 
 
 
 
 
 
