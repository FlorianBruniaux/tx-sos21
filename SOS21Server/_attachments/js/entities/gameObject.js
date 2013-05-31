define(['entities', 'lib/melon', 'server'], function(entities, melon, server){

	var GameObject = me.CollectableEntity.extend({
		effets: {},
		init: function(x, y, settings){
			this.servData = (settings.image != null) ? settings : {image: settings.name};
			this.GUID = this.servData._id ? this.servData._id : null;
			this.parent(x, y, settings);
			this.setVelocity(0,0);
		},
		update: function(){
			this.mouseOver();
			this.updateMovement();
            this.parent();
            return true;
		},
		onCollision : function(res, obj) {
			this.applyEffect();
			me.game.remove(this);
		},
		applyEffect: function(){
			console.log("effect");
		},
		mouseOver: function(){
			var mouse = {x: me.input.touches[0].x, y: me.input.touches[0].y};
			if (this.collisionBox.containsPoint(new me.Vector2d(mouse.x, mouse.y))) {
				this.renderable.flicker(10);
			}
		}
	});
	return GameObject;
});