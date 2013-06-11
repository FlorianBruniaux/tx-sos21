function(doc) {
  if (doc.type == "topic") {
    emit([doc._id,0], doc);
  } else if (doc.type == "commentaire-discussion") {
    emit([doc.topic_id,1,Date.parse(doc.created)], doc);
  }
}
