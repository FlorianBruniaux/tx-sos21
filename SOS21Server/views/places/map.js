function(obj) {
  
  if (obj.type == "place") {
    
    emit([obj._id], [obj.title]);
    
  }
  
}