function(o) {
  if (o.type.match(/object$/gi)) {
    emit([o._id], null);
  } 
}