function(obj) {
  if(obj.character){
    for (var e in obj.effects) {
      emit([obj.character, obj.effects[e].name], obj.effects[e].value);
    }
  }
  if(obj.effects_attribute){
    emit(["effect_attribute", obj.effects_attribute, obj.top, obj.flop], 1);
  }
}