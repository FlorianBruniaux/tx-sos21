function(obj) {
  
  for (var e in obj.effects) {
    
    emit([e], obj.effects[e]);
    
  }
  
}