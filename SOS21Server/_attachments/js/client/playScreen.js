define(['lib/melon', 'lib/pathfinding', 'client', 'server', 'maps', 'client/debugHUD'],
	   function(melon, pathfinding, ressources, server, maps, DebugHUD){
    // écran de jeu
    var playScreen = me.ScreenObject.extend({
        onResetEvent: function(){ // changement de l'état (me.state.change)
            me.levelDirector.loadLevel(maps.firstMap); // charger un niveau
            //me.game.viewport.move(540,255); // décalage de la caméra mode iso
            me.game.viewport.move(30,15); // decalage de la caméra mode ortho
            this.loadPathFinding();
			//--------------------------------------------
            // add players
            var player = me.entityPool.newInstanceOf("mainPlayer", ressources.players.mainPlayer.x, ressources.players.mainPlayer.y, ressources.players.mainPlayer);
            me.game.add(player, 3);
            ressources.players.otherPlayers.forEach(function(obj){
                    var pos = (obj.x && obj.y) ? {"x":obj.x, "y":obj.y} : {"x":me.game.viewport.limits.x/2, "y":me.game.viewport.limits.y/2};
                    var otherPlayer = me.entityPool.newInstanceOf("otherPlayer", pos.x, pos.y, obj);
                    me.game.add(otherPlayer, 4);
            });
			//--------------------------------------------
			// add objects
			ressources.objects.forEach(function(obj){
				var gameObject = me.entityPool.newInstanceOf("gameObject", obj.x, obj.y, obj);
				me.game.add(gameObject, 5);
			});
			
			me.game.addHUD(0,0,100,50, "rgba(255,255,255, 0.5)");
			me.game.HUD.addItem("mouseX", new DebugHUD(0, 0));
			me.game.HUD.addItem("mouseY", new DebugHUD(50, 0));
			me.game.HUD.addItem("playerX", new DebugHUD(0, 25));
			me.game.HUD.addItem("playerY", new DebugHUD(50, 25));
			
            me.game.sort();
            //server.longpoll(0, ressources.players.mainPlayer.pseudo);
            server.registerListeners(player);
			
			me.input.registerMouseEvent("mousemove", me.game.viewport, function(e){
                me.game.HUD.setItemValue("mouseX", me.input.touches[0].x+me.game.viewport.pos.x);
				me.game.HUD.setItemValue("mouseY", me.input.touches[0].y+me.game.viewport.pos.y);
            });
        },
        loadPathFinding: function(){
            // initialisation du pathfinding sur la carte chargée
            var i=0, tmp=0;
            var matrice = [];
            for(i=0; i< me.game.collisionMap.rows; i++){ // melon v0.9.7+
                    matrice.push([]);
            }
            i=0;
            me.game.collisionMap.layerData.forEach(function(col){
				col.forEach(function(li){
						tmp = (li) ? 1 : 0;
						matrice[i].push(tmp);
						i++;
				});
                i=0;
            });
            me.game.collisionMap.collisionGrid = new PF.Grid(matrice.length, matrice[0].length, matrice); // melon v0.9.7+
            //me.game.collisionMap.pathfinder = new PF.AStarFinder({allowDiagonal: true, dontCrossCorners: true});
            //me.game.collisionMap.pathfinder = new PF.AStarFinder();
			me.game.collisionMap.pathfinder = new PF.JumpPointFinder();
        },
        onDestroyEvent: function(){
            me.game.disableHUD();
        }
    });
    return playScreen;
});
