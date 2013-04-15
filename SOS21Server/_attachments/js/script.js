// game resources
var g_ressources = [];

maps.forEach(function(map){
        map.tiles.forEach(function(tileset){ // ajout des ressources tiles
                g_ressources.push({name : tileset, type : "image", src : tiles_folder+tileset+".png"});
        });
        map.bg.forEach(function(bg){ // ajout des ressources tiles
                g_ressources.push({name : bg, type : "image", src : bg_folder+bg+".png"});
        });
        g_ressources.push({name : map.name, type : "tmx", src : maps_folder+map.name+".tmx"}); // ajout de la carte TMX
});

entities.forEach(function(entity){
        g_ressources.push({name: entity.name, type: "image", src: entities_folder+entity.name+".png"});
});

var sos21 = {	
        onload: function(){
                // init the video
                me.sys.gravity = 0;
                if(!me.video.init('sos21', 840, 420, false, 1.0)){
                        alert("Sorry but your browser does not support html 5 canvas. Please try with another one!");
                        return;
                }
                me.audio.init("mp3,ogg");// initialize the "audio"
                me.loader.onload = this.loaded.bind(this);// set all ressources to be loaded
                me.loader.preload(g_ressources);// set all ressources to be loaded
                me.state.change(me.state.LOADING);// load everything & display a loading screen
        },
        loaded: function (){
                // debug renders
                /*me.debug.renderHitBox = false;
                me.debug.renderCollisionMap = false;
                me.debug.renderDirty = false;
                me.debug.renderVelocity = false;
                */
                me.debug.renderHitBox = true;
                me.state.set(me.state.PLAY, new PlayScreen());
                // add our player entity in the entity pool
                me.entityPool.add("mainPlayer", PlayerEntity, false);
                // enable the keyboard
                me.input.bindKey(me.input.KEY.LEFT,     "left");
                me.input.bindKey(me.input.KEY.RIGHT,    "right");
                me.input.bindKey(me.input.KEY.UP,       "up");
                me.input.bindKey(me.input.KEY.DOWN,     "down");
                
                me.state.change(me.state.PLAY);
                
        }
}; // sos21 - chargement du jeu

var PlayScreen = me.ScreenObject.extend({ // game screen
        onResetEvent: function(){	
                // stuff to reset on state change
                
                
                me.levelDirector.loadLevel(firstMap); // load a level
                //console.log(me.levelDirector);
                me.game.viewport.move(60,30);
        },
        onDestroyEvent: function(){
        }
});

//bootstrap :)
window.onReady(function(){
        sos21.onload();     
});
