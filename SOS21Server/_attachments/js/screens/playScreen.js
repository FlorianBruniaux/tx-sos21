define(['lib/melon', 'lib/pathfinding', 'client', 'server', 'gui/debugHUD', 'client/scene'],
	   function(melon, pathfinding, ressources, server, DebugHUD, scene){
	   
	// écran de jeu
	var playScreen = me.ScreenObject.extend({

		onResetEvent: function(){
			// changement de l'état (me.state.change)
			// charger un niveau, currentMap vien de scene
			me.levelDirector.loadLevel(scene.mainPlayer.place);
			//me.game.viewport.move(540,255); // décalage de la caméra mode iso
			me.game.viewport.move(30,15); // decalage de la caméra mode ortho
			this.loadPathFinding();
			// add entities
			this.initEntities();
		
			this.initHUD();

			me.game.sort();
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
		initEntities: function(){
			var mainPlayer = me.entityPool.newInstanceOf("mainPlayer", scene.mainPlayer.x, scene.mainPlayer.y, scene.mainPlayer);
			me.game.add(mainPlayer, 5);
			var players = scene.players;
			players.forEach(function(obj){
				var pos = (obj.x && obj.y) ? {"x":obj.x, "y":obj.y} : {"x":me.game.viewport.limits.x/2, "y":me.game.viewport.limits.y/2};
				var otherPlayer = me.entityPool.newInstanceOf("otherPlayer", pos.x, pos.y, obj);
				//console.log(otherPlayer);
				me.game.add(otherPlayer, 4)
			});
			var objects = scene.objects;
			objects.forEach(function(obj){
				var newObject = me.entityPool.newInstanceOf(obj.type, obj.x, obj.y, obj);
				me.game.add(newObject, 3);
			});
		},
		initHUD: function(){
			me.game.addHUD(0,0,100,50, "rgba(255,255,255, 0.5)");
			me.game.HUD.addItem("mouseX", new DebugHUD(0, 0));
			me.game.HUD.addItem("mouseY", new DebugHUD(50, 0));
			me.game.HUD.addItem("playerX", new DebugHUD(0, 25));
			me.game.HUD.addItem("playerY", new DebugHUD(50, 25));
		
			me.input.registerPointerEvent("mousemove", me.game.viewport, function(e){
				me.game.HUD.setItemValue("mouseX", me.input.mouse.pos.x+me.game.viewport.pos.x);
				me.game.HUD.setItemValue("mouseY", me.input.mouse.pos.y+me.game.viewport.pos.y);
			});
		},
		onDestroyEvent: function(){
			me.game.disableHUD();
		}
	});
	return playScreen;
});
