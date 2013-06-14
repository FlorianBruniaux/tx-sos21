define(['lib/melon',
	'maps',
	'entities',
	'server',
	'client',
	'client/playScreen',
	'entities/player', 'entities/otherPlayer', 'entities/gameObject'],
       function(melon,
		maps,
		entities,
		server,
		ressources,
		PlayScreen,
		Player, OtherPlayer, GameObject
	){
//-----------------------------------------------------------
// JEU
//-----------------------------------------------------------
	var sos21 = {	
		login: function(pseudo){
			if(server.isUp()){
				ressources.players.mainPlayer = server.login(pseudo);
				ressources.players.otherPlayers = server.getOtherPlayers(ressources.players.mainPlayer.place, ressources.players.mainPlayer._id);
			}
			else{
				console.log("Impossible d'établir une connection avec le serveur.");
			}
			return this.onload();
		},
	    onload: function(){
			// init the video
			me.sys.gravity = 0;
			if(!me.video.init('sos21', 840, 420, false, 1.0)){
				alert("Sorry but your browser does not support html 5 canvas. Please try with another one!");
				return false;
			}
			me.audio.init("mp3,ogg");// init audio
			me.loader.onload = this.loaded.bind(this);// set all ressources to be loaded
			me.loader.preload(ressources.g_ressources);// charges les ressources graphiques
			me.state.change(me.state.LOADING);// affiche l'écran de chargement
			// charge les classes de joueur
			me.entityPool.add("mainPlayer", Player);
			me.entityPool.add("otherPlayer", OtherPlayer, true);
			me.entityPool.add("gameObject", GameObject, true);
			
			return true;
	    },
	    loaded: function (){
			//-------------------------------------------------
			// debug renders
			me.debug.renderHitBox = true; // debug - hitbox
			me.debug.renderVelocity = true; // melon v0.9.7+
			//me.debug.renderCollisionMap = true; // melon v0.9.7+
			//-------------------------------------------------
			// init play screen
			me.state.set(me.state.PLAY, new PlayScreen()); // définir l'écran de jeu
			me.state.transition("fade", "#000", 250);
			
			me.state.change(me.state.PLAY); // afficher l'écran de jeu
	    }
	}
	return sos21;
});























