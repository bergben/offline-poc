;(function(ng) {
  'use strict';

  ng.module('offlinePoc')
    .controller('MainController', [
      '$log', '$localForage',
      function($log,$localForage) {
        var self = this;
        var json = require('../json/init.json');
        console.log(json);
        $localForage.clear();
        $localForage.setItem('myName','Olivier Combe').then(function() {
            $localForage.getItem('myName').then(function(data) {
              console.log("data", data);
            });
        });
      }
    ]);
}(window.angular));
