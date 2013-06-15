define(['lib/melon'], function(melon){
    var api = api || {};
    
    //var serveurURL = "http://localhost:5984/sos21";
    api.entities_folder = "data/images/player/";
	api.objects_folder = "data/images/objects/";
    api.entities = [{name: "default"},{name:"skinPersoTest"}];
	api.objects = [{name: "obj1"}];
		
	api.defaultSkin = {
		name: "default",
		height: 70,
		width: 60,
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
	
	api.getSkin = function(skinName){ // revoir la condition (erreur 404 à éviter)
		var img = new Image();
		img.src = this.entities_folder+skinName+".png"; // ~ genère erreur 404 si fichier inexistant
		var skin = {};
		if (img.height != 0) { // TODO : récupérer un vrai skin depuis la DB
			skin.name = skinName;
			skin.height = this.defaultSkin.height;
			skin.width = this.defaultSkin.width;
			skin.animationSheet = this.defaultSkin.animationSheet;
		}
		else{
			skin = this.defaultSkin;
		}
		return skin;
	};
    
    //CALCUL ORTHO  
    api.pxToTile = function(x, y){ // TO DO 
            var obj = {};
            obj.x = Math.ceil(x/me.game.collisionMap.tilewidth);
        obj.y = Math.ceil(y/me.game.collisionMap.tileheight);
        return obj;
    }
    
    api.tileToPx = function(x, y){
            var obj = {};
            obj.x = Math.ceil(x*me.game.collisionMap.tilewidth) + me.game.collisionMap.tilewidth;
            obj.y = Math.ceil(y*me.game.collisionMap.tileheight) + me.game.collisionMap.tileheight;
            return obj;
    } 
    
    /*// CALCUL ISO
    var angle = Math.sqrt(3)/2;
    function pxToTile(x, y){ // TO DO 
            var obj = {};
            obj.x = ( (x-(me.game.collisionMap.width/2)) * angle - (y-(me.game.collisionMap.height/2)) * (-angle) ) + me.game.collisionMap.width/2;
        obj.y = ( (x-(me.game.collisionMap.width/2)) * (-angle) + (y-(me.game.collisionMap.height/2)) * angle ) + me.game.collisionMap.height/2;
        return obj;
    }
    
    function tileToPx(x, y){
            var obj = {};
            obj.x = Math.ceil(x*me.game.collisionMap.tilewidth);
            obj.y = Math.ceil(y*me.game.collisionMap.tileheight);
            return obj;
    } */
    
    // DEBUG --- draw path jump points
    api.drawPoint = function(x, y){
			//x -= me.game.viewport.pos.x;
			//y -= me.game.viewport.pos.y;
            var context = me.video.getScreenContext();
            context.beginPath();
            context.arc(x, y, 5, 0, 2 * Math.PI, false);
            context.fillStyle = 'green';
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = '#003300';
            context.stroke();
            context.closePath();
    }
	
	api.getMouse = function(){
		return {
			x: me.input.mouse.pos.x+me.game.viewport.pos.x,
			y: me.input.mouse.pos.y+me.game.viewport.pos.y
		};
}
    return api; 
});





