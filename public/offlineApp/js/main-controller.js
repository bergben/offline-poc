;(function(ng) {
  'use strict';

  ng.module('offline')
    .controller('MainController', [
      '$localForage',
      function($localForage) {
        var self = this;
        self.items=[];
        self.images=[];
        $localForage.iterate(function(item) {
          if(item.name!=null)
            self.items.push(item);
          if(item.size!=null){
            if(!reader)
            var reader = new window.FileReader();
            
            reader.readAsDataURL(item); 
            reader.onloadend = function() {
                  self.images.push(reader.result);  
            }
          }
        }).then(function(data) {
        });
        
        self.getDBSize=function(){
            self.totalDBSize=0;
            $localForage
                .iterate(function(item) {
                        if(item.size!=null){
                            self.totalDBSize+=item.size;
                        }
                    }
                 ).then(function(data) {
                 })
            ;
        }
      }
    ]);
}(window.angular));
