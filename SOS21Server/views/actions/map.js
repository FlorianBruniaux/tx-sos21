function(obj) {
  
  if (obj.description_action && !obj.verb) {
    
    emit( [obj._id], obj);
    
  }
  
}