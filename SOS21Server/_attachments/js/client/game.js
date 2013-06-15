define(['lib/melon',
	'entities',
	'server',
	'client',
	'client/scene',
	'screens/playScreen', 'screens/loadingScreen',
	'entities/player', 'entities/otherPlayer', 'entities/gameObject'],
       function(melon,
		entities,
		server,
		ressources,
		scene,
		PlayScreen,
		LoadingScreen,
		Player, OtherPlayer, GameObject
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
	mainPlayerPseudo = pseudo;
	//return ( api.loadRessources() && api.initGame() && api.initEntityPool() );
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
	//init entitypool (travail de entities/main.js ?)
	me.entityPool.add("mainPlayer", Player);
	me.entityPool.add("otherPlayer", OtherPlayer, true);
	me.entityPool.add("gameObject", GameObject, true);
	// set the "Loading" Screen Object
	me.state.set(me.state.LOADING, new LoadingScreen());
	scene.setMainPlayer(mainPlayerPseudo);
	// load everything & display a loading screen
	me.state.change(me.state.LOADING);
	return true;
    }
    
    api.loaded = function(){
	console.log(debug);
	if (debug==true) {
	    api.initDebug();
	}
	// définir l'écran de jeu
	me.state.set(me.state.PLAY, new PlayScreen()); 
	me.state.transition("fade", "#000", 250);
	// afficher l'écran de jeu
	me.state.change(me.state.PLAY); 
    }
    
//    api.initGame = function(){
//	// init the video
//	me.sys.gravity = 0;
//	if(!me.video.init(containerID, viewPortWidth, viewPortHeight, false, 1.0)){
//		alert("Sorry but your browser does not support html 5 canvas. Please try with another one!");
//		return false;
//	}
//	me.audio.init("mp3,ogg");// init audio
//	return true;
//    }
//    
//    api.loadRessources = function(){
//	if(server.isUp()){
//	    //ressources.players.mainPlayer = server.login(mainPlayerPseudo);
//	    //ressources.players.otherPlayers = server.getOtherPlayers(ressources.players.mainPlayer.place, ressources.players.mainPlayer._id);
//	    // set callback for ressources loaded event
//	    me.loader.onload = api.initPlayScreen.bind(this);
//	    // set all ressources to be loaded
//	    me.loader.preload(ressources.getRessources());
//	    // load everything & display a loading screen
//	    me.state.change(me.state.LOADING);
//	    return true;
//	}
//	else{
//	    console.log("Impossible d'établir une connection avec le serveur.");
//	}
//	return false;
//    }
//    
//    api.initEntityPool = function(){
//	// charge les classes de joueur
//	try {
//	    me.entityPool.add("mainPlayer", Player);
//	    me.entityPool.add("otherPlayer", OtherPlayer, true);
//	    me.entityPool.add("gameObject", GameObject, true);
//	    return true;
//	} catch(e) {
//	    console.error(e);
//	}
//	return false;
//    }
    
    api.initDebug = function(){
	//-------------------------------------------------
	// debug renders
	console.log("init debuuuuug");
	me.debug.renderHitBox = true; // debug - hitbox
	me.debug.renderVelocity = true; // melon v0.9.7+
	me.debug.renderCollisionMap = true; // melon v0.9.7+
	//-------------------------------------------------
    }
    
//    api.initPlayScreen = function(){
//	// init play screen
//	api.initDebug();
//	try {
//	    me.state.set(me.state.PLAY, new PlayScreen()); // définir l'écran de jeu
//	    me.state.transition("fade", "#000", 250);
//	    me.state.change(me.state.PLAY); // afficher l'écran de jeu
//	    return true;
//	} catch(e) {
//	    console.error(e);
//	}
//	return false;
//    }
	
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