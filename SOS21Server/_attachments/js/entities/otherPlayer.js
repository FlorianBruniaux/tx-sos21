define(['jquery', 'lib/melon', 'entities', 'server', 'event/mediator', 'entities/sos21Player'], function($, melon, entities, server, mediator, Sos21Player){
    var OtherPlayer = Sos21Player.extend({
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            mediator.on("move"+"."+this.servData._id, function(event, x, y){this.moveTo(x, y)}.bind(this));
        },
        
        onDestroy: function(){
            $(mediator).off("move"+"."+this.servData._id);
        }
    });
    return OtherPlayer;
});