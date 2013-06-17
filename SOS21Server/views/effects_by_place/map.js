function(obj) {
  
  for (var e in obj.effects) {
    
    emit([obj.place, e], obj.effects[e]);
    
  }
  
}