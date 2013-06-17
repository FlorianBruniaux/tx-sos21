function(obj) {

  if (obj.effets_attribute) {
    emit([obj._id, 0], obj);
  }
  else if (obj.type == "commentaire-attribute") {
    emit([obj.target, 1], obj);
  }

}