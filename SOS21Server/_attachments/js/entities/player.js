define(['entities', 'lib/melon', 'server', 'entities/sos21Player'], function(entities, melon, server, Sos21Player){
    var Player = Sos21Player.extend({
            init: function(x, y, settings){
                this.parent(x,y,settings);
                // mouse controls 
                me.input.registerMouseEvent("mousedown", me.game.viewport, function(e){
                    me.event.publish("mousedown");
                });
                this.mouseDown = (function(){
                    var mouse = entities.getMouse();
                    //var mouse = {"x": me.input.touches[0].x, "y": me.input.touches[0].y};
                    this.moveTo(mouse.x, mouse.y);
                }).bind(this);
                me.event.subscribe("mousedown", this.mouseDown);
            },
            moveTo: function(x, y){
                y -= this.height*0.8;
                x -= this.width/2;
                if(server.updatePlayerPosition(this.servData, x, y) != null){
                    this.parent(x, y);
                }
            }
    }); //gestion de l'entité joueur
    return Player;
});