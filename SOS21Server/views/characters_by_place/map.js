function(o) {
  if (o.loggedOn) {
    emit([o.place], o);
  }
}