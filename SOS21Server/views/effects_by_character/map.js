function(obj) {
  
  for (var e in obj.effects) {
    
    emit([obj.character, e], obj.effects[e]);
    
  }
  
}