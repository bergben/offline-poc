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
            $http.get('json/deleted.json')
              .then(
                  function(res){
                      self.deletedJson = res.data.deleted; 
                      self.deleteJsonData(self.deletedJson);          
                  }
              )
            ;
            $http.get('json/updated.json')
              .then(
                  function(res){
                      self.updatedJson = res.data.updated;  
                      self.updateJsonData(self.updatedJson);        
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
        self.deleteJsonData=function(json){
              angular.forEach(json, function(surrogateId) {
                  $localForage.removeItem(surrogateId).then(function() {
                    self.dblog.push("item deleted with surrogateId: "+surrogateId);
                  });
              });
        }
        self.updateJsonData=function(json){
              angular.forEach(json, function(item) {
                  $localForage.getItem(item.surrogateId).then(function (itemToUpdate) {
                        angular.forEach(item.fields, function(value, key) {
                            console.log(value,key);
                            self.dblog.push("item updated with surrogateId: "+item.surrogateId +" value for " +key +" = "+value);
                        });
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
