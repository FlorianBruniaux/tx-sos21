function(head, req) {
  // !json templates.regles
  // !code lib/mustache.js
  
  
  start({"headers":{"Content-Type":"text/html;charset=utf-8"}});
  
  var data = {
    regles: []
  };
  
  //Pour chaque document récupéré, traiter les données
  while (row = getRow()) {
    //Si c'est un document topic, page de regles
    data.regles.push({
      id: row.id,
      title: row.value.title,
      description: row.value.description,
      date_modification: row.value.modified,
      auteur: row.value.auteur
    });
  }
  
  //On applique les valeurs a la page html regles.html
  return Mustache.to_html(templates.regles, data);
}