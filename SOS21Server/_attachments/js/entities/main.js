define(['lib/melon'], function(melon){
    var api = api || {};
    
    api.entities_folder = "data/images/player/";
	api.objects_folder = "data/images/objects/";
	
	
	// ~~~~ TEMP --- chargement depuis le server à valider ~~~~
    api.entities = [{name: "default"},{name:"skinPersoTest"}];
	api.objects = [{name: "obj1"}];
	
	//--------------------------------------
	// Player - paramètres & fonctions
	//--------------------------------------
	api.playerSpeed = 1;
	api.defaultSkin = {
		name: "default",
		height: 70,
		width: 60,
		colBox: {
			x: 25,
			y: 55,
			w: 10,
			h: 5
		},
		animationSheet: {
			"stand":			[3], // default stand animation
			"stand-down":       [3],
			"stand-up":         [7],
			"stand-left":       [5],
			"stand-right":      [1],
			"stand-down-left":  [4],
			"stand-down-right": [2],
			"stand-up-right":   [0],
			"stand-up-left":   	[6],
			"run-down":         [3,11,19,27,35,43,51,59,67],
			"run-up":           [7,15,23,31,39,47,55,63,71],
			"run-left":         [5,13,21,29,37,45,53,61,69],
			"run-right":        [1,9,17,25,33,41,49,57,65],
			"run-down-left":    [4,12,20,28,36,44,52,60,68],
			"run-down-right":   [2,10,18,26,34,42,50,58,66],
			"run-up-right":     [0,8,16,24,32,40,48,56,64],
			"run-up-left":     	[6,14,22,30,38,46,54,62,70]
		}
	};
	skinExists = function(skinName){
		var url = api.entities_folder+skinName+".png";
		var http = new XMLHttpRequest();
		http.open('HEAD', url, false);
		http.send();
		return http.status==200;
	};
	api.getSkin = function(skinName){ // revoir la condition (erreur 404 à éviter)
		var skin = {};
		if (skinExists(skinName)) { // TODO : récupérer un vrai skin depuis la DB
			skin.name = skinName;
			skin.height = this.defaultSkin.height;
			skin.width = this.defaultSkin.width;
			skin.colBox = this.defaultSkin.colBox;
			skin.animationSheet = this.defaultSkin.animationSheet;
		}
		else{
			skin = this.defaultSkin;
		}
		return skin;
	};
	/**
	 * Donne la position de la souris sur la carte
	 * @returns {Object} objet contenant la position de la souris (x,y)
	 */
	api.getMouse = function(){
		return {
			x: me.input.mouse.pos.x+me.game.viewport.pos.x,
			y: me.input.mouse.pos.y+me.game.viewport.pos.y
		};
	};
    
    // DEBUG --- draw path jump points
    api.drawPoint = function(x, y){
		x -= me.game.viewport.pos.x;
		y -= me.game.viewport.pos.y;
		var context = me.video.getScreenContext();
		context.beginPath();
		context.arc(x, y, 5, 0, 2 * Math.PI, false);
		context.fillStyle = 'green';
		context.fill();
		context.lineWidth = 1;
		context.strokeStyle = '#003300';
		context.stroke();
		context.closePath();
    };
	
    return api; 
});





