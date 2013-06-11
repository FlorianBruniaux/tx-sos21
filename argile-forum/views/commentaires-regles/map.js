function(obj) {

  if (obj.type == "regle") {
    emit([obj._id,0], obj);
  }
  else if (obj.type == "commentaire-regle") {
    emit([obj.target, 1, Date.parse(obj.created)], obj);
  }

}