define(['lib/melon', 'lib/pathfinding', 'client', 'server', 'event/mediator', 'entities'],
       function(melon, pathfinding, ressources, Server, mediator, entities){
    
    var api = {};
    api.mainPlayerData = {};
    api.mainPlayer = {};
    api.mapData = [];
    api.playersData = [];
    api.players = {};
    api.objectsData = [];
    api.objects = {};
    api.nextMap = {};
    api.server = null;
        
    api.getResFolder = function(){
        return api.server.getServerUrl() + "/_design/SOS21Server/data"
    }
    api.getMapUrl = function(){
        return api.server.getServerUrl() + "/" + "_design/SOS21Server/_rewrite/getMap/"+this.mainPlayerData.place+"/.json";
    }

    api.setMapData = function(){
        console.log(this.mainPlayerData.place);
        this.mapData = api.server.getMapData(this.mainPlayerData.place);
    }
    
    api.logMainPlayer = function(pseudo){
        this.mainPlayerData = api.server.login(pseudo);
    }
    
    api.setPlayersData = function(){
        this.playersData = [];
        if (this.mainPlayerData.place && this.mainPlayerData._id ) {
            this.playersData = api.server.getOtherPlayers(this.mainPlayerData.place, this.mainPlayerData._id);   
        }
    }
    
    api.setObjectsData = function(){
        this.objectsData = [];
        if (this.mainPlayerData.place && this.mainPlayerData._id ) {
            this.objectsData = api.server.getMapObjects(this.mainPlayerData.place);   
        }
    }
    
    api.getGRessources = function(){
        var g_ressources = [];
        // construction de la ressource graphique du joueur principale
        var mainPlayerRes = {};
        mainPlayerRes["name"] = this.mainPlayerData.image;
        mainPlayerRes["type"] = "image";
        mainPlayerRes["src"] = entities.entities_folder + this.mainPlayerData.image + ".png";
        g_ressources.push(mainPlayerRes);
        // construction des ressources graphiques des autres joueurs
        this.playersData.forEach(function(data){
           var playerRes = {};
           playerRes["name"] = data.image;
           playerRes["type"] = "image";
           playerRes["src"] = entities.entities_folder + data.image + ".png";
           g_ressources.push(playerRes);
        });
        // construction des ressources graphiques de la map
        this.mapData.forEach(function(data){
           var resData = {};
           resData["name"] = data.name;
           resData["type"] = "image";
           resData["src"] = api.getResFolder() + data.image.substr(2, data.image.length);
           g_ressources.push(resData);
        });
        // construction des ressources graphiques des objets
        this.objectsData.forEach(function(data){
           var resData = {};
           resData["name"] = data.image;
           resData["type"] = "image";
           resData["src"] = entities.objects_folder + data.image + ".png";
           g_ressources.push(resData);
        });
        g_ressources.push({name : this.mainPlayerData.place, type : "tmx", src : this.getMapUrl()});
        return g_ressources;
    }
    
    api.setMainPlayer = function(){
        this.mainPlayer = me.entityPool.newInstanceOf("mainPlayer", this.mainPlayerData.x, this.mainPlayerData.y, this.mainPlayerData);
	me.game.add(this.mainPlayer, 5);
    }
    
    api.setPlayers = function(){
        this.playersData.forEach(function(obj){
            var pos = (obj.x && obj.y) ? {"x":obj.x, "y":obj.y} : {"x":me.game.viewport.limits.x/2, "y":me.game.viewport.limits.y/2};
            var otherPlayer = me.entityPool.newInstanceOf("otherPlayer", pos.x, pos.y, obj);
            api.players[obj._id] = otherPlayer;
            me.game.add(otherPlayer, 4)
        });
    }
    
    api.setObjects = function(){
        this.objectsData.forEach(function(obj){
            var newObject = me.entityPool.newInstanceOf(obj.type, obj.x, obj.y, obj);
            api.objects[obj._id] = newObject;
            me.game.add(newObject, 3);
        });
    }
    
    api.updatePlayer = function(data){
        var hasChange = false;
        if(Object.prototype.toString.call(data) === "[object Object]"){
            for (key in data) {
                hasChange = (this.mainPlayerData[key])? (this.mainPlayerData[key]==data[key])? false : true : true;
                this.mainPlayerData[key] = data[key];
            }
        }
        if (hasChange) {
            return this.server.updatePlayer(this.mainPlayerData);
        }
        return null;
    }
    
    api.unloadAll = function(){
        for (id in this.players) {
            this.players[id].onDestroyEvent();
            delete this.players[id];
        }
        for (id in this.objects) {
            this.objects[id].onDestroyEvent();
            delete this.objects[id];
        }
        //this.server = null;
    }
    
    api.init = function(pseudo) {
        console.log(this);
        this.unloadAll();
        if (this.nextMap.id) {
            this.mainPlayerData.place = this.nextMap.id;
            this.mainPlayerData.x = this.nextMap.x;
            this.mainPlayerData.y = this.nextMap.y;
            this.server.updatePlayer(this.mainPlayerData);
        }else{
            this.server = Server;
            this.logMainPlayer(pseudo);
            this.server.registerListeners(this.mainPlayerData);
        }
        //récupération des othersPlayers
        api.setPlayersData();
        //récupération des donnée de la map
        api.setMapData();
        //récupération des objets sur la map
        api.setObjectsData();
        //écoute changement de map
        mediator.on("goToMap", function(event, placeTo){
            mainPlayerData.x = placeTo.x;
            mainPlayerData.y = placeTo.y;
            mainPlayerData.place = placeTo.id;
            this.server.updatePlayerMap(tthis.mainPlayerData, placeTo)    
        }.bind(api));
        mediator.on("changeMap", function(event, placeTo){
            console.log("changeMap reçu");
            this.nextMap = placeTo;
            this.init(this.mainPlayerData.pseudo);        
            me.loader.preload(this.getGRessources());
            me.state.change(me.state.LOADING);
        }.bind(api));
        //écoute objets
        mediator.on("objectInteraction", function(event, objData){
            //objData["target"] = callerID;
            api.server.updateObject(objData, this.mainPlayer.servData._id);
        }.bind(api));
        //écoute players
    }   
    return api;
});
