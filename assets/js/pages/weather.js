//weather-app-ctrl
angular.module('webProjectApp').controller('weatherCtrl', function ($scope, $http) {
  var c,d;
  $scope.searchCity = "trichy";
  console.log($scope.searchCity);
  $scope.WeatherUpdates = function(cityName) {
    cityName ? $scope.searchCity = cityName : $scope.searchCity = "trichy";
    c = '62e255b300bbccaec9d57300eeee1ce4';
    d = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='+$scope.searchCity+ '&appid=' + c;
  
    $http.get(d)
    .then(function (response) {
      // Successful response
      $scope.weatherData = response.data;
      console.log($scope.weatherData);
    })
    .catch(function (error) {
      // Error handling
      console.error('Error fetching weather data:', error);
    });
  }

});
