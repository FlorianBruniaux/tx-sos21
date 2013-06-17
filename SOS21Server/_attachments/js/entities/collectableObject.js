define(['entities', 'lib/melon', 'server', 'client', 'entities/interactiveObject'], function(entities, melon, server, client, InteractiveObject){

    var CollectableObject = InteractiveObject.extend({
        applyEffect: function(){
            console.log("collectable");
            me.game.remove(this);
        }
    });
    
    return CollectableObject;
});
