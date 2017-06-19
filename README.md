Angular
====== 
 
Are you building a web applications with pages that need to be created dynamically? Do you need to write logic in your HTML?  Are your pages interactive and use JavaScript? If your are building a non trivial website that uses more than HTML and CSS, you will more than likely benefit from using a front end framework like Angular. Angular allows you to organize your code and give it structure plus it is capable of solving the aforementioned problems and then some.  This tutorial will walk you through building a web app for a bookstore using Angular.  You should already have an understanding of JavaScript.
 
Table of Contents
------------------------
 
- [Getting Started](#getting-started)
- [Controllers](#controllers)
- [Testing with Jasmine and Karma](#testing-with-jasmine-and-karma)
- [Unit Testing Controllers](#unit-testing-controllers)
- [Data Binding](#data-binding)
- [Filters](#filters)
- [Unit Testing Filters](#unit-testing-filters)
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

Our first task will be to build a "hello world" application. It will contain a single web page that displays the text "hello world."  The purpose is to get our project set up so that we can continue building upon it.  This is how we will organize our files for our project:
 
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
      <!-- view injection →
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
 
To get started, create an `index.html` file and include the Angular library in the head with this script:
 
```html
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.1/angular.min.js"></script>
```
You can also [download](https://angularjs.org/) the Angular library to your project.  Next, create an `app` folder with an `app.module.js` file inside.  This file will define our Angular app and be responsible for tying together all other modules. A module is a container for our application code. It is a good practice to define modules in a file of their own.  In the following example a module named `app` is created. 
 
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
 
Now, when we refresh our browser we will see the words “hello world.”

 
**[Back to top](#table-of-contents)**
 
Controllers
---------------
 
**[Back to top](#table-of-contents)**
 
Testing with Jasmine and Karma
--------------------------------------------
 
**[Back to top](#table-of-contents)**
 
Unit Testing Controllers
--------------------------------
 
**[Back to top](#table-of-contents)**
 
Data Binding
-----------------
 
**[Back to top](#table-of-contents)** 
 
Filters
---------
 
**[Back to top](#table-of-contents)**
 
Unit Testing Filters
-------------------------
 
**[Back to top](#table-of-contents)**
 
Services and factories
------------------------------
 
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
 
 
 
 
 
 
