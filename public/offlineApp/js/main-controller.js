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
                              base64data = reader.result;    
                              self.images.push(base64data);  
            }
          }
        }).then(function(data) {
          console.log(self.items);
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
