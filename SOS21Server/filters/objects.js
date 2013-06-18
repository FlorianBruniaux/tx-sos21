function(o, req) {
  return (o.place && o.place == req.query.place && o.type.match(/object$/gi));
}