;(function(ng) {
  'use strict';

  ng.module('offlinePoc')
    .controller('MainController', [
      '$localForage', '$http', 
      function($localForage, $http) {
        var self = this;
        self.dblog=[];
        self.storingImages=false;
        self.resetData=function(){
            self.dblog=[];
            self.dblog.push("db cleared!");
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
                  $localForage.setItem(item.surrogateId, item).then(function() {
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
                        console.log(itemToUpdate);
                        angular.forEach(item.fields, function(field) {
                            self.dblog.push("item updated with surrogateId: "+item.surrogateId +" value for " +field.key +" = "+field.value);
                            itemToUpdate[field.key]=field.value;
                        });
                        $localForage.setItem(item.surrogateId,itemToUpdate).then(function() {
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
              $localForage.getItem('synced').then(function(synced) {
                  if(!synced){
                     self.syncData();
                     $localForage.setItem('synced',true).then(function() {
                     });
                  }
                  else{
                      self.dblog.push("everything already up-to-date.");
                  }
              });
          }
        });
        self.storeImages=function(){
            self.storingImages=true;
            while(self.storingImages){
                $http.get('http://lorempixel.com/400/200/')
                .then(
                    function(res){
                        console.log(res);
                    }
                )
                ;
            }
        }
        self.stopStoringImages=function(){
            self.storingImages=false;
        }
      }
    ]);
}(window.angular));
