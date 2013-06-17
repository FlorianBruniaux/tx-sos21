function (obj){

    if(obj.character ){
        for (var e in obj.effects) {
            emit([obj.character, "effect", obj.effects[e].name], obj.effects[e].value);
        }
    }
    
    if(obj.loggedOn){
        emit([obj.pseudo, "place", obj.place], 123456);
    }

    if(obj.verb){
    	emit([obj.character, "action", obj.verb], 1);
    }

}