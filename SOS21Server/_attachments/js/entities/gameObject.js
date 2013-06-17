define(['entities', 'lib/melon', 'server', 'client', 'client/scene'], function(entities, melon, server, client, scene){

	var GameObject = me.CollectableEntity.extend({
		hasBeenClicked: false,
		init: function(x, y, settings){
			this.servData = (settings.image != null) ? settings : {image: settings.name};
			this.parent(x, y, settings);
			this.updateColRect(settings.colRect.x, settings.colRect.w, settings.colRect.y, settings.colRect.h);
			this.setVelocity(0,0);
			
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
			this.updateMovement();
            this.parent();
            return true;
		},
		onCollision : function(res, obj) {
			if (obj.servData.pseudo == scene.mainPlayer.pseudo && this.hasBeenClicked) {
				this.applyEffect();
			}
		},
		applyEffect: function(){
			console.log("effect");
			//me.game.remove(this);
		},
		isMouseOver: function(){
			var mouse = client.getMouse();
			if (this.collisionBox.containsPoint(mouse.x, mouse.y)) {
				this.onMouseOver();
			}
		},
		onMouseOver: function(){
			// extends
		},
		onDestroyEvent: function(){
			me.event.unsubscribe(this.mouseHandler);
			this.parent();
		},
		onOtherPlayerPick: function(){
			me.game.remove(this);
		}
	});
	return GameObject;
});
