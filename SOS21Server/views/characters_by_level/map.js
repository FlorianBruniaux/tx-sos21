function(obj) {
  
  if (obj.type == "character") {
    emit([obj._id], obj.level);
  }
  
}