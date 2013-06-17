function(old, req) {
  var action_object = JSON.parse(req.body);
  
  action_object.verb=old.verb;
  action_object.effets=old.effets;
  
  const timestamp = new Date();
  
  action_object.updatedAt = [
    timestamp.getFullYear(), 
    timestamp.getMonth()+1, 
    timestamp.getDate(),
    timestamp.getHours(),
    timestamp.getMinutes()
  ];

  action_object._id="action-"+action_object.character+"-"+timestamp;
  
  return [action_object, "Action created at " + timestamp];
}