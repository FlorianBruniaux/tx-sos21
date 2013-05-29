define(['lib/melon'], function(melon){
    var server = (function(){
        var out = {}; // public things
        var db_name = "sos21";
        var couchUrl = "http://localhost:5984";
        var serverUrl = couchUrl + "/" + db_name;
        
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
                // la requette ce doit d'etre synchrone, comme le resultat est utilisé en argument d'une fonction (sos21.js, line 12)
                async: false
            });
            
            get_player_info.done(function(data){
                player_info = data.rows[0].value;
            });
            
            get_player_info.fail(function(){
                player_info = "error";
            });
            return player_info;
        };
        
        out.getOtherPlayers = function(map, playerId){
            var players = [];
            var get_otherPlayers_info = $.ajax({
                url: serverUrl+"/_design/SOS21Server/_view/characters_by_place",
                type: "GET",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({"key": map}),
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
            return players;
        };
        
        out.updatePlayerPosition = function(playerData, x, y){
            var output = null;
            if(playerData._id && playerData._rev && playerData.type == "character"){
                playerData.x = x; 
                playerData.y = y;
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
        
        //must be binded to an obj type player (that is the point of view)
        out.listen = function(){
            console.log("listen !")
            if (window.EventSource) {
                console.log("window.EventSource is defined !")
                var _this = out;
                _this.ports = _this.ports || {};
                _this.ports.players = _this.ports.players || (function(){
                    var source = new EventSource(serverUrl+"/_changes?feed=eventsource&filter=SOS21Server/other_players&pseudo="+this.servData.pseudo);
                    source.addEventListener("message", _this.parseEventData, false)
                    return source;
                }.bind(this)());
            }
        };
        out.parseEventData = function(event){
            data = JSON.parse(event.data);
            var retrieveInfo = $.ajax({
                url: serverUrl+"/"+data.id,
                type: "GET",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            });
            retrieveInfo.done(function(dataPerso){
                console.log(dataPerso);
                console.log(dataPerso._id);
                me.event.publish("moveTo", [dataPerso._id, dataPerso.x, dataPerso.y]);
            });
        };
        return out;    
    })();
    return server;
});

