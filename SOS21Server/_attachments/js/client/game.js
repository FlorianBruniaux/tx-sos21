define(['lib/melon',
	'entities',
	'server',
	'client',
	'client/scene',
	//'gui/cursor',
	'screens/playScreen', 'screens/loadingScreen',
	'entities/player', 'entities/otherPlayer', 'entities/gameObject', 'entities/changeMapObject', 'entities/collectableObject', 'entities/informationObject'],
       function(melon,
		entities,
		server,
		client,
		scene,
		//Cursor,
		PlayScreen,
		LoadingScreen,
		Player, OtherPlayer, GameObject, ChangeMapObject, CollectableObject, InformationObject
){
//-----------------------------------------------------------
// JEU
//-----------------------------------------------------------
    //private stuff
    var containerID = "";
    var $containerID = "";
    var mainPlayerPseudo = "";
    var viewPortWidth = 0;
    var viewPortHeight = 0;
    var debug = true;
    
    //public api
    var api = {};
    
    api.login = function(pseudo){
		scene.logMainPlayer(pseudo);
		return ( api.onload());
    }
    
    api.onload = function(){
		// init the video
		me.sys.gravity = 0;
		if(!me.video.init(containerID, viewPortWidth, viewPortHeight, false, 1.0)){
			alert("Sorry but your browser does not support html 5 canvas. Please try with another one!");
			return false;
		}
		me.audio.init("mp3,ogg");// init audio
		
		// set all resources to be loaded (callback for ressources loaded event)
		me.loader.onload = this.loaded.bind(this); //why nunu ?
		initEntityPool();
		// set the "Loading" Screen Object
		me.state.set(me.state.LOADING, new LoadingScreen());
		// load everything & display a loading screen
		me.state.change(me.state.LOADING);
		return true;
    }
    
    api.loaded = function(){
		if (debug==true) {
			initDebug();
		}
		// définir l'écran de jeu
		me.state.set(me.state.PLAY, new PlayScreen()); 
		me.state.transition("fade", "#000", 250);
		// afficher l'écran de jeu
		me.state.change(me.state.PLAY); 
    }
    
    var initEntityPool = function(){
    	//init entitypool (travail de entities/main.js ?)
    	//me.entityPool.add("cursor", Cursor);
		me.entityPool.add("mainPlayer", Player);
		me.entityPool.add("otherPlayer", OtherPlayer, true);
		me.entityPool.add("Object", GameObject, true);
		me.entityPool.add("changeMapObject", ChangeMapObject, true);
		me.entityPool.add("collectableObject", CollectableObject, true);
		me.entityPool.add("informationObject", InformationObject, true);
    }
    
    
    var initDebug = function(){
		// debug renders
		me.debug.renderHitBox = true; // debug - hitbox
		me.debug.renderVelocity = true; // melon v0.9.7+
		//me.debug.renderCollisionMap = true; // melon v0.9.7+
    }
    
	
    var game = function(HTMLContainerID, width, height, debug){
		//constructeur : initialisation des élements HTML du jeux (emplacement du canvas, taille du viewPort etc...)
		containerID = (HTMLContainerID || (function(){return $("canvas").length > 0 ? $("div")[0]: ""})());
		$containerID = "#"+HTMLContainerID
		viewPortWidth = (width || 840);
		viewPortHeight = (height || 420);
		return api;
    }
    return game;
});
