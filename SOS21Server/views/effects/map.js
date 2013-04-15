function(o) {
  for (var e in o.effects) {
    emit([e], o.effects[e]);
  }
}