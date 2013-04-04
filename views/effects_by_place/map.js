function(o) {
  for (var e in o.effects) {
    emit([o.place, e], o.effects[e]);
  }
}