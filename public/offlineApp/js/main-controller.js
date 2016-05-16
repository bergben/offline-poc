;(function(ng) {
  'use strict';

  ng.module('offline')
    .controller('MainController', [
      '$log',
      function($log) {
        var self = this;
        console.log("test yo");
      }
    ]);
}(window.angular));
