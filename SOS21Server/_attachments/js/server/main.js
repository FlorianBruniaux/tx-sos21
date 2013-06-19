define(['jquery', 'lib/melon', 'entities', 'event/mediator'], function($, melon, entities, mediator){
    var server = (function(){
        var db_name = "sos21";
        var couchUrl = "http://"+window.location.host;
        var serverUrl = couchUrl + "/" + db_name;
        
        var out = {}; // public things
        out.listener = [];
        
        var online = (function(){
            var isOnline = false
            $.ajax({
                url: serverUrl,
                type: 'GET',
                async: false
            }).done(function(data){
                data = JSON.parse(data);
                if (data.db_name && data.db_name==db_name) {
                    isOnline = true;
                }else{
                    isOnline = false;
                }
            }).fail(function(error){
                isOnline = false;
            });
            return isOnline;
        })();
        
        var init = function(){
                // check server status
        };
        
        out.isUp = function(){
                return online;
        };
        
        out.login = function(pseudo){
            var player_info = {};
            var get_player_info = $.ajax({
                url: serverUrl+"/_design/SOS21Server/_view/characters_by_pseudo",
                data: 'key="'+pseudo+'"',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                type: "GET",
                async: false
            });
            
            get_player_info.done(function(data){
                player_info = data.rows[0].value;
            });
            
            get_player_info.fail(function(){
                player_info = "error";
            });
            player_info.image = entities.getSkinName(player_info.image);
            return player_info;
        };
        
        out.getOtherPlayers = function(map, playerId){
            var players = [];
            var get_otherPlayers_info = $.ajax({
                url: serverUrl+"/_design/SOS21Server/_view/characters_by_place?key=["+JSON.stringify(map)+"]",
                type: "GET",
                contentType: "application/json; charset=utf-8",
                async: false,
                dataType: "json"
            });
        
            get_otherPlayers_info.done(function(data){
                data.rows.forEach(function(row){
                    if (row.id != playerId) {
                        players.push(row.value);
                    }
                });
            });
            
            get_otherPlayers_info.fail(function(){
                return null;
            });
            
            players.forEach(function(p){
                p.image = entities.getSkinName(p.image);
            });
            return players;
        };
        
        out.getMapData = function(map){
            var mapData = [];
            var get_mapData_info = $.ajax({
                url: serverUrl+"/_design/SOS21Server/_view/data_by_place?key="+JSON.stringify(map),
                type: "GET",
                contentType: "application/json; charset=utf-8",
                async: false,
                dataType: "json"
            });
            get_mapData_info.done(function(data){
                data.rows.forEach(function(row){
                    mapData.push(row.value);
                });
            });
            get_mapData_info.fail(function(){
                return null;
            });
            return mapData;
        };
        
        out.getMapObjects = function(map){
            var mapObjects = [];
            var getMapObjects_info = $.ajax({
                url: serverUrl+"/_design/SOS21Server/_view/objects_by_place?key="+JSON.stringify(map),
                type: "GET",
                contentType: "application/json; charset=utf-8",
                async: false,
                dataType: "json"
            });
            getMapObjects_info.done(function(data){
                data.rows.forEach(function(row){
                    mapObjects.push(row.value);
                });
            });
            getMapObjects_info.fail(function(){
                return null;
            });
            return mapObjects;
        };
        
        out.updatePlayer = function(playerData){
            var output = null;
            if(playerData._id && playerData._rev && playerData.type == "character"){
                //playerData.x = x; 
                //playerData.y = y;
                var req_update = $.ajax({
                    url: serverUrl+"/"+playerData._id,
                    type: "PUT",
                    data: JSON.stringify(playerData),
                    async: false
                });
            
                req_update.done(function(data){
                    data = JSON.parse(data);
                    playerData._rev = data.rev;
                    output = playerData;
        
                });
            
                req_update.fail(function(error){
                    output = null;
                });
            }
            return output
        };
        //out.updatePlayerPosition = function(playerData, x, y){
        //    var output = null;
        //    if(playerData._id && playerData._rev && playerData.type == "character"){
        //        playerData.x = x; 
        //        playerData.y = y;
        //        playerData.changingPlace = false;
        //        var req_update = $.ajax({
        //            url: serverUrl+"/"+playerData._id,
        //            type: "PUT",
        //            data: JSON.stringify(playerData),
        //            async: false
        //        });
        //    
        //        req_update.done(function(data){
        //            data = JSON.parse(data);
        //            playerData._rev = data.rev;
        //            output = playerData;
        //
        //        });
        //    
        //        req_update.fail(function(error){
        //            output = null;
        //        });
        //    }
        //    return output
        //};
        
        out.updateObject = function(objectData, ownerID){
            console.log("update de l'objet !");
            objectData.previousPlace = objectData.place;
            objectData.place = ownerID;
            var req_update = $.ajax({
                url : serverUrl + "/" + objectData._id,
                type : "PUT",
                data : JSON.stringify(objectData),
                contentType: 'application/json; charset=UTF-8'
            });
            req_update.done(function(successData){
                successData = JSON.parse(successData);
                objectData._rev = successData.rev;
            });
        }
        
        out.applyObjectEffect = function(objectData, ownerID, index){
            console.log("Apply action en bd !");
                index = (index || ((objectData.actions) ? objectData.actions.length-1 : 0));
                //url: serverUrl + "/_design/SOS21Server/_rewrite/action/" + objectData.actions[index],
                var req_applyAction = $.ajax({
                    url: serverUrl + "/action_" + new Date().getTime(),
                    type: "PUT",
                    data: JSON.stringify({"character" : ownerID, "place" : objectData.place}),
                    contentType: 'application/json; charset=UTF-8',
                    async: false
                });
                req_applyAction.done(function(data){
                    console.log("action appliqué");
                    if (index > 0) {
                        out.applyObjectEffect(ownerID, placeId, objectData, index--);
                    }else{
                        out.updateObject(objectData, ownerID);
                    }
                });
                //out.updateObject(objectData, ownerID);
        }
        
        out.longpoll = function (lastseq, pseudo){
            var _this = this;
            data = {"feed":"longpoll","since": lastseq, "heartbeat": 3000};
            req = $.ajax({
                url: serverUrl+"/_changes?filter=SOS21Server/other_players&pseudo="+pseudo, // ~
                type: "GET",
                data: data,
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            });
        
            req.done(function(dataChange){
                var maj = $.ajax({
                    url: serverUrl+"/"+dataChange.results[0].id,
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json"
                });
            
                maj.done(function(dataPerso){
                    /*if (me.game.getEntityByGUID(dataChange.results[0].id)) {
                            me.game.getEntityByGUID(dataChange.results[0].id).longpollMvt(dataPerso.x, dataPerso.y);
                    }*/
                    
                    _this.longpoll(dataChange.results[dataChange.results.length-1].seq, pseudo);
                    
                });
            // maj.fail();
            });  
        // req.fail();
        };
        
        out.unregisterListeners = function(){
            console.log("unregister des listener");
            console.log(this.listener);
            Object.keys(this.listener).forEach(function(channel){
                console.log(channel);
                this.listener[channel].source.close();
                this.listener[channel].source.onmessage = null;
                delete this.listener[channel].source;
                delete this.listener[channel].handler;
            }.bind(this));
            //delete this.listener;
        }
        
        out.registerListeners = function(mainPlayer){
            if (window.EventSource) {
                this.listener = (this.listener || {"players": null, "objects": null, "mapBorder": null});
                //listen to playersMovements
                this.listener.players = {"source":null, "handler":null};
                this.listener.players.handler = function(event){
                    var data = JSON.parse(event.data).doc;
                    console.log(data);
                    mediator.publish('move'+'.'+data._id, [data.x, data.y]);
                };
                this.listener.players.source = new EventSource(serverUrl+("/_changes?feed=eventsource&filter=SOS21Server/other_players"
                                                            +"&limit=1"
                                                            +"&include_docs=true"
                                                            +"&descending=true"
                                                            +"&mainPlayer="+mainPlayer._id
                                                            +"&place="+mainPlayer.place
                                                       )
                );
                this.listener.players.source.onmessage = this.listener.players.handler;
                //this.listener.players.source.addEventListener("message", this.listener.players.handler, false);
                //if (this.listener.players) {
                //    $(this.listener.players).off();
                //}
                //$(this.listener.players).on("message", handler);
                ///listen to objectUpdates
                this.listener.objects = {"source":null, "handler":null};
                this.listener.objects.source = new EventSource(serverUrl+("/_changes?feed=eventsource&filter=SOS21Server/objects"
                                                            +"&limit=1"
                                                            +"&include_docs=true"
                                                            +"&descending=true"
                                                            +"&place="+mainPlayer.place)
                );
                this.listener.objects.handler = function(event){
                    var data = JSON.parse(event.data).doc;
                    mediator.publish("objectUpdated" + "." + data._id, [data.owner]);
                }
                this.listener.objects.source.onmessage = this.listener.objects.handler;
                //this.listener.objects.source.addEventListener("message", this.listener.objects.handler, false);
                //if (this.listener.objects) {
                //    $(this.listener.objects).off();
                //}
                //$(this.listener.objects).on("message", handler2);
                
                //listen to mapChange
                this.listener.mapBorder = {"source":null, "handler":null};
                this.listener.mapBorder.source = new EventSource(serverUrl+("/_changes?feed=eventsource&filter=SOS21Server/place"
                                                            +"&limit=1"
                                                            +"&include_docs=true"
                                                            +"&descending=true"
                                                            +"&place="+mainPlayer.place
                                                            +"&mainPlayer="+mainPlayer._id)
                );
                this.listener.mapBorder.handler = function(event){
                    var data = JSON.parse(event.data).doc;
                    console.log("POP/DEPOP");
                    console.log(data);
                    mediator.publish('borderCrossed', [data]);
                };
                this.listener.mapBorder.source.onmessage = this.listener.mapBorder.handler;
                //this.listener.mapBorder.source.addEventListener("message", this.listener.mapBorder.handler, false);
                //if (this.listener.mapBorder) {
                //    $(this.listener.mapBorder).off();
                //}
                //$(this.listener.mapBorder).on("message", handler3);
            }
        };
        
        out.parseEventData = function(event){
            //console.log(event.data);
            data = JSON.parse(event.data);
            var retrieveInfo = $.ajax({
                url: serverUrl+"/"+data.id,
                type: "GET",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            });
            retrieveInfo.done(function(couchData){
                //console.log(couchData);
                out.listener[event.target](couchData);
            });
        };
        
        out.getServerUrl = function(){
            return serverUrl;
        }
        
        return out;    
    })();
    return server;
});

