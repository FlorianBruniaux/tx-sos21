function (obj){
    if(obj.description_action){
	if (obj.verb) {
	    emit(["executed-action", obj.id_regle, obj.effects, obj.verb, null, obj.character ], 1);
	    emit(["executant", obj.effects, obj.verb, obj.character],1);
	}else{
	    emit(["non-executed-action", obj.id_regle,  obj.effects, obj._id], 1);
	}
    	
    }
    if(obj.character){
    	for (var e in obj.effects) {
      	    emit(["character", obj.character, obj.effects[e].name], obj.effects[e].value);
    	}
    }
    if(obj.effects_attribute){
	emit(["effect_attribute", obj.effects_attribute, obj.top, obj.flop, obj._id], 1);
    }
}