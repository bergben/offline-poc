;(function(ng) {
  'use strict';

  ng.module('offline')
    .config([
      '$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/', {
            templateUrl: 'offlineApp/main.html',
            controller: 'MainController',
            controllerAs: 'mainCtrl'
          })
          .otherwise({
            redirectTo: '/'
          });
      }
    ]);
}(window.angular));
