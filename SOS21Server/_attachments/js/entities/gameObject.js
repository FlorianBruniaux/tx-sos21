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
		}
	});
	return GameObject;
});
