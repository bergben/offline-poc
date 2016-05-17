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
            self.dblog.push("storing images started.");
            self.storingImages=true;
            self.getRandomImage();
        }
        self.getRandomImage=function(){
            if(!self.storingImages){
                self.dblog.push("storing images stopped.");
                return false;
            }
            return $http.get('https://unsplash.it/800/600/?random',{responseType: 'arraybuffer'}).then(
                function(res){
                    if(res!==false){
                        let blob = new Blob([res.data], {type: 'image/jpeg'});
                        $localForage.setItem(generateUUID(), blob).then(function() {
                            self.dblog.push("blob (image) added to db with size: "+blob.size);
                        });
                        self.getRandomImage();
                    }
                }
            );
        }
        self.stopStoringImages=function(){
            self.storingImages=false;
        }
        self.getDBSize=function(){
            self.totalDBSize=0;
            $localForage
                .iterate(function(item) {
                        if(item.size!=null){
                            self.totalDBSize+=item.size;
                            console.log(item);
                        }
                    }
                 ).then(function(data) {
                 })
            ;
        }
        function formatBytes(bytes,decimals) {
            if(bytes == 0) return '0 Byte';
            var k = 1000; // or 1024 for binary
            var dm = decimals + 1 || 3;
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            var i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
       }
       function generateUUID(){
            var d = new Date().getTime();
            if(window.performance && typeof window.performance.now === "function"){
                d += performance.now(); //use high-precision timer if available
            }
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random()*16)%16 | 0;
                d = Math.floor(d/16);
                return (c=='x' ? r : (r&0x3|0x8)).toString(16);
            });
            return uuid;
        }
      }
    ]);
}(window.angular));
