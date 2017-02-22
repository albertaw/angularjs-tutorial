# Angular 

Angular is a framework for organizing web apps.  It uses a MVVM (Model-View-ViewModel) architecture. This means that we can update our view with data in our model as well as update our model with data bound to our view. As such, angular would be best suited for apps with rich user interfaces and single page applications.

### Getting started

You can begin by scaffolding your project.  This is how you might organize your files for a simple project:

```
project/
|-- cs/
|
|-- js/
|   |-- controllers/
|   |-- directives/
|   |-- services/
|   |-- vendor/
|   |__ app.js
|
|-- views/
|
|__ index.html
```

The `app.js` file will be your entry point into your app that's responsible for creating the module, setting up routes, and any other configurations.  The `index.html` file is the base file for your single page application. This is where your different views will be included.  Here is an example file:

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
      <ng-view></ng-view>
    </div>
    <!-- vendor libraries-->
    <!-- modules -->
    <!-- controllers -->
    <!-- directives -->
    <!-- services -->
  </body>
</html>
```

To use Angular you will need to include the library in the head of the index file for your app. You can [download](https://angularjs.org/) the file to your project and link the script or add this script that is hosted on Google:

```html
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.1/angular.min.js"></script>
```

### Modules 
The first step to create an angular app is to define a module.  A module is a container for our application code. It is a good practice to define the module in a file of its own.  In the following example a module named `app` is created. 

```js
//app.js

angular.module("app", []);
```
The `[]` is used to inject dependencies into your app, such as third party libraries, other modules or services.  Add `app.js` to your index file.  In the view we include the module in our html using the ng-app directive.  A directive is an html attribute that adds functionality to elements. Angular directives will begin with `ng-`. This following example initializes our Angular application.

```html
<html ng-app=“app”>
```

### Controllers
The glue that connects the model to our view is the controller. The controller can be thought of as a class for your application. It will hold the logic to control your data. Here is how we create a controller that is connected to our `app` module. 

```js
//book.controller.js

angular.module("app").controller('BookController', BookController);

function BookController() {
  this.appTitle = “My Book Store”;
  this.books = [
    {author: “Charles Dickens”, title: “Oliver Twist”, isbn: 1234},
    {author: “Charles Dickens”, title: “Tale of Two Cities”, isbn: 5678}
  ];
  this.addBook = function(book) {
this.books.push(book)
};
}
```

Using controllerAs syntax we can implement our Book function as a javascript object using `this` instead of `$scope`.  To use the controller we link `BookController.js` to our index file and use the `ng-controller` directive in the view.

```html
<body ng-controller="BookController as bookCtrl">
```

### Data binding

If we want to use the data from our controller in our view, we could add the following to our html:

```html
<h1>{{ bookCtrl.appTitle }}</h1>
```
The curly braces are used to make expressions.  An expression is something that will result in a value.  The content inside our example will evaluate to “My Book Store”. If we want to display data that is in an array, we can use the `ng-repeat` directive to loop through the array. The syntax is `ng-repeat="item in list"` where `list` is the name of the array and `item` is a variable that represents the current element. Example:

```html
<!-- index.html -->
<body ng-controller="BookController as bookCtrl">
<div ng-repeat="book in bookCtrl.books">
    <div>{{ book.author }}</div>
<div>{{ book.title }}</div>
</div>
</body>
```

If we want to link data in our view to our controller, we can use the `ng-model` directive.  This can be used on input fields, select elements, or any other form element.  Example:

```html
<input type=“text” ng-model="bookCtrl.appTitle">
```

When data is entered into this input field, it will update the data in our controller for our appTitle property. 

## Directives

When we want to make our own reusable HTML components, or if we need to manipulate the DOM in any way we can create our own directive. Example:

```js
//book-info.directive.js

angular.module(‘app').directive('bookInfo', bookInfo);

function bookInfo() {
var directive = {
    restrict: 'EA',
    templateUrl: 'book-info.directive.html',
    scope: {
      data: '='
    },
    controller: 'BookController',
    controllerAs: 'bookCtrl',
  };

  return directive;
}
```
The first argument passed into the directive function is its name. The second argument is a function that configures the directive. The `restrict` property specifies how the directive will be used. In the above example `’EA’` means the directive can only be called as an `E`lement:

```html
<book-info></book-info>
```
Or as an `A`ttribute:

```html
<div book-info></div>
```
We could have also called our directive using class or comment syntax.  Note how the directive was named `bookInfo` but it was written as `book-info` in the html. If a directive name will have more than one word in it, camelcase should be used to define it.  When the directive is invoked in the html, it should use all lowercase and each word should be separated with a hyphen. 

The `templateUrl` is the file path to the template code. The `scope` property is used to set a directive's scope. This is useful so that we can link the data in our controller to this particular view.  Inside the scope property we specify the name of the attribute we will use inside the directive, `form`, to pass in our data and set the value to `’=’` to specify how the data is assigned.  Here is our template:

```html
<!-- book-info.directive.html -->

<div>{{ data.author }}</div>
<div>{{ data.title }}</div>
```

In the main view  we can replace the html that shows our books with this directive:

```html
<body ng-controller="BookController as bookCtrl">
<div ng-repeat="book in bookCtrl.books">
    <book-info data=”book”></book-info>
</div>
</body>
```

### Routing
If you want to make an app with multiple views, you can use routing. Routing lets us map our views to a controller.  To get started with routing add the `ngRoute` module as a dependency to your app:

```js
angular.module('app', ['ngRoute']);
```

Then add the library to the head of your html file, below the angular library.  You can use the following script:

```html
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.1/angular-route.js"></script>
```

Next, configure your routes:

```js
//app.js

angular.module(‘app’).config(config);

function config($routeProvider){
$routeProvider
   .when('/books', {
    templateUrl: ‘/main.html’,
        controller: 'BookController',
    controllerAs: ‘bookCtrl’
  });
};
```

When you implement routing, you do not need to attach the controller to the view because the controller is already specified in the routes. In your index page, include the ng-view directive where you want to inject your views.  When you request a route, for example the '/books' route, main.html will be injected into ng-view and the code in the BookController will be executed.

```html
<!-- index.html -->

<!Doctype html>
<html ng-app=”app”>
<head>
</head>
<body>
        <ng-view></ng-view>
        </body>
</html>
```

```html
<!-- main.html -->

<h1>{{ bookCtrl.appTitle }}</h1>
<div ng-repeat="book in bookCtrl.books">
    <book-info data=”book”></book-info>
</div>
```

### Services and factories

Services and factories let you share code across your app. The benefit is you can use functions independent of any controller.  The difference between a service and a factory is that a service uses the `this` keyword to define public properties and a factory returns an object.  A service may be something you use inside a factory. An example service is angular’s $http service which lets you fetch data from a server. To use a service or factory, you inject it as a dependency in your controller. Here is an example factory:

```js
//book.service.js

angular.module(‘app’).factory('bookService', bookService);

function bookService() {
  var service = {
    get: getBook,
    create: createBook,
    update: updateBook,
    delete: deleteBook
};

return service;

function getBook() {...}
function createBook() {...}
function updateBook() {...}
function deleteBook() {...}
}
```
in the controller:

```js
angular.module("app").controller('BookController', BookController);

BookController.$inject = [‘bookService’];

function BookController(bookService) {...}
```

## Testing

### Unit testing

We can use a testing framework like Jasmine to write our unit tests and a test runner like Karma to automate our tests.  You will also need node to install Jasmine and Karma to your computer.  First, download the node installer from here: [https://nodejs.org].  Double click the file and follow the instructions in the installation prompt.  Confirm node installed successfully by typing the command `node -v` from the terminal.  If all is well, you will see the version number printed out.  Next install Jasmine:

```bash 
//install globally
$ npm install -g jasmine
//install locally
$ npm install jasmine
```

Next create the test file to test your controller:

```js
//book.controller.spec.js

describe(‘Book Controller’, function() {

var bookCtrl;

  beforeEach(function () {
    //load the module
    module('app');

    //locad the controller
    inject(function ($controller) {
          bookCtrl = $controller('BookController');
      });
  });

  it(‘should have the title “My Book Store”’, function() {
    expect(bookCtrl.appTitle).toEqual(‘My Book Store’); 
  });
  
});
```

The `describe` block groups related tests together.  It contains one or more it blocks.  The `it` block is the test or spec.  An it block contains one or more expectations. The `expect` function is an assertion that is either true or false.  It takes the form `expect(actual_value).matcherFn(expected_value)` where matcherFn is a matcher function that specifies what we are testing.  Here is a list of matcher functions:

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

Next, we will set up our test runner Karma. 

```bash
//install globally
$ npm install -g karma
//install locally
$ npm install karma
//create a configuration file named `karma.conf.js`
$ karma init karma.conf.js
```

Add the following files to the karma config file:

- Angular
- Angular-mocks
- App source files
- App test files

Run the tests:
```bash
$ karma start 
```

### End-to-end testing

To automate browser tests, you can use the test framework Protractor.  Install the following:

```bash
//install protractor and the webdriver-manager tool globally
$ npm install -g protractor
//install the Selenium server and the ChromeDriver
$ webdriver-manager update
```
The webdriver-manager creates a Selenium server.  The purpose of this server is to send your test commands to the browser and return the response back to your test script.

By default Protractor uses Jasmine.  At the beginning of your tests, you will need to open the webpage you want to test:
```js
browser.get(‘url’);
```

To do your tests you will need to find the element using a locator and do something with it using an action. Your jasmine test will have this format: `expect(locator.action()).matcher()`
Locators:

```js
//<div ng-model=’myModel’></div>
element(by.model(‘myModel’))

//<div>{{ myExpression }}</div>
element(by.binding(‘myExpression’))

//find by id
element(by.id(‘myId’))

//find by css selector
element(by.css(‘myClass’))
 ```
Actions:

```js
locator.sendKeys(‘example’)
locator.click()
locator.getText()
locator.clear()
locator.getAttribute(‘value’)
locator.isDisplayed()

//get number of elements.
element.all(locator).count();

//get element by index (starting at 0).
element.all(locator).get(index);

//get first or last element
element.all(locator).first();
element.all(locator).last();
```

Create a config file named `conf.js` with the following in it:

```js
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['path/to/spec.js'],
};
```
By default tests will run in a chrome browser.  To change the browser, add this to your config:

```js
capabilities: {
    browserName: 'firefox'
  }
```

To run on multiple browsers use this:

```js
multiCapabilities: [{
    browserName: 'firefox'
  }, {
    browserName: 'chrome'
  }]
```


To run the tests first start the Selenium server:
```bash
$ webdriver-manager start
```

Then, in another terminal window start the tests:
```bash
protractor conf.js
```
## Resources

- [Codecademy AngularJS tutorial](https://www.codecademy.com/learn/learn-angularjs)
- [Angular style guide](https://github.com/johnpapa/angular-styleguide)
- [Jasmine testing framework](http://jasmine.github.io)
- [Karma test runner](http://karma-runner.github.io/1.0/index.html)
- [Protractor: end to end testing for AngularJS](http://www.protractortest.org)
- [BrowserStack cross-browser testing tool](https://www.browserstack.com)
- [SauceLabs automated browser testing](http://saucelabs.com)


