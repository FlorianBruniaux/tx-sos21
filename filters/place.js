function(o, req) {

  // ?
  return req.query.place == o.place || req.query.place == o.previousPlace;

}