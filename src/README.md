## TODO 

1. Clone the repo and scaffold your app with the project folder.
2. Create a service named users that uses the $http service 
to get all users.
3. Create a controller called MainController and add $scope, $http, and users as dependencies. 
4. Create a variable $scope.users in the controller and use the
users service to initialize it.
5. Link the [ngRoute](https://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular-route.min.js) library in the head of index.html. In app.js add ngRoute as a dependency in the module. 
6. In app.js configure a route for '/' and set the controller to
MainController and the templateUrl to views/main.html. Redirect all other routes to '/'.
7. Start your server and confirm you see the users displayed on the web page.
8. Create a file named js/controllers/UserController.js and add $http, $scope, $routeParams, and users as dependencies. Add the route for adding a user. (explain)
9. Create a view for adding a user in views/addUser.html (explain)
10. In app.js add a route for '/add' with the controller as UserController and the tempplateUrl as 'views/addUser.html'.
11. Create a view for the user page in views/editUser.html.  It should have a form with save and delete buttons.  
12. In the UserController add routes for updating a user and deleting a user. 
13. In app.js add a route for '/:userId' with the controller as UserController and the templateUrl as editUser.html.
