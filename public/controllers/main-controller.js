;(function(ng) {
  'use strict';

  ng.module('offlinePoc')
    .controller('MainController', [
      '$log', '$localForage', '$http',
      function($log,$localForage, $http) {
        var self = this;
        self.resetData=function(){
            $localForage.clear();
        }
        self.initData=function(){
          if(self.initJson==null){
              $http.get('json/init.json')
                .then(
                    function(res){
                      self.initJson = res.data.items;       
                      self.addJsonData(self.initJson);   
                    }
                )
              ;
          }
          else{     
              self.addJsonData(self.initJson);
          }
        }
        self.syncData=function(){
            $http.get('json/added.json')
              .then(
                  function(res){
                      self.addedJson = res.data.added;      
                      console.log(self.addedJson);        
                      self.addJsonData(self.addedJson);       
                  }
              )
            ;
        }
        self.addJsonData=function(json){
              angular.forEach(json, function(item) {
                console.log(item);
              });
              $localForage.setItem('myName','Olivier Combe').then(function() {
                  $localForage.getItem('myName').then(function(data) {
                    console.log("data", data);
                  });
              });
        }
        $localForage.length().then(function(length){
          if(length==0){
              //init data
              self.initData();
          }
          else{
             //sync
             self.syncData();
          }
        });
      }
    ]);
}(window.angular));
