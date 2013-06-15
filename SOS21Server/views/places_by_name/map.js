function(o) {
  if (o.type == "place") {
    emit([o.name], o);
  }
}