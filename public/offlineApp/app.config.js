;(function(ng) {
  'use strict';

  ng.module('offline')
    .config([
      '$locationProvider',
      function($locationProvider) {
        
        $locationProvider.html5Mode(true);
        
      }
    ]);
}(window.angular));
