define(['entities', 'lib/melon', 'client', 'server', 'entities/sos21Player'], function(entities, melon, client, server, Sos21Player){
    var Player = Sos21Player.extend({
            init: function(x, y, settings){
                this.parent(x,y,settings);
                // mouse controls 
                me.input.registerPointerEvent("mousedown", me.game.viewport, function(e){
                    me.event.publish("mousedown");
                });
                this.mouseDown = (function(){
                    var mouse = client.getMouse();
                    this.moveTo(mouse.x, mouse.y);
                }).bind(this);
                me.event.subscribe("mousedown", this.mouseDown);
            },
            moveTo: function(x, y){
            	if (me.game.collisionMap.getTile(x, y)==null)
		            if(server.updatePlayerPosition(this.servData, x, y) != null){
		                this.parent(x, y);
		            }
            },
            update: function(){
                me.game.HUD.setItemValue("playerX", Math.ceil(this.position.x));
                me.game.HUD.setItemValue("playerY", Math.ceil(this.position.y));
                
                me.game.collide(this);
                var mouse = client.getMouse();
				if(me.game.collisionMap.getTile(mouse.x, mouse.y)!=null){
					me.video.getScreenCanvas().style.cursor="crosshair";
				}else{
					me.video.getScreenCanvas().style.cursor="pointer";
				}
                this.parent();
            },
            onCollision: function(res, obj){
            	console.log("player collide");
            }
    }); //gestion de l'entité joueur
    return Player;
});
