function(old, req) {
    
  var action_object = JSON.parse(req.body);
  
  action_object.verb = old._id;
  action_object.description_action = old.description_action;
  action_object.effets = old.effets;
  action_object.id_regle = old.id_regle;
  
  //old.execution_counter = old.execution_counter+1;
  
  const timestamp = new Date();
  
  action_object.created = [
    timestamp.getFullYear(), 
    timestamp.getMonth()+1, 
    timestamp.getDate(),
    timestamp.getHours(),
    timestamp.getMinutes()
  ];
  action_object._id = action_object.verb +"-"+ action_object.character +"-"+ timestamp;
  
  return [action_object, "Action created at " + timestamp ];
}