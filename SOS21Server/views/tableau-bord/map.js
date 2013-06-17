function (obj){
    if(obj.description_action){
	if (obj.verb) {
	    emit(["executed-action", obj.id_regle, obj.effets, obj.verb, null, obj.character ], 1);
	    emit(["executant", obj.effets, obj.verb, obj.character],1);
	}else{
	    emit(["non-executed-action", obj.id_regle,  obj.effets, obj._id], 1);
	}
    	
    }
    if(obj.character){
    	for (var e in obj.effets) {
      	    emit(["character", obj.character, obj.effets[e].name], obj.effets[e].value);
    	}
    }
    if(obj.effets_attribute){
	emit(["effet_attribute", obj.effets_attribute, obj.top, obj.flop, obj._id], 1);
    }
}