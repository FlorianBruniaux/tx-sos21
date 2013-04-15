function(head, req) {
  // !json templates.utilisateur
  // !code lib/mustache.js
  //Template utilisé : discussion.html
  
  start({"headers":{"Content-Type":"text/html;charset=utf-8"}});
  
  var data = {
    id: "id",
    nomUtilisateur: "Nom",
    email: "Email",
    dateCreation: "Date",
    type: "Utilisateur"
  };
  
  //Pour chaque document récupéré, traiter les données
  while (row = getRow()) {
    //Si c'est un document utilisateur
    data.id = row.id;
    data.nomUtilisateur = row.value.nom_utilisateur;
    data.email = row.value.email;
    data.dateCreation = row.value.created;
    data.type = row.value.role;
  }
  
  //On applique les valeurs a la page html discussions.html
  return Mustache.to_html(templates.utilisateur, data);
}