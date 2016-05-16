;(function(ng) {
  'use strict';

  ng.module('offlinePoc')
    .controller('MainController', [
      '$log', '$localForage', '$http',
      function($log,$localForage, $http) {
        var self = this;
        $http.get('json/init.json')
          .then(
              function(res){
                self.initJson = res.data;      
                console.log(self.initJson);          
              }
           )
        ;
        $localForage.clear();
        $localForage.setItem('myName','Olivier Combe').then(function() {
            $localForage.getItem('myName').then(function(data) {
              console.log("data", data);
            });
        });
      }
    ]);
}(window.angular));
