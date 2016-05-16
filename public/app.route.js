;(function(ng) {
  'use strict';

  ng.module('offlinePoc')
    .config([
      '$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainController',
            controllerAs: 'main'
          })
          .otherwise({
            redirectTo: '/'
          });
      }
    ]);
}(window.angular));
