function (obj) {
    
    if (obj.type=="place") {
        
        obj.tilesets.forEach(
            function(tileset){
                emit(obj._id, tileset);
            }
        );
        
    }
    
}