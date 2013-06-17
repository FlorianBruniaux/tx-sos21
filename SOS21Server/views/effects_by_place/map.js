function(obj) {
  
  for (var e in obj.effects) {
    
    emit([obj.place, obj.effects[e].name], obj.effects[e].value);
    
  }
  
}