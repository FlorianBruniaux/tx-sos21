function(o, req) {
  return (o._id && o._id != req.query.param);
}