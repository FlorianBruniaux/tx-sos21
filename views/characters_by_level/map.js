function(o) {
  
  if (o.type == "character") {
    emit([o._id], o.level);
  }
  
}