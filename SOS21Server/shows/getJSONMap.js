function(doc, req) {
    provides("json", function() {
        doc.tilesets.forEach(function(tileset){
            tileset.image = tileset.image;
        });
        send(JSON.stringify(doc));
    });
}