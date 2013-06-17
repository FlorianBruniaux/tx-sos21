function(o) {
  if(o.place){
    for (var e in o.effets) {
      emit([o.place, o.effets[e].name], o.effets[e].value);
    }
  }
}