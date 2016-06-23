# Angular

Angular is a frontend framework that allows us to separate
our model (data) from our view.  Angular differs from other
frontend frameworks because in addition to being able to update
our view with our model, we can update our model with data bound
to our view. 

## Getting started
To use Angular you will need to include the script in the head 
of the main html file for your app. You can [download](https://angularjs.org/) the file 
to your project and link the script or add this script that is
hosted on Google:

```
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.min.js"></script>
```

The simplest way to start using Angular is to create a module, a controller, and bind the data to the view.

## Modules 
An Angular module is a container for our application code.
It is a good practice to create the module in a file of its
own and assign it a name.  In the following example we created
a variable name app for our module and named the application "myApp".  We will use the app variable to attach our other code to the application.

```js
var app = angular.module("myApp", []);
```

In our view we link the module to our html using the ng-app
directive.  This initializes our Angular application and
determines where our application will run in the view. 
A directive is an html attribute that lets you add functionality
to the elements. Angular directives will begin with `ng-`.

```html
<html ng-app="myApp">
```

## Controllers
The glue that connects the model with our view is what is 
called a controller. The controller can be thought of as
a class for your application. It will hold the logic to 
control your data.

```js
var app = angular.module("myApp", []);

app.controller('MainController', ['$scope',function($scope){
  $scope.title = "My App";
  $scope.days = ["Monday", "Tuesay", "Wednesday", "Thursday", 
  "Friday"];
}]);
```

This creates a controller named `'MainController'` and attaches
the property title and days to the application $scope. To initialize the controller we use the `ng-controller` directive
in the view.

```html
<body ng-controller="MainController">
```

## Data binding
The data we attached to the $scope in our controller can be
displayed in our view with expressions. An express will look
like this: `{{ property }}` where property is the name of 
the attribute we attached to our $scope.  In our example, to
display the content of $scope.title, we would add the following
to our html:

```html
<h1>{{ title }}</h1>
```

If we want to display data that is in an array we can use the
`ng-repeat` directive to loop through the array and get each
element. The syntax is `ng-repeat="item in array"` where array
is the name of the array and item is a placeholder variable
that represents the current element. To display the contents of
our data array do the following:

```html
<div ng-repeat="day in days">
   <p>{{ day }}</p>
</div>
```

We can bind the value of html controls to the model using the 
`ng-model` directive.  

```html
<input ng-model="day">
```

## Directives

Angular also allows us to create our own directives.  We would 
create a new directive when we want to make resusable HTML components. In this example 'directiveName' is the name we
want to give the directive. It must be written in camel case.

```js
var app = angular.module('myapp', []);

app.directive('directiveName', function() {
  return {
      restrict: 'AE',
      replace: 'true',
      templateUrl: 'js/directives/directiveName.html'
  };
});
```
restrict specifies how the directive is used in HTML. When using 
the directive it must use all lowercase and each word should be
separated with a hyphen. The `A` value of restrict means we can use our directive as an element's attribute.

```html
<div directive-name></div>
```

The `E` value of restric means we can use our directive as an
element.

```html
<directive-name></directive-name>
```

These are other properties that can be set in the directive:

**template** - specifies the HTML markup  
**templateUrl** - the file path to the template code  
**link** - a function that uses the parent scope to attach behavior to the DOM. Takes 3 arguments: scope, elem, attrs. Common uses are attaching event listeners, watching model properties for changes, and updating the DOM.  
**scope** - change a directive's scope to a child scope or isolated scope. Specifies the attributes we will pass through the directive and how it will be passed  

## Services

Services let you share code across your app. For example, angular has an $http service that lets you fetch data from a server. To use a service you inject the service as a dependency in your controller. If you would like to create your own service,
you use the factory method.

Create a file named js/services/service.js and include:

```js
app.factory('service', function($http){
  return $http.get('/path')
  .success(function(data){
    return data;
  })
  .error(function(err){
  return err;
  })
})
```
in the controller:

```js
app.controller('MainController', ['$scope', 'service', function($scope, service) {
  service.success(function(data){
    $scope.data = data;
  });
}]);
```
in view:

```html
{{ data.key1 }}
```

## $http Service
On the server we define our routes and in the request 
handler we will either create, read, update or delete
an object in our data store.  In this example, the 
data store is an array.  Therefore, any changes made to
the array will only exist during the session you are
running your app. You're data can come from a json file,
your database, or an external api.  For angular to use 
this data, we need to make use of their $http service. 
To use the $http service, you will call the request method
with the url and a callback function. POST and PUT requests
need request data passed into them. 

```js
//retrieve an object
$http.get('/url')
//success callback
.then(function(response){
  $scope.users = response.data;
  //error callback
}, function(response) {
  console.log(response.statusText);
});

//create an object with the supplied data
$http.post('/url', data).then(successCallback, errorCallback);

//update an object with the supplied data
$http.put('/url', data).then(successCallback, errorCallback);

//delete an object
$http.delete('/url').then(successCallback, errorCallback);
```


## Routing
Lets you map routes to request handlers.

```js
var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider){
  $routeProvider
  .when('/',{
    controller: 'MainController',
    templateUrl: 'views/main.html'
  })
  .when('/:id',{
    controller: 'UserController',
    templateUrl: 'views/user.html'
  })
  .otherwise({
    redirectTo: '/'
  });
});
```
In controller inject $routeParams as a dependency

```js
app.controller("UserController", function($scope, $routeParams, users){
  users.success(function(data){
    $scope.user = data[$routeParams.id];
  });
})
```

When you implement routing, you do not need to attach
the controller to the view because the controller is already
specified in the routes. In your main html page, include the ng-view directive where you want to inject your views.  When you request a route, for example the '\' route, main.html will be injected into ng-view and the code in the MainController will
be executed.

```html
<body ng-app="myApp">
  ...
  <div class="main">
    <ng-view></ng-view>
  </div>
  ...
</body>
```
