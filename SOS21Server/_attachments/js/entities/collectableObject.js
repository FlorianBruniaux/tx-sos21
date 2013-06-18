define(['entities', 'lib/melon', 'server', 'client', 'entities/interactiveObject', 'event/mediator'],
       function(entities, melon, server, client, InteractiveObject, mediator){

    var CollectableObject = InteractiveObject.extend({
	init: function(x, y, settings){
        this.parent(x,y,settings);
	    mediator.on("objectUpdated"+"."+this.servData._id, function(event){this.onOtherPlayerPick()}.bind(this));
	},
    applyEffect: function(){
        this.parent();
        me.game.remove(this);
    },
    /**
     * Objet pick par un autre joueur
     */
    onOtherPlayerPick: function(){
        console.log("picked by another");
        me.game.remove(this);
	}
    });
    
    return CollectableObject;
});
