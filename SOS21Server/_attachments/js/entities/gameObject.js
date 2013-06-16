define(['entities', 'lib/melon', 'server', 'client'], function(entities, melon, server, client){

	var GameObject = me.CollectableEntity.extend({
		action: [],
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
				var mouse = entities.getMouse();
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
			if (obj.servData.pseudo == client.players.mainPlayer.pseudo && this.hasBeenClicked) {
				this.applyEffect();
			}
		},
		onOtherPlayerPick: function(){
			me.game.remove(this);
		},
		applyEffect: function(){
			console.log("effect");
			me.game.remove(this);
		},
		isMouseOver: function(){
			var mouse = entities.getMouse();
			if (this.collisionBox.containsPoint(mouse.x, mouse.y)) {
				this.onMouseOver();
			}
		},
		onMouseOver: function(){
			this.renderable.flicker(10);
		},
		onDestroyEvent: function(){
			me.event.unsubscribe(this.mouseHandler);
			this.parent();
		}
	});
	return GameObject;
});
