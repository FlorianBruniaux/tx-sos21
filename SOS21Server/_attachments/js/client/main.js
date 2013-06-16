define(['lib/melon'], function(melon){
    var api = api || {};
    
	/*api.objects = [
		{
			"_id": "451c56e6b20f4499486c59034d12f25f",
			"_rev": "1-5d122ad66c18b2f39f93a838f723f23a",
			"name": "obj1",
			"image": "obj1",
			"place": "stage1",
			"type": "object",
			"visible": true,
			"x": 330,
			"y": 200,
			"spriteheight": 93,
			"spritewidth": 84,
			"colRect": {"x": 5,"w": 35,"y": 65,"h":20}
		}
	];
	if(entities.objects){
		entities.objects.forEach(function(obj){
			ressources.g_ressources.push({name: obj.name, type: "image", src: entities.objects_folder+obj.name+".png"});
		});
	}*/
	
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
