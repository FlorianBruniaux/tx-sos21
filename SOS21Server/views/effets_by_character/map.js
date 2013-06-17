function(o) {
  for (var e in o.effets) {
    emit([o.character, e], o.effets[e]);
  }
}