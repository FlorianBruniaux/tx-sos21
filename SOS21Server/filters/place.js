function(o, req) {
  //joueur autre que le joueur principale && le joueur entre sur la map || le joueur sort de la map && le joueur est en train de changer de place
  return ((o._id && o._id != req.query.param) && (o.place == req.query.place || o.previousPlace == req.query.place) && o.changingPlace==true);
}