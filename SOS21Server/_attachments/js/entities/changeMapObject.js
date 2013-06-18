define(['entities', 'lib/melon', 'server', 'client', 'entities/interactiveObject', 'event/mediator'],
       function(entities, melon, server, client, InteractiveObject, mediator){

    var ChangeMapObject = InteractiveObject.extend({
		init: function(x, y, settings){
			this.place_to = settings.place_to;
			this.parent(x,y,settings);
		},
        applyEffect: function(){
        	console.log("change map");
                mediator.publish("changeMap", [this.servData.place_to]);
                //me.state.change(me.state.LOADING);
            //mediator.trigger("gotToPlace", function(event, this.effets.placeName){});
        }
    });
    
    return ChangeMapObject;
});
