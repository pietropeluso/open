'use strict';

/**
 * @ngdoc function
 * @name openWeatherMapApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the openWeatherMapApp
 */
angular.module('openWeatherMapApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.forecast = [];
    $scope.displayErrorMessage = false;
    $scope.city = '';
    $scope.cityName = '';
    var numberOfDays = 5;
    var apiKey = '62b567ad2d251eb6db33085d72770f8a';

    $scope.getMonth = function(month) {
      switch(month) {
        case '1' : return 'Jan';
        case '2' : return 'Feb';
        case '3' : return 'Mar';
        case '4' : return 'Apr';
        case '5' : return 'May';
        case '6' : return 'Jun';
        case '7' : return 'Jul';
        case '8' : return 'Aug';
        case '9' : return 'Sept';
        case '10' : return 'Oct';
        case '11' : return 'Nov';
        case '12' : return 'Dec';
        default: return '';
      }
    };

    $scope.formatDate = function(myDate) {
      var day = '',
          month = '',
          year = '';

      day = myDate.slice(8,10);
      month = $scope.getMonth(myDate.slice(5,7));
      year = myDate.slice(0,4);

      return month + ' ' + day + ', ' + year;
    };

    $scope.submit = function() {
      if ($scope.cityName === '') {
        return;
      }
      var url = 'http://api.openweathermap.org/data/2.5/forecast?mode=json&units=metric&callback=JSON_CALLBACK&APPID=' + apiKey;
      $http.jsonp(url + '&q=' + $scope.cityName + ',uk')
      .success(function(response){
        $scope.displayErrorMessage = false;
        $scope.city = response.city.name;
        partitionDataInDays(response.list);
      })
      .error(function(){
        $scope.displayErrorMessage = true;
      });
    };

    $scope.getIconWeatherClass = function(conditionId) {
      switch(conditionId) {
        case 200 :
        case 201 :
        case 202 :
        case 210 :
        case 211 :
        case 212 :
        case 221 :
        case 230 :
        case 231 :
        case 232 :
          return 'wi wi-thunderstorm';
        case 500 :
        case 501 :
        case 502 :
        case 503 :
        case 504 :
        case 901 :
          return 'wi wi-rain';
        case 511 :
          return 'wi wi-rain-mix';
        case 520 :
        case 521 :
        case 522 :
        case 531 :
          return 'wi wi-showers';
        case 600 :
        case 601 :
        case 602 :
        case 611 :
        case 612 :
        case 615 :
        case 616 :
        case 620 :
        case 621 :
        case 622 :
          return 'wi wi-snow';
        case 711 :
          return 'wi wi-smoke';
        case 731 :
        case 751 :
          return 'wi wi-sandstorm';
        case 741 :
          return 'wi wi-fog';
        case 761 :
          return 'wi wi-dust';
        case 762 :
          return 'wi wi-volcano';
        case 771 :
          return 'wi wi-strong-wind';
        case 781 :
        case 900 :
          return 'wi wi-tornado';
        case 800 :
          return 'wi wi-cloud';
        case 801 :
        case 802 :
        case 803 :
        case 804 :
          return 'wi wi-cloudy';
        case 902 :
          return 'wi wi-hurricane';
        case 903 :
          return 'wi wi-snowflake-cold';
        case 904 :
          return 'wi wi-hot';
        case 905 :
          return 'wi wi-windy';
        case 906 :
          return 'wi wi-hail';
      }
    };

    $scope.getDailyMaxTemperature = function(day, criteria) {
      var temp = Number.NEGATIVE_INFINITY, value;
      angular.forEach(day, function (hour) {
        value = hour.main[criteria];
        temp = value > temp ? value : temp;
      });
      return temp;
    };

    $scope.getDailyMinTemperature = function(day, criteria) {
      var temp = Number.POSITIVE_INFINITY, value;
      angular.forEach(day, function (hour) {
        value = hour.main[criteria];
        temp = value < temp ? value : temp;
      });
      return temp;
    };


    $scope.getAverageDailyDataByCriteria = function(day, criteria) {
      var avgValue = 0;
      angular.forEach(day, function (hour) {
        avgValue += hour.main[criteria];
      });
      return avgValue / day.length;
    };

    $scope.displayHour = function(data) {
      return data.slice(10, 16);
    };

    var calculateFirstChunkSize = function(timeVal) {
      var value = timeVal.slice(11, 16);
      switch(value) {
        case '00:00' : return 8;
        case '03:00' : return 7;
        case '06:00' : return 6;
        case '09:00' : return 5;
        case '12:00' : return 4;
        case '15:00' : return 3;
        case '18:00' : return 2;
        case '21:00' : return 1;
        default : return 0;
      }
    };

    var partitionDataInDays = function(data) {
      $scope.forecast = [];
      var blockSize = 0, chunk = [], prevIndex = 0;
      var firstChunkSize = calculateFirstChunkSize(data[0].dt_txt);
      for (var i = 0; i < numberOfDays; i++) {
        blockSize = i === 0 ? firstChunkSize : 8;
        chunk = data.slice(prevIndex, prevIndex + blockSize);
        prevIndex = prevIndex + blockSize;
        $scope.forecast.push(chunk);
      }
    };

  });
