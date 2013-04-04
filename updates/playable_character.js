function(old, req) {
  var o = JSON.parse(req.body);
  
  if (o.place != old.place) {
    o.previousPlace = old.place;
  }else {
    delete o.previousPlace;
  }
  
  const timestamp = new Date();
  
  o.updatedAt = [
    timestamp.getFullYear(), 
    timestamp.getMonth()+1, 
    timestamp.getDate(),
    timestamp.getHours(),
    timestamp.getMinutes()
  ];
  return [o, "Character updated at " + timestamp];
}