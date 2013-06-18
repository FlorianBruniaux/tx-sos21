function(o, req) {
  return (o._id && o._id != req.query.mainPlayer && o.type == "character" && o.place== req.query.place);
}