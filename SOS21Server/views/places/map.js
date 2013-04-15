function(o) {
  
  if (o.type == "place") {
    emit([o._id], [o.title]);
  }
  
}