define(['entities', 'lib/melon', 'client/scene', 'client', 'entities/interactiveObject', 'event/mediator'],
       function(entities, melon, scene, client, InteractiveObject, mediator){

    var CollectableObject = InteractiveObject.extend({
		init: function(x, y, settings){
			this.parent(x,y,settings);
			mediator.on("objectUpdated"+"."+this.servData._id, function(event, ownerID){this.registerPick(ownerID)}.bind(this));
		},
		
		onCollision : function(res, obj) {
			this.onRemoteCollision(obj);
		},
		
		/**
		* Objet pick par un joueur
		*/
		onPicked: function(){
			me.game.remove(this);
		}
    });
    
    return CollectableObject;
});
