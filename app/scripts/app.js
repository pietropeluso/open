'use strict';

/**
 * @ngdoc overview
 * @name openWeatherMapApp
 * @description
 * # openWeatherMapApp
 *
 * Main module of the application.
 */
angular
  .module('openWeatherMapApp', [
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
