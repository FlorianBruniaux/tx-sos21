define(['entities', 'lib/melon', 'server', 'entities/sos21Player'], function(entities, melon, server, Sos21Player){
    var Player = Sos21Player.extend({
            init: function(x, y, settings){
                this.parent(x,y,settings);
                // mouse controls 
                me.input.registerMouseEvent("mousedown", me.game.viewport, function(e){
                    me.event.publish("mousedown");
                });
                this.mouseDown = (function(){
                    this.moveTo(me.input.touches[0].x, me.input.touches[0].y);
                }).bind(this);
                me.event.subscribe("mousedown", this.mouseDown);
            }
    }); //gestion de l'entité joueur
    return Player;
});