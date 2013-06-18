define(['entities', 'lib/melon', 'server', 'client', 'entities/interactiveObject'], function(entities, melon, server, client, InteractiveObject){

    var ChangeMapObject = InteractiveObject.extend({
		init: function(x, y, settings){
			this.place_to = settings.place_to;
			this.parent(x,y,settings);
		},
        applyEffect: function(){
            this.parent();
        	console.log("change map");
            //mediator.trigger("gotToPlace", function(event, this.effets.placeName){});
        }
    });
    
    return ChangeMapObject;
});
