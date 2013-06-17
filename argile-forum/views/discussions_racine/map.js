function(doc) {
  if ((doc.type == "topic")&&(doc.parents == "")) {
    emit(Date.parse(doc.modified), doc);
  }
}