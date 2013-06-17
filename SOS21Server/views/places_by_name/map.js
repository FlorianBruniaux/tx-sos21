function(obj) {
  
  if (obj.type == "place") {
    
    emit([obj.name], obj);
    
  }
  
}