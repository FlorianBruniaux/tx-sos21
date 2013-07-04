define(['lib/melon'], function(melon){
    var api = api || {};
	
	/**
	 * Donne la position de la souris sur la carte
	 * @returns {Object} objet contenant la position de la souris (x,y)
	 */
	api.getMouse = function(){
		return {
			x: me.input.mouse.pos.x+me.game.viewport.pos.x,
			y: me.input.mouse.pos.y+me.game.viewport.pos.y
		};
	};
    
    return api;
});
