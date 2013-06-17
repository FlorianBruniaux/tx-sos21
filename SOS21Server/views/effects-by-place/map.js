function(o) {
  if(o.place){
    for (var e in o.effects) {
      emit([o.place, o.effects[e].name], o.effects[e].value);
    }
  }
}