define(['maps', 'entities'], function(maps, entities){
    var ressources = {"g_ressources": []};
    
    if(maps.maps){
        maps.maps.forEach(function(map){
            map.tiles.forEach(function(tileset){ // ajout des ressources tiles
            	ressources.g_ressources.push({name : tileset, type : "image", src : maps.tiles_folder+tileset+".png"});
            });
            map.bg.forEach(function(bg){ // ajout des ressources tiles
                ressources.g_ressources.push({name : bg, type : "image", src : maps.bg_folder+bg+".png"});
            });
            ressources.g_ressources.push({name : map.name, type : "tmx", src : maps.maps_folder+map.name+".tmx"}); // ajout de la carte TMX
        });
    }
    if(entities.entities){
		entities.entities.forEach(function(entity){
            ressources.g_ressources.push({name: entity.name, type: "image", src: entities.entities_folder+entity.name+".png"});
		});
    };
    ressources.players = {"mainPlayer": {}, "otherPlayers": []};
	ressources.objects = [
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
			"colRect": {"x": 5,"w": 35,"y": 5,"h":80}
		}
	];
	
	if(entities.objects){
		entities.objects.forEach(function(obj){
			ressources.g_ressources.push({name: obj.name, type: "image", src: entities.objects_folder+obj.name+".png"});
		});
	}
    
    return ressources;
});
