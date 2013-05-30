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
	ressources.objects = [];
	
	if(entities.objects){
		entities.objects
	}
    
    return ressources;
});
