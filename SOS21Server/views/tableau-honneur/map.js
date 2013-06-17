function(obj) {
  if(obj.character){
    for (var e in obj.effets) {
      emit([obj.character, obj.effets[e].name], obj.effets[e].value);
    }
  }
  if(obj.effets_attribute){
    emit(["effet_attribute", obj.effets_attribute, obj.top, obj.flop], 1);
  }
}