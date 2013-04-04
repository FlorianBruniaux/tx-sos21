function(o) {
  
  if (o.loggedOn) {
    emit([o._id], [o.place]);
  }
  
}