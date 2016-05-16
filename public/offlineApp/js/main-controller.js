;(function(ng) {
  'use strict';

  ng.module('offline')
    .controller('MainController', [
      '$localForage',
      function($localForage) {
        var self = this;
        self.items=[];
        $localForage.iterate(function(value, key) {
          self.items.push({key:value});
        }).then(function(data) {
          console.log(data);
        });
      }
    ]);
}(window.angular));
