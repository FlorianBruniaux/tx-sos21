function (obj){

    if(obj.character ){
        for (var e in obj.effets) {
            emit([obj.character, "effet", obj.effets[e].name], obj.effets[e].value);
        }
    }
    
    if(obj.loggedOn){
        emit([obj.pseudo, "place", obj.place], 123456);
    }

    if(obj.verb){
    	emit([obj.character, "action", obj.verb], 1);
    }

}