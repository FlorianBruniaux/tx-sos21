function(head, req) {
  // !json templates.discussions
  // !code lib/mustache.js
  //Template utilisé : discussion.html
  
  start({"headers":{"Content-Type":"text/html;charset=utf-8"}});
  
  var data = {
    discussions: []
  };
  
  //Pour chaque document récupéré, traiter les données
  while (row = getRow()) {
    //Si c'est un document topic, page de discussion
    data.discussions.push({
            id: row.id,
            titre: row.value.title,
            text: row.value.text,
            date_modification: row.value.modified,
            auteur: row.value.auteur
    });
  }
  
  //On applique les valeurs a la page html discussions.html
  return Mustache.to_html(templates.discussions, data);
}