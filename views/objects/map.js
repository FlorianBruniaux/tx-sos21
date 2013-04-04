function(o) {
  if (o.type == "object") {
    emit([o._id], null);
  }
}