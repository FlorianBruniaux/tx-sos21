function(o) {
  for (var e in o.effets) {
    emit([o.place, e], o.effets[e]);
  }
}