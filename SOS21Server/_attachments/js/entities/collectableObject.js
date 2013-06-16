define(['entities', 'lib/melon', 'server', 'client', 'entities/gameObject'], function(entities, melon, server, client, GameObject){

    var CollectableObject = GameObject.extend({
        applyEffect: function(){
            console.log("collectable");
            me.game.remove(this);
        }
    });
    
    return CollectableObject;
});
