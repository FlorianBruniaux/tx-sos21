define(['entities', 'lib/melon', 'server', 'client', 'entities/gameObject'], function(entities, melon, server, client, GameObject){

    var ChangeMapObject = GameObject.extend({
        applyEffect: function(){
        	console.log("change map");
            //mediator.trigger("gotToPlace", function(event, this.effets.placeName){});
        }
    });
    
    return ChangeMapObject;
});
