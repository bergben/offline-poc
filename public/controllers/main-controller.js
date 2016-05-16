;(function(ng) {
  'use strict';

  ng.module('offlinePoc')
    .controller('MainController', [
      '$log', '$localForage',
      function($log,$localForage) {
        var self = this;
        console.log("test yo");
        $localForage.setItem('myName','Olivier Combe').then(function() {
            $localForage.getItem('myName').then(function(data) {
              console.log("data", data);
              console.log($localForage.length());
            });
        });
      }
    ]);
}(window.angular));
