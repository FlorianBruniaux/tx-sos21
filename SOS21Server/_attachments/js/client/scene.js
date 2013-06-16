define(['lib/melon', 'lib/pathfinding', 'client', 'server', 'event/mediator'], function(melon, pathfinding, ressources, server, mediator){
    
    var api = {};
    api.mapData = {};
    api.mainPlayer = {};
    api.players = [];
    api.objects = [];
    
    api.getResFolder = function(){
        return server.getServerUrl() + "/_design/SOS21Server/data"
    }

    api.setMapData = function(){
        this.mapData = server.getMapData(this.mainPlayer.place);
    }
    
    api.setMainPlayer = function(pseudo){
        this.mainPlayer = server.login(pseudo);
    }
    
    api.setPlayers = function(){
        if (this.mainPlayer.place && this.mainPlayer._id ) {
            this.players = server.getOtherPlayers(this.mainPlayer.place, this.mainPlayer._id);   
        }
    }
    
    api.setObjects = function(){
        if (this.mainPlayer.place && this.mainPlayer._id ) {
            this.objects = server.getMapObjects(this.mainPlayer.place);   
        }
    }

    api.getMapUrl = function(){
        return server.getServerUrl() + "/" + "_design/SOS21Server/_rewrite/getMap/"+this.mainPlayer.place+"/.json";
    }
    /*initilalisation des écouteurs d’évènement client via jquery :
        - écoute des entrée/sortie des joueurs
        - écoute des actions des joueurs
        - écoute des objets ?
    */
    // exemple : $(api).trigger('move'+'.'+couchData._id, [couchData.x, couchData.y]);
    //mediator.on est un alias vers $(api).on() avec api dans mediator.js
    //mediator.on("leavePlace", function(event, objectGUID){/*remove object*/});
    //mediator.on("gotToPlace", function(event, placeName){});
    mediator.on("changeMap", function(event){
        me.state.change(me.state.LOADING);
    }.bind(api));
    
    return api;
});
