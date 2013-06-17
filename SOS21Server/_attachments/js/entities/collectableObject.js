define(['entities', 'lib/melon', 'server', 'client', 'entities/gameObject'], function(entities, melon, server, client, GameObject){

    var CollectableObject = GameObject.extend({
        applyEffect: function(){
            console.log("collectable");
            me.game.remove(this);
        },
        onMouseOver: function(){
            me.video.getScreenCanvas().style.cursor="move"; // BETA TEST
			//this.renderable.flicker(10);
			this.renderable.setCurrentAnimation("mouseover");
        },
		onMouseOut: function(){
			me.video.getScreenCanvas().style.cursor="auto"; // BETA TEST
			this.renderable.setCurrentAnimation("default");
		}
    });
	
    return CollectableObject;
});
