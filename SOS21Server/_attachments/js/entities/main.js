define(['lib/melon'], function(melon){
    var api = api || {};
    
    api.entities_folder = "data/images/player/";
	api.objects_folder = "data/images/objects/";
	
	//--------------------------------------
	// Player - paramètres & fonctions
	//--------------------------------------
	var skins = ["default"];
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
	skinExists = function(skinName){// revoir la condition (erreur 404 à éviter
		if (skins.indexOf(skinName)>-1) {
			return true;
		}
		else{
			var url = api.entities_folder+skinName+".png";
			var http = new XMLHttpRequest();
			http.open('HEAD', url, false);
			http.send();
			if (http.status==200 || http.status==304) {
				skins.push(skinName);
				return true;
			}
			else
				return false;
		}
	};
	api.getSkin = function(skinName){ 
		var skin = {};
		if (skinExists(skinName)) {
			// TO DO : charger skin en DB
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
	api.getSkinName = function(skinName){
		var skin = "";
		if (skinExists(skinName)) {
			skin = skinName;
		}
		else{
			skin = this.defaultSkin.name;
		}
		return skin;
	};
	
    return api; 
});





