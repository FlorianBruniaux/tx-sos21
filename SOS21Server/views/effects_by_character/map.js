function(o) {
  for (var e in o.effects) {
    emit([o.character, e], o.effects[e]);
  }
}