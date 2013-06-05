define(['entities', 'lib/melon', 'server', 'entities/sos21Player'], function(entities, melon, server, Sos21Player){
    var Player = Sos21Player.extend({
            init: function(x, y, settings){
                this.parent(x,y,settings);
                // mouse controls 
                me.input.registerMouseEvent("mousedown", me.game.viewport, function(e){
                    me.event.publish("mousedown", [me.input.touches[0].x, me.input.touches[0].y]);
                });
                this.mouseDown = (function(x, y){
                    this.moveTo(x, y);
                }).bind(this);
                me.event.subscribe("mousedown", this.mouseDown);
            },
            moveTo: function(x, y){
                y -= this.height/1.5;
                if(server.updatePlayerPosition(this.servData, x, y) != null){
                    this.parent(x, y);
                }
            }
    }); //gestion de l'entité joueur
    return Player;
});