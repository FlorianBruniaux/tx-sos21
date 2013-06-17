function(obj) {
  
  for (var e in obj.effects) {
    
    emit([obj.character, obj.effects[e].name], obj.effects[e].value);
    
  }
  
}