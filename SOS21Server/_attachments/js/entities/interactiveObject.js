define(['entities', 'lib/melon', 'server', 'client', 'entities/gameObject'], function(entities, melon, server, client, GameObject){

    var InteractiveObject = GameObject.extend({
        hasBeenClicked: false,
        init: function(x, y, settings){
            this.parent(x,y,settings);
            me.input.registerPointerEvent("mousedown", this.collisionBox, function(e){
				me.event.publish("objectClicked");
			});
			this.mouseDown = (function(){
				this.hasBeenClicked = true;
			}).bind(this);
			this.unregisterMouseClick = (function(){
				var mouse = client.getMouse();
				if (!this.collisionBox.containsPoint(mouse.x, mouse.y) && this.hasBeenClicked) {
					this.hasBeenClicked = false;
				}
			}).bind(this);
			
			this.mouseHandler = me.event.subscribe("mousedown", this.unregisterMouseClick);
			me.event.subscribe("objectClicked", this.mouseDown);
        },
        update: function(){
            this.isMouseOver();
            this.parent();
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
    
    return InteractiveObject;
});
