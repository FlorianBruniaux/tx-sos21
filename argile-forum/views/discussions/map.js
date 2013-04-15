function(doc) {
  if (doc.type == "topic") {
    emit(Date.parse(doc.modified), doc);
  }
}