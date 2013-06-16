function(o) {
  if (doc.type.match(/object$/gi)) {
    emit([o._id], null);
  }
}