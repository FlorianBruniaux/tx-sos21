function(o) {
  for (var e in o.effets) {
    emit([e], o.effets[e]);
  }
}