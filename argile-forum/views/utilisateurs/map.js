function(doc) {
  if (doc.type == "utilisateur") {
    emit(doc.nom_utilisateur, doc);
  }
}