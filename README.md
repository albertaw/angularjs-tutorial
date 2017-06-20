Angular
====== 
 
Are you building a web applications with pages that need to be created dynamically? Do you need to write logic in your HTML?  Are your pages interactive and use JavaScript? If your are building a non trivial website that uses more than HTML and CSS, you will more than likely benefit from using a front end framework like Angular. Angular allows you to organize your code and give it structure plus it is capable of solving the aforementioned problems and then some.  This tutorial will walk you through building a web app for a bookstore using Angular.  You should already have an understanding of JavaScript.
 
Table of Contents
------------------------
 
- [Getting Started](#getting-started)
- [Controllers](#controllers)
- [Testing with Jasmine and Karma](#testing-with-jasmine-and-karma)
- [Services and Factories](#services-and-factories)
- [Unit Testing Services](#unit-testing-services)
- [Directives](#directives)
- [Unit Testing Directives](#unit-testing-directives)
- [Automating Tests](#automating-tests) 
- [Routing](#routing)
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
 
To get started, create an `index.html` file. Create a lib folder and save a copy of the Angular library to it.  You can download Angular from here: [https://angularjs.org/]. Include the script in the head of your file.  Next, create an `app` folder with an `app.module.js` file inside.  This file will define our Angular app and be responsible for tying together all other modules. A module is a container for our application code. It is a good practice to define modules in a file of their own.  In the following example a module named `app` is created. 
 
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
 
Testing with Jasmine and Karma
--------------------------------------------
 
Thus far, we have been testing our code by refreshing our browser.  This is ok, but we also need to unit test our code.  We can use a testing framework like Jasmine to write our unit tests and a test runner like Karma.  Using Karma allows us to run our tests from the command prompt, which in my opinion is more convenient.  
 
Create a file named books.controller.spec.js and save it in the books folder. Add the following to the file:
 
```javascript
//books.controller.spec.js
 
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
```
 
The `describe` block groups related tests together.  It contains one or more it blocks.  The `it` block is the test or spec.  An it block contains one or more expectations. The `expect` function is an assertion that is either true or false.  Expectations take the form:

 ```javascript
 expect(actual_value).matcherFn(expected_value)
 ``` 

 Where matcherFn is a matcher function that specifies what we are testing. Here is a list of matcher functions:
 
- expect(x).toBe(obj)  
- expect(x).toEqual(val)
- expect(x).toMatch(regex)
- expect(x).toBeDefined() 
- expect(x).toBeUndefined() 
- expect(x).toBeNull()
- expect(x).toBeTruthy() 
- expect(x).toBeFalsy()
- expect(x).toContain(y)
- expect(x).toBeLessThan(y)
- expect(x).toBeGreaterThan(y)
- expect(x).toBeCloseTo(min, max)
- expect(x).toThrow(y)
- expect(x).toThrowError()
 
Any of the matcher functions can be inverted by adding `not` before it like this:  
- expect(x).not.toBe(obj)
- expect(x).not.toEqual(val)
- expect(x).not.toBeNull()
 
Other methods you can use include:
- beforeEach(callback) - called before each it block
- afterEach(callback) - called after each it block
- beforeAll(callback) - called before all it blocks
- afterAll(callback) - called after all it blocks
 
Next, we will use the node package manager to install both Jasmine and Karma to our computer. First, download the node installer from here: [https://nodejs.org].  Double click the file and follow the instructions in the installation prompt.  Confirm node installed successfully by typing the command `node -v` from the terminal.  If all is well, you will see the version number printed out.  Now install Jasmine:
 
```bash 
install jasmine globally
$ npm install -g jasmine
install jasmine-core globally
$ npm install -g jasmine-core
```
 
Install Karma:
 
```bash
install karma globally
$ npm install -g karma
```
 
Next, we will set up our test runner Karma. 
 
```bash
$ karma init 
```
 
When you are prompted to add the files you will give the file paths for angular, angular-mocks, the books module, the books controller, and the books test file.  
 
Run the tests:
```bash
$ karma start 
```
 
You should see a browser open up and in the terminal window a green “SUCCESS”.
 

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
 
Unit Testing Services
-----------------------------
 
**[Back to top](#table-of-contents)**
 
Directives
--------------
 
**[Back to top](#table-of-contents)**
 
Unit Testing Directives
-------------------------------
 
**[Back to top](#table-of-contents)**
 
Automating Tests
------------------------
 
**[Back to top](#table-of-contents)**
 
Routing
-----------
 
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
 
 
 
 
 
 
