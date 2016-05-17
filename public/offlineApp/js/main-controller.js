;(function(ng) {
  'use strict';

  ng.module('offline')
    .controller('MainController', [
      '$localForage',
      function($localForage) {
        var self = this;
        self.items=[];
        $localForage.iterate(function(item) {
          console.log(item);
          if(item.key!="synced")
            self.items.push(item);
        }).then(function(data) {
          console.log(self.items);
        });
      }
    ]);
}(window.angular));
