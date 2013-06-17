function(obj) {
  
  if (obj.loggedOn) {
    emit(obj.pseudo, obj);
  }
  
}
