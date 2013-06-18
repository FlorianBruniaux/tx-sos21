define(['entities', 'lib/melon', 'client/scene', 'client', 'entities/interactiveObject', 'event/mediator'],
       function(entities, melon, scene, client, InteractiveObject, mediator){

    var CollectableObject = InteractiveObject.extend({
	init: function(x, y, settings){
        this.parent(x,y,settings);
	mediator.on("objectUpdated"+"."+this.servData._id, function(event, ownerID){this.registerPick(ownerID)}.bind(this));
	},
	onCollision : function(res, obj) {
		if (this.isPicked && obj.servData._id == this.playerPicking) {
			if (this.isClicked && this.playerPicking==scene.mainPlayerData._id) {
				this.triggerEffect();
				this.isClicked = false;
			}
			else{
				this.onPicked();
			}
		}
	},
	/**
	* Objet pick par un autre joueur
	*/
	onPicked: function(){
		me.game.remove(this);
	}
    });
    
    return CollectableObject;
});
