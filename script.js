var app=angular.module('single-page-app',['ngRoute']);
app.config(function($routeProvider){
      $routeProvider
          .when('/',{
                templateUrl: 'home.html'
          })
        
          .when('/about',{
                templateUrl: 'about-max-rozen.html'
          });

      //insert json here
});
app.controller('cfgController',function($scope){

    /*      
    Here you can handle controller for specific route as well.
    */
});
app.controller('obsController', function($scope, $http){
  $http.get("http://api.wunderground.com/api/527dcdb90fd1ec35/conditions/q/Australia/Sydney.json")
        .then(function(response) {$scope.current_observation = response.data;});
});

app.controller('geoController', function($scope, $http){
       var wundergroundURI = "http://api.wunderground.com/api/527dcdb90fd1ec35/geolookup/conditions/q/autoip.json"
        $http.get(wundergroundURI)
        .then(function(response) {
          $scope.current_observation = response.data;
          $scope.cityTitle = response.data.location.city.toUpperCase();;
        });
});