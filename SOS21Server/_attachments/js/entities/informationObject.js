define(['entities', 'lib/melon', 'server', 'client', 'entities/gameObject'], function(entities, melon, server, client, GameObject){

    var InformationObject = GameObject.extend({
        applyEffect: function(){
            console.log("information");
        },
        onMouseOver: function(){
            me.video.getScreenCanvas().style.cursor="move"; // BETA TEST
			this.renderable.setCurrentAnimation("mouseover");
        },
		onMouseOut: function(){
			me.video.getScreenCanvas().style.cursor="auto"; // BETA TEST
			this.renderable.setCurrentAnimation("default");
		}
    });
	
    return InformationObject;
});
