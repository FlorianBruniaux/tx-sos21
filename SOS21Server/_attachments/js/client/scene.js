define(['lib/melon', 'lib/pathfinding', 'client', 'server', 'event/mediator'], function(melon, pathfinding, ressources, server, mediator){
    
    var api = {};
    api.map = null;
    api.mainPlayer = {};
    api.players = [];
    api.objects = []
    
    api.getResFolder = function(){
        return server.getAttachmentsURL() + "/data"
    }

    api.getMap = function(){
        if (!this.map) {
            console.log("server.getCurrentMap("+this.mainPlayer.place+")")
            this.map = server.getCurrentMap(this.mainPlayer.place);
        }
        return this.map;
    }
    
    api.setMainPlayer = function(pseudo){
        this.mainPlayer = server.login(pseudo);
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
