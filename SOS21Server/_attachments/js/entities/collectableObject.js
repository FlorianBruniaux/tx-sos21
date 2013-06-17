define(['entities', 'lib/melon', 'server', 'client', 'entities/interactiveObject'], function(entities, melon, server, client, InteractiveObject){

    var CollectableObject = InteractiveObject.extend({
        applyEffect: function(){
            console.log("collectable");
            me.game.remove(this);
        },
		/**
         * Objet pick par un autre joueur
         */
        onOtherPlayerPick: function(){
			me.game.remove(this);
		}
    });
    
    return CollectableObject;
});
