function(head, req) {
  // !json templates.mot_cle
  // !code lib/mustache.js
  //Template utilisé : mot_cle.html
  
  start({"headers":{"Content-Type":"text/html;charset=utf-8"}});
  
  var data = {
    cle: req.query.cle,
    discussions: []
  };
  
  
  //Pour chaque document récupéré, traiter les données
  while (row = getRow()) {
    //Si c'est un document topic, page de discussion    
    var oRegex = new RegExp(data.cle);
    if (oRegex.test(row.value.mots_cle)) {
        data.discussions.push({
            id: row.id,
            titre: row.value.title,
            text: row.value.text,
            date_modification: row.value.modified,
            auteur: row.value.auteur,
            mots_cle: row.value.mots_cle
        });
    }
  }
  
  //On applique les valeurs a la page html mot_cle.html
  return Mustache.to_html(templates.mot_cle, data);
}