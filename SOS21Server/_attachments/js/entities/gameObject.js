define(['entities', 'lib/melon', 'server', 'client', 'client/scene'], function(entities, melon, server, client, scene){

	var GameObject = me.CollectableEntity.extend({
		init: function(x, y, settings){
			this.servData = (settings.image != null) ? settings : {image: settings.name};
			this.parent(x, y, settings);
			this.updateColRect(settings.colRect.x, settings.colRect.w, settings.colRect.y, settings.colRect.h);
			this.setVelocity(0,0);
			for(var name in settings.animationSheet){
                this.renderable.addAnimation(name, settings.animationSheet[name]);
            }
			this.renderable.setCurrentAnimation("default");
		},
		update: function(){
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
			else{
				this.onMouseOut();
			}
		},
		onMouseOver: function(){
			// extends
		},
		onMouseOut: function(){
			//extends
		},
		onDestroyEvent: function(){
			me.event.unsubscribe(this.mouseHandler);
			this.parent();
		},
		onOtherPlayerPick: function(){
			//me.game.remove(this);
		}
	});
	return GameObject;
});
