;(function(ng) {
  'use strict';

  ng.module('offlinePoc')
    .controller('MainController', [
      '$localForage', '$http',
      function($localForage, $http) {
        var self = this;
        self.dblog=[];
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
                      self.addJsonData(self.addedJson);       
                  }
              )
            ;
        }
        self.addJsonData=function(json){
              angular.forEach(json, function(item) {
                  $localForage.setItem(item.surrogateId,item.name).then(function() {
                    self.dblog.push("item added to db: "+item.name);
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
