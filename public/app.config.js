;(function(ng) {
  'use strict';

  ng.module('offlinePoc')
    .config([
      '$locationProvider',
      function($locationProvider) {
        
        $locationProvider.html5Mode(true);
        
      }
    ]);
}(window.angular));
