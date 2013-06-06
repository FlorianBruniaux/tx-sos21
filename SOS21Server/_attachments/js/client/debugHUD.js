define(['lib/melon', 'client'], function(melon){
    var DebugHUD = me.HUD_Item.extend({
        init: function(x, y) {
            // call the parent constructor
            console.log(x+";"+y);
            this.parent(x, y);
            this.font = new me.Font("Arial", 16, "black", "left");
            
        },
        /*update: function(value){
            this.value = value;
        },*/
        draw: function(context, x, y) {
            //context.clearRect ( 0 , 0, 300 , 100 );
            this.font.draw(context, this.value, this.pos.x, this.pos.y);
        }
     
    });
    return DebugHUD;
});