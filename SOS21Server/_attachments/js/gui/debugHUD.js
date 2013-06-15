define(['lib/melon'], function(melon){
    var DebugHUD = me.HUD_Item.extend({
        init: function(x, y) {
            // call the parent constructor
            this.parent(x, y);
            this.font = new me.Font("Arial", 16, "black", "left");
        },
        draw: function(context, x, y) {
            this.font.draw(context, this.value, this.pos.x, this.pos.y);
        }
    });
    return DebugHUD;
});