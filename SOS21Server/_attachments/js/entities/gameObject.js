define(['entities', 'lib/melon', 'server', 'client'], function(entities, melon, server, client){

	var GameObject = me.CollectableEntity.extend({
		effets: {},
		hasBeenClicked: false,
		init: function(x, y, settings){
			this.servData = (settings.image != null) ? settings : {image: settings.name};
			this.parent(x, y, settings);
			this.updateColRect(settings.colRect.x, settings.colRect.w, settings.colRect.y, settings.colRect.h);
			this.setVelocity(0,0);
			
			me.input.registerMouseEvent("mousedown", this.collisionBox, function(e){
				me.event.publish("objectClicked");
			});
			this.mouseDown = (function(){
				this.hasBeenClicked = true;
			}).bind(this);
			this.unregisterMouseClick = (function(){
				var mouse = entities.getMouse();
				if (!this.collisionBox.containsPoint(new me.Vector2d(mouse.x, mouse.y)) && this.hasBeenClicked) {
					this.hasBeenClicked = false;
				}
			}).bind(this);
			
			this.mouseHandler = me.event.subscribe("mousedown", this.unregisterMouseClick);
			me.event.subscribe("objectClicked", this.mouseDown);
		},
		update: function(){
			this.mouseOver();
			this.updateMovement();
            this.parent();
            return true;
		},
		onCollision : function(res, obj) {
			if (obj.servData.pseudo == client.players.mainPlayer.pseudo && this.hasBeenClicked) {
				this.applyEffect();
				me.game.remove(this);
			}
		},
		onOtherPlayerPick: function(){
			me.game.remove(this);
		},
		applyEffect: function(){
			console.log("effect");
		},
		mouseOver: function(){
			var mouse = entities.getMouse();
			if (this.collisionBox.containsPoint(new me.Vector2d(mouse.x, mouse.y))) {
				this.renderable.flicker(10);
			}
		},
		onDestroyEvent: function(){
			me.event.unsubscribe(this.mouseHandler);
			this.parent();
		}
	});
	return GameObject;
});