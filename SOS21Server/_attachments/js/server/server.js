
var server = (function(){
	var out = {}; // public things
	
	var serverUrl = "http://localhost:5984/sos21";
	out.serverUrl = "http://localhost:5984/sos21"; // ~~ provisoir pour longpoll
	var online = false;
	
	var init = function(){
		// check server status
	};
	
	out.isUp = function(){
		return online;
	};
	
	out.login = function(pseudo){
	        var get_player_info = $.ajax({
	                url: serverUrl+"/_design/SOS21Server/_view/characters_by_pseudo",
	                data: 'key="'+pseudo+'"',
	                contentType: "application/json; charset=utf-8",
	                dataType: "json",
	                method: "GET",
	        });
	        
			get_player_info.done(function(data){
				return data.rows[0].value;
			});
			
			get_player_info.fail(function(){
				return null;
			});
	};
	
	out.getOtherPlayers = function(map, playerId){
		var players = [];
		var get_otherPlayers_info = $.ajax({
                url: serverUrl+"/_design/SOS21Server/_view/characters_by_place",
                method: "GET",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({"key": map}),
                dataType: "json"
        });
        
        get_otherPlayers_info.done(function(data){
            data.rows.forEach(function(row){
                if (row.id != playerId) {
                    players.push(row.value);
                }
            });
            return players;
        });
        
        get_otherPlayers_info.fail(function(){
        	return null;
        });
        
	};
	
	out.updatePlayerPosition = function(playerData, x, y){
		// la requette doit permettre d'autoriser ou non le déplacement
		if(playerData._id && playerData._rev){
			playerData.x = x; // ~
            playerData.y = y; // ~
            var req_update = $.ajax({
                url: serveurURL+"/"+playerData._id,
                method: "PUT",
                beforeSend: function(xhr){
                    return _this.doUpdate;
                },
                data: JSON.stringify(playerData)
            });
            
            req_update.done(function(data){
                data = JSON.parse(data);
                playerData._rev = data.rev;
                return playerData;
            });
            
            req_update.fail(function(){
            	return null;
            });
		}
	};
	
	out.longpoll = function (lastseq, pseudo){
        var _this = this;
        data = {"feed":"longpoll","since": lastseq, "heartbeat": 3000};
        req = $.ajax({
            url: serverUrl+"/_changes?filter=SOS21Server/other_players&pseudo="+pseudo, // ~
            method: "GET",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });

        req.done(function(dataChange){
            var maj = $.ajax({
                url: serverUrl+"/"+dataChange.results[0].id,
                method: "GET",
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            });
            
            maj.done(function(dataPerso){
                /*if (me.game.getEntityByGUID(dataChange.results[0].id)) {
                        me.game.getEntityByGUID(dataChange.results[0].id).longpollMvt(dataPerso.x, dataPerso.y);
                }*/
                
                _this.longpoll(dataChange.last_seq);
                
            });
            
            // maj.fail();
        });
        
        // req.fail();
    };
    
	return out;
	
})();
