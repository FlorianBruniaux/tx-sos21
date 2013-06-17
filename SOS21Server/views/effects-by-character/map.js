function(o) {
  if(o.character){
    for (var e in o.effects) {
      emit([o.character, o.effects[e].name], o.effects[e].value);
    }
  }
  if(o.effects_attribute){
    emit(["effect_attribute", o.effects_attribute], 1);
  }
}