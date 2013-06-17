define(["jquery"], function($){
    var mediator = function(){
        var api = {};
               
        api.on = function(eventName, handler){
            $(this).on(eventName, handler);
        }
        
        api.publish = function(eventName, data){
            var extraParam = data || [];
            //check si data est vraiment un objet
            if(Object.prototype.toString.call(data) === "[object Object]"){
                extraParam = [];
                Object.keys(data).forEach(function(elem){
                    extraParam.push(data[elem]);
                });
            }
            $(this).trigger(eventName, extraParam);
        }
        
        api.on.bind(mediator);
        api.publish.bind(mediator);
        return api;
    }    
    
    return mediator();
});