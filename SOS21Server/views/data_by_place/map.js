function (doc) {
    if (doc.type=="place") {
        doc.tilesets.forEach(function(tileset){
            emit([doc._id, tileset.name], tileset);
        });
    }
}