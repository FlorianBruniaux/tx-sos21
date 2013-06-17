function(o) {
  if(o.character){
    for (var e in o.effets) {
      emit([o.character, o.effets[e].name], o.effets[e].value);
    }
  }
  if(o.effets_attribute){
    emit(["effet_attribute", o.effets_attribute], 1);
  }
}