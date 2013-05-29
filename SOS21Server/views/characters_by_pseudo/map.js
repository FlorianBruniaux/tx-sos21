function(o) {
  
  if (o.loggedOn) {
    emit(o.pseudo, o);
  }
  
}
