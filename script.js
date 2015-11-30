var app=angular.module('single-page-app',['ngRoute']);
app.config(function($routeProvider){
      $routeProvider
          .when('/',{
                templateUrl: 'home.html'
          })
          .when('/weather',{
                  templateUrl: 'map.html'
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
          $scope.cityTitle = response.data.location.city.toUpperCase();
          $scope.lat = response.data.location.lat;
          $scope.lon = response.data.location.lon;
        });
});

app.controller('mapController', function($scope, $http){
       var wundergroundURI = "http://api.wunderground.com/api/527dcdb90fd1ec35/geolookup/conditions/q/autoip.json"
       var lat;
       var lon;
        $http.get(wundergroundURI)
        .then(function(response) {
          $scope.current_observation = response.data;
          $scope.cityTitle = response.data.location.city.toUpperCase();
          lat = response.data.location.lat;
          lon = response.data.location.lon;
        
      var style = "weight: 1, opacity: 1, color: 'black', dashArray: '3', fillOpacity: 0.15"

        var mapboxAccessToken = 'pk.eyJ1Ijoicm96ZW5tZCIsImEiOiJlODZmMjk3NDBmYTBhODc5M2U0NDBiYzUyMWM3YjlmOSJ9.muc0sJgn7kvqjzT25Sch-A';
        var tiles = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
            id: 'mapbox.streets',
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>'
            }),
           latlng = L.latLng(lat, lon);

      var map = L.map('map', { center: latlng, zoom: 5, layers: [tiles] });
      //omnivore.csv('bom.csv').addTo(map);
    var markers = L.markerClusterGroup();
  
    $.getJSON("bom.geojson", function(data) {
    var geojson = L.geoJson(data, {
      onEachFeature: function (feature, layer) {
        // USE A CUSTOM MARKER
        //layer.setIcon(L.mapbox.marker.icon({'marker-symbol': 'circle-stroked', 'marker-color': '59245f'}));
        // ADD A POPUP
      //console.log(")
      var wundergroundURI = "http://api.wunderground.com/api/527dcdb90fd1ec35/geolookup/conditions/q/"+feature.geometry.coordinates.reverse() +".json"
      //var temp_c;
      // $http.get(wundergroundURI)
      //   .then(function(response) {
      //       temp_c = response.data.current_observation.temp_c;
      //       console.log(temp_c);
       
      //   });
            layer.bindPopup('<b>' + feature.properties.Name + ' - '+ feature.properties.State +'</b><br> Current temp: see <a target=_blank href="'+wundergroundURI+'">here</a>'); 

      }
    });
    markers.addLayer(geojson);
    markers.addTo(map);
  });
  // this can be any kind of omnivore layer
  //var runLayer = omnivore.topojson('/static/js/final.js', null, customLayer).addTo(map);
//first, populate all suburbs into a json variable "fullDataSet"



});


});