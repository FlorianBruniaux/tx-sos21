define(['lib/melon'], function(melon){
    var eventPublisher = {
        channels : ["moveTo", "mouseDown"],    
        register : function(channel, guid){
        },
        
        emit: function(channel, arrayArgs){
            
        }    
    
    
    };
    return eventPublisher;
    
});
            //me.event.publish("/some/channel", ["a","b","c"]);
            //obj = me.game.getEntityByGUID(guid);