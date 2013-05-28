define(['lib/melon', 'maps', 'entities', 'server', 'client', 'client/playScreen', 'entities/player', 'entities/otherPlayer'],
       function(melon, maps, entities, server, ressources, PlayScreen, Player, otherPlayer){
//-----------------------------------------------------------
// JEU
//-----------------------------------------------------------
	var sos21 = {	
		login: function(pseudo){
			if(server.isUp()){
				ressources.players.mainPlayer = server.login(pseudo);
				ressources.players.otherPlayers = server.getOtherPlayers(ressources.players.mainPlayer.place, ressources.players.mainPlayer._id);
			}
			this.onload();
		},
	    onload: function(){
		// init the video
		me.sys.gravity = 0;
		if(!me.video.init('sos21', 840, 420, false, 1.0)){
			alert("Sorry but your browser does not support html 5 canvas. Please try with another one!");
			return;
		}
		me.audio.init("mp3,ogg");// init audio
		me.loader.onload = this.loaded.bind(this);// set all ressources to be loaded
		me.loader.preload(ressources.g_ressources);// charges les ressources graphiques
		me.state.change(me.state.LOADING);// affiche l'écran de chargement
		// charge les classes de joueur
		me.entityPool.add("mainPlayer", Player);
		me.entityPool.add("otherPlayer", otherPlayer, true);
		
		$("#sos21").show(); // ~
	    },
	    loaded: function (){
		//-------------------------------------------------
		// debug renders
		me.debug.renderHitBox = true; // debug - hitbox
		me.debug.renderVelocity = true; // melon v0.9.7+
		me.debug.renderCollisionMap = true; // melon v0.9.7+
		//-------------------------------------------------
		// init play screen
		me.state.set(me.state.PLAY, new PlayScreen()); // définir l'écran de jeu
		me.state.transition("fade", "#000", 250);
		
		me.state.change(me.state.PLAY); // afficher l'écran de jeu
	    }
	}
	return sos21;
});























