function(o, req) {
  return (o.pseudo && o.pseudo != req.query.pseudo);
}