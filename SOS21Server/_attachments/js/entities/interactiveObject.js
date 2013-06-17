define(['entities', 'lib/melon', 'client/scene', 'client', 'entities/gameObject'], function(entities, melon, scene, client, GameObject){

    var InteractiveObject = GameObject.extend({
        hasBeenClicked: false,
        effectTriggered: false,
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
            this.checkInteraction();
            this.parent();
        },
        onCollision : function(res, obj) {
			if (obj.servData.pseudo == scene.mainPlayer.pseudo && this.hasBeenClicked) {
				this.triggerEffect();
			}
		},
        triggerEffect: function(){
			if (!this.effectTriggered) {
				this.effectTriggered = true;
				this.applyEffect();
			}
		},
		applyEffect: function(){
			// EXTENDS
		},
        checkInteraction: function(){
            var collision = me.game.collide(this);
            if (!collision && this.effectTriggered) {
                this.effectTriggered = false;
            }
        },
        isMouseOver: function(){
			var mouse = client.getMouse();
			if (this.collisionBox.containsPoint(mouse.x, mouse.y)) {
				this.onMouseOver();
			}
			else{
				this.onMouseOut();
			}
		},
        onMouseOver: function(){
            me.video.getScreenCanvas().style.cursor="move"; // BETA TEST
			this.renderable.setCurrentAnimation("mouseover");
        },
		onMouseOut: function(){
			me.video.getScreenCanvas().style.cursor="auto"; // BETA TEST
			this.renderable.setCurrentAnimation("default");
		},
        onOtherPlayerPick: function(){
			me.game.remove(this);
		}
    });
    
    return InteractiveObject;
});
