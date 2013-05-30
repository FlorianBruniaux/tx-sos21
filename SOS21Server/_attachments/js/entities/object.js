define(['entities', 'lib/melon', 'server'], function(entities, melon, server){

	var GameObject = me.CollectableEntity.extends({
		effects: {},
		init: function(x, y, settings){
			// effets {} dans settings
			// srv
			this.servData = (settings.image != null) ? settings : {image: "test", spriteheight: 70, spritewidth: 60};
			this.GUID = this.servData._id ? this.servData._id : null;
			this.parent(x, y, settings);
		},
		onCollision : function(res, obj) {
			this.applyEffect();
			me.game.remove(this);
		},
		applyEffect: function(){
			console.log("effect");
		}
	);
	return GameObject;
});