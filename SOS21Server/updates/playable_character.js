function(old, req) {
  
  var updated = old;
  
  var o = JSON.parse(req.body);
  updated.place = o.place;
  
  if (updated.place != old.place) {
    updated.previousPlace = old.place;
  }else {
    delete updated.previousPlace;
  }
  
  const timestamp = new Date();
  
  updated.updatedAt = [
    timestamp.getFullYear(), 
    timestamp.getMonth()+1, 
    timestamp.getDate(),
    timestamp.getHours(),
    timestamp.getMinutes()
  ];
  
  return [updated, "Character "+ updated.pseudo +" updated at " + timestamp];
}