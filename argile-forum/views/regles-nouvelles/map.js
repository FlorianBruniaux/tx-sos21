function(doc) {
  if (doc.type == "regle") {
    emit(Date.parse(doc.created), doc);
  }
}