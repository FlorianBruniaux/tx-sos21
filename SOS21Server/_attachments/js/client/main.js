define(['maps', 'entities'], function(myMaps, entities){
    //-----------------------------------------------------------
    // ressources graphiques
    //-----------------------------------------------------------
    // mise au format des ressources à charger
    var ressources = {"g_ressources": []};
    
    //g_ressources = [];
    if(maps){
            maps.forEach(function(map){
                        map.tiles.forEach(function(tileset){ // ajout des ressources tiles
                                ressources.g_ressources.push({name : tileset, type : "image", src : tiles_folder+tileset+".png"});
                        });
                        map.bg.forEach(function(bg){ // ajout des ressources tiles
                                ressources.g_ressources.push({name : bg, type : "image", src : bg_folder+bg+".png"});
                        });
                        ressources.g_ressources.push({name : map.name, type : "tmx", src : maps_folder+map.name+".tmx"}); // ajout de la carte TMX
            });
    }
    if(entities){
            entities.entities.forEach(function(entity){
                        ressources.g_ressources.push({name: entity.name, type: "image", src: entities.entities_folder+entity.name+".png"});
            });
    };
    
    ressources.players = {"mainPlayer": {}, "otherPlayers": []};
    
    return ressources;
});
